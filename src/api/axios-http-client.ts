import axios from "axios";
import { IHttpClient } from "./types";

export class AxiosHttpClient implements IHttpClient {
  private httpClient;

  constructor() {
    const API_URL = "";
    this.httpClient = axios.create({
      baseURL: import.meta.env.VITE_API_URL || "http://localhost:3000",
    });
  }
  async post(endpoint: string, input: any): Promise<any> {
    this.httpClient.post(endpoint, input);
  }
}
