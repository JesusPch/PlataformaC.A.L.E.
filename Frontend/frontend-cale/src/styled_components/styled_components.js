import styled from "styled-components";
import background from "../assets/background_CALE.jpg";

export const ButtonCale = styled.button`
  width: 100%;
  max-width: 500px;
  height: 54px;
  border-radius: 8px;
  background: var(--color-azulUas);
  border: none;
  color: var(--color-blanco);
  font-family: "Montserrat", sans-serif;
  font-size: 16px;
  cursor: pointer;
  box-shadow:
    rgba(50, 50, 93, 0.25) 0px 6px 12px -2px,
    rgba(0, 0, 0, 0.3) 0px 3px 7px -3px;
  &:hover {
    background: var(--color-azulUasHover);
  }
`;

export const SideBarCale = styled.aside`
  width: fit-content;
  height: 100%;
  background:
    radial-gradient(
      circle,
      rgba(245, 242, 242, 0.85) 0%,
      rgba(237, 237, 237, 0.85) 23%,
      rgba(219, 219, 219, 0.85) 73%
    ),
    url(${background});
  background-position: center;
  background-size: cover;
  border: none;
  padding: 10px;
  box-shadow:
    rgba(50, 50, 93, 0.25) 3px 3px 5px -1px,
    rgba(0, 0, 0, 0.3) 2px 3px 3px -1px;
  position: relative;
  isolation: isolate;
  border-radius: 15px;

  @media screen and (max-width: 992px) {
    width: fit-content;
    height: 100%;
    padding: 5px;
  }

  @media screen and (max-width: 600px) {
    padding: 2px;
  }
`;

export const CardView = styled.div`
  max-width: 80%;
  width: 620px;
  box-shadow:
    rgba(0, 0, 0, 0.16) 0px 3px 6px,
    rgba(0, 0, 0, 0.23) 0px 3px 6px;
  padding: 60px;
  margin: 40px;
  border-radius: 12px;
  background: var(--color-blanco);
`;

export const HeaderLoginCale = styled.header`
  background:
    linear-gradient(
      90deg,
      rgba(8, 51, 143, 0.95) 0%,
      rgba(8, 51, 143, 0.7) 50%,
      rgba(8, 51, 143, 0.7) 50%
    ),
    url(${background});
  background-position: center;
  background-size: cover;
  position: relative;

  isolation: isolate;

  h1 {
    color: var(--color-blanco);
    font-family: "Montserrat", sans-serif;
    font-size: clamp(12px, 3vw, 16px);
    padding: clamp(2px, 3vw, 5px);
  }
`;

export const HeaderCale = styled.header`
  background: var(--color-azulUas);
  background-position: center;
  background-size: cover;
  border-radius: 15px;
  height: fit-content;
  padding-top: 25px;

  @media screen and (max-width: 992px) {
    padding-top: 10px;
  }

  @media screen and (max-width: 600px) {
    padding-top: 5px;
  }
`;

export const TextAreaCale = styled.textarea`
  width: 100%;
  height: 200px;
  background: var(--colors-blanco);
  border: 1px solid var(--colors-gris);
  cursor: pointer;
  font-family: "Montserrat", sans-serif;
  font-size: 13px;
  padding: 14px 15px;
  border-radius: 8px;
  color: var(--color-negroBajo);
`;

export const InputFormCale = styled.input`
  width: 100%;
  height: auto;
  max-width: 500px;
  background: var(--colors-blanco);
  border: 1px solid var(--colors-gris);
  cursor: pointer;
  font-family: "Montserrat", sans-serif;
  font-size: 13px;
  padding: 14px 15px;
  border-radius: 8px;
  color: var(--color-negroBajo);
`;

export const InputSelectCale = styled.select`
  width: 235px;
  height: auto;
  max-width: 90%;
  background: var(--color-blanco);
  border: 1px solid var(--color-gris);
  cursor: pointer;
  font-size: clamp(12px, 3vw, 16px);
  padding: 20px;
  border-radius: 5px;
  color: var(--color-negroBajo);
`;

export const InputAttachFile = styled.input`
  width: 500px;
  max-width: 90%;
  height: 64px;
  border-radius: 5px;
  background: var(--color-azulUas);
  border: none;
  color: var(--color-blanco);
  font-size: 20px;
  cursor: pointer;
  box-shadow:
    rgba(50, 50, 93, 0.25) 0px 6px 12px -2px,
    rgba(0, 0, 0, 0.3) 0px 3px 7px -3px;
  &:hover {
    background: var(--color-azulUasHover);
  }
`;

