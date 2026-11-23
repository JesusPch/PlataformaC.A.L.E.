import { useState } from "react";
import "./App.css";
import { BrowserRouter, Route, Routes, Link } from "react-router-dom";
import LoginScreen from "./pages/LogInScreen";
import RegisterStudentScreen from "./pages/RegisterCALEScreen";
import RegistrationStudentRequestSent from "./pages/RegistrationRequestSent";
import HomeStudentScreen from "./pages/HomeScreen";
import ExerciseLogScreen from "./pages/ExerciseLogScreen";
import RuleContentScreen from "./pages/RuleContentScreen";
import AdminHomePage from "./pages/AdminHomeScreen";

function App() {
  const [count, setCount] = useState(0);

  return (
    <div>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<LoginScreen />}></Route>
          <Route path="/registro" element={<RegisterStudentScreen />}></Route>
          <Route
            path="/registro/peticion-de-inscripcion-enviada"
            element={<RegistrationStudentRequestSent />}
          ></Route>
          <Route path="/logged/alumnos/*" element={<HomeStudentScreen />}></Route>
          <Route path="/logged/admin/*" element={<AdminHomePage />}></Route>
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
