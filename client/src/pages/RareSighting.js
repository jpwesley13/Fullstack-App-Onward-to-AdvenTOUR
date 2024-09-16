import { useParams, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import ReturnButtons from "../components/ReturnButtons";

function RareSighting() {
    const navigate = useNavigate();
    const { id } = useParams();
    const [sighting, setSighting] = useState('loading');

    useEffect(() => {
        fetch(`/sightings/${id}`)
        .then(res => res.json())
        .then(data => {
            if(data && data.name) {
                setSighting(data)
                document.title = `${data.name}`
            } else {
                setSighting(null)
            }
        })
        .catch(error => console.error(error));
    }, [id]);

    if(sighting === 'loading') {
        return <h1>Loading...</h1>
    };
    if(!sighting) {
        navigate('/error');
        return null;
    }

    const { trainer, habitat, image, name} = sighting;

    return (
        <>
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