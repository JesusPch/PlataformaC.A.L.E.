import { useState } from "react";

export function useListStudentSelect() {
  const [selectedStudentId, setSelectedStudentId] = useState(null);
  const handleSelectStudent = (studentId) => {
    setSelectedStudentId((prevId) => (prevId === studentId ? null : studentId));
  };

  const isStudentSelected = (studentId) => selectedStudentId === studentId;

  return {
    selectedStudentId,
    handleSelectStudent,
    isStudentSelected,
  };
}
