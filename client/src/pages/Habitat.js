import useDangerAverage from "../components/DangerHook";
import DangerAverage from "../components/DangerAverage";
import { useState, useEffect } from "react";
import AddNewButton from '../components/AddNewButton';
import { Link, useParams } from "react-router-dom";

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

    const dangerAverages = useDangerAverage(reviews);

    if(!habitat) {
        return <h1>Loading...</h1>
    };

    const reviewsList = reviews.map(review => (
        <div key ={review.id}>Review by {review.trainer.name}: <Link to={`/reviews/${review.id}`}>View</Link></div>
    ))

    return (
        <>
        <main>
            <hr/>
            <header className="header">
                <h1 className="headertitle">{habitat.name}</h1>
                <img src={habitat.image} alt={habitat.name} />
            </header>
            <hr />
            <br />
            <div>
                <h3>Found in the {habitat.region.name} region. <DangerAverage
                    dangerAverage={dangerAverages[parseInt(id)]}
                    id={id}/>
                </h3>
            </div>
            <AddNewButton newAddition="review" />
            <br />
            {reviewsList}
        </main>
        </>
    )
}

export default Habitat;