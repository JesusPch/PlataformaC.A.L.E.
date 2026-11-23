import { useNavigate } from "react-router-dom";
import StringsCale from "../constants/strings.js";
import {
  ModalOverlayCale,
  ModalCardCale,
  ModalButtonCale,
} from "../styled_components/styled_components.js";

function LogoutModal({ onClose }) {
  const navigate = useNavigate();
  const strings = StringsCale();

  const handleConfirm = () => {
    localStorage.removeItem("token");
    navigate("/");
  };

  return (
    <ModalOverlayCale onClick={onClose}>
      <ModalCardCale onClick={(e) => e.stopPropagation()}>
        <h2>{strings.logoutTitle}</h2>
        <div className="modal-actions">
          <ModalButtonCale onClick={onClose}>{strings.btnCancel}</ModalButtonCale>
          <ModalButtonCale className="btn-salir" onClick={handleConfirm}>
            {strings.btnLogout}
          </ModalButtonCale>
        </div>
      </ModalCardCale>
    </ModalOverlayCale>
  );
}

export default LogoutModal;