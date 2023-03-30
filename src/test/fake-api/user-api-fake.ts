import {
  IHttpClient,
  IUserAPI,
  registerUserInput,
  registerUserOutput,
} from "../../api/types/types";
import { v4 as uuidv4 } from "uuid";
import { fakeUserDataBase } from "../fake-data/fake-user-database";

export class UserAPIFake implements IUserAPI {
  constructor(readonly httpClient: IHttpClient) {}

  async register(input: registerUserInput): Promise<registerUserOutput> {
    const dataInput = { ...input, id: uuidv4() };
    await fakeUserDataBase.push(dataInput);
    const { id, name, email } = dataInput;
    return { id, name, email };
  }

  async findUserByEmail(input: string): Promise<boolean> {
    const userFound = await fakeUserDataBase.find(user => user.email === input)
    return Boolean(userFound)
  }
}
