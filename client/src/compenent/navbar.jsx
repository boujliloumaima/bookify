import React from "react";
import "../assets/nav.css";
import searchicon from "../assets/search-b.png";
import searchW from "../assets/search-w.png";
import searchb from "../assets/search-b.png";
import darkmode from "../assets/night.png";
import { Link } from "react-router-dom";
import lightmode from "../assets/day.png";
import logo from "../assets/logo-l.png";
import logos from "../assets/logo-s.png";
import menu from "../assets/burger-bar.png";
import menuL from "../assets/menu-l.png";
import ThemeContext from "./themecontext";
import { useContext } from "react";
import user from "../assets/user-l.png";
import users from "../assets/user-s.png";
export default function Navbar({ isMenuopen, setIsMenuOpen }) {
  const { theme, toggleTheme } = useContext(ThemeContext);
  const prof = JSON.parse(localStorage.getItem("user"));
  console.log(prof);

  const toggleMenu = () => {
    isMenuopen === false ? setIsMenuOpen(true) : setIsMenuOpen(false);
  };

  return (
    <div className="navbar">
      <div>
        <img
          src={theme === "light" ? menu : menuL}
          onClick={toggleMenu}
          className="menu"
        />

        <img
          src={theme === "light" ? logo : logos}
          alt="logo"
          className="logo"
        />
      </div>
      <div className="search">
        <input
          className="search"
          type="search"
          placeholder="search ..."
          aria-label="search input"
        />
        <img
          src={theme === "light" ? searchb : searchW}
          alt=""
          className="search-icon"
        />
      </div>
      <div className="connection">
        <ul>
          <li>
            <div className="container-logo">
              {" "}
              <Link to="/profil">
                <img
                  src={theme === "light" ? user : users}
                  alt="user"
                  className="user"
                />
              </Link>
            </div>
          </li>
        </ul>

        <img
          src={theme === "light" ? darkmode : lightmode}
          alt="search"
          className="toggle-icon"
          onClick={toggleTheme}
          aria-label="search input"
        />
      </div>
    </div>
  );
}
