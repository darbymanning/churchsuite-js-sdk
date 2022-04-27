import fetch from "cross-fetch";
import type { FetcherResponse } from "./churchsuite";

function transformToJSON(obj: string | object): string {
  return typeof obj === "string"
    ? obj
    : JSON.stringify(JSON.parse(JSON.stringify(obj)));
}

export interface FetcherInstance {
  get: <T>(url: RequestInfo, options?: RequestInit) => FetcherResponse<T>;
  post: <T>(url: RequestInfo, body: string | object) => FetcherResponse<T>;
  put: <T>(url: RequestInfo, body: string | object) => FetcherResponse<T>;
  del: <T>(url: RequestInfo) => FetcherResponse<T>;
}

export interface Fetcher {
  create: (args: {
    baseURL?: string;
    headers: Record<string, string>;
  }) => FetcherInstance;
}

const fetcher: Fetcher = {
  create: ({ baseURL = "", headers }) => {
    const request = async (url: RequestInfo, options?: RequestInit) => {
      const response = await fetch(baseURL + url, { ...options, headers });
      const data = await response.json();

      return {
        data,
        response,
        status: response.status,
        statusText: response.statusText,
      };
    };

    return {
      async get(url, options) {
        return request(url, options);
      },
      async post(url, body) {
        const options = {
          body: transformToJSON(body),
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
        };

        return request(url, options);
      },
      async put(url, body) {
        const options = {
          body: transformToJSON(body),
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
        };

        return request(url, options);
      },
      async del(url) {
        return request(url, { method: "DELETE" });
      },
    };
  },
};

export default fetcher;
