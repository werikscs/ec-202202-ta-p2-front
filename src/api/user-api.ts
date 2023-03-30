import { IHttpClient, IUserAPI, registerUserInput, registerUserOutput } from './types/types';

export class UserAPI implements IUserAPI {
  constructor(readonly httpClient: IHttpClient) {}

  async register(input: registerUserInput): Promise<registerUserOutput> {
    const endpoint = "";
    const response = await this.httpClient.post(endpoint, input);
    const data = response.data;
    return data;
  }
}
