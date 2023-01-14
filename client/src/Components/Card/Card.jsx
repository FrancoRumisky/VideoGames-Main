import React from "react";
import { Link } from "react-router-dom";

import "../Card/Card.css";

function Card( {image, name, generos,id,} ) {
  return (
    <>
      <div className="container-card">
        <Link to={`/videogames/game/${id}`}>
        <div className="image-container">
          <img src={!image ? "https://i.blogs.es/069317/pacman/450_1000.jpg" : image} alt="game" className="image"></img>

          <div className="description">
            <h2 className="title">{name}</h2>
            <p className="genre">{generos}</p>
          </div>
        </div>
        </Link>
      </div>
    </>
  );
}

export default Card;
