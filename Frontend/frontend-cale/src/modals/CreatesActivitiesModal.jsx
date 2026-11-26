import { useState } from "react";

import StringsCale from "../constants/strings";
import {
  ModalOverlayCale,
  ModalCardCale,
  ButtonCale,
  InputFormCale,
  InputSelectHours,
  CardView,
} from "../styled_components/styled_components";
import "../styles/create-activity-screen.css";

function CreateActivitiesModal({onClose}) {
  const [isOpen, setIsOpen] = useState(true);
  if (!isOpen) return null;

  const strings = StringsCale();

  return (
    <ModalOverlayCale className="modal-container">
      <ModalCardCale className="modal-activity">
        <div className="modal-header-top">
          <span
            className="material-symbols-outlined black-icon"
            onClick={onClose}
          >
            arrow_back
          </span>
          <h3>{strings.makeActivity}</h3>
        </div>

        <div className="form-container-modal">
          <InputFormCale
            type="text"
            placeholder={strings.nameActivity}
            className="inputs-create"
          />

          <div className="hours-required-styles">
            <InputSelectHours>
              <option value="" className="options">
                0h
              </option>
              <option value="" className="options">
                2h
              </option>
              <option value="" className="options">
                4h
              </option>
              <option value="" className="options">
                6h
              </option>
              <option value="" className="options">
                8h
              </option>
              <option value="" className="options">
                10h
              </option>
              <option value="" className="options">
                12h
              </option>
              <option value="" className="options">
                14h
              </option>
              <option value="" className="options">
                16h
              </option>
              <option value="" className="options">
                18h
              </option>
            </InputSelectHours>

            <p className="hours-label-text">{strings.hoursRequired}</p>
          </div>

          <h4 className="upload-subtitle">Adjunte el archivo o enlace de la actividad</h4>

          <input className="hide-input" type="file" />
          <CardView className="upload-pdf-container-styles">
            <h3>{strings.dragPDF}</h3>
            <ButtonCale type="button" className="btn-upload-activity">
              {strings.uploadImageButton}
              <span className="material-symbols-outlined">upload</span>
            </ButtonCale>
          </CardView>

          <InputFormCale
            type="text"
            placeholder={strings.placeHolderLink}
            className="inputs-create"
          />

          <ButtonCale className="btn-create-submit">
            {strings.createActivity}
          </ButtonCale>
        </div>
      </ModalCardCale>
    </ModalOverlayCale>
  );
}

export default CreateActivitiesModal;
