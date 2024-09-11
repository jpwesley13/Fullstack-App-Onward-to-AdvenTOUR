import { useOutletContext } from "react-router-dom";
import HabitatCard from "../components/HabitatCard";
import { useState, useEffect } from "react";
import FilterCard from "../components/FilterCard";
import SortCard from "../components/SortCard";
import Search from "../components/Search";

function Home() {

    const [habitats, setHabitats] = useState([]);
    const [filterBy, setFilterBy] = useState("");
    const [sortBy, setSortBy] = useState("Alphabetically")
    const [reviews, setReviews] = useState([]);
    const [search, setSearch] = useState("");

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

    function dangerAverage(id) {
      const filteredReviews = reviews.filter(review => review.habitat_id === id)
      const dangerArray = filteredReviews.map(review => review.danger)
      const sum = dangerArray.reduce((acc, curr) => acc + curr, 0);
      const average = sum / dangerArray.length;
      return average
    };

    const searchedHabitats = [...habitats].filter(habitat => habitat.name.toLowerCase().includes(search.toLowerCase()))

    const sortedHabitats = searchedHabitats.sort((habitat1, habitat2) => {
      if(sortBy === "Alphabetically") {
          return habitat1.name.localeCompare(habitat2.name);
      } else if(sortBy === "Number of Reviews") {
          return habitat1.reviews.length - habitat2.reviews.length;
      } else {
          return dangerAverage(habitat1.id) - dangerAverage(habitat2.id);
      }
    })

    const options = ["Alphabetically", "Number of Reviews", "Danger Level"]

    const filteredHabitats = sortedHabitats.filter(habitat => habitat.region.name.includes(filterBy))

    const displayedHabitats = filteredHabitats.map(habitat => (
      <HabitatCard 
      key={habitat.id}
      habitat={habitat}
      dangerAverage={dangerAverage}
      />
    ))
    
    const regions = [...new Set(habitats.map(habitat => habitat.region.name))]

    return (
        <>
          <hr/>
          <h2 className="header">Habitats:</h2>
          <br />
          <Search 
          search = {search}
          searchSetter={setSearch}/>
          <br />
          <FilterCard
          specifics={regions}
          label="habitats"
          filterAttr="region"
          onChangeFilter={setFilterBy}
          filterCriteria={filterBy}/>
          <br />
          <SortCard 
            sortBy={sortBy}
            onChangeSort={setSortBy}
            options={options}/>
          {displayedHabitats}
        </>
    )
};

export default Home;