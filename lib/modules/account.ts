import type { ClientInstance } from "../main";
import type { Fetcher } from "../fetcher";
import type { BooleanAsNumber, EmailString } from "../types";

/**
 * Responses for data relating to the API user
 * @see {@link https://github.com/ChurchSuite/churchsuite-api/blob/master/modules/account.md ChurchSuite Account}
 */
export declare namespace Account {
  type Site = {
    id: string;
    name: string;
  };

  type Module = {
    id:
      | "addressbook"
      | "attendance"
      | "bookings"
      | "calendar"
      | "children"
      | "giving"
      | "planning"
      | "rotas"
      | "smallgroups";
    permission_read: boolean;
    permission_write: boolean;
    permission_manage: boolean;
    permission_connect: boolean;
  };

  /**
   * Return data on the user accessing the API
   * @see {@link https://github.com/ChurchSuite/churchsuite-api/blob/master/modules/account.md#get-user ChurchSuite Account: Get user}
   */
  interface User {
    id: number;
    username: string;
    contact_id: number | null;
    name: string;
    email: EmailString;
    user_type: "admin"; // TODO
    restricted: boolean;
    logins: number;
    last_login: string | null;
    modules: Partial<Record<Module["id"], Module>>;
    ical_url: string;
    images: [];
    sites: Record<string, Site>;
    all_sites: boolean;
    api_access: boolean;
    mfa_enabled: BooleanAsNumber;
    signature: string | null;
    status: "active" | "archived";
    mtime: string;
    muser: string;
    ctime: string;
    cuser: string;
  }

  type PostalAddress = {
    address: string;
    address2: string;
    city: string;
    county: string;
    postcode: string;
    region: string;
    country: string | null;
    latitude: string;
    longitude: string;
  };

  /**
   * Return the details regarding an account's global contact information
   * @see {@link https://github.com/ChurchSuite/churchsuite-api/blob/master/modules/account.md#get-profile ChurchSuite Account: Get profile}
   */
  interface Profile {
    id: string;
    give2_keyword: string;
    name: string;
    billing: {
      first_name: string;
      last_name: string;
      telephone: string;
      email: EmailString;
    } & PostalAddress;
    meeting: PostalAddress;
    ctime: string;
    cuser: string;
    mtime: string;
    muser: string;
  }

  interface Methods {
    user: () => Fetcher.FetcherResponse<Account.User>;
    profile: () => Fetcher.FetcherResponse<Account.Profile>;
  }
}

export default function ({
  get,
}: Fetcher.FetcherInstance): ClientInstance["account"] {
  return {
    async user() {
      return await get<Account.User>("/v1/whoami");
    },
    async profile() {
      return await get<Account.Profile>("/v1/profile");
    },
  };
}
