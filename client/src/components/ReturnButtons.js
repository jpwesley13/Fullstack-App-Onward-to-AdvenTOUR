import React from "react";
import { Link } from "react-router-dom";

function ReturnButtons( { trainer_id, habitat_id }) {
    return (
        <>
        <hr />
        <div className="filter-sort-button">
        <Link to={`/trainers/${trainer_id}`}>
        <button style={{ marginRight: '1rem' }}>To Trainer's page</button>
        </Link>
        <Link to={`/habitats/${habitat_id}`}>
        <button>To Habitat's page</button>
        </Link>
        </div>
        </>
    )
};
export default ReturnButtons;