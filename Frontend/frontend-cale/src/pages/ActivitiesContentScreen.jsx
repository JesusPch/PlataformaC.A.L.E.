import "../styles/activities-content-screen.css";
import { useState } from "react";
import {
  SearchBarCale,
  SearchBarContainerCale,
  SearchIconCale,
  ListContainerCale,
  ListRowContainerCale,
  ListHeaderCale,
  ButtonReleaseCale,
  ListRowCale,
  ButtonCale,
  DeleteActivityButton,
  ModifyActivity,
  ProgressContainer,
  ProgressBar,
  InputSelectCale,
} from "../styled_components/styled_components";
import { useSetHoursRequired } from "../hooks/useSetHoursRequired";
import { useShowStudentList } from "../hooks/useShowStudentList";
import StringsCale from "../constants/strings";
import DeleteActivityModal from "../modals/DeleteActivityModal";
import CreateActivitiesModal from "../modals/CreatesActivitiesModal";
import ModifyActivityModal from "../modals/ModifyActivityModal";
import ReleasedStudentListModal from "../modals/ReleasedStudentListModal";
import { useListStudentSelect } from "../hooks/useListStudentSelect";
import ViewPDF from "../modals/ViewPDFModal";

function ActivitiesContent() {
  const strings = StringsCale();
  const [activeModal, setActiveModal] = useState(null);
  const { hourOptions } = useSetHoursRequired();
  const [showCreateActivityModal, setCreateActivityModal] = useState(false);
  const { handleSelectStudent, isStudentSelected } = useListStudentSelect();

  const { students } = useShowStudentList();

  const [search, setSearch] = useState("");

  const handleSearch = (event) => {
    setSearch(event.target.value);
  };

  const normalizedSearch = search.trim().toLocaleLowerCase();
  const matchingStudents = students.filter((student) =>
    [student.name, student.lastName, student.accountNumber, student.level]
      .join(" ")
      .toLocaleLowerCase()
      .includes(normalizedSearch),
  );
  const filteredStudents =
    matchingStudents.length > 0 ? matchingStudents : students;

  const activities = [
    {
      id: 1,
      name: "LISTENING | Everyday related topics B2",
      requiredHours: 0,
    },
  ];

  return (
    <section className="layout-screen">
      <article className="student-list">
        <div className="student-list-head">
          <h2>Lista de alumnos</h2>
          <SearchBarContainerCale>
            <SearchIconCale
              className="material-symbols-outlined"
              aria-hidden="true"
            >
              search
            </SearchIconCale>
            <SearchBarCale
              type="text"
              placeholder={strings.searchStudent}
              onChange={handleSearch}
            ></SearchBarCale>
          </SearchBarContainerCale>
        </div>
        <ListContainerCale className="table-container">
          <ListHeaderCale>
            <span>{strings.placeHolderStudentName}</span>
            <span>{strings.placeHolderStudentLastName}</span>
            <span>{strings.placeHolderStudentAccountNumber}</span>
            <span>{strings.placeHolderStudentLevel}</span>
            <span>{strings.placeHolderStudentActivitiesProgress}</span>
            <span>{strings.placeHolderStudentHoursProgress}</span>
            <ButtonReleaseCale
              aria-label="Mostrar lista de alumnos liberados"
              onClick={() => setActiveModal("released")}
            >
              {strings.btnShowReleasedStudentsListCale}
            </ButtonReleaseCale>
          </ListHeaderCale>
          <ListRowContainerCale className="table-rows">
            {filteredStudents.map((student) => {
              const selected = isStudentSelected(student.id);
              return (
                <ListRowCale
                  key={student.id}
                  $isSelected={selected}
                  onClick={() => handleSelectStudent(student.id)}
                >
                  <span data-label={strings.placeHolderStudentName}>
                    {student.name}
                  </span>
                  <span data-label={strings.placeHolderStudentLastName}>
                    {student.lastName}
                  </span>
                  <span data-label={strings.placeHolderStudentAccountNumber}>
                    {student.accountNumber}
                  </span>
                  <span data-label={strings.placeHolderStudentLevel}>
                    {student.level}
                  </span>
                  <div
                    className="progress-layout"
                    data-label={strings.placeHolderStudentActivitiesProgress}
                  >
                    <span>{student.progress}%</span>
                    <ProgressContainer>
                      <ProgressBar progress={student.progress} />
                    </ProgressContainer>
                  </div>
                  <span data-label={strings.placeHolderStudentHoursProgress}>
                    {student.hours}h/20h
                  </span>
                  <div
                    className="release-cell"
                    data-label={strings.btnReleasedStudentCale}
                  >
                    <ButtonReleaseCale className="btn-release">
                      {strings.btnReleasedStudentCale}
                    </ButtonReleaseCale>
                  </div>
                </ListRowCale>
              );
            })}
          </ListRowContainerCale>
        </ListContainerCale>
      </article>

      <article className="activities-list">
        <div className="activities-list-head">
          <h2>Lista de actividades</h2>
          <ButtonCale
            className="make-activity"
            onClick={() => setActiveModal('createActivity')}
          >
            {strings.makeActivity}
          </ButtonCale>
        </div>
        <ListContainerCale className="activities-table">
          <ListHeaderCale>
            <span>{strings.placeHolderActivityName}</span>
            <span>{strings.placeHolderActivityRequiredHours}</span>
            <span>
              {strings.placeHolderActivityresourcesRequiredForTheActivity}
            </span>
            <span></span>
          </ListHeaderCale>
          <ListRowContainerCale className="activity-rows">
            {activities.map((activity) => (
              <ListRowCale key={activity.id}>
                <span data-label={strings.placeHolderActivityName}>
                  {activity.name}
                </span>
                <div
                  className="required-hours-select"
                  data-label={strings.placeHolderActivityRequiredHours}
                >
                  <InputSelectCale className="required-hours">
                    {hourOptions.map((option) => (
                      <option key={option.value} value={option.value}>
                        {option.label}
                      </option>
                    ))}
                  </InputSelectCale>
                  <span
                    className="material-symbols-outlined"
                    aria-hidden="true"
                  >
                    arrow_drop_down
                  </span>
                </div>
                <div
                  className="modify-activity"
                  data-label={
                    strings.placeHolderActivityresourcesRequiredForTheActivity
                  }
                >
                  <div className="view-activity">
                    <span className="resource-type">Enlace/Archivo</span>
                    <span
                      className="material-symbols-outlined btn-link-activity"
                      aria-label="Eliminar actividad"
                      onClick={() => setActiveModal("viewPDF")}
                    >
                      arrow_outward
                    </span>
                  </div>
                  <div className="btn-modify-activity">
                    <ModifyActivity 
                      className="btn-modify"
                      aria-label="Eliminar actividad"
                      onClick={() => setActiveModal("modifyActivity")}
                      >
                      {strings.btnmodifyActivity}
                    </ModifyActivity>
                  </div>
                </div>
                <div className="actions-activity" data-label="Acciones">
                  <DeleteActivityButton
                    aria-label="Eliminar actividad"
                    onClick={() => setActiveModal("delete")}
                  >
                    <span className="material-symbols-outlined actions-icons">
                      close
                    </span>
                  </DeleteActivityButton>
                </div>
              </ListRowCale>
            ))}
          </ListRowContainerCale>
        </ListContainerCale>
      </article>
      {activeModal === 'createActivity' && (
        <CreateActivitiesModal onClose={() => setActiveModal(null)} />
      )}
      {activeModal === "modifyActivity" && (
        <ModifyActivityModal onClose={() => setActiveModal(null)} />
      )}
      {activeModal === "delete" && (
        <DeleteActivityModal onClose={() => setActiveModal(null)} />
      )}
      {activeModal === "released" && (
        <ReleasedStudentListModal onClose={() => setActiveModal(null)} />
      )}
      {activeModal === "viewPDF" && (
        <ViewPDF onClose={() => setActiveModal(null)} />
      )}
    </section>
  );
}

export default ActivitiesContent;
