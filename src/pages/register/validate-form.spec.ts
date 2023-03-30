import { describe, expect, it } from "vitest";
import { FormMessage } from "./error-type";
import validateForm from "./validate-form";

describe("Register Page - form", () => {
  describe("Input name", () => {
    it("should pass if name has at least two words", () => {
      const nameData = { key: "name", value: "zezim p" };
      const formValidateResponse = validateForm(nameData.key, nameData.value);
      expect(formValidateResponse.isValid).toBe(true);
      expect(formValidateResponse.message).toBe("");
    });
    it("should return error if name is empty", () => {
      const nameData = { key: "name", value: "" };
      const formValidateResponse = validateForm(nameData.key, nameData.value);
      expect(formValidateResponse.isValid).toBe(false);
      expect(formValidateResponse.message).toBe(FormMessage.RequiredField);
    });
    it("should return error if name has less than two words", () => {
      const nameData = { key: "name", value: "zezim" };
      const formValidateResponse = validateForm(nameData.key, nameData.value);
      expect(formValidateResponse.isValid).toBe(false);
      expect(formValidateResponse.message).toBe(FormMessage.AtLeastTwoWords);
    });
  });
});
