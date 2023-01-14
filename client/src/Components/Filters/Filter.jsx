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

  const [active, setActive] = useState([]);
  const [activeGenre, setActiveGenre] = useState([]);
  const [activeTipe, setActiveType] = useState([]);
  let countFilter = activeGenre?.length + active?.length + activeTipe.length

  const onClickHandler = (prop) => {
    setIsOpen({ ...isOpen, [prop]: !isOpen[prop] });
  };

  const reset = () => {
    dispatch(getAllVideogames())
  }

  const seterActive = (arg) => {
    if(!active.includes(arg)) setActive([arg])
  }
  const seterActiveGenre = (arg) => {
    if(!activeGenre.includes(arg)) setActiveGenre([...activeGenre, arg])
  }
  const seterActiveType = (arg) => {
    if(!activeTipe.includes(arg)) setActiveType([arg])
  }

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
          <span>Filtros ({countFilter})</span>
          <button onClick={reset}>restablecer</button>
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
              <li onClick={(e) => reset()}>Todos</li>
              <li
                onClick={(e) => {
                  handleDispatch(e);
                  seterActiveType("Creados")
                }}
                className={activeTipe.includes("Creados") ? style.active : ""}
              >
                Creados
              </li>
              <li
                onClick={(e) => {
                  handleDispatch(e);
                  seterActiveType("API")
                }}
                className={activeTipe.includes("API") ? style.active : ""}
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
                  seterActive("A-Z");
                }}
                className={active.includes("A-Z") ? style.active : ""}
              >
                A-Z
              </li>
              <li
                onClick={(e) => {
                  handleDispatch(e);
                  seterActive("Z-A");
                }}
                className={active.includes("Z-A") ? style.active : ""}
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
                  setActive(["Mayor Valorado"]);
                }}
                className={active.includes("Mayor Valorado") ? style.active : ""}
              >
                Mayor Valorado
              </li>
              <li
                onClick={(e) => {
                  handleDispatch(e);
                  setActive(["Menor Valorado"]);
                }}
                className={active.includes("Menor Valorado") ? style.active : ""}
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
                      seterActiveGenre(e.id)
                    }}
                    className={activeGenre.includes(e.id) ? style.active : ""}
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
