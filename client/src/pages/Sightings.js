import { useOutletContext } from "react-router-dom";
import { useEffect, useState } from "react";
import SightingCard from "../components/SightingCard";
import FilterCard from "../components/FilterCard";

function Sightings() {

    const [sightings, setSightings] = useState([]);
    const [filteredSightings, setFIlteresSightings] = useState([]);

    useEffect(() => {
        document.title = "Rare Sightings"
        fetch('/sightings')
        .then(res => res.json())
        .then(data => {
            setSightings(data)
            setFIlteresSightings(data);
        })
        .catch(error => console.error(error));
      }, []);

    // const {sightings} = useOutletContext();

    const displayedSightings = filteredSightings.map(sighting => (
        <SightingCard 
        key={sighting.id}
        sighting={sighting}
        />
      ))

    const habitats = [...new Set(sightings.map(sighting => sighting.habitat.name))]

    return (
        <>
        <hr/>
        <h2>Confirmed rare sightings:</h2>
        <FilterCard
        specifics={habitats}
        broadGroups={sightings}
        setFilteredGroups={setFIlteresSightings}
        label="rare sightings"
        filterBy="habitat" />
        <br/>
        {displayedSightings}
        </>
    );
};

export default Sightings