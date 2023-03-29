import { FormEvent } from "react";
import { errorType } from "./errorType";
import { registerType } from "./registerType";

export default function validateForm(
  key: string,
  e: FormEvent,
  registerData: registerType,
  error: errorType
): errorType {
  let errorData = error;

  if (key === "nome") {
    const nome = (e.target as HTMLInputElement).value.trim();

    if (nome.length === 0) {
      errorData = {
        ...error,
        nome: { isValid: false, message: "Nome não pode ser vazio" },
      };
    } else {
      errorData = {
        ...error,
        nome: { isValid: true, message: "" },
      };
    }

    if (nome.length > 0) {
      if (nome.length < 4) {
        errorData = {
          ...error,
          nome: { isValid: false, message: "Nome deve ter mais de 3 letras" },
        };
      } else {
        errorData = {
          ...error,
          nome: { isValid: true, message: "" },
        };
      }
    }
    return errorData;
  }

  if (key === "email") {
    const email = (e.target as HTMLInputElement).value.trim();

    if (email.length === 0) {
      errorData = {
        ...error,
        email: { isValid: false, message: "Email não pode ser vazio" },
      };
    } else {
      errorData = {
        ...error,
        email: { isValid: true, message: "" },
      };
    }

    return errorData;
  }

  if (key === "password") {
    const password = (e.target as HTMLInputElement).value;

    if (password.length === 0) {
      errorData = {
        ...error,
        password: { isValid: false, message: "Password não pode ser vazio" },
      };
    } else {
      errorData = {
        ...error,
        password: { isValid: true, message: "" },
      };
    }

    return errorData;
  }

  if (key === "confirmPassword" || key === "password") {
    const input = (e.target as HTMLInputElement).value;
    let confirmPassword = "";
    let password = "";

    if (key === "confirmPassword") {
      confirmPassword = input;
      password = registerData.password;
    } else {
      confirmPassword = registerData.confirmPassword;
      password = input;
    }

    if (confirmPassword !== password) {
      errorData = {
        ...error,
        confirmPassword: {
          isValid: false,
          message: "Confirm password é diferente de password",
        },
      };
    } else {
      errorData = {
        ...error,
        confirmPassword: { isValid: true, message: "" },
      };
    }

    return errorData;
  }
  return errorData;
}
