import { useOutletContext } from "react-router-dom";
import HabitatCard from "./HabitatCard";
import { useEffect } from "react";

function Home() {

    const {habitats} = useOutletContext();

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