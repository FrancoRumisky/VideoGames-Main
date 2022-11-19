import React from "react";
import { useEffect } from "react";
import style from "./Slider.module.css";

function Slider({ imagenes }) {
  const [imagenActual, setImagenActual] = React.useState(0);
  const cantidad = imagenes?.length;
 

  useEffect(() => {
    const timer = setTimeout(() => siguienteImagen(), 6000);
    return () => clearTimeout(timer);
  }, [imagenActual]);

  if (!Array.isArray(imagenes) || cantidad === 0) return;

  const siguienteImagen = () => {
    setImagenActual(imagenActual === cantidad - 1 ? 0 : imagenActual + 1);
  };

  const anteriorImagen = () => {
    setImagenActual(imagenActual === 0 ? cantidad - 1 : imagenActual - 1);
  };

  

  return (
    <div className={style.container}>
      <button className={style.btnAnt} onClick={anteriorImagen}>
        ←
      </button>
      {imagenes.map((imagen, index) => {
        return (
          <div
            key={index}
            className={
              imagenActual === index
                ? `${style.slide} ${style.active}`
                : style.slide
            }
          >
            {imagenActual === index && (
              <img
                className={style.image}
                key={index}
                src={imagen}
                alt="imagen"
              />
            )}
          </div>
        );
      })}
      <button className={style.btnSig} onClick={siguienteImagen}>
        →
      </button>
    </div>
  );
}

export default Slider;
