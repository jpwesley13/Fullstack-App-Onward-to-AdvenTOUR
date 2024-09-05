import { useOutletContext } from "react-router-dom";
import HabitatCard from "../components/HabitatCard";
import { useState, useEffect } from "react";

function Home() {

    // const {habitats} = useOutletContext();
    const [habitats, setHabitats] = useState([]);

    useEffect(() => {
      fetch('/habitats')
      .then(res => {
        if (res.ok) {
          res.json()
          .then(data => setHabitats(data));
        }
      })
      .catch(error => console.error(error));
    }, []);

    const displayedHabitats = habitats.map(habitat => (
      <HabitatCard 
      key={habitat.id}
      habitat={habitat}
      />
    ))

    useEffect(() => {
      document.title = "Onward to AdvenTOUR"
    }, [])

    return (
        <>
          {/* <Header />
          <MonsterForm /> */}
          <hr/>
          <h2 className="header">Habitats:</h2>
          {displayedHabitats}
        </>
    )
};

export default Home;