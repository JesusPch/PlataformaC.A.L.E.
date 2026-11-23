import StringsCale from "../constants/strings.js";
import {
  HeaderLoginCale,
  ToggleButtonContainer,
  InputToggleButton,
  LabelToggleButton,
  InputFormCale,
  ButtonCale,
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
import background from "../assets/background_CALE.jpg";
import { Link } from "react-router-dom";
import "../styles/login-screen.css";

function LogIn() {
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
        <CardView className="cardlogin">
          <img src={logocale} alt="logo cale" className="logocale-login" />
          <h4 className="h4-cale">{strings.nameCALE}</h4>
          <div className="contenedor-toggle-buttons">
            <span className="tag-alumno">{strings.loginRoleStudent}</span>
            <ToggleButtonContainer>
              <InputToggleButton type="checkbox" id="alumnos" />
              <LabelToggleButton htmlFor="alumnos"></LabelToggleButton>
            </ToggleButtonContainer>

            <span className="tag-administracion">
              {strings.loginRoleAdministrator}
            </span>
            <ToggleButtonContainer>
              <InputToggleButton type="checkbox" id="administrador" />
              <LabelToggleButton htmlFor="administrador"></LabelToggleButton>
            </ToggleButtonContainer>
          </div>
          <InputFormCale
            placeholder={strings.placeHolderStudentAccountNumber}
            className="input"
          />
          <InputFormCale
            type="password"
            placeholder={strings.placeHolderStudentPassword}
            className="input"
          />
          <ButtonCale className="buttoncale">
            {strings.loginButtonText}
          </ButtonCale>
          <Link to="/registro" className="iralformularioderegistro">
            <h5>{strings.registerGoToLink}</h5>
          </Link>
        </CardView>
      </div>
    </div>
  );
}

export default LogIn;
