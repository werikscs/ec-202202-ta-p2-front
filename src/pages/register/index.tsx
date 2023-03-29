import { FormEvent, useState } from "react";
import { errorType } from './errorType';
import { registerType } from "./registerType";
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

  const handleReset = () => {
    setRegisterData({
      nome: "",
      email: "",
      password: "",
      confirmPassword: "",
    });
    setError({
      nome: { isValid: false, message: "" },
      email: { isValid: false, message: "" },
      password: { isValid: false, message: "" },
      confirmPassword: { isValid: false, message: "" },
    });
  };

  return (
    <div className="registro">
      <form
        className="form"
        onSubmit={handleSubmit}
        onReset={handleReset}
      >
        <label htmlFor="nome">
          nome
          <input
            type="text"
            name="nome"
            id="nome"
            data-testid="nome"
            value={registerData.nome}
            onChange={(event) => handleOnChange(event, "nome")}
          />
          {!error.nome.isValid && <div>{error.nome.message}</div>}
        </label>
        <label htmlFor="email">
          email
          <input
            type="text"
            name="email"
            id="email"
            data-testid="email"
            value={registerData.email}
            onChange={(event) => handleOnChange(event, "email")}
          />
          {!error.email.isValid && <div>{error.email.message}</div>}
        </label>
        <label htmlFor="password">
          password
          <input
            type="password"
            name="password"
            id="password"
            data-testid="password"
            value={registerData.password}
            onChange={(event) => handleOnChange(event, "password")}
          />
          {!error.password.isValid && <div>{error.password.message}</div>}
        </label>
        <label htmlFor="confirmPassword">
          confirmPassword
          <input
            type="password"
            name="confirmPassword"
            id="confirmPassword"
            data-testid="confirmPassword"
            value={registerData.confirmPassword}
            onChange={(event) => handleOnChange(event, "confirmPassword")}
          />
        </label>
        {!error.confirmPassword.isValid && (
          <div>{error.confirmPassword.message}</div>
        )}
        <button type="submit">Registrar</button>
        <button type="reset">Reset</button>
      </form>
    </div>
  );
}
