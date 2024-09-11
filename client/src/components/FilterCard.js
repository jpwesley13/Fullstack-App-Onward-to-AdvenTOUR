

function FilterCard({ label, filterCriteria, onChangeFilter, filterAttr, specifics }) {
    function capitalizeFirstLetter(string) {
        return string.charAt(0).toUpperCase() + string.slice(1);
    }

    function handleFilterChange(e) {
        onChangeFilter(e.target.value);
    }

    const specificOptions = specifics.map((specific) => (
        <option key={specific} value={specific}>
            {specific}
        </option>
    ));

    return (
        <>
            <main>
                <span>Filter {label} by {filterAttr}:</span>
                <br />
                <select
                    onChange={handleFilterChange}
                    value={filterCriteria}
                >
                    <option value="">
                        {filterCriteria ? "No Filter" : `Select a ${capitalizeFirstLetter(filterAttr)}`}
                    </option>
                    {specificOptions}
                </select>
            </main>
        </>
    );
}

export default FilterCard;