import { FormEvent, useState } from "react";
import { formErrorType, inputErrorType } from "./errorType";
import { registerType } from "./registerType";
import { StyledForm, StyledMain } from "./styles";
import validateForm from "./validateForm";

export function Register({}) {
  const [registerData, setRegisterData] = useState<registerType>({
    nome: "",
    email: "",
    password: "",
    confirmPassword: "",
  });
  const [error, setError] = useState<formErrorType>({
    nome: { isValid: true, message: "" },
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

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();

    const form = e.target as HTMLFormElement;
    const formData = new FormData(form);
    const formJson = Object.fromEntries(formData.entries());

    let auxError: formErrorType = {
      nome: {
        isValid: false,
        message: "",
      },
      email: {
        isValid: false,
        message: "",
      },
      password: {
        isValid: false,
        message: "",
      },
      confirmPassword: {
        isValid: false,
        message: "",
      },
    };

    for (const prop in formJson) {
      const updatedError = validateForm(prop, formJson[prop] as string);
      auxError = { ...auxError, [prop]: updatedError };
    }

    setError({ ...auxError });

    let hasErrors = false

    for (const prop in auxError) {
      if (!auxError[prop as keyof formErrorType].isValid) {
        hasErrors = true
      }
    }

    if(!hasErrors){
      console.log('deu bom')
      // UserAPI.register(formJson);
    }


  };

  return (
    <StyledMain>
      <header>
        <h1>Cadastre-se</h1>
      </header>
      <StyledForm onSubmit={handleSubmit}>
        <label htmlFor="nome">
          <span>Nome</span>
          <input
            type="text"
            name="nome"
            id="nome"
            data-testid="nome"
            placeholder="Escreva seu nome"
            value={registerData.nome}
            onChange={(event) => handleOnChange(event, "nome")}
          />
          {!error.nome.isValid && (
            <div className="form-error">{error.nome.message}</div>
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
