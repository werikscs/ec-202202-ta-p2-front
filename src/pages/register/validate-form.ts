import { IUserAPI } from "../../api/types/types";
import { FormMessage, inputRegisterUserType } from "./register-error-type";
import { registerUserType } from './register-type';

type IProp = {
  userAPI: IUserAPI;
};

export default async function validateForm(
  key: string,
  value: string,
  api?: IUserAPI,
  registerData?: registerUserType,
): Promise<inputRegisterUserType> {
  
  const tempError: inputRegisterUserType = {
    isValid: true,
    message: "",
  };
  
  const formattedValue = value.trim();

  if (key) {
    if (formattedValue.length === 0) {
      tempError.isValid = false;
      tempError.message = FormMessage.RequiredField;
      return tempError;
    }
  }

  if (key === "name") {
    const splitedName = formattedValue.split(" ");

    if (splitedName.length < 2) {
      tempError.isValid = false;
      tempError.message = FormMessage.AtLeastTwoWords;
      return tempError;
    }
  }

  if (key === "email") {
    const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    const isEmailValid = emailRegex.test(formattedValue);

    if (!isEmailValid) {
      tempError.isValid = false;
      tempError.message = FormMessage.EmailNotValid;
      return tempError;
    }

    const emailAlreadyTaken = await api?.findUserByEmail(formattedValue);

    if (emailAlreadyTaken) {
      tempError.isValid = false;
      tempError.message = FormMessage.EmailAlreadyTaken;
      return tempError;
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
    const isPasswordValid = passwordRegex.test(formattedValue);

    if (!isPasswordValid) {
      tempError.isValid = false;
      tempError.message = FormMessage.PasswordNotValid;
      return tempError;
    }
  }

  if(key === "confirmPassword") {
    if(registerData?.password !== formattedValue){
      tempError.isValid = false;
      tempError.message = FormMessage.PasswordsAreDifferent;
      return tempError;
    }
  }

  return tempError;
}
