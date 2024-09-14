import { useParams, Link } from "react-router-dom";
import { useEffect, useState } from "react";
import ProfileCard from "../components/ProfileCard";
import { useAuth } from "../context and hooks/AuthContext";

function User() {
    const { id } = useParams();
    const { trainer } = useAuth();
    const [user, setUser] = useState(null);
    const [reviews, setReviews] = useState([]);
    const [sightings, setSightings] = useState([]);

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
            <div className="profilecontainer">
                <div className="profileinfo">
                    <img src={image} alt={`${name}'s profile`} className="profilepicture" />
                    <p>Favorite Biome: {biome.name}</p>
                </div>
                <div className="profilecontributions">
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
        </main></>
    )
}

export default User;