import {
  IHttpClient,
  IUserAPI,
  registerUserInput,
  registerUserOutput,
} from "../../api/types/types";
import { v4 as uuidv4 } from "uuid";
import { dataBaseFake } from "../fake-data/database-fake";

export class UserAPIFake implements IUserAPI {
  constructor(readonly httpClient: IHttpClient) {}
  async register(input: registerUserInput): Promise<registerUserOutput> {
    const dataInput = { ...input, id: uuidv4() };
    dataBaseFake.push(dataInput);
    const { id, name, email } = dataInput;
    console.log(dataBaseFake)
    return { id, name, email };
  }
}
