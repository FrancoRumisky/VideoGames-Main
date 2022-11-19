import React, { useEffect } from "react";
import { useParams } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { videoGameDetail } from "../../redux/actions";
import Slider from "../Slider/Slider.jsx";
import style from "./GameDetail.module.css";
import Loading from "../Loading/Loading";
import SearchBar from "../SearchBar/SearchBar";


//! agregar image a la DB

function GameDetail(props) {
  const dispatch = useDispatch();
  const { id } = useParams();
  const { game, loading } = useSelector((state) => state);
  const {
    name,
    rating,
    image,
    descripcion,
    imageAdditional,
    fecha_de_lanzamiento,
    plataformas,
    generos,
  } = game;

  const imagenes = [
    !image ? "https://c4.wallpaperflare.com/wallpaper/297/13/308/video-games-diablo-iii-diablo-tyrael-wallpaper-preview.jpg" : image,
    !imageAdditional
      ? "https://chemhelps.com/wp-content/uploads/2022/08/indir.jpeg"
      : imageAdditional,
  ];


  useEffect(() => {
    dispatch(videoGameDetail(id));
  }, []);

  return (
    <>
      {loading ? (
        <Loading />
      ) : (
        <div>
          <SearchBar />
          {Object.entries(game).length >  0 && (
            <div className={style.container}>
              <div className={style.titleContainer}>
                <span className={style.title}>{name}</span>
              </div>
              <div className={style.ratingContainer}>
                <span>Rating {rating}</span>
              </div>
              <Slider imagenes={imagenes} />
              <div className={style.info}>
                <span>Generos {generos?.map((e) => e.name).join(",")}</span>
                <span>Fecha de lanzamiento {fecha_de_lanzamiento}</span>
                <span>
                  Plataformas  {isNaN(id)
                    ? plataformas?.join(",")
                    : plataformas?.map((e) => e.platform?.name).join(",")}
                </span>
              </div>

              <div className={style.descriptionContainer}>
                <p className={style.description}>{descripcion}</p>
              </div>
            </div>
          )}
        </div>
      )}
    </>
  );
}

export default GameDetail;
