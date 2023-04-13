import { describe, expect, it } from "vitest";
import { IUserAPI } from "../../api/types";
import { UserAPI } from "../../api/user-api";
import { FakeHttpClient } from "../../test/fake-http-client";
import { FormMessage } from "./register-error-type";
import { inputRegisterUserType } from "./register-type";
import validateForm from "./validate-form";

describe("Register Page - Form", () => {
  describe("Input - Name", () => {
    it("should pass if name has at least two words", async () => {
      const nameData = { key: "name", value: "zezim p" };
      const formValidateResponse = await validateForm(
        nameData.key,
        nameData.value
      );
      expect(formValidateResponse.isValid).toBe(true);
      expect(formValidateResponse.message).toBe("");
    });
    it("should return error if name is empty", async () => {
      const nameData = { key: "name", value: "" };
      const formValidateResponse = await validateForm(
        nameData.key,
        nameData.value
      );
      expect(formValidateResponse.isValid).toBe(false);
      expect(formValidateResponse.message).toBe(FormMessage.RequiredField);
    });
    it("should return error if name has less than two words", async () => {
      const nameData = { key: "name", value: "zezim" };
      const formValidateResponse = await validateForm(
        nameData.key,
        nameData.value
      );
      expect(formValidateResponse.isValid).toBe(false);
      expect(formValidateResponse.message).toBe(FormMessage.AtLeastTwoWords);
    });
  });
  describe("Input - Email", () => {
    const api: IUserAPI = new UserAPI(new FakeHttpClient());

    it("should pass if email is valid", async () => {
      const emailData = { key: "email", value: "zezim2@email.com" };
      const formValidateResponse = await validateForm(
        emailData.key,
        emailData.value,
        api
      );
      expect(formValidateResponse.isValid).toBe(true);
      expect(formValidateResponse.message).toBe("");
    });
    it("should return error if name is empty", async () => {
      const emailData = { key: "email", value: "" };
      const formValidateResponse = await validateForm(
        emailData.key,
        emailData.value
      );
      expect(formValidateResponse.isValid).toBe(false);
      expect(formValidateResponse.message).toBe(FormMessage.RequiredField);
    });
    it("should return error if email is not valid", async () => {
      const emailData = { key: "email", value: "email" };
      const formValidateResponse = await validateForm(
        emailData.key,
        emailData.value
      );
      expect(formValidateResponse.isValid).toBe(false);
      expect(formValidateResponse.message).toBe(FormMessage.EmailNotValid);
    });
    it("should return error if email is already taken", async () => {
      const emailData = { key: "email", value: "zezim@email.com" };
      const formValidateResponse = await validateForm(
        emailData.key,
        emailData.value,
        api
      );
      expect(formValidateResponse.isValid).toBe(false);
      expect(formValidateResponse.message).toBe(FormMessage.EmailAlreadyTaken);
    });
  });
  describe("Input - Password", () => {
    it("should pass if password is valid", async () => {
      const passwordData = { key: "password", value: "ZezimPereira@123" };
      const formValidateResponse = await validateForm(
        passwordData.key,
        passwordData.value
      );
      expect(formValidateResponse.isValid).toBe(true);
      expect(formValidateResponse.message).toBe("");
    });
    it("should return error if password is empty", async () => {
      const passwordData = { key: "password", value: "" };
      const formValidateResponse = await validateForm(
        passwordData.key,
        passwordData.value
      );
      expect(formValidateResponse.isValid).toBe(false);
      expect(formValidateResponse.message).toBe(FormMessage.RequiredField);
    });
    it("should return error if password does not have a number", async () => {
      const passwordData = { key: "password", value: "zezimpereira" };
      const formValidateResponse = await validateForm(
        passwordData.key,
        passwordData.value
      );
      expect(formValidateResponse.isValid).toBe(false);
      expect(formValidateResponse.message).toBe(FormMessage.PasswordNotValid);
    });
    it("should return error if password does not have a uppercase letter", async () => {
      const passwordData = { key: "password", value: "zezimpereira123" };
      const formValidateResponse = await validateForm(
        passwordData.key,
        passwordData.value
      );
      expect(formValidateResponse.isValid).toBe(false);
      expect(formValidateResponse.message).toBe(FormMessage.PasswordNotValid);
    });
    it("should return error if password does not have a lowercase letter", async () => {
      const passwordData = { key: "password", value: "ZEZIMPEREIRA123" };
      const formValidateResponse = await validateForm(
        passwordData.key,
        passwordData.value
      );
      expect(formValidateResponse.isValid).toBe(false);
      expect(formValidateResponse.message).toBe(FormMessage.PasswordNotValid);
    });
    it("should return error if password does not have special character !@#$%^&*_", async () => {
      const passwordData = { key: "password", value: "ZezimPereira123" };
      const formValidateResponse = await validateForm(
        passwordData.key,
        passwordData.value
      );
      expect(formValidateResponse.isValid).toBe(false);
      expect(formValidateResponse.message).toBe(FormMessage.PasswordNotValid);
    });
    it("should return error if password is has less than 8 characters", async () => {
      const passwordData = { key: "password", value: "ZEZIMPE" };
      const formValidateResponse = await validateForm(
        passwordData.key,
        passwordData.value
      );
      expect(formValidateResponse.isValid).toBe(false);
      expect(formValidateResponse.message).toBe(FormMessage.PasswordNotValid);
    });
  });

  describe("Input - Confirm Password", () => {
    const fakeRegisterData: inputRegisterUserType = {
      name: "",
      email: "",
      password: "ZezimPereira@123",
      confirmPassword: "",
    };

    it("should pass if confirm password is equals password", async () => {
      const passwordData = {
        key: "confirmPassword",
        value: "ZezimPereira@123",
      };
      const formValidateResponse = await validateForm(
        passwordData.key,
        passwordData.value,
        undefined,
        fakeRegisterData
      );
      expect(formValidateResponse.isValid).toBe(true);
      expect(formValidateResponse.message).toBe("");
    });

    it("should not pass if confirm password is not equals password", async () => {
      const passwordData = { key: "confirmPassword", value: "ZezimPereira@12" };
      const formValidateResponse = await validateForm(
        passwordData.key,
        passwordData.value,
        undefined,
        fakeRegisterData
      );
      expect(formValidateResponse.isValid).toBe(false);
      expect(formValidateResponse.message).toBe(
        FormMessage.PasswordsAreDifferent
      );
    });
  });
});
