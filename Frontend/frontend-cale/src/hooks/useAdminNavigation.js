import { useLocation, useNavigate } from "react-router-dom";
export function useAdminNavigation() {
  const navigate = useNavigate();
  const { pathname } = useLocation();
  const currentPath = pathname.replace(/\/+$/, "");

  const isActivitiesActive = currentPath === "/logged/admin";
  const isRequestsActive = currentPath === "/logged/admin/peticiones";
  const isStudentActivityActive = currentPath === "/logged/admin/actividades=#";
  const isStudentAttendanceActive = currentPath === "/logged/admin/actividades=#-asistencia";

  return {
    navigate,
    isActivitiesActive,
    isRequestsActive,
    isStudentActivityActive,
    isStudentAttendanceActive,
    goToActivities: () => navigate("/logged/admin"),
    goToRequests: () => navigate("/logged/admin/peticiones"),
    goToStudentActivities: () => navigate("/logged/admin/actividades/#"),
    goToStudentAttendance: () => navigate("/logged/admin/actividades/#-asistencia"),
  };
}