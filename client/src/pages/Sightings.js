import { useEffect, useState } from "react";
import SightingCard from "../components/SightingCard";
import FilterCard from "../components/FilterCard";

function Sightings() {

    const [sightings, setSightings] = useState([]);
    const [filterBy, setFilterBy] = useState("");

    useEffect(() => {
        document.title = "Rare Sightings"
        fetch('/sightings')
        .then(res => res.json())
        .then(data => setSightings(data))
        .catch(error => console.error(error));
      }, []);

    const filteredSightings = sightings.filter(sighting => sighting.habitat.name.includes(filterBy))

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
        onChangeFilter={setFilterBy}
        label="rare sightings"
        filterAttr="habitat" 
        filterCriteria={filterBy}/>
        <br/>
        {displayedSightings}
        </>
    );
};

export default Sightings