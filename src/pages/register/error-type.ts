export type inputErrorType = { isValid: boolean; message: string }

export type formErrorType = {
  name: inputErrorType
  email: inputErrorType
  password: inputErrorType
  confirmPassword: inputErrorType
};


export enum FormMessage {
  RequiredField = "Campo obrigatório",
  AtLeastTwoWords = "Nome deve ter no mínimo duas palavras",
  EmailNotValid = "Formato de email inválido",
  EmailAlreadyTaken = "Email já cadastrado",
  PasswordNotValid = "Deve conter pelo menos 8 caracteres, 1 número, 1 letra minúscula, 1  letra maiúscula, e um dos seguintes caracteres especiais: ! @ # $ % ^ & *",
  PasswordsAreDifferent = "As senhas são diferentes"
}
