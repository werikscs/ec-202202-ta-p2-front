import { FormEvent, useState } from "react";
import { errorType } from "./errorType";
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
  const [error, setError] = useState<errorType>({
    nome: { isValid: false, message: "" },
    email: { isValid: false, message: "" },
    password: { isValid: false, message: "" },
    confirmPassword: { isValid: false, message: "" },
  });

  const handleOnChange = (e: FormEvent, key: string) => {
    setRegisterData({
      ...registerData,
      [key]: (e.target as HTMLInputElement).value,
    });
    const errorData = validateForm(key, e, registerData, error);
    setError({ ...errorData });
  };

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();

    for (const prop in error) {
      if (!error[prop as keyof errorType].isValid) return;
    }

    const form = e.target as HTMLFormElement;
    const formData = new FormData(form);
    const formJson = Object.fromEntries(formData.entries());
    console.log(formJson);

    // RegisterUserAPI.register(formJson);
  };

  return (
    <StyledMain>
      <header>
        <h1>Cadastre-se</h1>
      </header>
      <StyledForm
        className="form"
        onSubmit={handleSubmit}
      >
        <label htmlFor="nome">
          <span>Nome</span>
          <input
            type="text"
            name="nome"
            id="nome"
            data-testid="nome"
            placeholder="Escreva um nome"
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
            placeholder="Escreva um email válido"
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
            placeholder="Escreva uma senha"
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
            placeholder="Escreva a mesma senha"
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
