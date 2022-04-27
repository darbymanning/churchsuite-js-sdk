import type { Account, ClientInstance } from "../churchsuite";
import type { FetcherInstance } from "../fetcher";

export default function ({ get }: FetcherInstance): ClientInstance["account"] {
  return {
    async user() {
      return await get<Account.User>("/v1/whoami");
    },
    async profile() {
      return await get<Account.Profile>("/v1/profile");
    },
  };
}
