import axios from "axios";
import { IHttpClient } from "../types/types";

export class AxiosHttpClient implements IHttpClient {
  private axiosHttpClient;
  constructor() {
    this.axiosHttpClient = axios.create({
      baseURL: import.meta.env.VITE_BACKEND_API_URL,
    });
  }
  async post(endpoint: string, input: any): Promise<any> {
    this.axiosHttpClient.post(endpoint, input);
  }
}
