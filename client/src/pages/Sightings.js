import { useEffect, useState } from "react";
import SightingCard from "../components/SightingCard";
import FilterCard from "../components/FilterCard";
import Search from "../components/Search";
import AddNewButton from "../components/AddNewButton";
import SightingForm from "../components/SightingForm";

function Sightings() {

    const [sightings, setSightings] = useState([]);
    const [filterBy, setFilterBy] = useState("");
    const [search, setSearch] = useState("");
    const [showForm, setShowForm] = useState(false);

    function handleClick() {
      setShowForm(showForm => !showForm)
    }

    useEffect(() => {
        document.title = "Rare Sightings"
        fetch('/sightings')
        .then(res => res.json())
        .then(data => setSightings(data))
        .catch(error => console.error(error));
    }, []);

    function onAddSighting(newSighting){
      return setSightings([...habitats, newSighting])
    }

    const searchedSightings = [...sightings].filter(sighting => sighting.name.toLowerCase().includes(search.toLowerCase()))

    const filteredSightings = searchedSightings.filter(sighting => sighting.habitat.name.includes(filterBy))

    const displayedSightings = filteredSightings.map(sighting => (
        <SightingCard 
        key={sighting.id}
        sighting={sighting}
        />
      ))

    const habitats = [...new Set(sightings.map(sighting => sighting.habitat))]
    const habitatNames = habitats.map(habitat => habitat.name)

    return (
        <>
        <hr/>
        <h2>Confirmed rare sightings:</h2>
        <br />
          <Search 
          search = {search}
          searchSetter={setSearch}/>
        <br />
        {showForm ? <SightingForm
          onAddSighting={onAddSighting}
          handleClick={handleClick}
          habitats={habitats}
          /> : null}
        <AddNewButton
        newAddition="rare sighting"
        handleClick={handleClick}
        showForm={showForm}
        />
        <br />
        <FilterCard
        specifics={habitatNames}
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