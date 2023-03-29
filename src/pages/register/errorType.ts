export type errorType = {
  nome: { isValid: boolean; message: string };
  email: { isValid: boolean; message: string };
  password: { isValid: boolean; message: string };
  confirmPassword: { isValid: boolean; message: string };
};
