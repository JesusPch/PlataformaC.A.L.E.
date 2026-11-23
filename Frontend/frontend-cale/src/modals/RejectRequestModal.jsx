import { useNavigate } from "react-router-dom";
import StringsCale from "../constants/strings.js";
import {
  ModalOverlayCale,
  ModalCardCale,
  ModalButtonCale,
  TextAreaCale
} from "../styled_components/styled_components.js";

function RejectRequestModal({ onClose }) {
  const strings = StringsCale();

  return (
    <ModalOverlayCale onClick={onClose}>
      <ModalCardCale onClick={(e) => e.stopPropagation()}>
        <h2>{strings.rejectRequestTitle}</h2>
        <div className="modal-actions">
          <TextAreaCale className="input-reason" placeholder={strings.rejectReasonPlaceholder}></TextAreaCale>
          <ModalButtonCale className="btn-cancelar" onClick={onClose}>{strings.btnCancel}</ModalButtonCale>
          <ModalButtonCale className="btn-salir" onClick={onClose}>
            {strings.btnReject}
          </ModalButtonCale>
        </div>
      </ModalCardCale>
    </ModalOverlayCale>
  );
}

export default RejectRequestModal;