import React from "react";
import "../Paginado/Paginado.css";

const Paginado = ({ gamesPerPage, gamesrendered, paginado }) => {
  let pageNumbers = [];

  for (let i = 1; i <= Math.ceil(gamesrendered.length / gamesPerPage); i++) {
    pageNumbers.push([i]);
  }


  return (
    <div className="pagination-container">
      <nav>
        <ul className="pagination">
          {pageNumbers.length > 0 &&
            pageNumbers.map((number) => (
              <a href={`#${number}`} key={number} value={number} onClick={() => paginado(number)}>
                {number}
              </a>
            ))}
        </ul>
      </nav>
    </div>
  );
};

export default Paginado;
