import useAverage from "../context and hooks/AverageHook";
import AverageIcons from "../components/AverageIcons";
import { useState, useEffect } from "react";
import { Link, useParams, useNavigate } from "react-router-dom";
import ReviewForm from "../components/ReviewForm";
import { Modal, Box } from "@mui/material";
import ModalButton from "../components/ModalButton";

function Habitat() {

    const navigate = useNavigate();

    const { id } = useParams();
    const [habitat, setHabitat] = useState('loading');
    const [reviews, setReviews] = useState([]);
    const [isModalOpen, setIsModalOpen] = useState(false);

    useEffect(() => {
        fetch(`/habitats/${id}`)
        .then(res => res.json())
        .then(data => {
            if(data && data.name) {
                setHabitat(data);
                document.title = `${data.name}`;
            } else {
                setHabitat(null);
            }
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

    if(habitat === 'loading') {
        return <h1>Loading...</h1>
    };
    if(!habitat) {
        navigate('/error');
        return null;
    }

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
                <h3>Found in the {habitat.region.name} region. 
                    <br />
                    <AverageIcons
                    average={dangerAverages[parseInt(id)]}
                    property="danger"
                    id={id}/>
                    <br />
                    Average <AverageIcons
                    average={ratingAverages[parseInt(id)]}
                    property="rating"
                    id={id}/>
                </h3>
            </div>
            <br />
            <ModalButton variant="contained" color="primary" onClick={() => setIsModalOpen(true)}>
                        Add new review
                    </ModalButton>
            <br />
            {reviewsList}
        </main>
        <Modal
                open={isModalOpen}
                onClose={() => setIsModalOpen(false)}
                aria-labelledby="edit-profile-modal-title"
                aria-describedby="edit-profile-modal-description"
            >
                <Box className="modal-box">
                    <h2>Add new review</h2>
                    <ModalButton className="close-button" onClick={() => setIsModalOpen(false)} sx={{ mb: 2 }}>Close</ModalButton>
                    <ReviewForm
                        handleClick={() => setIsModalOpen(false)}
                        onAddReview={onAddReview}
                        id={id}
                    />
                </Box>
            </Modal>
        </>
    )
}

export default Habitat;