export const ToggleButtonContainer = styled.div`
  background: var(--color-grisClaro);
  width: 40px;
  height: 20px;
  padding: 2;
  border-radius: 20px;
  margin: 20px;
`;

export const LabelToggleButton = styled.label`
  width: 20px;
  height: 20px;
  background: var(--color-blanco);
  display: flex;
  cursor: pointer;
  border-radius: 20px;
  transition: all 0.25s ease 0s;
`;

export const InputToggleButton = styled.input`
  display: none;

  &:checked + ${LabelToggleButton} {
    margin-left: 20px;
    background: var(--color-azulUas);
  }
`;

export const ActivityCircle = styled.div`
  width: 40px;
  height: 40px;
  background: var(--color-oroUas);
  color: var(--color-blanco);
  border-radius: 40px;
`;

export const Dashboard = styled.nav`
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  gap: 20px;

  @media screen and (max-width: 992px) {
    gap: 10px;
  }
`;

export const Navbuttons = styled.button`
  display: flex;
  gap: 20px;
  width: 250px;
  height: 55px;
  border: none;
  cursor: pointer;
  justify-content: left;
  align-items: center;
  background: ${({ $active }) =>
    $active ? "var(--color-azulUas)" : "var(--color-blanco)"};
  color: ${({ $active }) =>
    $active ? "var(--color-blanco)" : "var(--color-negro_bajo)"};
  padding: 10px 25px;
  font-family: "Montserrat", sans-serif;
  font-weight: ${({ $active }) => ($active ? "bold" : "600")};
  font-size: 12px;
  border-radius: 15px;
  transition: 0.3s ease all;
  box-shadow:
    rgba(50, 50, 93, 0.25) 3px 3px 5px -1px,
    rgba(0, 0, 0, 0.3) 2px 3px 3px -1px;
  &:hover {
    background: var(--color-azulUas);
    color: var(--color-blanco);
    font-weight: bold;
    box-shadow:
      rgba(0, 0, 0, 0.25) 0px 14px 28px,
      rgba(0, 0, 0, 0.22) 0px 10px 10px;
  }
  @media screen and (max-width: 992px) {
    width: 30%;
    font-size: 11px;
    height: 55px;
  }

  @media screen and (max-width: 800px) {
    font-size: 10px;
    height: 50px;
  }

  @media screen and (max-width: 692px) {
    font-size: 7px;
    height: 35px;
    gap: 5px;
    padding: 10px 20px;
  }

  @media screen and (max-width: 500px) {
    height: 20px;
    gap: 5px;
    padding: 5px 8px;
    font-size: 5px;
  }
`;

export const ListContainerCale = styled.div`
  display: flex;
  flex-direction: column;
  gap: 15px;
  max-height: 50vh;
  padding: 15px;
  overflow-y: hidden;
  border-radius: 16px;
  background: var(--color-grisClaro);
  font-family: "Montserrat", sans-serif;
  font-size: clamp(11px, 1.2vw, 14px);
  isolation: isolate;
`;

export const ListRowContainerCale = styled.div`
  display: flex;
  flex-direction: column;
  gap: 15px;
  overflow-y: auto;
  background: var(--color-grisClaro);
  font-family: "Montserrat", sans-serif;
  font-size: clamp(11px, 1.2vw, 14px);
  isolation: isolate;
`;

export const ListHeaderCale = styled.div`
  position: sticky;
  top: 0;
  z-index: 2;
  display: grid;
  grid-auto-flow: column;
  grid-auto-columns: minmax(0, 1fr);
  align-items: center;
  gap: 10px;
  padding: 12px 15px;
  border-radius: 10px;
  background: var(--color-azulUas);
  color: white;
  font-weight: 600;
`;

export const ListRowCale = styled.div`
  position: relative;
  z-index: ${({ $isSelected }) => ($isSelected ? 1 : 0)};
  display: grid;
  grid-auto-flow: column;
  grid-auto-columns: minmax(0, 1fr);
  align-items: center;
  gap: 10px;
  padding: 12px 15px;
  margin: 0 10px;
  border-radius: 10px;
  background: ${({ $isSelected }) =>
    $isSelected ? "var(--color-darkBlue)" : "var(--color-grisClaro)"};
  color: ${({ $isSelected }) =>
    $isSelected ? "var(--color-blanco)" : "inherit"};
  box-shadow: ${({ $isSelected }) =>
    $isSelected
      ? "rgba(8, 51, 143, 0.45) 0px 10px 20px, rgba(0, 0, 0, 0.25) 0px 6px 6px"
      : "rgba(0, 0, 0, 0.35) 0px 5px 15px"};
  transform: ${({ $isSelected }) =>
    $isSelected ? "translateY(-4px)" : "translateY(0)"};
  transition: all 0.25s ease;
  cursor: pointer;
  overflow-wrap: anywhere;
`;

