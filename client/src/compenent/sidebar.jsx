import React from "react";
import "../assets/sidebar.css";
import LineAxisIcon from "@mui/icons-material/LineAxis";
import HomeFilledIcon from "@mui/icons-material/HomeFilled";
import BookmarkAddedIcon from "@mui/icons-material/BookmarkAdded";
import AdminPanelSettingsIcon from "@mui/icons-material/AdminPanelSettings";
import SettingsIcon from "@mui/icons-material/Settings";
import { Link } from "react-router-dom";
export default function Sidebar({ isMenuopen }) {
  console.log(isMenuopen);
  const data = [
    {
      title: "Home",
      icon: <HomeFilledIcon />,
      link: "/",
    },
    {
      title: "Dashboard",
      icon: <LineAxisIcon />,
      link: "/Dashbord",
    },
    {
      title: "Booking",
      icon: <BookmarkAddedIcon />,
      link: "/booking",
    },
    {
      title: "Admin panel",
      icon: <AdminPanelSettingsIcon />,
      link: "/admin",
    },
    {
      title: "Setting",
      icon: <SettingsIcon />,
      link: "/Setting",
    },
  ];

  return (
    <div className={`sidebar ${isMenuopen ? "active" : ""}`}>
      <div>
        <ul>
          {data.map((e) => {
            return (
              <li>
                <div className="icons">{e.icon}</div>
                <div className="title">
                  <Link to={e.link}>{e.title}</Link>
                </div>
              </li>
            );
          })}
        </ul>
      </div>
    </div>
    /*<div className={`sidebar ${isMenuopen ? "active" : ""}`}>
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
    </div>*/
  );
}
