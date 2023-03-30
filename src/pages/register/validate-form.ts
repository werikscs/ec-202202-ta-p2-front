import { IUserAPI } from "../../api/types/types";
import { FormMessage, inputErrorType } from "./error-type";
import { registerType } from './register-type';

type IProp = {
  userAPI: IUserAPI;
};

export default async function validateForm(
  key: string,
  value: string,
  api?: IUserAPI,
  registerData?: registerType,
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

  if (key === "password") {
    /*
      ^ indica o início da string.
      (?=.*\d) especifica que a string deve conter pelo menos um dígito.
      (?=.*[a-z]) especifica que a string deve conter pelo menos uma letra minúscula.
      (?=.*[A-Z]) especifica que a string deve conter pelo menos uma letra maiúscula.
      (?=.*[!@#$%^&*_]) especifica que a string deve conter pelo menos um dos seguintes caracteres especiais: ! @ # $ % ^ & *.
      .{8,} especifica que a string deve ter pelo menos 8 caracteres.
      $ indica o final da string.
    */

    const passwordRegex = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[!@#$%^&*_]).{8,}$/;
    const isPasswordValid = passwordRegex.test(value);

    if (!isPasswordValid) {
      error.isValid = false;
      error.message = FormMessage.PasswordNotValid;
      return error;
    }
  }

  if(key === "confirmPassword") {
    if(registerData?.password !== value){
      error.isValid = false;
      error.message = FormMessage.PasswordsAreDifferent;
      return error;
    }
  }

  return error;
}
