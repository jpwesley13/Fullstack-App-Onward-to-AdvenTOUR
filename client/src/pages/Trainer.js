import { Link } from "react-router-dom";
import { useState, useEffect } from "react";
import FilterCard from "../components/FilterCard";
import SortCard from "../components/SortCard";
import Search from "../components/Search";

function Trainer() {

    const [trainers, setTrainers] = useState([]);
    const [filterBy, setFilterBy] = useState("");
    const [sortBy, setSortBy] = useState("Alphabetically")
    const [search, setSearch] = useState("");

    useEffect(() => {
        document.title = "Contributors";
        fetch('/trainers')
        .then(res => res.json())
        .then(data => setTrainers(data))
        .catch(error => console.error(error));
    }, []);

    const searchedTrainers = [...trainers].filter(trainer => trainer.name.toLowerCase().includes(search.toLowerCase()))

    const sortedTrainers = searchedTrainers.sort((trainer1, trainer2) => {
        if(sortBy === "Alphabetically") {
            return trainer1.name.localeCompare(trainer2.name);
        } else if(sortBy === "Number of Reviews") {
            return trainer1.reviews.length - trainer2.reviews.length;
        } else {
            return trainer1.sightings.length - trainer2.sightings.length;
        }
    })

    const options = ["Alphabetically", "Number of Reviews", "Number of Rare Sightings"]

    const filteredTrainers = sortedTrainers.filter(trainer => trainer.biome && trainer.biome.name.includes(filterBy))

    const trainerList = filteredTrainers.map(trainer => (
        <div>{trainer.name}: <Link to={`/trainers/${trainer.id}`}>Visit Profile</Link>
        </div>
    ))

    const biomes = [...new Set(trainers
        .filter(trainer => trainer.biome && trainer.biome.name)
        .map(trainer => trainer.biome.name)
    )];

    return (
        <>
        <hr/>
        <h2>Contributors:</h2>
        <br />
        <Search 
            search = {search}
            searchSetter={setSearch}
        />
        <br />
        <FilterCard
            specifics={biomes}
            label="trainers"
            filterAttr="favorite biome"
            filterCriteria={filterBy}
            onChangeFilter={setFilterBy}
        />
        <br />
        <SortCard 
            sortBy={sortBy}
            onChangeSort={setSortBy}
            options={options}/>
        <br />
        {trainerList}
        </>
    );
};

export default Trainer;