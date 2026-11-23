import { useNavigate } from "react-router-dom";
import StringsCale from "../constants/strings.js";
import {
    ModalOverlayCale,
    ModalCardCale,
    ModalButtonCale,
    InputSelectCale
} from "../styled_components/styled_components.js";

function AddDateModal({ onClose }) {
    const strings = StringsCale();

    return (
        <ModalOverlayCale onClick={onClose}>
            <ModalCardCale onClick={(e) => e.stopPropagation()}>
                <h2>{strings.rejectRequestTitle}</h2>
                <div className="modal-actions">
                    <InputSelectCale placeHolder="Día"></InputSelectCale>
                    <InputSelectCale placeHolder="Més"></InputSelectCale>
                    <InputSelectCale placeHolder="Año "></InputSelectCale>
                    <ModalButtonCale className="btn-cancelar" onClick={onClose}>{strings.btnCancel}</ModalButtonCale>
                    <ModalButtonCale className="btn-salir" onClick={onClose}>
                        {strings.btnReject}
                    </ModalButtonCale>
                </div>
            </ModalCardCale>
        </ModalOverlayCale>
    );
}

export default AddDataModal;