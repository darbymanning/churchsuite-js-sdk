import { encode } from "qss";
import type { ClientInstance, My } from "../churchsuite";
import type { FetcherInstance } from "../fetcher";

export default function ({ get }: FetcherInstance): ClientInstance["my"] {
  return {
    async details() {
      return await get<My.Details>("/v1/my/details");
    },
    async contacts(query) {
      const params = query ? encode({ q: query }) : "";
      return await get<My.Contacts>(`/v1/my/contacts${params}`);
    },
    async children() {
      return await get<My.Children>("/v1/my/children");
    },
    async child(id) {
      return await get<My.Child>(`/v1/my/child/${id}`);
    },
  };
}
