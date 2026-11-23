import { useState } from "react";

const MAX_RECEIPT_SIZE_BYTES = 5 * 1024 * 1024;

export function useRegisterValidation(onSuccess = () => {}) {
  const [formData, setFormData] = useState({
    name: "",
    lastname: "",
    email: "",
    accountnumber: "",
    telephonenumber: "",
    age: "",
    level: "",
    modal: "",
    password: "",
    file: null,
  });

  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState("");

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
    setSubmitError("");

    if (errors[name]) {
      setErrors((prev) => ({
        ...prev,
        [name]: "",
      }));
    }
  };

  const handleFileChange = (e) => {
    const uploadedFile = e.target.files[0];
    if (uploadedFile) {
      setFormData((prev) => ({
        ...prev,
        file: uploadedFile,
      }));
      if (errors.file) {
        setErrors((prev) => ({ ...prev, file: "" }));
      }
    }
  };

  const validateForm = () => {
    let newErrors = {};
    let isValid = true;

    Object.keys(formData).forEach((key) => {
      if (key === "file") {
        if (!formData.file) {
          newErrors.file = "El comprobante de pago es obligatorio";
          isValid = false;
        } else if (formData.file.type !== "application/pdf") {
          newErrors.file = "El archivo debe ser un PDF";
          isValid = false;
        } else if (formData.file.size > MAX_RECEIPT_SIZE_BYTES) {
          newErrors.file = "El PDF no puede superar los 5 MB";
          isValid = false;
        }
      } else {
        if (
          formData[key] === undefined ||
          formData[key] === null ||
          formData[key].toString().trim() === ""
        ) {
          newErrors[key] = "Este campo es obligatorio";
          isValid = false;
        }
      }
    });

    if (formData.email) {
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRegex.test(formData.email.trim())) {
        newErrors.email = "Ingresa un correo electrónico válido";
        isValid = false;
      }
    }

    if (formData.accountnumber) {
      const accountRegex = /^\d+$/;
      if (!accountRegex.test(formData.accountnumber)) {
        newErrors.accountnumber =
          "El número de cuenta solo debe contener números";
        isValid = false;
      }
    }

    if (formData.password) {
      if (formData.password.length < 6) {
        newErrors.password = "La contraseña debe tener al menos 6 caracteres";
        isValid = false;
      }
    }

    if (
      formData.age &&
      (!Number.isInteger(Number(formData.age)) || Number(formData.age) < 1)
    ) {
      newErrors.age = "Ingresa una edad válida";
      isValid = false;
    }

    setErrors(newErrors);
    return isValid;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!validateForm()) {
      alert(
        "Por favor, completa todos los campos correctamente antes de enviar la solicitud.",
      );
      return;
    }

    setSubmitError("");
    setIsSubmitting(true);

    try {
      const receiptFormData = new FormData();
      receiptFormData.append("file", formData.file);

      const uploadResponse = await fetch("/api/alumnos/recibo", {
        method: "POST",
        body: receiptFormData,
      });
      const uploadResult = await uploadResponse.json();

      if (!uploadResponse.ok || uploadResult.ok !== true) {
        throw new Error(
          uploadResult.error || "No se pudo subir el comprobante.",
        );
      }

      const pdfRegistroKey = uploadResult.data?.pdf_registro_key;
      if (!pdfRegistroKey) {
        throw new Error("MinIO no devolvió la referencia del comprobante.");
      }

      const response = await fetch("/api/alumnos", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          nombre: formData.name.trim(),
          apellido: formData.lastname.trim(),
          correo: formData.email.trim(),
          numero_cuenta: formData.accountnumber.trim(),
          telefono: formData.telephonenumber.trim(),
          edad: Number(formData.age),
          nivel: formData.level,
          modalidad: formData.modal,
          contraseña: formData.password,
          pdf_registro_key: pdfRegistroKey,
        }),
      });
      const result = await response.json();

      if (!response.ok || result.ok !== true) {
        throw new Error(
          result.error || result.message || "No se pudo enviar la solicitud.",
        );
      }

      onSuccess();
    } catch (error) {
      setSubmitError(
        error instanceof Error
          ? error.message
          : "No se pudo enviar la solicitud. Inténtalo de nuevo.",
      );
    } finally {
      setIsSubmitting(false);
    }
  };

  return {
    formData,
    errors,
    isSubmitting,
    submitError,
    handleChange,
    handleFileChange,
    handleSubmit,
  };
}
