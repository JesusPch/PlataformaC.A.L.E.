import { useState } from "react";
import {
  ModalOverlayCale,
  ModalPDFCardCale,
} from "../styled_components/styled_components";
import StringsCale from "../constants/strings";
import PDFfile from "../assets/pdf/Proyecto-de-Trabajo-Brigadista.pdf"

function ViewPDF({onClose}) {
  const strings = StringsCale();
  const [isOpen, setIsOpen] = useState(true);
  if (!isOpen) return null;
  return (
    <ModalOverlayCale>
      <ModalPDFCardCale className="pdf-modal">
        <div className="pdf-modal-container">
          <div className="pdf-modal-header">
            <div>
              <span className="material-symbols-outlined docs-icon">docs</span>
              <span className="modal-title">Vista de archivo de actividad</span>
            </div>
            <span onClick={onClose} className="material-symbols-outlined close-icon">close</span>
          </div>
          <div className="pdf-container">
            <embed className="pdf-viewer" src={PDFfile} type="application/pdf"/>
          </div>
        </div>
      </ModalPDFCardCale>
    </ModalOverlayCale>
  );
}

export default ViewPDF;
