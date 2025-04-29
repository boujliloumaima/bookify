import React from "react";
import Login from "../compenent/login";
import { Outlet } from "react-router-dom";
import imglogin from "../assets/img1.png";
import "../assets/card.css";
import logo from "../assets/logo-l.png";
export default function Loginpage() {
  return (
    <div className={`container-loginpage`}>
      <div className="logop">
        <img src={logo} alt="" className="imglogin" />
        <p>Connectez-vous pour réserver en toute simplicité et découvrir </p>
        <p>les meilleurs services près de chez vous</p>
      </div>
      <div>
        <Login />
      </div>
    </div>
  );
}