export const IconButtonCale = styled.button`
  display: grid;
  place-items: center;
  width: 22px;
  height: 22px;
  padding: 0;
  border: none;
  border-radius: 4px;
  color: white;
  cursor: pointer;

  &:hover {
    opacity: 0.8;
  }
`;

export const SearchBarContainerCale = styled.div`
  display: flex;
  position: relative;
  align-items: center;
  gap: 10px;
`;

export const SearchBarCale = styled.input`
  width: 560px;
  max-width: 100%;
  padding: 6px 15px;
  padding-left: 35px;
  border: none;
  border-radius: 20px;
  background: var(--color-grisClaro);
  font-family: "Montserrat", sans-serif;
  font-size: 12px;
`;

export const SearchIconCale = styled.span`
  position: absolute;
  left: 10px;
  font-size: 18px;
  color: var(--color-gris);
  pointer-events: none;
`;

export const ButtonReleaseCale = styled.button`
  width: auto;
  height: auto;
  padding: 6px 6px;
  border: none;
  border-radius: 10px;
  font-family: "Montserrat", sans-serif;
  font-size: clamp(8px, 3vw, 14px);
  font-weight: 700;
  color: var(--color-blanco);
  background: var(--color-oroUas);
  cursor: pointer;

  &:hover {
    background: var(--color-doradoClaro);
  }
`;

export const DeleteActivityButton = styled.button`
  width: fit-content;
  height: auto;
  border: none;
  font-size: 5px;
  border-radius: 3px;
  background: var(--color-rojoRechazado);
  cursor: pointer;
  color: var(--color-blanco);

  &:hover {
    background: #8c2702;
  }
`;

export const ModifyActivity = styled.button`
  width: auto;
  height: auto;
  border: none;
  border-radius: 20px;
  background: var(--color-oroUas);
  color: var(--color-blanco);
  font-weight: 700;
  padding: 5px;
  font-family: "Montserrat", sans-serif;
  cursor: pointer;

  &:hover {
    background: var(--color-doradoClaro);
  }
`;

export const StatusCircleCale = styled.span`
  display: inline-block;
  width: 22px;
  height: 22px;
  border: 2px solid var(--color-grisClaro);
  border-radius: 50%;
  background: var(--color-blanco);
`;

export const ModalOverlayCale = styled.div`
  position: fixed;
  inset: 0;
  z-index: 1000;
  display: flex;
  align-items: center;
  justify-content: center;
  background: rgba(0, 0, 0, 0.5);
`;

export const ModalCardCale = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 40px;
  width: fit-content;
  max-width: 90%;
  padding: 30px;
  border-radius: 15px;
  background: var(--color-blanco);
  font-family: "Montserrat", sans-serif;
  text-align: center;

  h2 {
    font-size: 18px;
    font-weight: 500;
  }

  .modal-actions {
    display: flex;
    gap: 20px;
    width: 100%;
  }
`;

export const ModalGifCardCale = styled(ModalCardCale)`
  align-items: flex-start;
  gap: 20px;
  width: 70vw;
  max-width: 90vw;
  max-height: 90vh;

  .gif-styles {
    width: 100%;
    height: auto;
    max-height: 75vh;
    object-fit: contain;
  }
