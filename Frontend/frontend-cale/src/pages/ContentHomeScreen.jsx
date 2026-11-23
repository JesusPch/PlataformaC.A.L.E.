import "../styles/content-home-screen.css";
import { CardView } from "../styled_components/styled_components.js";
import StringsCale from "../constants/strings.js";
import { useSlideshow } from "../hooks/useSlidehow.js";
import logouas from "../assets/logo_uas.png";
import logocvf from "../assets/CVF_2029_SF.png";
import logocei from "../assets/Logo_CEI_SF.png";
import logocale from "../assets/LOGO_CALE.png";
import slidecale from "../assets/slidecale.jpg";
import imgslide1 from "../assets/slide1.jpeg";
import imgslide2 from "../assets/slide2.jpg";


function ContentHome() {
  const strings = StringsCale();
  const { slidesRef, indicadoresRef } = useSlideshow();

  return (
    <main className="principal-content">
      <CardView className="card-welcome-message">
        <article className="welcome-message">
          <h1 className="title-welcome-cale">{strings.titleWelcomeCale}</h1>
          <p>{strings.bodyWelcomeCale}</p>
          <p>
            <strong className="important-points">
              {strings.importantPointsTitle}:
            </strong>
          </p>
          <ol>
            <li>
              <p>{strings.importantPoints1}</p>
            </li>
            <li>
              <p>{strings.importantPoints2}</p>
            </li>
            <li>
              <p>{strings.importantPoints3}</p>
            </li>
            <li>
              <p>{strings.importantPoints4}</p>
            </li>
            <li>
              <p>{strings.importantPoints5}</p>
            </li>
            <li>
              <p>{strings.importantPoints6}</p>
            </li>
            <li>
              <p>{strings.importantPoints7}</p>
            </li>
            <li>
              <p>{strings.importantPoints8}</p>
            </li>
            <li>
              <p>{strings.importantPoints9}</p>
            </li>
          </ol>
        </article>
      </CardView>

      <article className="slide-and-mision">
        <div className="imgs">
          <div className="slideshow" id="slideshow">
            <div className="slides" id="slides" ref={slidesRef}>
              <div className="slide">
                <img src={imgslide1} alt="" />
              </div>
              <div className="slide">
                <img src={imgslide2} alt="" />
              </div>
              <div className="slide">
                <img src={slidecale} alt="" />
              </div>
            </div>
            <div className="indicadores" id="indicadores" ref={indicadoresRef}>
              <button className="indicador active"></button>
              <button className="indicador"></button>
              <button className="indicador"></button>
            </div>
          </div>
        </div>
      </article>

      <CardView className="mision">
        <article className="mision-content">
          <h4 className="label-mision">{strings.mision}</h4>
          <p className="text-mision">{strings.textMision}</p>
        </article>

        <div className="contenedor-imagenes-uas">
          <div className="logo-uas">
            <img src={logouas} alt="" />
            <img src={logocvf} alt="" />
            <img src={logocale} alt="" />
            <img src={logocei} alt="" />
          </div>
        </div>
      </CardView>
    </main>
  );
}

export default ContentHome;
