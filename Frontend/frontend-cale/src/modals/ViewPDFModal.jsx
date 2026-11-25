import { useEffect, useState } from "react";
import {
  ModalOverlayCale,
  ModalPDFCardCale,
} from "../styled_components/styled_components";

function ViewPDF({ studentId, onClose }) {
  const [pdfUrl, setPdfUrl] = useState("");
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const controller = new AbortController();
    let objectUrl;

    async function loadReceipt() {
      if (studentId === null || studentId === undefined) {
        setError("No se seleccionó un alumno.");
        setIsLoading(false);
        return;
      }

      setIsLoading(true);
      setError("");
      setPdfUrl("");

      try {
        const response = await fetch(
          `/api/alumnos/${encodeURIComponent(studentId)}/recibo`,
          { signal: controller.signal },
        );

        if (!response.ok) {
          if (response.status === 403) {
            throw new Error(
              "El backend no permite consultar este comprobante. Revisa la configuración local o los permisos.",
            );
          }
          if (response.status === 404) {
            throw new Error("No se encontró el comprobante de este alumno.");
          }
          throw new Error(
            `No se pudo cargar el comprobante (HTTP ${response.status}).`,
          );
        }

        const contentType = response.headers.get("content-type") || "";
        if (!contentType.toLowerCase().includes("application/pdf")) {
          throw new Error("El servidor no devolvió un archivo PDF.");
        }

        const pdfBlob = await response.blob();
        if (pdfBlob.size === 0) {
          throw new Error("El comprobante recibido está vacío.");
        }

        objectUrl = URL.createObjectURL(pdfBlob);
        setPdfUrl(objectUrl);
      } catch (requestError) {
        if (requestError.name !== "AbortError") {
          setError(
            requestError instanceof Error
              ? requestError.message
              : "No se pudo cargar el comprobante.",
          );
        }
      } finally {
        if (!controller.signal.aborted) {
          setIsLoading(false);
        }
      }
    }

    loadReceipt();

    return () => {
      controller.abort();
      if (objectUrl) {
        URL.revokeObjectURL(objectUrl);
      }
    };
  }, [studentId]);

  return (
    <ModalOverlayCale onClick={onClose}>
      <ModalPDFCardCale
        className="pdf-modal"
        onClick={(event) => event.stopPropagation()}
      >
        <div className="pdf-modal-container">
          <div className="pdf-modal-header">
            <div>
              <span className="material-symbols-outlined docs-icon">docs</span>
              <span className="modal-title">Comprobante de inscripción</span>
            </div>
            <span
              onClick={onClose}
              className="material-symbols-outlined close-icon"
              role="button"
              tabIndex={0}
              aria-label="Cerrar comprobante"
              onKeyDown={(event) => {
                if (event.key === "Enter" || event.key === " ") {
                  event.preventDefault();
                  onClose();
                }
              }}
            >
              close
            </span>
          </div>
          <div className="pdf-container">
            {isLoading && <p role="status">Cargando comprobante...</p>}
            {!isLoading && error && <p role="alert">{error}</p>}
            {!isLoading && !error && pdfUrl && (
              <iframe
                className="pdf-viewer"
                src={pdfUrl}
                title="Comprobante de inscripción"
              />
            )}
          </div>
        </div>
      </ModalPDFCardCale>
    </ModalOverlayCale>
  );
}

export default ViewPDF;
