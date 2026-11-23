import { useState } from "react";   
import "../styles/students-view-screen.css";
import LogoutModal from "../modals/LogoutModal.jsx";
import {
  HeaderCale,
  SideBarCale,
  Dashboard,
  Navbuttons,
} from "../styled_components/styled_components.js";
import ExerciseLogPage from "./ExerciseLogScreen.jsx";
import HomeContentPage from "./ContentHomeScreen.jsx";
import RuleContentPage from "./RuleContentScreen.jsx";
import StringsCale from "../constants/strings.js";
 import { Route, Routes } from "react-router-dom";
import { useStudentNavigation } from "../hooks/useStudentNavigation.js";
import logouas from "../assets/logo_uas.png";
import logocvf from "../assets/CVF_2029_SF.png";
import logocei from "../assets/Logo_CEI_SF.png";
import logocale from "../assets/LOGO_CALE.png";

function HomeScreen() {
  const [showModal, setShowModal] = useState(false);
  const {
    isHomeActive,
    isBitacoraActive,
    isRuleActive,
    goToHome,
    goToBitacora,
    goToReglamento,
  } = useStudentNavigation();

  const strings = StringsCale();

  return (
    <div className="logged-grid-screen">
      <SideBarCale className="sidebar">
        <div className="contenido_sidebar">
          <img src={logouas} alt="logo uas" className="logouas_side" />
          <div className="romboide">
            <img src={logocvf} alt="logo cvf2029" className="logocvf_side" />
          </div>
          <img src={logocei} alt="logo cei" className="logocei_side" />
          <img src={logocale} alt="logo cale" className="logocale_side" />
        </div>
      </SideBarCale>
      <HeaderCale className="headerAlumnos">
        <div className="header_sup_izq">
          <p className="encabezado">{strings.titleApplication}</p>
        </div>
        <div className="header_sup_der">
          <span className="user_name">nombre_usuario</span>
          <span className="material-symbols-outlined iconos" onClick={() => setShowModal(true)} > Logout </span>
        </div>
        <div className="header_centro">
          <p className="subtitulo_cei">{strings.subtitleHeader}</p>
        </div>
        <div className="header_inferior">
          <br />
        </div>
      </HeaderCale>
      <main className="contenido-body">
        <Dashboard>
          <Navbuttons
            $active={isHomeActive}
            aria-current={isHomeActive ? "page" : undefined}
            onClick={goToHome}
          >
            <span className="material-symbols-outlined iconos"> home </span>
            <span>{strings.navHome}</span>
          </Navbuttons>
          <Navbuttons
            $active={isBitacoraActive}
            aria-current={isBitacoraActive ? "page" : undefined}
            onClick={goToBitacora}
          >
            <span className="material-symbols-outlined iconos">
              {" "}
              checklist{" "}
            </span>
            <span>{strings.navExercises}</span>
          </Navbuttons>
          <Navbuttons
            $active={isRuleActive}
            aria-current={isRuleActive ? "page" : undefined}
            onClick={goToReglamento}
          >
            <span className="material-symbols-outlined iconos"> gavel </span>
            <span>{strings.navRule}</span>
          </Navbuttons>
        </Dashboard>

        <article className="contenido-dinamico">
          <Routes>
            <Route index element={<HomeContentPage />} />
            <Route path="bitacora" element={<ExerciseLogPage />} />
            <Route path="reglamento" element={<RuleContentPage />} />
          </Routes>
        </article>
      </main>
      {showModal && <LogoutModal onClose={() => setShowModal(false)} />}
    </div>
  );
}

export default HomeScreen;
