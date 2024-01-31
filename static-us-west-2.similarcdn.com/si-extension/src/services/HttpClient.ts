import { getExtensionVersion } from './browser';

export const BASE_API_URL = '/sales-extension/api';

export type RequestInterceptor = (request: RequestInit) => RequestInit;
export type ResponseInterceptor = (response: Response) => Promise<Response>;

export class HttpClient {
  private static requestInterceptors: RequestInterceptor[] = [this.addHeaders];
  private static responseInterceptors: ResponseInterceptor[] = [];

  private static addHeaders(request: RequestInit) {
    let updatedHeaders = { ...request.headers };

    if (['POST', 'PUT'].includes(request.method || '')) {
      updatedHeaders = {
        ...updatedHeaders,
        'Content-Type': 'application/json',
        Accept: 'application/json',
      };
    }

    const version = getExtensionVersion();
    if (version) {
      updatedHeaders = {
        ...updatedHeaders,
        'X-SW-SALES-EXTENSION-version': version,
      };
    }
    return { ...request, headers: updatedHeaders };
  }

  static registerRequestInterceptor(interceptor: RequestInterceptor) {
    this.requestInterceptors.push(interceptor);

    return () => {
      this.requestInterceptors = this.requestInterceptors.filter((i) => i !== interceptor);
    };
  }

  static registerResponseInterceptor(interceptor: ResponseInterceptor) {
    this.responseInterceptors.push(interceptor);

    return () => {
      this.responseInterceptors = this.responseInterceptors.filter((i) => i !== interceptor);
    };
  }

  static get<T>(url: string, options?: RequestInit): Promise<T> {
    return this.request<T>('GET', url, undefined, options);
  }

  static post<T>(url: string, body: unknown, options?: RequestInit): Promise<T> {
    return this.request<T>('POST', url, body, options);
  }

  static put<T>(url: string, body: unknown, options?: RequestInit): Promise<T> {
    return this.request<T>('PUT', url, body, options);
  }

  static delete<T>(url: string, options?: RequestInit): Promise<T> {
    return this.request<T>('DELETE', url, undefined, options);
  }

  private static async request<T>(method: string, url: string, body?: unknown, options?: RequestInit): Promise<T> {
    const request: RequestInit = this.requestInterceptors.reduce((prevValue, interceptor) => interceptor(prevValue), {
      method,
      body: body ? JSON.stringify(body) : undefined,
      ...options,
    } as RequestInit);
    let response = await fetch(url, request);

    response = await this.responseInterceptors.reduce((responsePromise, interceptor) => {
      return responsePromise.then(interceptor);
    }, Promise.resolve(response));

    if (!response.ok) {
      throw new Error(`HTTP error ${response.status}`);
    }

    if (response.status === 204) return undefined as unknown as T;

    try {
      const data = (await response.json()) as T;
      return data;
    } catch {
      return undefined as unknown as T;
    }
  }
}
