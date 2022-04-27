import type { ClientInstance, SmallGroups } from "../churchsuite";
import type { FetcherInstance } from "../fetcher";

export default function ({
  get,
}: FetcherInstance): ClientInstance["smallGroups"] {
  return {
    async info() {
      return await get<SmallGroups.Info>("/v1/module/smallgroups");
    },
  };
}
