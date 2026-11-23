import { useState } from "react";
import { useAdminNavigation } from "../hooks/useAdminNavigation.js";
import "../styles/students-view-screen.css";
import "../index.css";
import StringsCale from "../constants/strings.js";
import logouas from "../assets/Logo_UAS_SF_1200x1539.png";
import logocale from "../assets/LOGO_CALE.png";
import logocei from "../assets/Logo_CEI_SF.png";
import logocvf from "../assets/CVF_2029_SF.png";
import { HeaderCale, SideBarCale, Dashboard, Navbuttons } from "../styled_components/styled_components.js";
import ActivitiesContentPage from "./ActivitiesContentScreen.jsx";
import RequestsContentPage from "./RequestContentScreen.jsx";
import { Route, Routes, useLocation, useNavigate } from "react-router-dom";
import LogoutModal from "../modals/LogoutModal.jsx";

function AdminHomeScreen() {
  const [showModal, setShowModal] = useState(false);
  const {
    isActivitiesActive,
    isRequestsActive,
    goToActivities,
    goToRequests,
  } = useAdminNavigation();
  
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
          <span className="user_name">nombre_administrador</span>
          <span className="material-symbols-outlined logout-icon" onClick={() => setShowModal(true)} > Logout </span>
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
            $active={isActivitiesActive}
            aria-current={isActivitiesActive ? "page" : undefined}
            onClick={goToActivities}
          >
            <span className="material-symbols-outlined iconos"> assignment </span>
            <span>{strings.navActivities}</span>
          </Navbuttons>
          <Navbuttons
            $active={isRequestsActive}
            aria-current={isRequestsActive ? "page" : undefined}
            onClick={goToRequests}
          >
            <span className="material-symbols-outlined iconos"> playlist_add_check </span>
            <span>{strings.navRequests}</span>
          </Navbuttons>
        </Dashboard>

        <article className="contenido-dinamico">
          <Routes>
            <Route index element={<ActivitiesContentPage />} />
            <Route path="peticiones" element={<RequestsContentPage />} />
          </Routes>
        </article>
      </main>
      {showModal && <LogoutModal onClose={() => setShowModal(false)} />}
    </div>
  );
}

export default AdminHomeScreen;