import React, { useEffect, useState } from "react";
import NavBar from "./components/NavBar";
import Header from "./components/Header";
import { Outlet} from "react-router-dom";

function App() {

  const [sightings, setSightings] = useState([])
  const [reviews, setReviews] = useState([])
  const [habitats, setHabitats] = useState([]);
  const [trainers, setTrainers] = useState([]);
  const [trainer, setTrainer] = useState([]);

  useEffect(() => {
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
      })
      .finally(() => {
        fetch('/trainers')
          .then((res) => res.json())
          .then((data) => setTrainers(data))
          .catch((error) => console.error(error));

        fetch('/sightings')
          .then((res) => res.json())
          .then((data) => setSightings(data))
          .catch((error) => console.error(error));

        fetch('/reviews')
          .then((res) => res.json())
          .then((data) => setReviews(data))
          .catch((error) => console.error(error));

        fetch('/habitats')
          .then((res) => {
            if (res.ok) {
              return res.json();
            }
            throw new Error('Failed to fetch habitats');
          })
          .then((data) => setHabitats(data))
          .catch((error) => console.error(error));
      });
  }, []);

  // useEffect(() => {
  //     fetch('/trainers')
  //     .then(res => res.json())
  //     .then(data => {
  //         setTrainers(data);
  //     })
  //     .catch(error => console.error(error));
  // }, []);

  // useEffect(() => {
  //   fetch('/sightings')
  //   .then(res => res.json())
  //   .then(data => setSightings(data))
  //   .catch(error => console.error(error));
  // }, []);

  // useEffect(() => {
  //   fetch('/reviews')
  //   .then(res => res.json())
  //   .then(data => setReviews(data))
  //   .catch(error => console.error(error));
  // }, []);

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

  // useEffect(() => {
  //   fetch('/check_session')
  //   .then(res => {
  //     if(res.ok) {
  //       res.json()
  //       .then(data => setTrainer(data))
  //     }
  //   });
  // }, [])

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
      <NavBar  trainer={trainer} setTrainer={setTrainer}/>
    </header>
    <Header />
    <Outlet context={{setTrainer, sightings, reviews, habitats, trainers, trainer, onAddTrainer, onAddHabitat, onAddReview, onAddSighting}} />
    </>
  );
}

export default App;
