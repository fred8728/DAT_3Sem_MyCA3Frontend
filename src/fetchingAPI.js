import React, { useState, useEffect } from 'react';
import {
BrowserRouter as Router, 
Route,
Switch} from "react-router-dom";

const Switches = (props) => {
    const [starwars,setStarwars] = useState();
    const [planet, setPlanet] = useState();
    const [film, setFilm] = useState();
    const [starship, setStarship] = useState();
    const [species, setSpecies] = useState();

    function fetchStarwarz() {
    fetch('http://localhost:8080/securitystarter/api/info/person/6')
    .then(response=>response.json())
    .then(data=> setStarwars( data )); 
    }

    function fetchPlanet(){
      fetch('http://localhost:8080/securitystarter/api/info/planet/3')
    .then(response=>response.json())
    .then(data=> setPlanet( data )); 
    }

    function fetchFilm(){
      fetch("http://localhost:8080/securitystarter/api/info/film/1")
    .then(response=>response.json())
    .then(data=> setFilm( data )); 
    }

    function fetchStarship(){
      fetch('http://localhost:8080/securitystarter/api/info/starships/2')
    .then(response=>response.json())
    .then(data=> setStarship( data )); 
    }

    function fetchSpecies(){
      fetch('http://localhost:8080/securitystarter/api/info/species/1')
    .then(response=>response.json())
    .then(data=> setSpecies( data )); 
    }

    useEffect(() => {

        fetchStarwarz();
        fetchPlanet();
        fetchStarship();
        fetchSpecies();
        fetchFilm();
      }, []);

    return (
    <Switch>
      <Route path="/starwars">
      </Route>
      <Route path="/planet">
      <pre>Planet API: {JSON.stringify(planet)}</pre>
      </Route>
      <Route path="/starship">
      <pre>Starship API: {JSON.stringify(starship)}</pre>
      </Route>
      <Route path= "/vehicles">
      <pre>Species API: {JSON.stringify(species)}</pre>
      </Route>
      <Route path= "/films">
        <pre>Film API: {JSON.stringify(film)}</pre>
      </Route>
    </Switch>
    );
  }

  export default Switches;