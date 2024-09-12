import React, { useEffect, useState } from "react";
import NavBar from "./components/NavBar";
import Header from "./components/Header";
import { Outlet} from "react-router-dom";

function App() {
  const [trainer, setTrainer] = useState([]);

  const authContext = useEffect(() => {
    fetch('/check_session')
      .then((res) => {
        if (res.ok) {
          return res.json();
        }
        throw new Error('Session check failed');
      })
      .then((data) => setTrainer(data))
      .catch((error) => {
        console.error(error);
        setTrainer(null);
      });
  }, []);

  return (
    <>
    <header>
      <NavBar  trainer={trainer} setTrainer={setTrainer}/>
    </header>
    <Header />
    <Outlet context={{setTrainer, trainer, authContext}} />
    </>
  );
}

export default App;
