import { useParams, useOutletContext, Link } from "react-router-dom";
import { useEffect, useState } from "react";
import SightingCard from "../components/SightingCard";

function User() {
    const params = useParams();
    const {trainers, reviews, sightings} = useOutletContext();

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
    const filteredSightings = sightings.filter(sighting => sighting.trainer.id === id)

    const reviewsList = filteredReviews.map(review => (
        <li>{`${name}`}'s review of {`${review.habitat.name}`}: <Link to={`/reviews/${review.id}`}>View</Link></li>
    ))

    const sightingList = filteredSightings.map(sighting => (
        <SightingCard 
        key={sighting.id}
        sighting={sighting}
        />
      ))

    return (
        <>
        <main>
            <h1>{name}</h1>
            <hr />
            <h3>Reviews from {name}</h3>
            {reviewsList}
            <br/>
            <hr/>
            <h3>Rare sightings from {name}</h3>
            {sightingList}
            </main></>
    )
}

export default User;