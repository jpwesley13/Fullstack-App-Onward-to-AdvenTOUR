import React, { useEffect, useState } from "react";
import NavBar from "./components/NavBar";
import { Switch, Route, Outlet} from "react-router-dom";

function App() {
  // const [habitats, setHabitats] = useState([]);

  // useEffect(() => {
  //   fetch('/habitats')
  //   .then(res => {
  //     if (res.ok) {
  //       res.json()
  //       .then(data => setHabitats(data));
  //     }
  //   })
  //   .catch(error => console.error(error));
  // }, []);

  const [sightings, setSightings] = useState([])

  useEffect(() => {
    fetch('/sightings')
    .then(res => res.json())
    .then(data => setSightings(data))
    .catch(error => console.error(error));
  }, []);


  return (
    <>
    <header>
      <NavBar />
    </header>
    <Outlet context={{sightings}} />
    </>
  );
}

export default App;
