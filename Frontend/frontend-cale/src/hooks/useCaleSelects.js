import { useState } from "react";

export function useCaleSelects() {
  const levelOptions = [
    { label: "9", value: "9" },
    { label: "10", value: "10" },
    { label: "Intensivo", value: "Intensivo" },
    { label: "Egresado", value: "Egresado" },
  ];

  const modalOptions = [
    { label: "Virtual", value: "Virtual" },
    { label: "Presencial", value: "Presencial" },
  ];

  return {
    levelOptions,
    modalOptions,
  };
}
