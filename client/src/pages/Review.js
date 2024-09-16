import { useParams, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import ReturnButtons from "../components/ReturnButtons";
import AverageIcons from "../components/AverageIcons";

function Review() {
    const navigate = useNavigate();
    const { id } = useParams();
    const [review, setReview] = useState('loading');

    useEffect(() => {
        document.title = "Review"
        fetch(`/reviews/${id}`)
        .then(res => res.json())
        .then(data => {
            if(data && data.id) {
                setReview(data)
            } else {
                setReview(null);
            }
        })
        .catch(error => console.error(error))
    }, [id])

    if(review === 'loading') {
        return <h1>Loading...</h1>
    };
    if(!review) {
        navigate('/error');
        return null
    }

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
        <br />
        <br />
        <div>
            <AverageIcons
            average={danger}
            property="danger"
            />
            <br />
            <AverageIcons
            average={rating}
            property="rating"
            />
        </div>
        </>
    )
}

export default Review;