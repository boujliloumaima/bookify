import React from "react";
import "../assets/sidebar.css";
import LineAxisIcon from "@mui/icons-material/LineAxis";
import HomeFilledIcon from "@mui/icons-material/HomeFilled";
import BookmarkAddedIcon from "@mui/icons-material/BookmarkAdded";
import AdminPanelSettingsIcon from "@mui/icons-material/AdminPanelSettings";
import { Link } from "react-router-dom";
export default function Sidebar({ isMenuopen }) {
  console.log(isMenuopen);

  return (
    <div className={`sidebar ${isMenuopen ? "active" : ""}`}>
      <div>
        <ul>
          <li>
            <div id="icons">
              <HomeFilledIcon />
            </div>
            <div id="title">Home</div>
          </li>
          <li>
            <div id="icons">
              <LineAxisIcon />
            </div>
            <div id="title">Dashboard</div>
          </li>
          <li>
            <div id="icons">
              <BookmarkAddedIcon />
            </div>
            <div id="title">
              <Link to="booking">Booking</Link>
            </div>
          </li>
          <li>
            <div id="icons">
              <AdminPanelSettingsIcon />
            </div>
            <div id="title">AdminPanel</div>
          </li>
        </ul>
      </div>
      <div>
        <ul>
          <li>
            <div id="icons">
              <AdminPanelSettingsIcon />
            </div>
            <div id="title">deconnection</div>
          </li>
          <li>
            <div id="icons">
              <AdminPanelSettingsIcon />
            </div>
            <div id="title">profil</div>
          </li>
        </ul>
      </div>
    </div>
  );
}
