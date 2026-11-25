import "../styles/request-content-screen.css";
import StringsCale from "../constants/strings.js";
import { useState } from "react";
import {
  ListContainerCale,
  ListRowContainerCale,
  ListHeaderCale,
  ListRowCale,
  IconButtonCale,
  SearchBarCale,
  SearchBarContainerCale,
  SearchIconCale
} from "../styled_components/styled_components.js";
import AcceptRequestModal from "../modals/AcceptRequestModal.jsx";
import DeleteStudentModal from "../modals/DeleteStudentModal.jsx";
import RejectRequestModal from "../modals/RejectRequestModal.jsx";
import { useShowStudentList } from "../hooks/useShowStudentList.js";
import ViewPDF from "../modals/ViewPDFModal";

function RequestsContent() {
  const strings = StringsCale();
  const [activeModal, setActiveModal] = useState(null);
  const [selectedStudentId, setSelectedStudentId] = useState(null);

  const { students, isLoading, error } = useShowStudentList();

  const [search, setSearch] = useState('');

  const handleSearch = (event) => {
    setSearch(event.target.value);
  };

  const normalizedSearch = search.trim().toLocaleLowerCase();
  const registeredStudents = students.filter((student) =>
    student.status === "autorizado" || student.status === "liberado",
  );
  const pendingRequests = students.filter(
    (student) => student.status === "no autorizado",
  );
  const filteredStudents = registeredStudents.filter((student) =>
    [student.name, student.lastName, student.accountNumber]
      .join(" ")
      .toLocaleLowerCase()
      .includes(normalizedSearch),
  );

  return (
    <section className="requests-content">
      <div className="request-list">
        <h2 className="list-title">{strings.titleRequests}</h2>
        <ListContainerCale className="request-table">
          <ListHeaderCale>
            <span>{strings.placeHolderStudentName}</span>
            <span>{strings.placeHolderStudentLastName}</span>
            <span>{strings.placeHolderStudentAge}</span>
            <span>{strings.placeHolderStudentAccountNumber}</span>
            <span>{strings.placeHolderStudentLevel}</span>
            <span>{strings.columnEmail}</span>
            <span>{strings.placeHolderStudentModal}</span>
            <span>{strings.columnPhone}</span>
            <span>{strings.columnProof}</span>
            <span>{strings.columnAdmission}</span>
          </ListHeaderCale>
          <ListRowContainerCale className="request-table-rows">
            {isLoading && <p role="status">Cargando solicitudes...</p>}
            {!isLoading && error && <p role="alert">{error}</p>}
            {!isLoading && !error && pendingRequests.length === 0 && (
              <p>No hay solicitudes pendientes.</p>
            )}
            {!isLoading && !error && pendingRequests.map((student) => (
              <ListRowCale key={student.id}>
                <span data-label={strings.placeHolderStudentName}>{student.name}</span>
                <span data-label={strings.placeHolderStudentLastName}>{student.lastName}</span>
                <span data-label={strings.placeHolderStudentAge}>{student.age}</span>
                <span data-label={strings.placeHolderStudentAccountNumber}>{student.accountNumber}</span>
                <span data-label={strings.placeHolderStudentLevel}>{student.level}</span>
                <span data-label={strings.columnEmail}>{student.email}</span>
                <span data-label={strings.placeHolderStudentModal}>{student.modality}</span>
                <span data-label={strings.columnPhone}>+{student.phone_number}</span>
                <div className="comprobante" data-label={strings.columnProof}>
                  <span>
                    {student.hasReceipt
                      ? "Comprobante de inscripción"
                      : "Sin comprobante"}
                  </span>
                  <div className="comprobante-iconos">
                    {student.hasReceipt && (
                      <span
                        className="material-symbols-outlined icono-abrir"
                        role="button"
                        tabIndex={0}
                        aria-label={`Ver comprobante de ${student.name} ${student.lastName}`}
                        onClick={() => {
                          setSelectedStudentId(student.id);
                          setActiveModal("viewPDF");
                        }}
                        onKeyDown={(event) => {
                          if (event.key === "Enter" || event.key === " ") {
                            event.preventDefault();
                            setSelectedStudentId(student.id);
                            setActiveModal("viewPDF");
                          }
                        }}
                      >
                        arrow_outward
                      </span>
                    )}
                  </div>
                </div>
                <div className="acciones" data-label={strings.columnAdmission}>
                  <IconButtonCale
                    className="btn-rechazar"
                    aria-label="Rechazar solicitud"
                    onClick={() => setActiveModal("reject")}
                  >
                    <span className="material-symbols-outlined actions-icons">close</span>
                  </IconButtonCale>
                  <IconButtonCale
                    className="btn-aceptar"
                    aria-label="Aceptar solicitud"
                    onClick={() => setActiveModal("accept")}>
                    <span className="material-symbols-outlined actions-icons">check</span>
                  </IconButtonCale>
                </div>
              </ListRowCale>
            ))}
          </ListRowContainerCale>
        </ListContainerCale>
      </div>

      <article className="student-list">
        <div className="list-top">
          <h2 className="list-title">{strings.titleRegisteredStudents}</h2>
          <SearchBarContainerCale>
            <SearchIconCale className="material-symbols-outlined" aria-hidden="true">search</SearchIconCale>
            <SearchBarCale type="text" onChange={handleSearch} placeholder={strings.searchStudent} />
          </SearchBarContainerCale>
        </div>
        <ListContainerCale className="request-table">
          <ListHeaderCale>
            <span>{strings.placeHolderStudentName}</span>
            <span>{strings.placeHolderStudentLastName}</span>
            <span>{strings.placeHolderStudentAccountNumber}</span>
          </ListHeaderCale>
          <ListRowContainerCale className="request-table-rows">
            {isLoading && <p role="status">Cargando alumnos...</p>}
            {!isLoading && error && <p role="alert">{error}</p>}
            {!isLoading && !error && registeredStudents.length === 0 && (
              <p>No hay alumnos registrados.</p>
            )}
            {!isLoading && !error && registeredStudents.length > 0 && filteredStudents.length === 0 && (
              <p>No se encontraron alumnos con esa búsqueda.</p>
            )}
            {!isLoading && !error && filteredStudents.map((student) => (
              <ListRowCale key={student.id}>
                <span data-label={strings.placeHolderStudentName}>{student.name}</span>
                <span data-label={strings.placeHolderStudentLastName}>{student.lastName}</span>
                <span data-label={strings.placeHolderStudentAccountNumber}>{student.accountNumber}</span>
                <div className="acciones" data-label="Acciones">
                  <IconButtonCale
                    className="btn-rechazar"
                    aria-label="Eliminar alumno"
                    onClick={() => setActiveModal("delete")}
                  >
                    <span className="material-symbols-outlined actions-icons">close</span>
                  </IconButtonCale>
                </div>
              </ListRowCale>
            ))}
          </ListRowContainerCale>
        </ListContainerCale>
        {activeModal === "accept" && (
          <AcceptRequestModal onClose={() => setActiveModal(null)} />
        )}
        {activeModal === "reject" && (
          <RejectRequestModal onClose={() => setActiveModal(null)} />
        )}
        {activeModal === "delete" && (
          <DeleteStudentModal onClose={() => setActiveModal(null)} />
        )}
        {activeModal === "viewPDF" && (
          <ViewPDF
            studentId={selectedStudentId}
            onClose={() => setActiveModal(null)}
          />
        )}
      </article>
    </section>
  );
}

export default RequestsContent;