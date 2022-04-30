import fetch from "cross-fetch";

export declare namespace Fetcher {
  interface FetcherInstance {
    get: <T>(url: RequestInfo, options?: RequestInit) => FetcherResponse<T>;
    post: <T>(url: RequestInfo, body: string | object) => FetcherResponse<T>;
    put: <T>(url: RequestInfo, body: string | object) => FetcherResponse<T>;
    del: <T>(url: RequestInfo) => FetcherResponse<T>;
  }

  type FetcherResponse<T> = Promise<{
    data: T;
    response: any;
    status: number;
    statusText: string;
  }>;

  interface Methods {
    create: (args: {
      baseURL?: string;
      headers: Record<string, string>;
    }) => FetcherInstance;
  }
}

function transformToJSON(obj: string | object): string {
  return typeof obj === "string"
    ? obj
    : JSON.stringify(JSON.parse(JSON.stringify(obj)));
}

const fetcher: Fetcher.Methods = {
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
