import { useParams, useOutletContext, Link } from "react-router-dom";
import { useEffect, useState } from "react";

function Habitat() {
    const params = useParams();
    const {habitats, reviews} = useOutletContext();

    const [habitat, setHabitat] = useState({
        name: "",
        region: "",
        region_id: "",
        reviews: "",
        sightings: ""
    })

    useEffect(() => {
        const hab = habitats.find(habitat => habitat.id === parseInt(params.id));
        if(hab) {
            setHabitat(hab)
            document.title = `${hab.name}`
        }
    }, [habitats])

    if(!habitat) {
        return <h1>Loading...</h1>
    };

    const filteredReviews = reviews.filter(review => review.habitat_id === habitat.id)

    const reviewsList = filteredReviews.map(review => (
        <li>Review by {review.trainer.name}: <Link to={`/reviews/${review.id}`}>View</Link></li>
    ))

    return (
        <>
        <main>
            <h1>{habitat.name}</h1>
            <hr />
            {reviewsList}
            </main></>
    )
}

export default Habitat;