import React, { useEffect, useState } from "react";
import NavBar from "./components/NavBar";
import { Switch, Route, Outlet} from "react-router-dom";

function App() {
  const [habitats, setHabitats] = useState([]);

  useEffect(() => {
    fetch('/habitats')
    .then(res => {
      if (res.ok) {
        res.json()
        .then(data => setHabitats(data));
      }
    })
    .catch(error => console.error(error));
  }, []);


  return (
    <>
    <header>
      <NavBar />
    </header>
    <Outlet context={{habitats}} />
    </>
  );
}

export default App;
