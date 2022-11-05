import { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import {
  getAllVideogames,
  getAllGenres,
  videoGameDetail,
} from "../../redux/actions";
import Header from "../Header/Header.jsx"

export const Home = () => {
  const dispatch = useDispatch();
  const { games, genres, gamesrendered, game } = useSelector((state) => state);

  useEffect(() => {
    dispatch(getAllVideogames());
    dispatch(getAllGenres());
  }, [dispatch]);

  // const all = games.filter(e=> e.games)
  // const names = all.map(e=> e.games).flat()
  // console.log(names.map(e=> e.name))

  return (
    <div>
      <Header />
    </div>
  );
};
