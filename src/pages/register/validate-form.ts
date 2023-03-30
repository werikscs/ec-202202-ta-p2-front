import { FormMessage, inputErrorType } from "./error-type";

export default function validateForm(
  key: string,
  value: string
): inputErrorType {
  const formattedValue = value.trim();
  const error: inputErrorType = {
    isValid: true,
    message: "",
  };

  if (key === "name") {
    if(formattedValue.length === 0){
      error.isValid = false;
      error.message = FormMessage.RequiredField;
      return error
    }

    const splitedName = value.split(' ')

    if(splitedName.length < 2){
      error.isValid = false;
      error.message = FormMessage.AtLeastTwoWords;
      return error
    }
  }

  if(key === "email"){
    if(formattedValue.length === 0){
      error.isValid = false;
      error.message = "Campo obrigatório";
      return error
    }
  }

  return error;
}
