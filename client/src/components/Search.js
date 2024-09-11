import React from "react";

function Search({searchSetter, search}) {
  return (
    <div className="ui search">
      <div className="ui icon input">
        <input className="prompt" 
        value = {search}
        onChange={(e) => searchSetter(e.target.value)} 
        placeholder="Search by Name"
        />
        <i className="search icon"
        />
      </div>
    </div>
  );
}

export default Search;