import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";

import arcade from "../../image/32840532(1).jpg";
import flecha from "../../image/flechaHome.png";
import "../LandingPage/LandingPage.css";

function LandingPage(props) {
  const [show, setShow] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      setShow(true);
    }, 5000);
    return () => clearTimeout(timer);
  }, []);

  return (
    <>
      <div className="container">
        <img className="background-img" src={arcade} alt="arcade" />
        <Link to="/videogames">
          <button className="button-home"></button>
        </Link>
        <span className="tag-home">HOME</span>

        <div className="iframe-container">
          <iframe
            width="524"
            height="380"
            src="https://www.youtube.com/embed/FWAoaoHDeM0?&autoplay=1&start=9&rel=0&showinfo=0"
            title="YouTube video player"
            frameBorder="1"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
          ></iframe>
        </div>
        {show && (
          <Link to="/videogames">
            <div className="toHome" id="tohome">
              <img className="toHomeFlecha" src={flecha} alt="flecha-home" />
            </div>
          </Link>
        )}
      </div>
    </>
  );
}

export default LandingPage;
