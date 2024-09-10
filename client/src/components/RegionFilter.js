import { useState, useEffect } from "react";

function RegionFilter({ regions, habitats, setFilteredHabitats }) {
    const [filteredRegion, setFilteredRegion] = useState("");

    useEffect(() => {
        if (filteredRegion) {
            const filteredHabitats = habitats.filter(
                habitat => habitat.region.name === filteredRegion
            );
            setFilteredHabitats(filteredHabitats);
        } else {
            setFilteredHabitats(habitats)
        }
    }, [filteredRegion, habitats, setFilteredHabitats]);

    const regionOptions = regions.map((region) => (
        <option key={region} value={region}>
            {region}
        </option>
    ));

    return (
        <>
            <main>
                <span>Filter habitats by region:</span>
                <br />
                <select
                    value={filteredRegion}
                    onChange={(e) => setFilteredRegion(e.target.value)}
                >
                    <option value="">
                        {filteredRegion ? "No Filter" : "Select a Region"}
                    </option>
                    {regionOptions}
                </select>
            </main>
        </>
    );
}
export default RegionFilter;