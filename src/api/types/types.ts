export interface IHttpClient {
  post(url: string, input: any): Promise<any>;
}

export interface IUserAPI {
  httpClient: IHttpClient;
  register(input: registerUserInput): Promise<registerUserOutput>;
  login(input: loginUserInput): Promise<loginUserOutput>
  findUserByEmail(input: string): Promise<boolean>;
}

export type registerUserInput = {
  name: string;
  email: string;
  password: string;
};

export type registerUserOutput = {
  id: string;
  name: string;
  email: string;
};

export type loginUserInput = {
  email: string
  password: string
}

export type loginUserOutput = {
  id: string
  token: string
}
