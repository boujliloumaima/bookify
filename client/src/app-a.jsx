import { BrowserRouter, Route, Routes } from "react-router-dom";
import RegisterProvider from "./compenent/rejister";
import AppLayout from "./compenent/AppLayout";
import ServiceCard from "./compenent/serviceCard";
import Loginpage from "./pages/loginpage";
import Profil from "./compenent/profil";
import Calendar from "./compenent/calendar";
import ServiceForm from "./pages/serviceForm";

function App() {
  return (
    <div>
      <BrowserRouter>
        <Routes>
          <Route path="/login" element={<Loginpage />} />

          <Route
            path="register-provider/:inscrimode"
            element={<RegisterProvider />}
          />
          <Route path="/calendar" element={<Calendar />} />
          <Route path="/profil" element={<Profil />} />
          <Route path="/register" element={<RegisterProvider />} />
          <Route element={<AppLayout />}>
            <Route index="/" element={<ServiceCard />} />
            <Route path="/service" element={<ServiceForm />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </div>
  );
}
export default App;
