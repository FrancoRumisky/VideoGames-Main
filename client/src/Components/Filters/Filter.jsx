import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import style from "./Filter.module.css";
import {
  filterByCreated,
  getAllVideogames,
  filterBySortName,
  filterByRating,
  filterByGenres,
} from "../../redux/actions";

function Filter(props) {
  const { genres, gamesrendered } = useSelector((state) => state);
  const dispatch = useDispatch();
  const [isOpen, setIsOpen] = useState({
    tipo: false,
    generos: false,
    orden: false,
    rating: false,
  });

  const [active, setActive] = useState();
  const [activeGenre, setActiveGenre] = useState();

  const onClickHandler = (prop) => {
    setIsOpen({ ...isOpen, [prop]: !isOpen[prop] });
  };

  const handleDispatch = (e) => {
    let arg = e.target.innerText;

    if (arg === "Creados" || arg === "API") {
      dispatch(filterByCreated(arg));
    } else if (arg === "A-Z" || arg === "Z-A") {
      dispatch(filterBySortName(arg));
    } else if (arg === "Mayor Valorado" || arg === "Menor Valorado") {
      dispatch(filterByRating(arg));
    } else {
      dispatch(filterByGenres(arg));
    }
  };

  return (
    <>
      <div className={style.filter_container}>
        <div className={style.title}>
          <span>Filtros</span>
        </div>
        <br />
        <div className={style.selects}>
          <button
            onClick={() => onClickHandler("tipo")}
            aria-haspopup="true"
            aria-expanded={isOpen.tipo}
          >
            TIPO
          </button>
          {isOpen.tipo && (
            <ul>
              <li onClick={(e) => dispatch(getAllVideogames())}>Todos</li>
              <li
                onClick={(e) => {
                  handleDispatch(e);
                  setActiveGenre("Creados");
                }}
                className={activeGenre === "Creados" ? style.active : ""}
              >
                Creados
              </li>
              <li
                onClick={(e) => {
                  handleDispatch(e);
                  setActiveGenre("API");
                }}
                className={activeGenre === "API" ? style.active : ""}
              >
                API
              </li>
            </ul>
          )}
          <button
            onClick={() => onClickHandler("orden")}
            aria-haspopup="true"
            aria-expanded={isOpen.orden}
          >
            ORDEN
          </button>
          {isOpen.orden && (
            <ul>
              <li
                onClick={(e) => {
                  handleDispatch(e);
                  setActive("A-Z");
                }}
                className={active === "A-Z" ? style.active : ""}
              >
                A-Z
              </li>
              <li
                onClick={(e) => {
                  handleDispatch(e);
                  setActive("Z-A");
                }}
                className={active === "Z-A" ? style.active : ""}
              >
                Z-A
              </li>
            </ul>
          )}
          <button
            onClick={() => onClickHandler("rating")}
            aria-haspopup="true"
            aria-expanded={isOpen.rating}
          >
            RATING
          </button>
          {isOpen.rating && (
            <ul>
              <li
                onClick={(e) => {
                  handleDispatch(e);
                  setActive("Mayor Valorado");
                }}
                className={active === "Mayor Valorado" ? style.active : ""}
              >
                Mayor Valorado
              </li>
              <li
                onClick={(e) => {
                  handleDispatch(e);
                  setActive("Menor Valorado");
                }}
                className={active === "Menor Valorado" ? style.active : ""}
              >
                Menor Valorado
              </li>
            </ul>
          )}
          <button
            onClick={() => onClickHandler("generos")}
            aria-haspopup="true"
            aria-expanded={isOpen.generos}
          >
            GENEROS
          </button>
          {isOpen.generos && (
            <ul>
              {genres.length > 0 &&
                genres.map((e) => (
                  <li
                    key={e.id}
                    onClick={(ev) => {
                      handleDispatch(ev);
                      setActiveGenre(e.id);
                    }}
                    className={activeGenre === e.id ? style.active : ""}
                  >
                    {e.name}
                  </li>
                ))}
            </ul>
          )}
        </div>
      </div>
      {!gamesrendered.length && (
        <div className={style.notFound}>
          <span>No hay juegos en esta categoria</span>
        </div>
      )}
    </>
  );
}

export default Filter;
