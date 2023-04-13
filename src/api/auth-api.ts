import {
  IAuthAPI,
  IHttpClient,
  loginUserInput,
  loginUserOutput,
  registerUserInput,
  registerUserOutput,
} from "./types";

export class AuthAPI implements IAuthAPI {
  constructor(readonly httpClient: IHttpClient, readonly subBaseURL: string) {}

  async register(input: registerUserInput): Promise<registerUserOutput> {
    const response = await this.httpClient.post(
      `${this.subBaseURL}/register`,
      input
    );
    return response;
  }

  async login(input: loginUserInput): Promise<loginUserOutput> {
    const response = await this.httpClient.post(
      `${this.subBaseURL}/login`,
      input
    );
    return response;
  }
}
