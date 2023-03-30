import { describe, expect, it } from "vitest";
import { AxiosHttpClient } from '../../api/http-clients/axios-http-client';
import { IUserAPI } from '../../api/types/types';
import { UserAPIFake } from '../../test/fake-api/user-api-fake';
import { FormMessage } from "./error-type";
import validateForm from "./validate-form";

describe("Register Page - Form", () => {
  describe("Input - Name", () => {
    it("should pass if name has at least two words", async () => {
      const nameData = { key: "name", value: "zezim p" };
      const formValidateResponse = await validateForm(nameData.key, nameData.value);
      expect(formValidateResponse.isValid).toBe(true);
      expect(formValidateResponse.message).toBe("");
    });
    it("should return error if name is empty", async () => {
      const nameData = { key: "name", value: "" };
      const formValidateResponse = await validateForm(nameData.key, nameData.value);
      expect(formValidateResponse.isValid).toBe(false);
      expect(formValidateResponse.message).toBe(FormMessage.RequiredField);
    });
    it("should return error if name has less than two words", async () => {
      const nameData = { key: "name", value: "zezim" };
      const formValidateResponse = await validateForm(nameData.key, nameData.value);
      expect(formValidateResponse.isValid).toBe(false);
      expect(formValidateResponse.message).toBe(FormMessage.AtLeastTwoWords);
    });
  });
  describe("Input - Email", () => {
    const api: IUserAPI = new UserAPIFake(new AxiosHttpClient())
    
    it("should pass if email is valid", async () => {
      const emailData = { key: "email", value: "zezim2@email.com" };
      const formValidateResponse = await validateForm(emailData.key, emailData.value, api);
      expect(formValidateResponse.isValid).toBe(true);
      expect(formValidateResponse.message).toBe("");
    })
    it("should return error if name is empty", async () => {
      const emailData = { key: "email", value: "" };
      const formValidateResponse = await validateForm(emailData.key, emailData.value);
      expect(formValidateResponse.isValid).toBe(false);
      expect(formValidateResponse.message).toBe(FormMessage.RequiredField);
    })
    it("should return error if email is not valid", async () => {
      const emailData = { key: "email", value: "email" };
      const formValidateResponse = await validateForm(emailData.key, emailData.value);
      expect(formValidateResponse.isValid).toBe(false);
      expect(formValidateResponse.message).toBe(FormMessage.EmailNotValid);
    })
    it("should return error if email is already taken", async () => {
      const emailData = { key: "email", value: "zezim@email.com" };
      const formValidateResponse = await validateForm(emailData.key, emailData.value, api);
      expect(formValidateResponse.isValid).toBe(false);
      expect(formValidateResponse.message).toBe(FormMessage.EmailAlreadyTaken);
    })
  });
});
