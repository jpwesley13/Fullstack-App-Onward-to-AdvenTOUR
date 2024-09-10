import { useParams, useOutletContext, Link } from "react-router-dom";
import { useEffect, useState } from "react";
import SightingCard from "../components/SightingCard";

function User() {
    const { id } = useParams();
    // const {trainers, reviews, sightings} = useOutletContext();

    // const [trainer, setTrainer] = useState({
    //     name: "",
    //     age: "",
    //     biome: "",
    //     biome_id: "",
    //     reviews: "",
    //     sightings: ""
    // })

    const [trainer, setTrainer] = useState(null);
    const [reviews, setReviews] = useState([]);
    const [sightings, setSightings] = useState([]);

    // useEffect(() => {
    //     const trn = trainers.find(trainer => trainer.id === parseInt(id));
    //     if(trn) {
    //         setTrainer(trn)
    //         document.title = `${trn.name}`
    //     }
    // }, [trainers])

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

    // const {name, image, id} = trainer

    // const filteredReviews = reviews.filter(review => review.trainer_id === id)
    // const filteredSightings = sightings.filter(sighting => sighting.trainer.id === id)

    // const reviewsList = filteredReviews.map(review => (
    //     <li>{`${name}`}'s review of {`${review.habitat.name}`}: <Link to={`/reviews/${review.id}`}>View</Link></li>
    // ))

    // const sightingList = filteredSightings.map(sighting => (
    //     <SightingCard 
    //     key={sighting.id}
    //     sighting={sighting}
    //     />
    //   ))

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