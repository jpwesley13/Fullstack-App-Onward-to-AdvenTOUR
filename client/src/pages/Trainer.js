import { useOutletContext, Link } from "react-router-dom";
import { useState, useEffect } from "react";
import User from "./User";

function Trainer() {

    const {trainers} = useOutletContext();

    useEffect(() => {
        document.title = "Contributors"
    }, [])

    const trainerList = trainers.map(trainer => (
        <li>{trainer.name}: <Link to={`/trainers/${trainer.id}`}>Visit Profile</Link>
        </li>
    ))

    return (
        <>
        <hr/>
        <h2>Contributors:</h2>
        {trainerList}
        </>
    );
};

export default Trainer;