import { useOutletContext, Link } from "react-router-dom";
import { useState, useEffect } from "react";
import FilterCard from "../components/FilterCard";

function Trainer() {

    // const {trainers} = useOutletContext();
    const [trainers, setTrainers] = useState([]);
    const [filteredTrainers, setFilteredTrainers] = useState([])

    useEffect(() => {
        document.title = "Contributors";
        fetch('/trainers')
        .then(res => res.json())
        .then(data => {
            setTrainers(data);
            setFilteredTrainers(data)
        })
        .catch(error => console.error(error));
    }, []);

    // useEffect(() => {
    //     document.title = "Contributors"
    // }, [])

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
          broadGroups={trainers}
          setFilteredGroups={setFilteredTrainers}
          label="trainers"
          filterBy="favorite biome"/>
        {trainerList}
        </>
    );
};

export default Trainer;