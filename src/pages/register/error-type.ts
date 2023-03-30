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
  EmailAlreadyTaken = "Email já cadastrado"
}