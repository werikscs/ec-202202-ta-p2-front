import { IHttpClient } from './types';

export class AxiosHttpClient implements IHttpClient {
  post(endpoint: string, input: any): Promise<any> {
    throw new Error('Method not implemented.');
  }
}