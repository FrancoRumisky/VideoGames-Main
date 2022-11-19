import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { useHistory } from "react-router-dom";
import { getByName } from "../../redux/actions";
import style from "../SearchBar/SearchBar.module.css";

function SearchBar() {
  const [input, setInput] = useState("");
  const dispatch = useDispatch();
  const history = useHistory();

  const handleKeyDown = (e) => {
    if (e.keyCode === 13) {
      dispatch(getByName(input));
      setInput("");
      history.push("/videogames");
    }
  };

  const handleClick = () => {
    dispatch(getByName(input));
    setInput("");
    history.push("/videogames");
  };

  return (
    <>
      <div className={style.search_container}>
        <div className={style.content_container}>
          <input
            type="text"
            placeholder="Buscar"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={handleKeyDown}
            tabIndex="0"
          ></input>
          <button className={style.btn} onClick={(e) => handleClick()}>
            <img
              className={style.lupa}
              alt="svgImg"
              src="data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHg9IjBweCIgeT0iMHB4Igp3aWR0aD0iMzIiIGhlaWdodD0iMzIiCnZpZXdCb3g9IjAsMCwyNTYsMjU2IgpzdHlsZT0iZmlsbDojMDAwMDAwOyI+CjxnIGZpbGwtb3BhY2l0eT0iMCIgZmlsbD0iIzBhMGEwYSIgZmlsbC1ydWxlPSJub256ZXJvIiBzdHJva2U9Im5vbmUiIHN0cm9rZS13aWR0aD0iMSIgc3Ryb2tlLWxpbmVjYXA9ImJ1dHQiIHN0cm9rZS1saW5lam9pbj0ibWl0ZXIiIHN0cm9rZS1taXRlcmxpbWl0PSIxMCIgc3Ryb2tlLWRhc2hhcnJheT0iIiBzdHJva2UtZGFzaG9mZnNldD0iMCIgZm9udC1mYW1pbHk9Im5vbmUiIGZvbnQtd2VpZ2h0PSJub25lIiBmb250LXNpemU9Im5vbmUiIHRleHQtYW5jaG9yPSJub25lIiBzdHlsZT0ibWl4LWJsZW5kLW1vZGU6IG5vcm1hbCI+PHBhdGggZD0iTTAsMjU2di0yNTZoMjU2djI1NnoiIGlkPSJiZ1JlY3RhbmdsZSI+PC9wYXRoPjwvZz48ZyB0cmFuc2Zvcm09InRyYW5zbGF0ZSgtNTIuOTkxNzcsMTMxLjE1OTIyKSByb3RhdGUoLTQ2KSIgZmlsbC1vcGFjaXR5PSIwLjU4MDM5IiBmaWxsPSIjZmZmZmZmIiBmaWxsLXJ1bGU9Im5vbnplcm8iIHN0cm9rZT0ibm9uZSIgc3Ryb2tlLXdpZHRoPSIxIiBzdHJva2UtbGluZWNhcD0iYnV0dCIgc3Ryb2tlLWxpbmVqb2luPSJtaXRlciIgc3Ryb2tlLW1pdGVybGltaXQ9IjEwIiBzdHJva2UtZGFzaGFycmF5PSIiIHN0cm9rZS1kYXNob2Zmc2V0PSIwIiBmb250LWZhbWlseT0ibm9uZSIgZm9udC13ZWlnaHQ9Im5vbmUiIGZvbnQtc2l6ZT0ibm9uZSIgdGV4dC1hbmNob3I9Im5vbmUiIHN0eWxlPSJtaXgtYmxlbmQtbW9kZTogbm9ybWFsIj48ZyB0cmFuc2Zvcm09InNjYWxlKDgsOCkiPjxwYXRoIGQ9Ik0xMSwydjJoMTB2LTJ6TTIxLDR2Mmgydi0yek0yMyw2djEwaDJ2LTEwek0yMywxNmgtMnYyaDJ6TTIxLDE4aC0xMHYyaDR2M2gtMXY3aDR2LTdoLTF2LTNoNHpNMTEsMTh2LTJoLTJ2MnpNOSwxNnYtMTBoLTJ2MTB6TTksNmgydi0yaC0yeiI+PC9wYXRoPjwvZz48L2c+Cjwvc3ZnPg=="
            />
          </button>
        </div>
        <div onClick={()=> history.push("/videogames/creategame")} className={style.createContainer}>
          <span>Create Videogame</span>
        </div>
      </div>
    </>
  );
}

export default SearchBar;
