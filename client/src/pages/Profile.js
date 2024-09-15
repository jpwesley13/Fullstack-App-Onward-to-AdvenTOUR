import { useParams, Link } from "react-router-dom";
import { useEffect, useState } from "react";
import ProfileCard from "../components/ProfileCard";
import { useAuth } from "../context and hooks/AuthContext";
import EditProfile from "../components/EditProfile";
import { Modal, Box, Button } from "@mui/material";
import { styled } from "@mui/material";

const CustomButton = styled(Button)({
    display: 'block',
    margin: '1rem 0',
    padding: '0.35rem 0.5rem',
    backgroundColor: 'rgb(42, 90, 50)',
    color: 'rgb(255, 255, 255)',
    border: 'none',
    borderRadius: '10px',
    width: 'fit-content',
    fontSize: '1rem',
    fontWeight: 'bold',
    cursor: 'pointer',
    '&:disabled': {
      opacity: 0.35,
    },
  });

function Profile() {
    const { id } = useParams();
    const { trainer } = useAuth();
    const [user, setUser] = useState(null);
    const [reviews, setReviews] = useState([]);
    const [sightings, setSightings] = useState([]);
    const [showForm, setShowForm] = useState(false);
    const [isModalOpen, setIsModalOpen] = useState(false);

    function handleClick() {
        setShowForm(showForm => !showForm)
      }

    function onUpdateProfile(updatedProfile){
    return setUser(updatedProfile)
    }

    useEffect(() => {
        fetch(`/trainers/${id}`)
        .then(res => res.json())
        .then(data => {
            setUser(data);
            document.title = `${data.name}`;
        })
        .catch(error => console.error(error));
        fetch('/sightings')
        .then(res => res.json())
        .then(data => setSightings(data.filter(sighting => sighting.trainer_id === parseInt(id))))
        .catch(error => console.error(error))
        fetch('/reviews')
        .then(res => res.json())
        .then(data => setReviews(data.filter(review => review.trainer_id === parseInt(id))))
        .catch(error => console.error(error));
    }, [id])

    if(!user) {
        return <h1>Loading...</h1>
    }

    const { name, image, biome } = user

    const reviewsList = reviews.map(review => (
        <p key={review.id} className="profile-list-item">
            <div className="profile-content">
                <span>{`${name}`}'s review of {`${review.habitat.name}`}: </span>
                <Link to={`/reviews/${review.id}`}>View</Link> 
                {trainer.id === parseInt(id) && (
                    <>
                        <button>Edit</button>
                        <button>Delete</button>
                    </>
                )}
            </div>
        </p>
    ))

    const sightingList = sightings.map(sighting => (
        <ProfileCard 
        key={sighting.id}
        sighting={sighting}
        />
      ))

    return (
        <>
        <main>
            <hr/>
            <h1>{name}</h1>
            <hr />
            <div className="profile-container">
                <div className="profile-info">
                    <img src={image} alt={`${name}'s profile`} className="profile-pic" />
                    <span>Favorite Biome: {biome.name}</span>
                    {trainer.id === parseInt(user.id) && (
                    <div className="profile-sighting">
                    <CustomButton variant="contained" color="primary" onClick={() => setIsModalOpen(true)}>
                        Edit Profile
                    </CustomButton>
                </div>)}
                </div>
                <div className="profile-contributions">
                    {reviews.length > 0 && (<>
                    <h3>Reviews from {name}</h3>
                    {reviewsList}
                    <br/>
                    </>)}
                    {sightings.length > 0 && (<>
                    <hr/>
                    <h3>Rare sightings from {name}</h3>
                    <div className="cards-container">
                    {sightingList}
                    </div>
                    </>)}
                </div>
            </div>
        </main>
        <Modal
                open={isModalOpen}
                onClose={() => setIsModalOpen(false)}
                aria-labelledby="edit-profile-modal-title"
                aria-describedby="edit-profile-modal-description"
            >
                <Box sx={{
                    position: 'absolute',
                    top: '50%',
                    left: '50%',
                    transform: 'translate(-50%, -50%)',
                    width: '80%',
                    maxWidth: 600,
                    bgcolor: 'background.paper',
                    border: '2px solid #000',
                    boxShadow: 24,
                    p: 4,
                    borderRadius: '10px',
                }}>
                    <CustomButton className="button" onClick={() => setIsModalOpen(false)} sx={{ mb: 2 }}>Close</CustomButton>
                    <EditProfile
                        handleClick={() => setIsModalOpen(false)}
                        onUpdateProfile={onUpdateProfile}
                    />
                </Box>
            </Modal>
    </>
    )
}

export default Profile;