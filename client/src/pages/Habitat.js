import { useParams, useOutletContext } from "react-router-dom";
import { useEffect, useState } from "react";

function Habitat() {
    const params = useParams();
    const {habitats} = useOutletContext();

    const [habitat, setHabitat] = useState({
        name: "",
        region: "",
        region_id: "",
        reviews: "",
        sightings: ""
    })

    useEffect(() => {
        const hab = habitats.find(habitat => habitat.id === parseInt(params.id));
        if(hab) {
            setHabitat(hab)
            document.title = `${hab.name}`
        }
    }, [habitats])

    if(!habitat) {
        return <h1>Loading...</h1>
    };

    return (
        <>
        <main>
            <h1>{habitat.name}</h1>
            </main></>
    )
}

export default Habitat;