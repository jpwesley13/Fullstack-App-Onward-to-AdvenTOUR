import { useOutletContext } from "react-router-dom";
import { useEffect } from "react";

function Sightings() {
    useEffect(() => {
        document.title = "Rare Sightings"
    }, [])

    const {sightings} = useOutletContext();

    return (
        <>
        <h2>Confirmed rare sightings:</h2>
        <br/>
        </>
    );
};

export default Sightings