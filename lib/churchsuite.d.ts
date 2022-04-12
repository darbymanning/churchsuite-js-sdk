/**
 * Responses for data relating to the API user
 * @see {@link https://github.com/ChurchSuite/churchsuite-api/blob/master/modules/account.md ChurchSuite Account}
 */
export namespace Account {
  interface Site {
    id: string;
    name: string;
  }

  /**
   * Return data on the user accessing the API
   * @see {@link https://github.com/ChurchSuite/churchsuite-api/blob/master/modules/account.md#get-user ChurchSuite Account: Get User}
   */
  export interface WhoAmI {
    id: number;
    username: string;
    contact_id: number;
    name: string;
    email: string;
    user_type: string;
    restricted: boolean;
    logins: number;
    last_login: string;
    modules: [];
    ical_url: string;
    images: [];
    sites: Record<string, Site>;
    all_sites: boolean;
    api_access: boolean;
    mfa_enabled: 0;
    signature: string;
    status: string;
    mtime: string;
    muser: string;
    ctime: string;
    cuser: string;
  }
}

export interface ClientOptions {
  "X-Account": string;
  "X-Application": string;
  "X-Auth": string;
}

export interface ClientInstance {
  whoAmI: () => Promise<Account.WhoAmI>;
}

/**
 * Create an instance of the ChurchSuite JavaScript SDK
 * @example
 *
 * const options = {
 *   "X-Account": "demo",
 *   "X-Application": "Example",
 *   "X-Auth": "1234567890abc",
 * };
 * const client = createClient(options);
 * const user = await client.whoAmI();
 */
export declare function createClient(options: ClientOptions): ClientInstance;

export default createClient;
