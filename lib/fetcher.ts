import fetch from "cross-fetch";
import type { FetcherResponse } from "./churchsuite";

function transformToJSON(obj: string | object): string {
  return typeof obj === "string"
    ? obj
    : JSON.stringify(JSON.parse(JSON.stringify(obj)));
}

const fetcher = {
  create: ({
    baseURL = "",
    headers,
  }: {
    baseURL?: string;
    headers: Record<string, string>;
  }) => {
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
      get: async <T>(url: RequestInfo, options?: RequestInit) => {
        return request(url, options) as FetcherResponse<T>;
      },
      post: async <T>(url: RequestInfo, body: string | object) => {
        const options = {
          body: transformToJSON(body),
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
        };

        return request(url, options) as FetcherResponse<T>;
      },
      put: async <T>(url: RequestInfo, body: string | object) => {
        const options = {
          body: transformToJSON(body),
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
        };

        return request(url, options) as FetcherResponse<T>;
      },
      del: async <T>(url: RequestInfo) => {
        return request(url, { method: "DELETE" }) as FetcherResponse<T>;
      },
    };
  },
};

export default fetcher;
