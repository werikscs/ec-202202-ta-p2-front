export interface IHttpClient {
  post(endpoint: string, input: any): Promise<any>;
}

export interface IUserAPI {
  httpClient: IHttpClient;
  register<Input, Output>(input: Input): Promise<Output>;
}