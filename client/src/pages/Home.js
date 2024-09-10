import { useOutletContext } from "react-router-dom";
import HabitatCard from "../components/HabitatCard";
import { useState, useEffect } from "react";

function Home() {

    const [habitats, setHabitats] = useState([]);
    const [reviews, setReviews] = useState([]);

    useEffect(() => {
      document.title = "Onward to AdvenTOUR"
      fetch('/habitats')
      .then(res => res.json())
      .then(data => setHabitats(data))
      .catch(error => console.error(error));
      fetch('/reviews')
      .then(res => res.json())
      .then(data => setReviews(data))
      .catch(error => console.error(error));
  }, []);

    // const {reviews, habitats} = useOutletContext();

    function dangerAverage(id) {
      const filteredReviews = reviews.filter(review => review.habitat_id === id)
      const dangerArray = filteredReviews.map(review => review.danger)
      const sum = dangerArray.reduce((acc, curr) => acc + curr, 0);
      const average = sum / dangerArray.length;
      return average
  }

    const displayedHabitats = habitats.map(habitat => (
      <HabitatCard 
      key={habitat.id}
      habitat={habitat}
      dangerAverage={dangerAverage}
      />
    ))

    return (
        <>
          <hr/>
          <h2 className="header">Habitats:</h2>
          {displayedHabitats}
        </>
    )
};

export default Home;