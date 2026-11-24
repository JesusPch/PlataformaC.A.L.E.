import { useState } from "react";
import "../styles/exercise-log-screen.css";
import {
  CardView,
  ActivityCircle,
  ButtonCale,
  StatusCircleCale
} from "../styled_components/styled_components.js";
import StringsCale from "../constants/strings.js";
import pdfPrueba from "../assets/instrucciones-prueba.pdf";
import logoIlovepdf from "../assets/ilovepdf-logo.png";
import navegadores from "../assets/navegadores.png";
import googleBusqueda from "../assets/google-busqueda.png";
import wordAPdf from "../assets/word-a-pdf.png";
import wordAPdf2 from "../assets/word-a-pdf2.png";
import ViewGif from "../modals/ViewGifModal.jsx";
function StudentExerciseLogScreen() {
  const strings = StringsCale();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const toggleModel = () => {
    setIsModalOpen(!isModalOpen);
  };

  return (
    <section className="exercise-log">
      <article className="exercise-list">
        <p className="exercise-instruction">
          {strings.exerciseCardInstruction}
        </p>
        <div className="exercise-box">
          <div className="exercise-row">
            <ActivityCircle className="exercise-number">1.</ActivityCircle>
            <div className="exercise-info">
              <span>LISTENING | Everyday related topics B2</span>
              <div className="exercise-download">
                <a
                  href={pdfPrueba}
                  target="_blank"
                  rel="noreferrer"
                  aria-label="Ver PDF"
                >
                  {strings.pdfInstructions}
                  <span className="material-symbols-outlined icono-pdf">
                    picture_as_pdf
                  </span>
                </a>
              </div>
            </div>
            <ButtonCale as="label" className="btn-upload">
              {strings.btnSendFile}
              <span className="material-symbols-outlined">upload</span>
              <input type="file" accept="application/pdf" hidden />
            </ButtonCale>
            <StatusCircleCale className="sin-entregar" />
          </div>
          <div className="exercise-row">
            <ActivityCircle className="exercise-number">2.</ActivityCircle>
            <div className="exercise-info">
              <span>LISTENING | Everyday related topics C1</span>
              <div className="exercise-download">
                <a
                  href={pdfPrueba}
                  target="_blank"
                  rel="noreferrer"
                  aria-label="Ver PDF"
                >
                  {strings.pdfInstructions}
                  <span className="material-symbols-outlined icono-pdf">
                    picture_as_pdf
                  </span>
                </a>
              </div>
            </div>
            <ButtonCale as="label" className="btn-upload">
              {strings.btnSendFile}
              <span className="material-symbols-outlined">upload</span>
              <input type="file" accept="application/pdf" hidden />
            </ButtonCale>
            <StatusCircleCale className="autorizado" />
          </div>
          <div className="exercise-row">
            <ActivityCircle className="exercise-number">3.</ActivityCircle>
            <div className="exercise-info">
              <span>LISTENING : 6 minute English</span>
              <div className="exercise-download">
                <a
                  href={pdfPrueba}
                  target="_blank"
                  rel="noreferrer"
                  aria-label="Ver PDF"
                >
                  {strings.pdfInstructions}
                  <span className="material-symbols-outlined icono-pdf">
                    picture_as_pdf
                  </span>
                </a>
              </div>
            </div>
            <ButtonCale as="label" className="btn-upload">
              {strings.btnSendFile}
              <span className="material-symbols-outlined">upload</span>
              <input type="file" accept="application/pdf" hidden />
            </ButtonCale>
            <StatusCircleCale className="rechazado" />
          </div>
          <div className="exercise-row">
            <ActivityCircle className="exercise-number">4.</ActivityCircle>
            <div className="exercise-info">
              <span>Learning English for Work</span>
              <div className="exercise-download">
                <a
                  href={pdfPrueba}
                  target="_blank"
                  rel="noreferrer"
                  aria-label="Ver PDF"
                >
                  {strings.pdfInstructions}
                  <span className="material-symbols-outlined icono-pdf">
                    picture_as_pdf
                  </span>
                </a>
              </div>
            </div>
            <ButtonCale as="label" className="btn-upload">
              {strings.btnSendFile}
              <span className="material-symbols-outlined">upload</span>
              <input type="file" accept="application/pdf" hidden />
            </ButtonCale>
            <StatusCircleCale className="entregado" />
          </div>
          <div className="exercise-row">
            <ActivityCircle className="exercise-number">5.</ActivityCircle>
            <div className="exercise-info">
              <span>Learn about the UK and its culture</span>
              <div className="exercise-download">
                <a
                  href={pdfPrueba}
                  target="_blank"
                  rel="noreferrer"
                  aria-label="Ver PDF"
                >
                  {strings.pdfInstructions}
                  <span className="material-symbols-outlined icono-pdf">
                    picture_as_pdf
                  </span>
                </a>
              </div>
            </div>
            <ButtonCale as="label" className="btn-upload">
              {strings.btnSendFile}
              <span className="material-symbols-outlined">upload</span>
              <input type="file" accept="application/pdf" hidden />
            </ButtonCale>
            <StatusCircleCale className="autorizado" />
          </div>
          <div className="exercise-row">
            <ActivityCircle className="exercise-number">6.</ActivityCircle>
            <div className="exercise-info">
              <span>English for Emails</span>
              <div className="exercise-download">
                <a
                  href={pdfPrueba}
                  target="_blank"
                  rel="noreferrer"
                  aria-label="Ver PDF"
                >
                  {strings.pdfInstructions}
                  <span className="material-symbols-outlined icono-pdf">
                    picture_as_pdf
                  </span>
                </a>
              </div>
            </div>
            <ButtonCale as="label" className="btn-upload">
              {strings.btnSendFile}
              <span className="material-symbols-outlined">upload</span>
              <input type="file" accept="application/pdf" hidden />
            </ButtonCale>
            <StatusCircleCale className="rechazado" />
          </div>
          <div className="exercise-row">
            <ActivityCircle className="exercise-number">7.</ActivityCircle>
            <div className="exercise-info">
              <span>B1-B2 Grammar</span>
              <div className="exercise-download">
                <a
                  href={pdfPrueba}
                  target="_blank"
                  rel="noreferrer"
                  aria-label="Ver PDF"
                >
                  {strings.pdfInstructions}
                  <span className="material-symbols-outlined icono-pdf">
                    picture_as_pdf
                  </span>
                </a>
              </div>
            </div>
            <ButtonCale as="label" className="btn-upload">
              {strings.btnSendFile}
              <span className="material-symbols-outlined">upload</span>
              <input type="file" accept="application/pdf" hidden />
            </ButtonCale>
            <StatusCircleCale className="autorizado" />
          </div>
        </div>
      </article>

      <article className="exercise-status">
        <div className="status-card">
          <h3>{strings.activityStatusTitle}</h3>
          <div className="status-item">
            <StatusCircleCale className="sin-entregar" />
            <span>{strings.statusNotSent}</span>
          </div>
          <div className="status-item">
            <StatusCircleCale className="autorizado" />
            <span>{strings.statusAuthorized}</span>
          </div>
          <div className="status-item">
            <StatusCircleCale className="entregado" />
            <span>{strings.statusSent}</span>
          </div>
          <div className="status-item">
            <StatusCircleCale className="rechazado" />
            <span>{strings.statusRejected}</span>
          </div>
        </div>
        <ButtonCale className="btn-gif" onClick={toggleModel}>
          {strings.btnSeeGif}
          <span className="material-symbols-outlined">gif_box</span>
        </ButtonCale>
      </article>

      <CardView className="pdf-guide">
        <h3>{strings.pdfGuideTitle}</h3>
        <h3>{strings.pdfGuideSubtitle}</h3>
        <img
          src={logoIlovepdf}
          alt={strings.altIlovepdfLogo}
          className="guide-logo"
        />
        <ol>
          <li>
            {strings.pdfGuideStep1}
            <img
              src={navegadores}
              alt={strings.altBrowsers}
              className="guide-image"
            />
          </li>
          <li>
            {strings.pdfGuideStep2}{" "}
            <a
              href="https://www.ilovepdf.com/es"
              target="_blank"
              rel="noreferrer"
            >
              https://www.ilovepdf.com/es
            </a>
            <img
              src={googleBusqueda}
              alt={strings.altGoogleSearch}
              className="guide-image"
            />
          </li>
          <li>
            {strings.pdfGuideStep3}
            <div className="guide-images">
              <img src={wordAPdf} alt={strings.altWordToPdf} />
              <img src={wordAPdf2} alt={strings.altWordToPdfButton} />
            </div>
          </li>
          <li>
            {strings.pdfGuideStep4Start}{" "}
            <strong>{strings.pdfGuideStep4Bold}</strong> {strings.pdfGuideStep4}
          </li>
          <li>{strings.pdfGuideStep5}</li>
          <li>{strings.pdfGuideStep6}</li>
        </ol>
      </CardView>

      {isModalOpen && <ViewGif onClose={() => setIsModalOpen(false)} />}
    </section>
  );
}

export default StudentExerciseLogScreen;
