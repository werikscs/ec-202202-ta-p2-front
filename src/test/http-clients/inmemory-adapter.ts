import { IHttpClient } from "../../api/types/types";
import { fakeUserDataBase } from "../fake-data/fake-user-database";
import { v4 as uuidv4 } from "uuid";

export class InMemoryAdapter implements IHttpClient {
  async post(url: string, input: any): Promise<any> {
    switch (url) {
      case "/register":
        const dataInput = { ...input, id: uuidv4() };
        await fakeUserDataBase.push(dataInput);
        const { id, name, email } = dataInput;
        return { id, name, email };
      case "/findUserByEmail":
        const userFound = await fakeUserDataBase.find(
          (user) => user.email === input
        );
        return userFound;
      case "/login":
        console.log("login");
        break;
      default:
        console.log("default");
    }
  }
}
