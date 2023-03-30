import axios from "axios";
import { IHttpClient } from "../types/types";

export class AxiosAdapter implements IHttpClient {
  private httpClient;
  
  constructor() {
    this.httpClient = axios.create({
      baseURL: import.meta.env.VITE_BACKEND_API_URL,
    });
  }
  async post(endpoint: string, input: any): Promise<any> {
    this.httpClient.post(endpoint, input);
  }
}
