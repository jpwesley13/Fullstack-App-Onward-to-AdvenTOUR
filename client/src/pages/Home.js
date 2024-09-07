import { useOutletContext } from "react-router-dom";
import HabitatCard from "../components/HabitatCard";
import { useState, useEffect } from "react";

function Home() {

    const {reviews} = useOutletContext();
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

    function dangerAverage(id) {
      let filteredReviews = reviews.filter(review => review.habitat_id === id)
      let dangerArray = filteredReviews.map(review => review.danger)
      let sum = dangerArray.reduce((acc, curr) => acc + curr, 0);
      let average = sum / dangerArray.length;
      return average
  }

    const displayedHabitats = habitats.map(habitat => (
      <HabitatCard 
      key={habitat.id}
      habitat={habitat}
      dangerAverage={dangerAverage}
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