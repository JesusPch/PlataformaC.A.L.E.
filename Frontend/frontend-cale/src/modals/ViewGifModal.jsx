
import {
  ModalOverlayCale,
  ModalGifCardCale,
} from "../styled_components/styled_components";
import StringsCale from "../constants/strings";
import iLovepdfGif from "../assets/ilovepdf_tutorial.gif";

function ViewGif({ onClose }) {
  const strings = StringsCale();

  return (
    <ModalOverlayCale onClick={onClose}>
      <ModalGifCardCale>
        <button
          onClick={onClose}
          style={{
            background: "none",
            border: "none",
            cursor: "pointer",
            padding: "10px",
          }}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="16"
            height="16"
            fill="currentColor"
            className="bi bi-x-lg"
            viewBox="0 0 16 16"
          >
            <path d="M2.146 2.854a.5.5 0 1 1 .708-.708L8 7.293l5.146-5.147a.5.5 0 0 1 .708.708L8.707 8l5.147 5.146a.5.5 0 0 1-.708.708L8 8.707l-5.146 5.147a.5.5 0 0 1-.708-.708L7.293 8z" />
          </svg>
        </button>

        <img
          src={iLovepdfGif}
          alt={strings.altIlovepdfLogo}
          className="gif-styles"
        />
      </ModalGifCardCale>
    </ModalOverlayCale>
  );
}

export default ViewGif;
