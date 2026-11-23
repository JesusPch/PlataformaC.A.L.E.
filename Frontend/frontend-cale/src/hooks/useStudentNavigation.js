import { useLocation, useNavigate } from "react-router-dom";
export function useStudentNavigation() {
  const navigate = useNavigate();
  const { pathname } = useLocation();
  const currentPath = pathname.replace(/\/+$/, "");

  const isHomeActive = currentPath === "/logged/alumnos";
  const isBitacoraActive = currentPath === "/logged/alumnos/bitacora";
  const isRuleActive = currentPath === "/logged/alumnos/reglamento";

  return {
    navigate,
    isHomeActive,
    isBitacoraActive,
    isRuleActive,
    goToHome: () => navigate("/logged/alumnos"),
    goToBitacora: () => navigate("/logged/alumnos/bitacora"),
    goToReglamento: () => navigate("/logged/alumnos/reglamento"),
  };
}
