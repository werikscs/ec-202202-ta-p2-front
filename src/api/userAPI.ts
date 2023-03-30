import { IHttpClient, IUserAPI } from './types';

export class UserAPI implements IUserAPI {
  constructor(readonly httpClient: IHttpClient) {}

  async register<Input, Output>(input: Input): Promise<Output> {
    const endpoint = "";
    const response = await this.httpClient.post(endpoint, input);
    const data = response.data;
    return data;
  }
}
