import React from "react";

function NewEntry({ newItem, items, setItems}) {
    return setItems([...items, newItem])
};
export default NewEntry