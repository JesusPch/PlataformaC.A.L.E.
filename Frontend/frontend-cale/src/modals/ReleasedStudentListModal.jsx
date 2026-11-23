import StringsCale from "../constants/strings"
import { useState } from "react";
import {
    ModalOverlayCale,
    ModalCardCale,
    ListContainerCale,
    ListRowContainerCale,
    ListHeaderCale,
    ListRowCale,
    SearchBarCale,
    SearchBarContainerCale,
    SearchIconCale
} from "../styled_components/styled_components.js"
import { useShowStudentList } from "../hooks/useShowStudentList.js";

function ReleasedStudentListModal({onClose}){
    const strings = StringsCale();
    const { students } = useShowStudentList();
    const [isOpen, setIsOpen] = useState(true);
      if (!isOpen) return null;
      return (
        <ModalOverlayCale onClick={onClose}>
              <ModalCardCale
                  className="released-students-modal"
                  onClick={(e) => e.stopPropagation()}
              >
                      <div className="list-top">
                          <h3 className="list-title">{strings.titleReleasedStudentsList}</h3>
                          <SearchBarContainerCale className="search-bar-modal">
                              <SearchIconCale className="material-symbols-outlined" aria-hidden="true">search</SearchIconCale>
                              <SearchBarCale type="text" placeholder={strings.searchStudent}/>
                          </SearchBarContainerCale>
                      </div>
                      <ListContainerCale className="request-table">
                          <ListHeaderCale>
                              <span>{strings.placeHolderStudentName}</span>
                              <span>{strings.placeHolderStudentLastName}</span>
                              <span>{strings.placeHolderStudentAccountNumber}</span>
                              <span>{strings.placeHolderStudentReleaseDate}</span>
                          </ListHeaderCale>
                          <ListRowContainerCale className="request-table-rows">
                              {students
                                .filter((student) => student.released === true)
                                .map((student) => (
                                  <ListRowCale key={student.id}>
                                      <span data-label={strings.placeHolderStudentName}>{student.name}</span>
                                      <span data-label={strings.placeHolderStudentLastName}>{student.lastName}</span>
                                      <span data-label={strings.placeHolderStudentAccountNumber}>{student.accountNumber}</span>
                                      <span data-label={strings.placeHolderStudentReleaseDate}>{student.releaseDate}</span>
                                  </ListRowCale>
                                ))}
                          </ListRowContainerCale>
                      </ListContainerCale>
              </ModalCardCale>
        </ModalOverlayCale>
    )
}

export default ReleasedStudentListModal;