import type { Children, ClientInstance } from "../churchsuite";
import type { FetcherInstance } from "../fetcher";

export default function ({ get }: FetcherInstance): ClientInstance["children"] {
  return {
    async info() {
      return await get<Children.Info>("/v1/module/children");
    },
  };
}
