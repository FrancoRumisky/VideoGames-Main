import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  getAllGenres,
  getAllVideogames,
  createVideogame,
} from "../../redux/actions";
import Loading from "../Loading/Loading";
import style from "./CreateGame.module.css";
import Slider from "../Slider/Slider";
function CreateGame() {
  const dispatch = useDispatch();
  const { genres, games, loading } = useSelector((state) => state);
  const regexp = /(ftp|http|https):\/\/(\w+:{0,1}\w*@)?(\S+)(:[0-9]+)?(\/|\/([\w#!:.?+=&%@!\-\/]))?/

  const [input, setInput] = useState({
    name: "",
    fecha_de_lanzamiento: "",
    descripcion: "",
    rating: "",
    image: "",
    imageAdditional: "",
    generos: [],
    plataformas: [],
  });

  
  const [errors, setErrors] = useState({});

  function validate(input) {
    let errors = {};
    
    if (!input.name) {
      errors.name = "Ingrese un nombre";
    }
    if (!input.fecha_de_lanzamiento) {
      errors.fecha_de_lanzamiento = "Ingrese una fecha de lanzamiento";
    }
    if (!input.descripcion) {
      errors.descripcion = "Ingrese una descripcion";
    }
    if (!input.rating || input.rating > 5 || input.rating < 0) {
      errors.rating = "El rating debe ser mayor a 0 y menor que 5";
    }
    if(!regexp.test(input.image)){
      errors.image = "Ingrese una url valida"
    }
    if(!regexp.test(input.imageAdditional)){
      errors.imageAdditional = "Ingrese una url valida"
    }
    if (!input.plataformas.length) {
      errors.plataformas = "Ingrese entre 1 y 5 plataformas";
    }
    if (!input.generos.length) {
      errors.generos = "Seleccione entre 1 y 5 generos";
    }
    return errors;
  }

  useEffect(() => {
    !games.length && dispatch(getAllVideogames());
    !genres.length && dispatch(getAllGenres());
    setErrors({
      name: "",
      fecha_de_lanzamiento: "",
      descripcion: "",
      rating: "",
      image: "",
      imageAdditional: "",
      generos: [],
      plataformas: [],
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [dispatch]);

  let platforms = [...new Set(games?.map((ele) => ele.plataformas).flat())];
  let genre = [...new Set(genres?.map((ele) => ele).flat())];

  function handleChange(e) {
    if (e.target.name === "generos" || e.target.name === "plataformas") {
      if (
        !input[e.target.name].includes(e.target.value) &&
        input[e.target.name].length < 5
      )
        setInput({
          ...input,
          [e.target.name]: [...input[e.target.name].concat(e.target.value)],
        });
      setErrors(
        validate({
          ...input,
          [e.target.name]: e.target.value,
        })
      );
    } else {
      setInput({
        ...input,
        [e.target.name]: e.target.value,
      });
      setErrors(
        validate({
          ...input,
          [e.target.name]: e.target.value,
        })
      );
    }
  }

  function deleteInput(e, g) {
    setInput({
      ...input,
      [e.target.name]: input[e.target.name].filter((ele) => ele !== g),
    });
  }

  function inputDefault() {
    setInput({
      name: "",
      fecha_de_lanzamiento: "",
      descripcion: "",
      rating: "",
      image: "",
      imageAdditional: "",
      generos: [],
      plataformas: [],
    });
  }

  function handleSubmit(e) {
    e.preventDefault();
    dispatch(createVideogame(input));
    inputDefault()
    alert("Juego Creado Exitosamente!")
  }

  const imagenes = [
    regexp.test(input.image)
      ? input.image
      : "https://c4.wallpaperflare.com/wallpaper/297/13/308/video-games-diablo-iii-diablo-tyrael-wallpaper-preview.jpg",
      regexp.test(input.imageAdditional)
      ? input.imageAdditional
      : "https://chemhelps.com/wp-content/uploads/2022/08/indir.jpeg",
  ];

  function mouseOver(e) {
    e.target.style.left = `${Math.ceil(Math.random() * 90)}%`;
  }

  return (
    <>
      {loading ? (
        <Loading />
      ) : (
        <div>
          <div className={style.containerInputs}>
            <h1 className={style.title}>Create Videogame</h1>
            <br />
            <div>
              <label>Nombre:</label>
              <input
                type="text"
                value={input.name}
                name="name"
                onChange={(e) => handleChange(e)}
                autoComplete="off"
                required
              />
              {errors.hasOwnProperty("name") ? (
                <p className={style.error}>{errors.name}</p>
              ) : null}
            </div>

            <div>
              <label>Rating:</label>
              <input
                type="number"
                value={input.rating}
                name="rating"
                onChange={(e) => handleChange(e)}
                autoComplete="off"
                required
              />
              {errors.rating && <p className={style.error}>{errors.rating}</p>}
            </div>

            <div>
              <label>Image:</label>
              <input
                type="url"
                value={input.image}
                name="image"
                autoComplete="off"
                onChange={(e) => handleChange(e)}
              />
              {errors.image && <p className={style.error}>{errors.image}</p>}
            </div>

            <div>
              <label>imageAdditional:</label>
              <input
                type="url"
                value={input.imageAdditional}
                name="imageAdditional"
                onChange={(e) => handleChange(e)}
                autoComplete="off"
              />
              {errors.imageAdditional && <p className={style.error}>{errors.imageAdditional}</p>}
            </div>

            <div>
              <label>Generos:</label>
              <select
                className="selectCrear"
                onChange={(e) => handleChange(e)}
                name="generos"
                value={input.generos}
                multiple
                size="10"
              >
                {genre?.map((e, i) => (
                  <option key={e.id}>{e.name}</option>
                ))}
              </select>
              {errors.hasOwnProperty("generos") ? (
                <p className={style.error}>{errors.generos}</p>
              ) : null}
            </div>

            <div>
              <label>Released:</label>
              <input
                type="date"
                value={input.fecha_de_lanzamiento}
                name="fecha_de_lanzamiento"
                onChange={(e) => handleChange(e)}
                required
              />
              {errors.hasOwnProperty("fecha_de_lanzamiento") ? (
                <p className={style.error}>{errors.fecha_de_lanzamiento}</p>
              ) : null}
            </div>

            <div>
              <label>Plataformas:</label>
              <select
                onChange={(e) => handleChange(e)}
                name="plataformas"
                value={input.plataformas}
                multiple
                size="10"
              >
                {platforms?.map((e, i) => (
                  <option key={i}>{e}</option>
                ))}
              </select>
              {errors.hasOwnProperty("plataformas") ? (
                <p className={style.error}>{errors.plataformas}</p>
              ) : null}
            </div>

            <div>
              <label>Description:</label>
              <input
                type="text"
                value={input.descripcion}
                name="descripcion"
                onChange={(e) => handleChange(e)}
                autoComplete="off"
                required
              />
            </div>
            {errors.descripcion && (
              <p className={style.error}>{errors.descripcion}</p>
            )}
            <div>
              {Object.entries(errors).length > 0 ? (
                <button className={style.false} onMouseOver={mouseOver}>
                  Create Videogame
                </button>
              ) : (
                <button className={style.true} onClick={(e) => handleSubmit(e)}>
                  Create Videogame
                </button>
              )}
            </div>
          </div>

          <div className={style.preview}>
            {input.name ? (
              <div className={style.name}>
                <span>{input.name}</span>
              </div>
            ) : (
              <div className={style.name}>
                <span>Nombre</span>
              </div>
            )}
            {input.rating ? (
              <div className={style.rating}>
                <span>{input.rating}</span>
              </div>
            ) : (
              <div className={style.rating}>
                <span>Rating</span>
              </div>
            )}
            <Slider imagenes={imagenes} />

            {input.generos.length ? (
              <div className={style.genre}>
                {input.generos.map((g, i) => {
                  return (
                    <div key={i} className={style.btnDelete}>
                      <span>{g}</span>
                      <button name="generos" onClick={(e) => deleteInput(e, g)}>
                        x
                      </button>
                    </div>
                  );
                })}
              </div>
            ) : (
              <div className={style.genre}>
                <span>Generos</span>
              </div>
            )}
            {input.fecha_de_lanzamiento ? (
              <div className={style.released}>
                <span>{input.fecha_de_lanzamiento}</span>
              </div>
            ) : (
              <div className={style.released}>
                <span>Fecha De Lanzamiento</span>
              </div>
            )}
            {input.plataformas.length ? (
              <div className={style.platform}>
                {input.plataformas.map((g, i) => {
                  return (
                    <div key={i} className={style.btnDelete}>
                      <span>{g}</span>
                      <button
                        name="plataformas"
                        onClick={(e) => deleteInput(e, g)}
                      >
                        x
                      </button>
                    </div>
                  );
                })}
              </div>
            ) : (
              <div className={style.platform}>
                <span>Plataformas</span>
              </div>
            )}
            {input.descripcion ? (
              <div className={style.description}>
                <span>{input.descripcion}</span>
              </div>
            ) : (
              <div className={style.description}>
                <span>descripcion</span>
              </div>
            )}
          </div>
        </div>
      )}
    </>
  );
}

export default CreateGame;