`;

export const ModalPDFCardCale = styled(ModalCardCale)`
  display: flex;
  align-items: flex-start;
  gap: 20px;
  width: min(92vw, 1100px);
  max-width: calc(100vw - 32px);
  max-height: calc(100dvh - 32px);
  height: fit-content;
  box-sizing: border-box;
  padding: 5px 0;

  .pdf-modal-container {
    display: flex;
    flex-direction: column;
    align-items: stretch;
    gap: 5px;
    width: 100%;
    min-width: 0;
    max-height: calc(100dvh - 42px);
    text-align: right;

    .pdf-modal-header {
      display: flex;
      justify-content: space-between;
      align-items: center;
      span {
        font-size: 25px;
        padding: 5px;
        margin: 5px;
        cursor: pointer;
        border-radius: 10px;
      }

      .docs-icon {
        background-color: var(--color-azulUasHover);
        color: var(--color-doradoClaro);
        font-size: 20px;
        padding: 10px;
        pointer-events: none;
      }

      .modal-title {
        color: var(--color-azulUas);
        font-size: 18px;
        font-weight: bold;
        pointer-events: none;
      }

      .close-icon {
        color: var(--color-negroBajo);
        &:hover {
          color: var(--color-negro);
          box-shadow:
            rgba(69, 69, 220, 0.25) 0px 50px 100px -20px,
            rgba(55, 0, 255, 0.3) 0px 30px 60px -30px,
            rgba(10, 37, 64, 0.35) 0px -2px 6px 0px inset;
        }
      }
    }
    @media screen and (max-width: 992px) {
      .pdf-modal-header .docs-icon,
      .pdf-modal-header .close-icon {
        font-size: 18px;
      }

      .pdf-modal-header .modal-title {
        font-size: 15px;
      }

      @media screen and (max-width: 750px) {
        .pdf-modal-header .docs-icon,
        .pdf-modal-header .close-icon {
          font-size: 12px;
        }

        .pdf-modal-header .docs-icon {
          padding: 8px;
        }

        .pdf-modal-header .modal-title {
          font-size: 10px;
        }
      }

      @media screen and (max-width: 660px) {
        .pdf-modal-header .docs-icon,
        .pdf-modal-header .close-icon {
          font-size: 12px;
        }

        .pdf-modal-header .docs-icon {
          padding: 8px;
        }

        .pdf-modal-header .modal-title {
          font-size: 10px;
        }
      }

      @media screen and (max-width: 600px) {
        .pdf-modal-header .docs-icon,
        .pdf-modal-header .close-icon {
          font-size: 7px;
          border-radius: 5px;
        }

        .pdf-modal-header .docs-icon {
          padding: 5px;
        }

        .pdf-modal-header .modal-title {
          font-size: 8px;
        }
      }

      @media screen and (max-width: 400px) {
        .pdf-modal-header .docs-icon,
        .pdf-modal-header .close-icon {
          font-size: 5px;
          border-radius: 3px;
        }

        .pdf-modal-header .docs-icon {
          padding: 3px;
        }

        .pdf-modal-header .modal-title {
          font-size: 5px;
        }
      }
    }
  }

  .pdf-container {
    width: 100%;
    min-width: 0;
    height: min(80vh, 820px);
    .pdf-viewer {
      display: block;
      width: 100%;
      height: 100%;
      border: 0;
    }
  }

  @media screen and (max-width: 600px) {
    gap: 8px;

    .pdf-modal-header {
      min-width: 0;
    }

    .pdf-container {
      height: calc(100dvh - 95px);
    }
  }
`;

export const ModalButtonCale = styled.button`
  flex: 1;
  height: 60px;
  border: none;
  border-radius: 10px;
  background: white;
  color: var(--color-negro);
  font-family: "Montserrat", sans-serif;
  font-size: 15px;
  font-weight: 700;
  cursor: pointer;
  box-shadow:
    rgba(50, 50, 93, 0.25) 3px 3px 5px -1px,
    rgba(0, 0, 0, 0.3) 2px 3px 3px -1px;

  &.btn-salir {
    background: var(--color-oroUas);
    color: white;
  }

  &:hover {
    opacity: 0.85;
  }
`;

export const ProgressContainer = styled.div`
  width: 50%;
  height: 20px;
  background: var(--color-azulMasBajo);
  border-radius: 10px;
  overflow: hidden;
`;

export const ProgressBar = styled.div`
  width: ${(props) => props.progress || 0}%;
  height: 100%;
  background: var(--color-azulUas);
  border-radius: 10px;
  transition: width 0.4s ease-in-out;
`;

export const ModalGiftCardCale = styled(ModalCardCale)`
  align-items: flex-start;
  gap: 20px;
  width: 50vw;
  height: 50vh;
  max-width: 90vw;

  .gif-styles {
    width: 100%;
    height: 100%;
    object-fit: cover;
  }
`;

export const BtnRemoveFilesRegister = styled.button`
  background: transparent;
  border: none;
  color: red;
  font-size: 12px;
  cursor: pointer;
  text-decoration: underline;
`;

export const ContainerPreviewFilesRegister = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 10px;
`;

export const InputsError = styled.span`
  color: red;
  font-size: 11px;
`;

export const InputErrorFile = styled(InputsError)`
  display: block;
  text-align: center;
  margin-top: 5px;
`;

export const ChangeFileIndicator = styled(InputsError)`
  font-size: 14px;
  font-weight: 600;
  color: #333;
  text-align: center;
  word-break: break-all;
`;

export const InputSelectHours = styled.select`
  width: 100%;
  max-width: 80px;
  background: var(--color-grisClaro);
  border: none;
  cursor: pointer;
  text-align: center;
  font-size: clamp(12px, 3vw, 16px);
  font-weight: 600;
  padding: 5px;
  border-radius: 10px;
  color: var(--color-negroBajo);
`;
