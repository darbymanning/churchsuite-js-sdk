import type { ClientInstance, Giving } from "../churchsuite";
import type { FetcherInstance } from "../fetcher";

export default function ({ get }: FetcherInstance): ClientInstance["giving"] {
  return {
    async info() {
      return await get<Giving.Info>("/v1/module/giving");
    },
  };
}
