import {
  IHttpClient,
  IUserAPI,
  loginUserInput,
  loginUserOutput,
  registerUserInput,
  registerUserOutput,
} from "./types/types";

export class UserAPI implements IUserAPI {
  constructor(readonly httpClient: IHttpClient) {}

  async register(input: registerUserInput): Promise<registerUserOutput> {
    const response = this.httpClient.post("/register", input);
    return response;
  }

  async findUserByEmail(input: string): Promise<boolean> {
    const userFound = await this.httpClient.post("/findUserByEmail", input);
    return Boolean(userFound);
  }

  async login(input: loginUserInput): Promise<loginUserOutput> {
    const response = await this.httpClient.post("/login", input);
    return response;
  }
}
