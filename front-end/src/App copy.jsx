import Calendar from "./compenent/calendar";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import RegisterProvider from "./compenent/rejister-provider";
import Login from "./compenent/login";
import AppLayout from "./compenent/AppLayout";
import ServiceCard from "./compenent/serviceCard";

function App() {
  return (
    <div>
      <BrowserRouter>
        <div className="contenu">
          <Routes>
            <Route element={<AppLayout />}>
              <Route path="/" element={<ServiceCard />} />
              <Route path="/register-provider" element={<RegisterProvider />} />

              <Route path="/login" element={<Login />} />
              <Route path="/date" element={<Calendar />} />
            </Route>
          </Routes>
        </div>
      </BrowserRouter>
    </div>
  );
}
export default App;
