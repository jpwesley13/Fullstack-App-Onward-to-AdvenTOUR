import { useParams, Link } from "react-router-dom";
import { useEffect, useState } from "react";
import SightingCard from "../components/SightingCard";

function User() {
    const { id } = useParams();

    const [trainer, setTrainer] = useState(null);
    const [reviews, setReviews] = useState([]);
    const [sightings, setSightings] = useState([]);

    useEffect(() => {
        fetch(`/trainers/${id}`)
        .then(res => res.json())
        .then(data => {
            setTrainer(data);
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

    if(!trainer) {
        return <h1>Loading...</h1>
    }

    const { name, image, biome } = trainer

    const reviewsList = reviews.map(review => (
        <li key={review.id}>{`${name}`}'s review of {`${review.habitat.name}`}: <Link to={`/reviews/${review.id}`}>View</Link></li>
    ))

    const sightingList = sightings.map(sighting => (
        <SightingCard 
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
                    <h3>Reviews from {name}</h3>
                    {reviewsList}
                    <br/>
                    <hr/>
                    <h3>Rare sightings from {name}</h3>
                    {sightingList}
                </div>
            </div>
        </main></>
    )
}

export default User;