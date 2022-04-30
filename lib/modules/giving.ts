import type { ClientInstance } from "../main";
import type { Fetcher } from "../fetcher";
import type { BooleanAsNumber } from "../types";

export declare namespace Giving {
  /**
   * Return the details regarding the Address Book module
   * @see {@link https://github.com/ChurchSuite/churchsuite-api/blob/master/modules/account.md#get-module ChurchSuite Account: Get Module}
   */
  interface Info {
    id: "giving";
    name: string;
    order: number;
    options: {
      connect: [];
      embed: {
        integrations: "gocardless_stripe" | "gocardless" | "stripe";
        cover_transaction_fees?: BooleanAsNumber;
      };
      module: [];
      public: {
        public_access: BooleanAsNumber;
        my_giving_tags?: string;
        access_type?: "givers" | "anyone";
        welcome_message?: string;
        pledge_management?: BooleanAsNumber;
        pledge_management_add?: BooleanAsNumber;
        pledge_message?: string;
        declaration_management?: BooleanAsNumber;
        declaration_management_add?: BooleanAsNumber;
        declaration_message?: string;
      };
    };
    mtime: string;
    muser: string;
  }

  interface Methods {
    info: () => Fetcher.FetcherResponse<Giving.Info>;
  }
}
export default function ({
  get,
}: Fetcher.FetcherInstance): ClientInstance["giving"] {
  return {
    async info() {
      return await get<Giving.Info>("/v1/module/giving");
    },
  };
}
