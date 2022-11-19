import "./App.css";
import React from "react";
import { Route } from "react-router-dom";
import LandingPage from "./Components/LandingPage/LandingPage.jsx";
import { Home } from "./Components/Home/Home.jsx";
import GameDetail from "./Components/GameDetail/GameDetail.jsx";
import CreateGame from "./Components/CreateGame/CreateGame.jsx";
import About from "./Components/About/About.jsx";
import Header from "./Components/Header/Header.jsx";

function App() {
  return (
    <React.Fragment>
      <Route exact path="/" component={LandingPage} />
      <Route path="/videogames" component={Header} />
      <Route exact path="/videogames" component={Home} />
      <Route exact path="/videogames/about" component={About} />
      <Route exact path="/videogames/game/:id" component={GameDetail} />
      <Route exact path="/videogames/creategame" component={CreateGame} />
    </React.Fragment>
  );
}

export default App;
