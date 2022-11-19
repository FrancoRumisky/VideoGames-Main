import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { getAllVideogames, getAllGenres } from "../../redux/actions";
import Paginado from "../Paginado/Paginado.jsx";
import Card from "../Card/Card.jsx";
import Filter from "../Filters/Filter.jsx";
import Loading from "../Loading/Loading.jsx";
import gameOver from "../../image/2fe4604fdf9824873353a413d1435255 (1).gif";
import style from "../Cards/Cards.module.css";

function Cards() {
  const { gamesrendered, loading } = useSelector(
    (state) => state
  );
  const dispatch = useDispatch();
  const [currentPage, setCurrentPage] = useState(1);
  const [gamesPerPage] = useState(15);
  const indexOfLastGame = currentPage * gamesPerPage;
  const indexOfFirstGame = indexOfLastGame - gamesPerPage;
  const currentGames =
    gamesrendered.length > 0 &&
    gamesrendered.slice(indexOfFirstGame, indexOfLastGame);
  const [count, setCount] = useState(5);

  const restCount = () => {
    if (count === 0) {
      window.location.reload()
    }
    setTimeout(() => {
      setCount(count - 1);
    }, 1000);
  };

  const paginado = (pageNumber) => {
    setCurrentPage(pageNumber);
  };


  const handleKeyDown = (e) => {
    if (e.keyCode === 13) {
      window.location.reload();
    }
  };

  useEffect(() => {
    if (!gamesrendered.length) {
      dispatch(getAllVideogames());
      dispatch(getAllGenres());
    }
  }, [dispatch]);

  useEffect(() => {
    setCurrentPage(1);
  }, [gamesrendered]);

  if (typeof gamesrendered === "string")
    return (
      <>
        <div className={style.image_container}>
          <img src={gameOver} alt="gameOver" />
        </div>
        <div
          className={style.notfound_text}
          onKeyDown={handleKeyDown}
          tabIndex="0"
        >
          <span>Juego No Encontrado</span>
          <button onClick={restCount()}>Continue:{count}</button>
        </div>
      </>
    );
  return (
    <>
      {loading ? (
        <Loading />
      ) : (
        <div>
          <div className={style.cards_container}>
            {currentGames.length > 0 &&
              currentGames.map((e) => (
                <Card
                  image={e.image}
                  name={e.name}
                  generos={e.generos.map((e) => e.name).join(",")}
                  key={e.id}
                  id={e.id}
                />
              ))}
          </div>
          <Filter />
          <Paginado
            gamesPerPage={gamesPerPage}
            gamesrendered={gamesrendered}
            paginado={paginado}
          />
        </div>
      )}
    </>
  );
}

export default Cards;
