import React from "react";
import { Link } from "react-router-dom";

function ReturnButtons( { trainerId, habitatId }) {
    return (
        <>
        <hr />
        <div className="filter-sort-button">
        <Link to={`/trainers/${trainerId}`}>
        <button style={{ marginRight: '1rem' }}>To Trainer's page</button>
        </Link>
        <Link to={`/habitats/${habitatId}`}>
        <button>To Habitat's page</button>
        </Link>
        </div>
        </>
    )
};
export default ReturnButtons;