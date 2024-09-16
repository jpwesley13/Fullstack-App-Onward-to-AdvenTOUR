import React from "react";
import { Link } from "react-router-dom";

function ReturnButtons( { trainer, habitat }) {
    return (
        <>
        <hr />
        <div className="filter-sort-button">
        <Link to={`/trainers/${trainer}`}>
        <button style={{ marginRight: '1rem' }}>To Trainer's page</button>
        </Link>
        <Link to={`/habitats/${habitat}`}>
        <button>To Habitat's page</button>
        </Link>
        </div>
        </>
    )
};
export default ReturnButtons;