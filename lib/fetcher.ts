import fetch from "cross-fetch";

const fetcher = {
  create: ({
    baseURL,
    headers,
  }: {
    baseURL: string;
    headers: Record<string, string>;
  }) => {
    const request = async (url: RequestInfo, options?: RequestInit) => {
      const request = await fetch(baseURL + url, { ...options, headers });
      const response = await request.json();
      return response;
    };

    return {
      get: async <Request>(url: RequestInfo, options?: RequestInit) =>
        request(url, options) as Promise<Request>,
    };
  },
};

export default fetcher;
