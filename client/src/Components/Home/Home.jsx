import React  from "react";

import SearchBar from "../SearchBar/SearchBar.jsx";
import "../Home/Home.css"
import Cards from "../Cards/Cards.jsx";


export const Home = () => {
  
  return (
    <>
      <div>
        <SearchBar />
        <Cards />
      </div>
    </>
  );
};
