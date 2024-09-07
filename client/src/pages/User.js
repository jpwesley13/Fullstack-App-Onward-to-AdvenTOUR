import { useParams, useOutletContext, Link } from "react-router-dom";
import { useEffect, useState } from "react";

function User() {
    const params = useParams();
    const {trainers, reviews} = useOutletContext();

    const [trainer, setTrainers] = useState({
        name: "",
        age: "",
        biome: "",
        biome_id: "",
        reviews: "",
        sightings: ""
    })

    useEffect(() => {
        const trn = trainers.find(trainer => trainer.id === parseInt(params.id));
        if(trn) {
            setTrainers(trn)
            document.title = `${trn.name}`
        }
    }, [trainers])

    if(!trainer) {
        return <h1>Loading...</h1>
    }

    const {name, image, id} = trainer

    const filteredReviews = reviews.filter(review => review.trainer_id === id)

    const reviewsList = filteredReviews.map(review => (
        <li>{`${name}`}'s review of {`${review.habitat.name}`}: <Link to={`/reviews/${review.id}`}>View</Link></li>
    ))

    return (
        <>
        <main>
            <h1>{name}</h1>
            <hr />
            {reviewsList}
            </main></>
    )
}

export default User;