import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import ReturnButtons from "../components/ReturnButtons";

function Review() {
    const { id } = useParams();
    const [review, setReview] = useState(null);

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
        <ReturnButtons 
        trainer={trainer.id}
        habitat={habitat.id}/>
        <h2>
            <img src={trainer.image} alt={`${trainer.name}'s profile`} className="thumbnail" />
            {trainer.name}'s review of {habitat.name}:
        </h2>
        <span>{content}</span>
        </>
    )
}

export default Review;