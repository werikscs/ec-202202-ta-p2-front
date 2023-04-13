import {
  IHttpClient,
  IUserAPI,
  loginUserInput,
  loginUserOutput,
  registerUserInput,
  registerUserOutput,
} from "./types";

export class UserAPI implements IUserAPI {
  constructor(readonly httpClient: IHttpClient, readonly subBaseURL: string) {}

  async findUserByEmail(input: string): Promise<boolean> {
    const userFound = await this.httpClient.post(
      `${this.subBaseURL}/findUserByEmail`,
      input
    );
    return Boolean(userFound);
  }
}
