import { useParams, useOutletContext, Link } from "react-router-dom";
import { useEffect, useState } from "react";
import AddNewButton from "../components/AddNewButton";
import DangerAverage from "../components/DangerAverage";

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

    if(!habitat) {
        return <h1>Loading...</h1>
    };

    const reviewsList = reviews.map(review => (
        <div key ={review.id}>Review by {review.trainer.name}: <Link to={`/reviews/${review.id}`}>View</Link></div>
    ))

    function dangerAverage(id) {
        const filteredReviews = reviews.filter(review => review.habitat_id === parseInt(id))
        const dangerArray = filteredReviews.map(review => review.danger)
        const sum = dangerArray.reduce((acc, curr) => acc + curr, 0);
        const average = sum / dangerArray.length;
        console.log(average)
        return parseFloat(average.toFixed(2));
      };

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
                dangerAverage={dangerAverage}
                id={id}/>
                </h3>
            </div>
            <AddNewButton
            newAddition="review"
            />
            <br />
            {reviewsList}
            </main></>
    )
}

export default Habitat;