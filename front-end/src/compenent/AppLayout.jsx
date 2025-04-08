import React, { useState } from "react";
import Navbar from "./navbar";
import Sidebar from "./sidebar";
import { Outlet } from "react-router-dom";
import "../assets/appLaout.css";
export default function AppLayout() {
  const [theme, setTheme] = useState("light");
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <div className={`app-container ${theme}`}>
      <Navbar
        theme={theme}
        setTheme={setTheme}
        isMenuopen={isMenuOpen}
        setIsMenuOpen={setIsMenuOpen}
      />
      <Sidebar
        isMenuopen={isMenuOpen}
        setIsMenuOpen={setIsMenuOpen}
        className="sidebar"
      />

      <main className="contenu">
        <Outlet />
      </main>
    </div>
  );
}
