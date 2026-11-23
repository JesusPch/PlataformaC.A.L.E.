import { useNavigate } from "react-router-dom";

export function useSendRequest() {
  const navigate = useNavigate();
  const handleRedirect = () => {
    navigate("/registro/peticion-de-inscripcion-enviada");
  };

  return {handleRedirect};
}
