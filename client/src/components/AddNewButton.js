import React from "react";

function AddNewButton({ newAddition, handleClick, showForm }) {
    return(
        <button className="navbutton" onClick={handleClick}>{showForm ? "Close form" : `Add new ${newAddition}`}</button>
    )
};
export default AddNewButton;