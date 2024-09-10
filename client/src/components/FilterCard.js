import { useState, useEffect } from "react";

function FilterCard({ label, filterBy, specifics, broadGroups, setFilteredGroups }) {
    const [filteredSpecific, setFilteredSpecific] = useState("");

    function capitalizeFirstLetter(string) {
        return string.charAt(0).toUpperCase() + string.slice(1);
    }

    useEffect(() => {
        function filterGroups() {
            if (filteredSpecific) {
                const filteredGroups = broadGroups.filter(group => {
                    if (filterBy === "region") {
                        return group.region.name === filteredSpecific;
                    } else if (filterBy === "habitat") {
                        return group.habitat.name === filteredSpecific;
                    } else if (filterBy === "biome") {
                        return group.biome.name === filteredSpecific;
                    }
                    return false;
                });
                setFilteredGroups(filteredGroups);
            } else {
                setFilteredGroups(broadGroups);
            }
        };

        filterGroups();
    }, [filteredSpecific, broadGroups, setFilteredGroups]);

    const specificOptions = specifics.map((specific) => (
        <option key={specific} value={specific}>
            {specific}
        </option>
    ));

    return (
        <>
            <main>
                <span>Filter {label} by {filterBy}:</span>
                <br />
                <select
                    value={filteredSpecific}
                    onChange={(e) => setFilteredSpecific(e.target.value)}
                >
                    <option value="">
                        {filteredSpecific ? "No Filter" : `Select a ${capitalizeFirstLetter(filterBy)}`}
                    </option>
                    {specificOptions}
                </select>
            </main>
        </>
    );
};
export default FilterCard;