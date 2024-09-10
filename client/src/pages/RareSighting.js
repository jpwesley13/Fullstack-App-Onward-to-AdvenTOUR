import { useParams, useOutletContext, Link } from "react-router-dom";
import { useEffect, useState } from "react";
import ReturnButtons from "../components/ReturnButtons";

function RareSighting() {
    const { id } = useParams();
    const [sighting, setSighting] = useState(null)
    // const {sightings} = useOutletContext();

    // const [sighting, setSightings] = useState({
    //     name: "",
    //     blurb: "",
    //     habitat: "",
    //     habitat_id: "",
    //     trainer: "",
    //     trainer_id: ""
    // })

    // useEffect(() => {
    //     const rare = sightings.find(sighting => sighting.id === parseInt(params.id));
    //     if(rare) {
    //         setSightings(rare)
    //         document.title = `${sighting.name}`
    //     }
    // }, [sightings])

    useEffect(() => {
        fetch(`/sightings/${id}`)
        .then(res => res.json())
        .then(data => {
            setSighting(data)
            document.title = `${data.name}`
        })
        .catch(error => console.error(error));
    }, [id]);

    // const trainer = sighting.trainer
    // const habitat = sighting.habitat

    if(!sighting) {
        return <h1>Loading...</h1>
    };

    const { trainer, habitat, image, name} = sighting;

    return (
        <>
        <hr/>
        <ReturnButtons 
        trainer={trainer.id}
        habitat={habitat.id}/>
        <h2>{trainer.name}'s rare {sighting.name} sighting at {habitat.name}:</h2>
        <span>{sighting.blurb}</span>
        <br/>
        <div className="card">
            <img 
              src={image}
              alt={name}
              className="habitat-card"  
            />
        </div>
        </>
    )
}

export default RareSighting;