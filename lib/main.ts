import account, { type Account } from "./modules/account";
import addressBook, { type AddressBook } from "./modules/addressBook";
import attendance, { type Attendance } from "./modules/attendance";
import calendar, { type Calendar } from "./modules/calendar";
import children, { type Children } from "./modules/children";
import fetcher from "./fetcher";
import giving, { type Giving } from "./modules/giving";
import my, { type My } from "./modules/my";
import oauth2, { type OAuth2 } from "./modules/oauth2";
import rotas, { type Rotas } from "./modules/rotas";
import smallGroups, { type SmallGroups } from "./modules/smallGroups";

export declare interface ClientOptions {
  "X-Account": string;
  "X-Application": string;
  "X-Auth": string;
  oauth2?: OAuth2.Options;
}

export declare interface ClientInstance {
  account: Account.Methods;
  addressBook: AddressBook.Methods;
  attendance: Attendance.Methods;
  calendar: Calendar.Methods;
  children: Children.Methods;
  giving: Giving.Methods;
  my?: My.Methods;
  oauth2?: OAuth2.Methods;
  rotas: Rotas.Methods;
  smallGroups: SmallGroups.Methods;
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
 * const user = await client.account.user();
 */
export default function createClient(options: ClientOptions): ClientInstance {
  const fetcherInstance = fetcher.create({
    baseURL: "https://api.churchsuite.com",
    headers: {
      "X-Account": options["X-Account"],
      "X-Application": options["X-Application"],
      "X-Auth": options["X-Auth"],
    },
  });

  const sdk: ClientInstance = {
    account: account(fetcherInstance),
    addressBook: addressBook(fetcherInstance),
    attendance: attendance(fetcherInstance),
    calendar: calendar(fetcherInstance),
    children: children(fetcherInstance),
    giving: giving(fetcherInstance),
    rotas: rotas(fetcherInstance),
    smallGroups: smallGroups(fetcherInstance),
  };

  if (!options.oauth2) return sdk;

  sdk.oauth2 = oauth2(options, sdk);
  sdk.my = my(options, sdk);

  return sdk;
}
