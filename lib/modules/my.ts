import { encode } from "qss";

export default function ({
  get,
}: Fetcher.FetcherInstance): ClientInstance["my"] {
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
