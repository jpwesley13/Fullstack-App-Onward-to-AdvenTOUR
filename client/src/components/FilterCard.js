import { useState, useEffect } from "react";

function FilterCard({ specifics, broadGroups, setFilteredGroups }) {
    const [filteredSpecific, setFilteredSpecific] = useState("");

    useEffect(() => {
        if (filteredSpecific) {

            if(broadGroups.region){
                const filteredGroups = broadGroups.filter(
                    habitat => habitat.region.name === filteredSpecific
                );
                setFilteredGroups(filteredGroups);
            } else if(broadGroups.habitat) {
                const filteredGroups = broadGroups.filter(
                    sighting => sighting.habitat.name === filteredSpecific
                );
                setFilteredGroups(filteredGroups);
            } else if(broadGroups.biome) {
                const filteredGroups = broadGroups.filter(
                    trainer => trainer.biome.name === filteredSpecific
                );
                setFilteredGroups(filteredGroups);
            } 
        } else {
            setFilteredGroups(broadGroups)
        }
    }, [filteredSpecific, broadGroups, setFilteredGroups]);

    const specificOptions = specifics.map((specific) => (
        <option key={specific} value={specific}>
            {specific}
        </option>
    ));
};
export default FilterCard;