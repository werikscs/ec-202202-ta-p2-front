export interface IHttpClient {
  post(endpoint: string, input: any): Promise<any>;
}

export interface IUserAPI {
  httpClient: IHttpClient;
  register(input: registerUserInput): Promise<registerUserOutput>;
}

export type registerUserInput = {
  name: string
  email: string
  password: string
}

export type registerUserOutput = {
  id: string
  name: string
  email: string
}