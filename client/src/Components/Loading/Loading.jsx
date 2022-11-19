import React from 'react';
import invader from "../../image/invader.svg"
import style from "./Loading.module.css"

function Loading() {
    return (
        <div className={style.containerImg}>
            <img className={style.img} src={invader} alt="invader"/>
        </div>
    );
}

export default Loading;