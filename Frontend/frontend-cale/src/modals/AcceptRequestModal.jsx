import { useNavigate } from "react-router-dom";
import StringsCale from "../constants/strings.js";
import {
  ModalOverlayCale,
  ModalCardCale,
  ModalButtonCale,
} from "../styled_components/styled_components.js";

function AcceptRequestModal({ onClose }) {
  const strings = StringsCale();

  return (
    <ModalOverlayCale onClick={onClose}>
      <ModalCardCale onClick={(e) => e.stopPropagation()}>
        <h2>{strings.acceptRequestTitle}</h2>
        <div className="modal-actions">
          <ModalButtonCale onClick={onClose}>{strings.btnCancel}</ModalButtonCale>
          <ModalButtonCale style={{ background: "var(--color-azulUas)", color: "white" }} onClick={onClose}>
            {strings.btnAccept}
          </ModalButtonCale>
        </div>
      </ModalCardCale>
    </ModalOverlayCale>
  );
}

export default AcceptRequestModal;