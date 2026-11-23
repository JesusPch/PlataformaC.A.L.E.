import { useNavigate } from "react-router-dom";
import StringsCale from "../constants/strings.js";
import {
  ModalOverlayCale,
  ModalCardCale,
  ModalButtonCale,
} from "../styled_components/styled_components.js";

function DeleteDateModal({ onClose }) {
  const strings = StringsCale();

  return (
    <ModalOverlayCale onClick={onClose}>
      <ModalCardCale onClick={(e) => e.stopPropagation()}>
        <h2>{strings.deleteDateTitle}</h2>
        <div className="modal-actions">
          <ModalButtonCale onClick={onClose}>{strings.btnCancel}</ModalButtonCale>
          <ModalButtonCale className="btn-salir" onClick={onClose}>
            {strings.btnDelete}
          </ModalButtonCale>
        </div>
      </ModalCardCale>
    </ModalOverlayCale>
  );
}

export default DeleteDateModal;