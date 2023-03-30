export type inputErrorType = { isValid: boolean; message: string }

export type formErrorType = {
  nome: inputErrorType
  email: inputErrorType
  password: inputErrorType
  confirmPassword: inputErrorType
};
