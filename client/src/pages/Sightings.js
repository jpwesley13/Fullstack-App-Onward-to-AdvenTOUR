import { useOutletContext } from "react-router-dom";
import { useEffect, useState } from "react";
import SightingCard from "../components/SightingCard";

function Sightings() {

    const [sightings, setSightings] = useState([]);

    useEffect(() => {
        document.title = "Rare Sightings"
        fetch('/sightings')
        .then(res => res.json())
        .then(data => setSightings(data))
        .catch(error => console.error(error));
      }, []);

    // const {sightings} = useOutletContext();

    const displayedSightings = sightings.map(sighting => (
        <SightingCard 
        key={sighting.id}
        sighting={sighting}
        />
      ))

    return (
        <>
        <hr/>
        <h2>Confirmed rare sightings:</h2>
        <br/>
        {displayedSightings}
        </>
    );
};

export default Sightings