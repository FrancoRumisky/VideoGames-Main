import { NavLink } from "react-router-dom";
import "../Header/Header.css";

function Header(props) {
  return (
    <div>
      <div className="navContainer">
        <div className="navLeft">
          <div className="logo">
            <img
              className="logo-img"
              src="https://avatars.githubusercontent.com/u/57154655?s=280&v=4"
              alt="Henry-Games"
            />
          </div>
          <div className="navigation">
            <NavLink activeClassName="active" exact to="/videogames">
              <span className="nav-item">INICIO</span>
            </NavLink>
            <NavLink activeClassName="active" to="/videogames/about">
              <span className="nav-item">ACERCA DE</span>
            </NavLink>
          </div>
        </div>
        <div className="navRight">
          <button className="nav-item">
            IDIOMA
            <ul className="nav-subItem-container">
              <li className="nav-subItem">Español</li>
              <li className="nav-subItem">English</li>
            </ul>
          </button>
          <span className="nav-item">INICIAR SESION</span>
        </div>
      </div>
    </div>
  );
}

export default Header;
