import Navbar from "./navbar";
import Sidebar from "./sidebar";
import { Outlet } from "react-router-dom";
import "../assets/appLaout.css";
import ThemeContext from "./themecontext";
import { useContext, useState } from "react";
export default function AppLayout() {
  /* const [theme, setTheme] = useState("light");*/
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { theme } = useContext(ThemeContext);
  return (
    <div className={`app-container ${theme}`}>
      <Navbar isMenuopen={isMenuOpen} setIsMenuOpen={setIsMenuOpen} />
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
