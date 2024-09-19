import { Link } from "react-router-dom";
import { useState, useEffect } from "react";
import FilterCard from "../components/FilterCard";
import SortCard from "../components/SortCard";
import Search from "../components/Search";

function Trainer() {

    const [trainers, setTrainers] = useState([]);
    const [filterBy, setFilterBy] = useState("");
    const [sortBy, setSortBy] = useState("Alphabetical Order")
    const [search, setSearch] = useState("");

    useEffect(() => {
        document.title = "Contributors";
        fetch('/trainers')
        .then(res => res.json())
        .then(data => setTrainers(data))
        .catch(error => console.error(error));
    }, []);

    const contributors = trainers.filter(trainer => 
        trainer.reviews.length > 0 || trainer.sightings.length > 0
    );

    const searchedTrainers = contributors.filter(trainer => trainer.name.toLowerCase().includes(search.toLowerCase()))

    const sortedTrainers = searchedTrainers.sort((trainer1, trainer2) => {
        if(sortBy === "Alphabetical Order") {
            return trainer1.name.localeCompare(trainer2.name);
        } else if(sortBy === "Most Reviews") {
            return trainer2.reviews.length - trainer1.reviews.length;
        } else {
            return trainer2.sightings.length - trainer1.sightings.length;
        }
    })

    const options = ["Alphabetical Order", "Most Reviews", "Most Rare Sightings"]

    const filteredTrainers = sortedTrainers.filter(trainer => trainer.biome.name.includes(filterBy))

    const trainerList = filteredTrainers.map(trainer => (
        <div>{trainer.name}: <Link to={`/trainers/${trainer.id}`}>Visit Profile</Link>
        </div>
    ))

    const biomes = [...new Set(contributors
        .map(trainer => trainer.biome.name)
    )];

    return (
        <>
        <hr/>
        <h2 className="header">Contributors:</h2>
        <div className="header">
            <span>Our contributors. Go out on an Adven-tour and join 'em!</span>
        </div>
        <br />
        <div className="search-container">
          <Search 
            search={search}
            searchSetter={setSearch}
          />
        </div>
        <div className="filter-sort-container">
          <div className="filter-sort-row">
        <FilterCard
            specifics={biomes}
            label="trainers"
            filterAttr="favorite biome"
            filterCriteria={filterBy}
            onChangeFilter={setFilterBy}
        />
        <SortCard 
            sortBy={sortBy}
            onChangeSort={setSortBy}
            options={options}/>
        </div>
        </div>
        <br />
        {trainerList}
        </>
    );
};

export default Trainer;