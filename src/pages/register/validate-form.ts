import { inputErrorType } from "./error-type";

export default function validateForm(
  key: string,
  value: string
): inputErrorType {
  const formattedValue = value.trim();
  const error: inputErrorType = {
    isValid: true,
    message: "",
  };

  if (key === "nome") {
    if (formattedValue.length < 2) {
      error.isValid = false;
      error.message = "Nome deve ter pelo menos dois caracteres";
    }
    return error;
  }

  return error;
}
