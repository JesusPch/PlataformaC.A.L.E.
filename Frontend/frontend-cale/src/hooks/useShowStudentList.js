import { useEffect, useState } from "react";

export function useShowStudentList() {
  const [students, setStudents] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const controller = new AbortController();

    async function fetchStudents() {
      try {
        const response = await fetch("/api/alumnos", {
          signal: controller.signal,
        });
        const result = await response.json();

        if (!response.ok || result.ok !== true || !Array.isArray(result.data)) {
          throw new Error(
            result.error || result.message || "No se pudo cargar la lista de alumnos.",
          );
        }

        setStudents(
          result.data.map((student) => ({
            id: student.id_alumno,
            name: student.nombre,
            lastName: student.apellido,
            age: student.edad,
            accountNumber: student.numero_cuenta,
            email: student.correo,
            modality: student.modalidad,
            phone_number: student.telefono,
            level: student.nivel,
            status: student.estado,
            released: student.estado === "liberado",
            releaseDate: student.fecha_liberacion,
            hasReceipt: Boolean(student.pdf_registro_key),
          })),
        );
      } catch (requestError) {
        if (requestError.name !== "AbortError") {
          setError(
            requestError instanceof Error
              ? requestError.message
              : "No se pudo cargar la lista de alumnos.",
          );
        }
      } finally {
        if (!controller.signal.aborted) {
          setIsLoading(false);
        }
      }
    }

    fetchStudents();

    return () => controller.abort();
  }, []);

  return { students, isLoading, error };
}
