import type { ClientInstance } from "../main";
import type { Fetcher } from "../fetcher";
import type { BooleanAsNumber } from "../types";

export declare namespace Rotas {
  /**
   * Return the details regarding the Address Book module
   * @see {@link https://github.com/ChurchSuite/churchsuite-api/blob/master/modules/account.md#get-module ChurchSuite Account: Get Module}
   */
  interface Info {
    id: "rotas";
    name: string;
    order: number;
    options: {
      connect: [];
      embed: [];
      module: {
        unavailability_enabled: BooleanAsNumber;
        serving_requests_enabled?: BooleanAsNumber;
        module_password?: string;
      };
      public: {
        public_access: BooleanAsNumber;
        access_type: "anyone";
        enable_all_rotas_view?: BooleanAsNumber;
        public_disable_swap?: BooleanAsNumber;
        person_search?: "ministry_site" | "all_sites";
      };
    };
    mtime: "2022-04-20 15:42:12";
    muser: "install";
  }

  interface Methods {
    info: () => Fetcher.FetcherResponse<Rotas.Info>;
  }
}

export default function ({
  get,
}: Fetcher.FetcherInstance): ClientInstance["rotas"] {
  return {
    async info() {
      return await get<Rotas.Info>("/v1/module/rotas");
    },
  };
}
