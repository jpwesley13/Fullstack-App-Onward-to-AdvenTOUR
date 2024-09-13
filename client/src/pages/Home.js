import HabitatCard from "../components/HabitatCard";
import { useState, useEffect } from "react";
import FilterCard from "../components/FilterCard";
import SortCard from "../components/SortCard";
import Search from "../components/Search";
import AddNewButton from "../components/AddNewButton";
import useAverage from "../context and hooks/AverageHook";
import HabitatForm from "../components/HabitatForm";

function Home() {

    const [habitats, setHabitats] = useState([]);
    const [filterBy, setFilterBy] = useState("");
    const [sortBy, setSortBy] = useState("Alphabetically")
    const [reviews, setReviews] = useState([]);
    const [search, setSearch] = useState("");
    const [showForm, setShowForm] = useState(false);

    function handleClick() {
      setShowForm(showForm => !showForm)
    }

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

    const dangerAverages = useAverage(reviews, 'danger');
    const ratingAverages = useAverage(reviews, 'rating');

    function onAddHabitats(newHabitat){
      return setHabitats([...habitats, newHabitat])
    }

    const seededHabitats = [...habitats].filter(habitat => 
      habitat.reviews.length > 0
    );

    const searchedHabitats = seededHabitats.filter(habitat => habitat.name.toLowerCase().includes(search.toLowerCase()))

    const sortedHabitats = searchedHabitats.sort((habitat1, habitat2) => {
      if(sortBy === "Alphabetically") {
          return habitat1.name.localeCompare(habitat2.name);
      } else if(sortBy === "Number of Reviews") {
          return habitat1.reviews.length - habitat2.reviews.length;
      } else if(sortBy === "Danger Level") {
        return dangerAverages[habitat1.id] - dangerAverages[habitat2.id];
      } else {
        return ratingAverages[habitat2.id] - ratingAverages[habitat1.id];
      }
    })

    const options = ["Alphabetically", "Number of Reviews", "Danger Level", "Rating"]

    const filteredHabitats = sortedHabitats.filter(habitat => habitat.region.name.includes(filterBy))

    const displayedHabitats = filteredHabitats.map(habitat => (
      <HabitatCard 
      key={habitat.id}
      habitat={habitat}
      dangerAverage={dangerAverages[habitat.id]}
      ratingAverage={ratingAverages[habitat.id]}
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
          {showForm ? <HabitatForm
          onAddHabitats={onAddHabitats}
          handleClick={handleClick}
          /> : null}
          <AddNewButton
          newAddition="habitat"
          handleClick={handleClick}
          showForm={showForm}
          />
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