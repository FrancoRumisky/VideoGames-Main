import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import arcade from "../../image/32840532(1).jpg";
import flecha from "../../image/flechaHome.png";
import "../LandingPage/LandingPage.css";

function LandingPage() {
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

        <a
          href="https://www.linkedin.com/in/franco-rumisky-882b2b241/"
          target="_blank"
          rel="noreferrer"
        >
          <button className="button-linkedin"></button>
        </a>
        <span className="tag-linkedin">Linkedin</span>

        <a
          href="mailto:framqoo@gmail.com?Subject=Hola,%20estas%20disponible%20para%20comenzar%20manaña?!"
          target="_blank"
          rel="noreferrer"
        >
          <button className="button-gmail"></button>
        </a>
        <span className="tag-gmail">Gmail</span>

        <div className="iframe-container">
          <iframe
            width="524"
            height="380"
            src="https://www.youtube.com/embed/FWAoaoHDeM0?&autoplay=1&start=9&rel=0&autohide=1&controls=0&showinfo=0&iv_load_policy=3&modestbranding=1"
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
