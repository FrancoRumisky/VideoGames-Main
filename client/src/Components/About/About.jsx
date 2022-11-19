import React from "react";
import style from "./About.module.css";
import img from "../../image/pngwing.com.png";
import redux from "../../image/pngwing.com (1).png";
import node from "../../image/kisspng-node-js-javascript-web-application-express-js-comp-5ae0f84e5e7537.0464945815246930703869.png";
import sequelize from "../../image/107676832-57368c00-6c78-11eb-9288-cd933e208229.png";

function About() {
  return (
    <>
      <div className={style.container}>
        <span>
          App desarollada por Franco Rumisky en el bootcamp de Henry ,
          utilizando las siguientes tecnologias:
        </span>
      </div>
      <div className={style.imageContainer}>
        <img src={img} alt="react" />
        <img src={redux} alt="redux" />
        <img src={node} alt="node" />
        <img className={style.sequelize} src={sequelize} alt="sequelize" />
      </div>
    </>
  );
}

export default About;
