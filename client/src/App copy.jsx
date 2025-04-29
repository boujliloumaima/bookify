import { BrowserRouter, Route, Routes } from "react-router-dom";
import RegisterProvider from "./compenent/rejister";
import Login from "./compenent/login";
import AppLayout from "./compenent/AppLayout";
import ServiceCard from "./compenent/serviceCard";
import Loginpage from "./pages/loginpage";

function App() {
  return (
    <div>
      <BrowserRouter>
        <div className="contenu">
          <Routes>
            <Route element={<AppLayout />}>
              <Route path="/" element={<ServiceCard />} />
              <Route
                path="register-provider/:inscrimode"
                element={<RegisterProvider />}
              />
              <Route path="/login" element={<Login />} />
            </Route>
          </Routes>
        </div>
      </BrowserRouter>
    </div>
  );
}
export default App;
