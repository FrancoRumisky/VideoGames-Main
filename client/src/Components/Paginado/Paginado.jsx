import React from "react";
import "../Paginado/Paginado.css";
import pacman from "../../image/pacman.png"
import pacman1 from "../../image/pacmangosht1.png"
import pacman2 from "../../image/pacmangosht2.png"
import pacman3 from "../../image/pacmangosht3.png"

const Paginado = ({ gamesPerPage, gamesrendered, paginado }) => {
  let pageNumbers = [];

  for (let i = 1; i <= Math.ceil(gamesrendered.length / gamesPerPage); i++) {
    pageNumbers.push([i]);
  }

  
  const pageNumber = (n) => {
    const arr = [pacman1,pacman2,pacman3]
    if(n.includes(1)) return pacman
    return arr[Math.floor(Math.random() * arr.length)]
  }

  return (
    <div className="pagination-container">
      <nav>
        <ul className="pagination">
          {pageNumbers.length > 0 &&
            pageNumbers.map((number) => (
              <a href={`#${number}`} key={number} value={number} onClick={() => paginado(number)}>
                <img src={pageNumber(number)} alt="pacman" />
              </a>
            ))}
        </ul>
      </nav>
    </div>
  );
};

export default Paginado;
