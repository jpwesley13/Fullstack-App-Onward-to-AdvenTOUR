import HabitatCard from "../components/HabitatCard";
import { useState, useEffect } from "react";
import FilterCard from "../components/FilterCard";
import SortCard from "../components/SortCard";
import Search from "../components/Search";
import AddNewButton from "../components/AddNewButton";
import useDangerAverage from "../components/DangerHook";
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

    const dangerAverages = useDangerAverage(reviews);

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
      } else {
        return dangerAverages[habitat1.id] - dangerAverages[habitat2.id];
      }
    })

    const options = ["Alphabetically", "Number of Reviews", "Danger Level"]

    const filteredHabitats = sortedHabitats.filter(habitat => habitat.region.name.includes(filterBy))

    const displayedHabitats = filteredHabitats.map(habitat => (
      <HabitatCard 
      key={habitat.id}
      habitat={habitat}
      dangerAverage={dangerAverages[habitat.id]}
      />
    ))
    
    const regions = [...new Set(habitats.map(habitat => habitat.region))]
    const regionNames = [...new Set(regions.map(region => region.name))]

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
          regions={regions}
          /> : null}
          <AddNewButton
          newAddition="habitat"
          handleClick={handleClick}
          showForm={showForm}
          />
          <br />
          <FilterCard
          specifics={regionNames}
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