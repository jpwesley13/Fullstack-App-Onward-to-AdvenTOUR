import useAverage from "../context and hooks/AverageHook";
import AverageIcons from "../components/AverageIcons";
import { useState, useEffect } from "react";
import AddNewButton from '../components/AddNewButton';
import { Link, useParams } from "react-router-dom";
import ReviewForm from "../components/ReviewForm";

function Habitat() {
    const { id } = useParams();
    const [habitat, setHabitat] = useState(null);
    const [reviews, setReviews] = useState([]);
    const [showForm, setShowForm] = useState(false);

    function handleClick() {
        setShowForm(showForm => !showForm)
      }

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

    function onAddReview(newReview){
        return setReviews([...reviews, newReview])
      }

    const dangerAverages = useAverage(reviews, 'danger');
    const ratingAverages = useAverage(reviews, 'rating');

    if(!habitat) {
        return <h1>Loading...</h1>
    };

    const reviewsList = reviews.map(review => (
        <div key ={review.id}>Review by {review.trainer.name}: <Link to={`/reviews/${review.id}`}>View</Link>
            <div>
                Rating: {review.rating}/5
            </div>
            <br />
        </div>
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
                <h3>Found in the {habitat.region.name} region. <AverageIcons
                    average={dangerAverages[parseInt(id)]}
                    property="danger"
                    id={id}/>
                </h3>
                <h3>
                    Average <AverageIcons
                    average={ratingAverages[parseInt(id)]}
                    property="rating"
                    id={id}/>
                </h3>
            </div>
            {showForm ? <ReviewForm
                onAddReview={onAddReview}
                handleClick={handleClick}
                id={id}
          /> : null}
            <AddNewButton newAddition="review" 
            handleClick={handleClick}
            showForm={showForm}/>
            <br />
            {reviewsList}
        </main>
        </>
    )
}

export default Habitat;