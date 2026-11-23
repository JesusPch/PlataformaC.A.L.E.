import StringsCale from "../constants/strings.js";
import {
  HeaderLoginCale,
  CardView,
} from "../styled_components/styled_components.js";
import {
  RhomboidContent,
  RhomboidWithUasLogos,
  UasLogos,
} from "../styled_components/specific-styled-components.js";
import logouas from "../assets/logo_uas.png";
import logocvf from "../assets/CVF_2029_SF.png";
import logocei from "../assets/Logo_CEI_SF.png";
import logocale from "../assets/LOGO_CALE.png";
import { Link } from "react-router-dom";
import "../styles/registration-request-sent.css";

function RegistrationRequestSent() {
  const strings = StringsCale();
  return (
    <div className="grid-container">
      <HeaderLoginCale className="header">
        <h1>{strings.titleApplication}</h1>
        <RhomboidWithUasLogos>
          <RhomboidContent>
            <UasLogos src={logouas} alt="" />
            <UasLogos src={logocvf} alt="" />
            <UasLogos src={logocei} alt="" />
            <UasLogos src={logocale} alt="" />
          </RhomboidContent>
        </RhomboidWithUasLogos>
      </HeaderLoginCale>

      <div className="main">
        <CardView className="cardlogin-request">
          <div className="registration-sent-content">
            <Link to="/" className="button-return">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="16"
                height="16"
                fill="currentColor"
                className="bi bi-arrow-left"
                viewBox="0 0 16 16"
              >
                <path
                  fillRule="evenodd"
                  d="M15 8a.5.5 0 0 0-.5-.5H2.707l3.147-3.146a.5.5 0 1 0-.708-.708l-4 4a.5.5 0 0 0 0 .708l4 4a.5.5 0 0 0 .708-.708L2.707 8.5H14.5A.5.5 0 0 0 15 8"
                />
              </svg>
            </Link>
            <div className="logo-center-container">
              <img src={logocei} alt="logo cale" className="logocale-login" />
            </div>
            <h4 className="h4-cale">{strings.registrationRequestSent}</h4>
            <p>{strings.requestIndication}</p>
            <p>{strings.requestIndicationError}</p>
          </div>
        </CardView>
      </div>
    </div>
  );
}

export default RegistrationRequestSent;
