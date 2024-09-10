import React from "react";
import { Link } from "react-router-dom";

function ReturnButtons( { trainer, habitat }) {
    return (
        <>
        <hr />
        <Link to={`/trainers/${trainer}`}>
        <button>To Trainer's page</button>
        </Link>
        <Link to={`/habitats/${habitat}`}>
        <button>To Habitat's page</button>
        </Link>
        </>
    )
};
export default ReturnButtons;