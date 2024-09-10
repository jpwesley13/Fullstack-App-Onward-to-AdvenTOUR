import { useParams, useOutletContext, Link } from "react-router-dom";
import { useEffect, useState } from "react";

function Habitat() {
    const { id } = useParams();
    const [habitat, setHabitat] = useState(null);
    const [reviews, setReviews] = useState([]);

    useEffect(() => {
        fetch(`/habitats/${id}`)
        .then(res => res.json())
        .then(data => {
            setHabitat(data);
            document.title = `${data.name}`;
        })
        .catch(error => console.error(error));
        fetch('/reviews')
        .then(res => res.json())
        .then(data => setReviews(data.filter(review => review.habitat_id === parseInt(id))))
        .catch(error => console.error(error));
    }, [id]);

    // const {habitats, reviews} = useOutletContext();

    // const [habitat, setHabitat] = useState({
    //     name: "",
    //     region: "",
    //     region_id: "",
    //     reviews: "",
    //     sightings: ""
    // })

    // useEffect(() => {
    //     const hab = habitats.find(habitat => habitat.id === parseInt(params.id));
    //     if(hab) {
    //         setHabitat(hab)
    //         document.title = `${hab.name}`
    //     }
    // }, [habitats])

    if(!habitat) {
        return <h1>Loading...</h1>
    };

    // const filteredReviews = reviews.filter(review => review.habitat_id === habitat.id)

    const reviewsList = reviews.map(review => (
        <li key ={review.id}>Review by {review.trainer.name}: <Link to={`/reviews/${review.id}`}>View</Link></li>
    ))

    return (
        <>
        <main>
            <hr/>
            <h1>{habitat.name}</h1>
            <hr />
            {reviewsList}
            </main></>
    )
}

export default Habitat;