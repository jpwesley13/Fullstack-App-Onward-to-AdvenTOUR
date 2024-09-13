import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import ReturnButtons from "../components/ReturnButtons";
import DangerAverage from "../components/DangerAverage";

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

    const { trainer, habitat, content, rating, danger } = review;

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
        <div>
            <p>Score: {rating}/5</p>
            <DangerAverage
            dangerAverage={danger}
            />
        </div>
        </>
    )
}

export default Review;