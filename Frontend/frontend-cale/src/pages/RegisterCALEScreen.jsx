import { useRef } from "react";
import { useCaleSelects } from "../hooks/useCaleSelects.js";
import { useSendRequest } from "../hooks/useSendRequest.js";
import { useRegisterValidation } from "../hooks/useRegisterValidation.js";
import { Link } from "react-router-dom";
import "../styles/register-cale-screen.css";
import StringsCale from "../constants/strings.js";
import {
  CardView,
  HeaderLoginCale,
  ButtonCale,
  InputFormCale,
  InputSelectCale,
  BtnRemoveFilesRegister,
  ContainerPreviewFilesRegister,
  InputsError,
  InputErrorFile,
  ChangeFileIndicator,
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

function App() {
  const { handleRedirect } = useSendRequest();
  const {
    formData,
    errors,
    isSubmitting,
    submitError,
    handleChange,
    handleSubmit,
    handleFileChange,
  } = useRegisterValidation(handleRedirect);
  const { levelOptions, modalOptions } = useCaleSelects();
  const strings = StringsCale();

  const fileInputRef = useRef(null);
  const handleRemoveFile = () => {
    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
    handleFileChange({ target: { files: [] } });

    setTimeout(() => {
      fileInputRef.current?.click();
    }, 100);
  };

  return (
    <div className="grid-screen-register">
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
        <CardView className="cardlogin" as="form" onSubmit={handleSubmit}>
          <div className="column1">
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

            <UasLogos src={logocale} className="logo-cale" />
            <h4 className="h4-cale">{strings.formRegisterTitle}</h4>

            <p className="form-register-indicator">
              {strings.formRegisterIndicator}
            </p>

            <div className="form-register-cale">
              <div>
                <InputFormCale
                  type="text"
                  name="name"
                  id="input-name"
                  placeholder={strings.placeHolderStudentName}
                  value={formData.name}
                  onChange={handleChange}
                  className="place-holder-name"
                />
                {errors.name && <InputsError>{errors.name}</InputsError>}
              </div>

              <div>
                <InputFormCale
                  type="text"
                  name="lastname"
                  id="input-lastname"
                  placeholder={strings.placeHolderStudentLastName}
                  value={formData.lastname}
                  onChange={handleChange}
                  className="place-holder-lastname"
                />
                {errors.lastname && (
                  <InputsError>{errors.lastname}</InputsError>
                )}
              </div>

              <div>
                <InputFormCale
                  type="email"
                  name="email"
                  id="input-email"
                  placeholder={strings.placeHolderStudentEmail}
                  value={formData.email}
                  onChange={handleChange}
                  className="place-holder-email"
                />
                {errors.email && <InputsError>{errors.email}</InputsError>}
              </div>

              <div>
                <InputFormCale
                  type="text"
                  name="accountnumber"
                  id="input-accountnumber"
                  placeholder={strings.placeHolderStudentAccountNumber}
                  value={formData.accountnumber}
                  onChange={handleChange}
                  className="place-holder-accountnumber"
                />
                {errors.accountnumber && (
                  <InputsError>{errors.accountnumber}</InputsError>
                )}
              </div>

              <div>
                <InputFormCale
                  type="text"
                  name="telephonenumber"
                  id="input-telephonenumber"
                  placeholder={strings.placeHolderStudentTelephoneNumber}
                  value={formData.telephonenumber}
                  onChange={handleChange}
                  className="place-holder-telephonenumber"
                />
                {errors.telephonenumber && (
                  <InputsError>{errors.telephonenumber}</InputsError>
                )}
              </div>

              <div>
                <InputFormCale
                  type="number"
                  name="age"
                  id="input-age"
                  placeholder={strings.placeHolderStudentAge}
                  value={formData.age}
                  onChange={handleChange}
                  className="place-holder-age"
                />
                {errors.age && <InputsError>{errors.age}</InputsError>}
              </div>

              <div>
                <InputSelectCale
                  name="level"
                  id="levels"
                  value={formData.level}
                  onChange={handleChange}
                  className="place-holder-level"
                >
                  <option value="">{strings.placeHolderStudentLevel}</option>
                  {levelOptions.map((opt) => (
                    <option key={opt.value} value={opt.value}>
                      {opt.label}
                    </option>
                  ))}
                </InputSelectCale>
                {errors.level && <InputsError>{errors.level}</InputsError>}
              </div>

              <div>
                <InputSelectCale
                  name="modal"
                  id="modals"
                  value={formData.modal}
                  onChange={handleChange}
                  className="place-holder-modal"
                >
                  <option value="">{strings.placeHolderStudentModal}</option>
                  {modalOptions.map((opt) => (
                    <option key={opt.value} value={opt.value}>
                      {opt.label}
                    </option>
                  ))}
                </InputSelectCale>
                {errors.modal && <InputsError>{errors.modal}</InputsError>}
              </div>

              <div style={{ gridColumn: "span 2" }}>
                <InputFormCale
                  type="password"
                  name="password"
                  id="input-password"
                  placeholder={strings.placeHolderStudentPassword}
                  value={formData.password}
                  onChange={handleChange}
                />
                {errors.password && (
                  <InputsError>{errors.password}</InputsError>
                )}
              </div>
            </div>
          </div>

          <div className="column2">
            <p className="form-upload-img-indicator">
              {strings.formUploadImageIndicator}
            </p>

            <input
              type="file"
              accept="application/pdf"
              ref={fileInputRef}
              style={{ display: "none" }}
              onChange={handleFileChange}
            />

            <CardView className="card-upload-image">
              {!formData.file ? (
                <>
                  <p className="upload-text-indicator">
                    {strings.uploadTextIndicator}
                  </p>
                  <ButtonCale
                    type="button"
                    className="upload-button"
                    onClick={() => fileInputRef.current?.click()}
                  >
                    {strings.uploadImageButton}

                    <div className="attach-icon">
                      <span className="material-symbols-outlined">
                        attach_file
                      </span>
                    </div>
                  </ButtonCale>
                </>
              ) : (
                <ContainerPreviewFilesRegister>
                  <span className="material-symbols-outlined">
                    file_present
                  </span>

                  <ChangeFileIndicator>
                    {formData.file.name}
                  </ChangeFileIndicator>

                  <BtnRemoveFilesRegister
                    type="button"
                    onClick={handleRemoveFile}
                  >
                    {strings.changeFile}
                  </BtnRemoveFilesRegister>
                </ContainerPreviewFilesRegister>
              )}
            </CardView>
            {errors.file && <InputErrorFile>{errors.file}</InputErrorFile>}

            <ButtonCale
              className="send-request-btn"
              type="submit"
              disabled={isSubmitting}
            >
              {isSubmitting ? "Enviando..." : strings.sendRequest}
            </ButtonCale>
            {submitError && (
              <InputErrorFile role="alert">{submitError}</InputErrorFile>
            )}
          </div>
        </CardView>
      </div>
    </div>
  );
}

export default App;
