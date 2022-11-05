import './App.css';
import React from "react";
import { Route } from "react-router-dom";
import LandingPage  from "./Components/LandingPage/LandingPage.jsx"
import {Home } from "./Components/Home/Home.jsx"
import {GameDetail } from "./Components/GameDetail/GameDetail.jsx"
import {CreateGame } from "./Components/CreateGame/CreateGame.jsx"

function App() {
  return (
    <React.Fragment>
      <Route exact path="/" component={LandingPage} />
      <Route path="/videogames" component={Home} />
      <Route path="/videogames/:id" component={GameDetail} />
      <Route path="/videogames/creategame" component={CreateGame} />


    </React.Fragment>
  );
}

export default App;
