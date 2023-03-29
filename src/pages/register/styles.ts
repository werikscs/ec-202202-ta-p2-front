import styled from "styled-components";

export const StyledMain = styled.main`
  width: 100%;
  height: 100vh;
  padding: 1.5rem;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: 1.5rem;
  background-color: #fffcf9;
`;

export const StyledForm = styled.form`
  width: 100%;
  max-width: 360px;
  display: flex;
  flex-direction: column;
  gap: 0.5rem;

  label {
    display: flex;
    flex-direction: column;
    gap: 0.35rem;

    span {
      color: #181818;
      font-size: 0.875rem;
    }

    input {
      font-size: 0.75rem;
      color: #A6A39F;
      padding: 0.5rem 1rem;
      border: 0.125rem solid #eae8e4;
      background-color: transparent;

      ::placeholder {
        font-size: 0.75rem;
        color: #A6A39F;
      }

      :focus {
        border: 0.125rem solid #A6A39F;
      }
    }

    .form-error {
      font-size: 0.75rem;
      color: #ce2d4f;
    }
  }

  button {
    margin-top: 0.75rem;
    font-size: 1rem;
    font-weight: 600;
    padding: 0.5rem;
    color: #fffcf9;
    background-color: #181818;

    :hover {
      color: #181818;
      background-color: #fffcf9;
      outline: 0.125rem solid #181818;
    }
  }
`;
