import { IUserAPI } from "../../api/types/types";
import { FormMessage, inputErrorType } from "./error-type";

type IProp = {
  userAPI: IUserAPI;
};

export default async function validateForm(
  key: string,
  value: string,
  api?: IUserAPI
): Promise<inputErrorType> {
  const formattedValue = value.trim();
  const error: inputErrorType = {
    isValid: true,
    message: "",
  };

  if (key) {
    if (formattedValue.length === 0) {
      error.isValid = false;
      error.message = FormMessage.RequiredField;
      return error;
    }
  }

  if (key === "name") {
    const splitedName = value.split(" ");

    if (splitedName.length < 2) {
      error.isValid = false;
      error.message = FormMessage.AtLeastTwoWords;
      return error;
    }
  }

  if (key === "email") {
    const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    const isEmailValid = emailRegex.test(value);

    if (!isEmailValid) {
      error.isValid = false;
      error.message = FormMessage.EmailNotValid;
      return error;
    }

    const emailAlreadyTaken = await api?.findUserByEmail(value);

    if (emailAlreadyTaken) {
      error.isValid = false;
      error.message = FormMessage.EmailAlreadyTaken;
      return error;
    }
  }

  return error;
}
