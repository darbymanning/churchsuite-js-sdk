import type { Account, ClientInstance, ClientOptions } from "./churchsuite";
import fetcher from "./fetcher";

export default function createClient(options: ClientOptions): ClientInstance {
  const { get } = fetcher.create({
    baseURL: "https://api.churchsuite.com",
    headers: {
      "X-Account": options["X-Account"],
      "X-Application": options["X-Application"],
      "X-Auth": options["X-Auth"],
    },
  });

  return {
    whoAmI: async () => await get<Account.WhoAmI>("/v1/whoami"),
  };
}
