import { useOutletContext, Link } from "react-router-dom";
import { useState, useEffect } from "react";

function Trainer() {

    const [trainers, setTrainers] = useState([]);

    useEffect(() => {
        fetch('/trainers')
        .then(res => res.json())
        .then(data => {
            setTrainers(data);
        })
        .catch(error => console.error(error));
    }, []);

    useEffect(() => {
        document.title = "Contributors"
    }, [])

    const trainerList = trainers.map(trainer => (
        <li>{trainer.name}: <Link to={`/trainers/${trainer.id}`}>Visit Profile</Link></li>
    ))

    return (
        <>
        <h2>Contributors</h2>
        <br/>
        {trainerList}
        </>
    );
};

export default Trainer;