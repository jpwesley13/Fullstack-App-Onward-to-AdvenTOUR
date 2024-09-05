import { useOutletContext } from "react-router-dom";
import { useEffect } from "react";
import SightingCard from "../components/SightingCard";

function Sightings() {
    useEffect(() => {
        document.title = "Rare Sightings"
    }, [])

    const {sightings} = useOutletContext();

    const displayedSightings = sightings.map(sighting => (
        <SightingCard 
        key={sighting.id}
        sighting={sighting}
        />
      ))

    return (
        <>
        <h2>Confirmed rare sightings:</h2>
        <br/>
        {displayedSightings}
        </>
    );
};

export default Sightings