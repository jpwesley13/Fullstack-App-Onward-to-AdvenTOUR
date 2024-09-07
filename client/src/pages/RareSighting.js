import { useParams, useOutletContext, Link } from "react-router-dom";
import { useEffect, useState } from "react";

function RareSighting() {
    const params = useParams();
    const {sightings} = useOutletContext();

    const [sighting, setSightings] = useState({
        name: "",
        blurb: "",
        habitat: "",
        habitat_id: "",
        trainer: "",
        trainer_id: ""
    })

    useEffect(() => {
        const rare = sightings.find(sighting => sighting.id === parseInt(params.id));
        if(rare) {
            setSightings(rare)
            document.title = `${sighting.name}`
        }
    }, [sightings])

    const trainer = sighting.trainer
    const habitat = sighting.habitat

    if(!sighting) {
        return <h1>Loading...</h1>
    };

    return (
        <>
        <hr />
        <Link to={`/trainers/${trainer.id}`}>
        <button>To Trainer's page</button>
        </Link>
        <Link to={`/habitats/${habitat.id}`}>
        <button>To Habitat's page</button>
        </Link>
        <h2>{trainer.name}'s rare sighting of a {sighting.name} at {habitat.name}:</h2>
        <span>{sighting.blurb}</span>
        </>
    )
}

export default RareSighting;