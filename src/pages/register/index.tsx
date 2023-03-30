import { FormEvent, useState } from "react";
import { formErrorType } from "./error-type";
import { registerType } from "./register-type";
import { StyledForm, StyledMain } from "./styles";
import { IUserAPI } from "../../api/types/types";
import validateForm from "./validate-form";

type IProp = {
  userAPI: IUserAPI;
};

export function Register({ userAPI }: IProp) {
  const [registerData, setRegisterData] = useState<registerType>({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
  });
  const [error, setError] = useState<formErrorType>({
    name: { isValid: true, message: "" },
    email: { isValid: true, message: "" },
    password: { isValid: true, message: "" },
    confirmPassword: { isValid: true, message: "" },
  });

  const handleOnChange = (e: FormEvent, key: string) => {
    setRegisterData({
      ...registerData,
      [key]: (e.target as HTMLInputElement).value,
    });
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();

    const form = e.target as HTMLFormElement;
    const formData = new FormData(form);
    const formJson = Object.fromEntries(formData.entries());

    let auxError = error;

    for (const prop in formJson) {
      const updatedError = await validateForm(
        prop,
        formJson[prop] as string,
        userAPI,
        registerData
      );
      auxError = { ...auxError, [prop]: updatedError };
    }

    setError({ ...auxError });

    for (const prop in auxError) {
      if (!auxError[prop as keyof formErrorType].isValid) {
        return;
      }
    }

    const { name: name, email, password } = registerData;
    await userAPI.register({ name, email, password });
  };

  return (
    <StyledMain>
      <header>
        <h1>Cadastre-se</h1>
      </header>
      <StyledForm onSubmit={handleSubmit}>
        <label htmlFor="nome">
          <span>Nome Completo</span>
          <input
            type="text"
            name="name"
            id="name"
            data-testid="name"
            placeholder="Escreva seu nome completo"
            value={registerData.name}
            onChange={(event) => handleOnChange(event, "name")}
          />
          {!error.name.isValid && (
            <div className="form-error">{error.name.message}</div>
          )}
        </label>
        <label htmlFor="email">
          <span>Email</span>
          <input
            type="text"
            name="email"
            id="email"
            data-testid="email"
            placeholder="Escreva seu email"
            value={registerData.email}
            onChange={(event) => handleOnChange(event, "email")}
          />
          {!error.email.isValid && (
            <div className="form-error">{error.email.message}</div>
          )}
        </label>
        <label htmlFor="password">
          <span>Senha</span>
          <input
            type="password"
            name="password"
            id="password"
            data-testid="password"
            placeholder="Escreva sua senha"
            value={registerData.password}
            onChange={(event) => handleOnChange(event, "password")}
          />
          {!error.password.isValid && (
            <div className="form-error">{error.password.message}</div>
          )}
        </label>
        <label htmlFor="confirmPassword">
          <span>Confirmar</span>
          <input
            type="password"
            name="confirmPassword"
            id="confirmPassword"
            data-testid="confirmPassword"
            placeholder="Repita sua senha"
            value={registerData.confirmPassword}
            onChange={(event) => handleOnChange(event, "confirmPassword")}
          />
          {!error.confirmPassword.isValid && (
            <div className="form-error">{error.confirmPassword.message}</div>
          )}
        </label>
        <button type="submit">Cadastrar</button>
      </StyledForm>
    </StyledMain>
  );
}
