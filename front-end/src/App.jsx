import BookingForm from "./compenent/BookingForm";
import Calendar from "./compenent/calendar";
import DshboardClient from "./compenent/DshboardClient";
import Navbar from "./compenent/navbar";
import "./assets/app.css";
import serviceCard from "./compenent/serviceCard";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import RegisterProvider from "./compenent/rejister-provider";
import { useState } from "react";
import Sidebar from "./compenent/sidebar";
import Login from "./compenent/login";

function App() {
  const [theme, setTheme] = useState("light");
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <div className={`app-container ${theme}`}>
      <BrowserRouter>
        <Navbar
          theme={theme}
          setTheme={setTheme}
          isMenuopen={isMenuOpen}
          setIsMenuOpen={setIsMenuOpen}
        />
        <div className="main">
          <div className="sidebar">
            <Sidebar isMenuopen={isMenuOpen} setIsMenuOpen={setIsMenuOpen} />
          </div>

          <div className="contenu">
            <Routes>
              <Route path="/register-provider" element={<RegisterProvider />} />
              <Route path="/services" element={<serviceCard />} />
              <Route path="/login" element={<Login />} />
              <Route path="/date" element={<Calendar />} />
            </Routes>
          </div>
        </div>
      </BrowserRouter>
    </div>
  );
}
export default App;
