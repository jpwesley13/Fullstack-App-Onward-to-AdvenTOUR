import React, { useEffect, useState } from "react";
import NavBar from "./components/NavBar";
import { Switch, Route, Outlet} from "react-router-dom";

function App() {

  const [sightings, setSightings] = useState([])
  const [reviews, setReviews] = useState([])
  const [habitats, setHabitats] = useState([]);
  const [trainers, setTrainers] = useState([]);
  const [trainer, setTrainer] = useState([]);

  useEffect(() => {
    fetch('/check_session')
    .then(res => {
      if(res.ok) {
        res.json()
        .then(data => setTrainer(data))
      }
    });
  }, [])

  if(!trainer) return <Login onLogin={setTrainer} />

  useEffect(() => {
      fetch('/trainers')
      .then(res => res.json())
      .then(data => {
          setTrainers(data);
      })
      .catch(error => console.error(error));
  }, []);

  useEffect(() => {
    fetch('/sightings')
    .then(res => res.json())
    .then(data => setSightings(data))
    .catch(error => console.error(error));
  }, []);

  useEffect(() => {
    fetch('/reviews')
    .then(res => res.json())
    .then(data => setReviews(data))
    .catch(error => console.error(error));
  }, []);

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

  function onAddTrainer(newTrainer){
    return setTrainers([...trainers, newTrainer])
  }

  function onAddHabitat(newHabitat){
    return setHabitats([...habitats, newHabitat])
  }

  function onAddReview(newReview){
    return setReviews([...reviews, newReview])
  }

  function onAddSighting(newSighting){
    return setSightings([...sightings, newSighting])
  }


  return (
    <>
    <header>
      <NavBar trainer={trainer} setTrainer={setTrainer}/>
    </header>
    <Outlet context={{sightings, reviews, habitats, trainers, trainer, onAddTrainer, onAddHabitat, onAddReview, onAddSighting}} />
    </>
  );
}

export default App;
