import { useOutletContext } from "react-router-dom";
import { useEffect } from "react";

function Home() {

    const {habitats} = useOutletContext();

    // const displayedMonsters = monsters.map(monster => (
    //   <MonsterCard 
    //   key={monster.id}
    //   monster={monster}
    //   />
    // ))

    useEffect(() => {
      document.title = "Onward to AdvenTOUR"
    }, [])

    return (
        <>
          {/* <Header />
          <MonsterForm /> */}
          <hr/>
          <h2 className="header">Habitats:</h2>
          {/* {displayedMonsters} */}
        </>
    )
};

export default Home;