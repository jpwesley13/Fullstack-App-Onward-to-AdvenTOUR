import { useEffect, useState } from "react";
import SightingCard from "../components/SightingCard";
import FilterCard from "../components/FilterCard";
import Search from "../components/Search";
import SightingForm from "../components/SightingForm";
import ModalButton from "../components/ModalButton";
import { Modal, Box } from "@mui/material";
import { useAuth } from "../context and hooks/AuthContext";

function Sightings() {

    const [sightings, setSightings] = useState([]);
    const [filterBy, setFilterBy] = useState("");
    const [search, setSearch] = useState("");
    const [isModalOpen, setIsModalOpen] = useState(false);
    const {trainer} = useAuth();

    useEffect(() => {
        document.title = "Rare Sightings"
        fetch('/sightings')
        .then(res => res.json())
        .then(data => setSightings(data))
        .catch(error => console.error(error));
    }, []);

    function onAddSighting(newSighting){
      return setSightings([...sightings, newSighting])
    }

    const searchedSightings = [...sightings].filter(sighting => sighting.name.toLowerCase().includes(search.toLowerCase()))

    const filteredSightings = searchedSightings.filter(sighting => sighting.habitat.name.includes(filterBy))

    const displayedSightings = filteredSightings.map(sighting => (
        <SightingCard 
        key={sighting.id}
        sighting={sighting}
        />
      ))

    const habitats = [...new Set(sightings.map(sighting => sighting.habitat))]
    const habitatNames = [...new Set(habitats.map(habitat => habitat.name))]

    return (
        <>
        <hr/>
        <h2 className="header">Confirmed rare sightings:</h2>
        <br />
        <div className="search-container">
          <Search 
          search = {search}
          searchSetter={setSearch}/>
        </div>
        <div className="filter-sort-container">
          <div className="filter-sort-row">
        <FilterCard
        specifics={habitatNames}
        onChangeFilter={setFilterBy}
        label="rare sightings"
        filterAttr="habitat" 
        filterCriteria={filterBy}/>
        </div>
        {trainer && (<div className="filter-sort-button">
        <ModalButton variant="contained" color="primary" onClick={() => setIsModalOpen(true)}>
                        Add new rare sighting
                    </ModalButton>
            </div>
        )}
        </div>
        {displayedSightings}
        <Modal
                open={isModalOpen}
                onClose={() => setIsModalOpen(false)}
                aria-labelledby="edit-profile-modal-title"
                aria-describedby="edit-profile-modal-description"
            >
                <Box className="modal-box">
                    <h2>Add new rare sighting</h2>
                    <ModalButton className="close-button" onClick={() => setIsModalOpen(false)} sx={{ mb: 2 }}>Close</ModalButton>
                    <SightingForm
                        handleClick={() => setIsModalOpen(false)}
                        onAddSighting={onAddSighting}
                        habitats={habitats}
                    />
                </Box>
            </Modal>
        </>
    );
};

export default Sightings