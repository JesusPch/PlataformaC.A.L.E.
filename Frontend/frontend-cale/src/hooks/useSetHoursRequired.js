import { useState } from "react";

export function useSetHoursRequired() {
  const hourOptions = [
      { label: "18h", value: "18" },
      { label: "16h", value: "16" },
      { label: "14h", value: "14" },
      { label: "12h", value: "12" },
      { label: "10h", value: "10" },
      { label: "8h", value: "8" },
      { label: "6h", value: "6" },
      { label: "4h", value: "4" },
      { label: "2h", value: "2" },
      { label: "0h", value: "0" }
    ];

  return {
    hourOptions
  };
}
