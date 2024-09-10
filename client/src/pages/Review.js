import { useOutletContext, useParams, Link } from "react-router-dom";
import { useEffect, useState } from "react";

function Review() {
    const { id } = useParams();
    const [review, setReview] = useState(null);
    // const {reviews} = useOutletContext();

    // const [review, setReview] = useState({
    //     content: "",
    //     danger: "",
    //     habitat: "",
    //     habitat_id: "",
    //     trainer: "",
    //     trainer_id: ""
    // })

    // useEffect(() => {
    //     const rev = reviews.find(review => review.id === parseInt(params.id));
    //     if(rev) {
    //         setReview(rev)
    //         document.title = "Review"
    //     }
    // }, [reviews])

    // const trainer = review.trainer
    // const habitat = review.habitat

    useEffect(() => {
        document.title = "Review"
        fetch(`/reviews/${id}`)
        .then(res => res.json())
        .then(data => setReview(data))
        .catch(error => console.error(error))
    }, [id])

    if(!review) {
        return <h1>Loading...</h1>
    };

    const { trainer, habitat, content } = review;

    return (
        <>
        <hr />
        <Link to={`/trainers/${trainer.id}`}>
        <button>Back to Trainer's page</button>
        </Link>
        <Link to={`/habitats/${habitat.id}`}>
        <button>Back to Habitat's page</button>
        </Link>
        <h2>{trainer.name}'s review of {habitat.name}:</h2>
        <span>{content}</span>
        </>
    )
}

export default Review;