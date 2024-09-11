import { Link } from "react-router-dom";
import { useState, useEffect } from "react";
import FilterCard from "../components/FilterCard";

function Trainer() {

    const [trainers, setTrainers] = useState([]);
    const [filterBy, setFilterBy] = useState("");

    useEffect(() => {
        document.title = "Contributors";
        fetch('/trainers')
        .then(res => res.json())
        .then(data => setTrainers(data))
        .catch(error => console.error(error));
    }, []);

    const filteredTrainers = trainers.filter(trainer => trainer.biome && trainer.biome.name.includes(filterBy))

    const trainerList = filteredTrainers.map(trainer => (
        <li>{trainer.name}: <Link to={`/trainers/${trainer.id}`}>Visit Profile</Link>
        </li>
    ))

    const biomes = [...new Set(trainers
        .filter(trainer => trainer.biome && trainer.biome.name)
        .map(trainer => trainer.biome.name)
    )];

    return (
        <>
        <hr/>
        <h2>Contributors:</h2>
        <FilterCard
          specifics={biomes}
          label="trainers"
          filterAttr="favorite biome"
          filterCriteria={filterBy}
          onChangeFilter={setFilterBy}/>
        {trainerList}
        </>
    );
};

export default Trainer;