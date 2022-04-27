import account from "./modules/account";
import addressBook from "./modules/addressBook";
import attendance from "./modules/attendance";
import calendar from "./modules/calendar";
import children from "./modules/children";
import fetcher from "./fetcher";
import giving from "./modules/giving";
import my from "./modules/my";
import oauth2 from "./modules/oauth2";
import rotas from "./modules/rotas";
import smallGroups from "./modules/smallGroups";
import type { ClientInstance, ClientOptions } from "./churchsuite";

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

  function getOauth2FetcherInstance() {
    if (!sdk.oauth2?.accessToken) throw Error("No access token set");

    return fetcher.create({
      baseURL: "https://api.churchsuite.com",
      headers: {
        "X-Account": options["X-Account"],
        "X-Application": options["X-Application"],
        "X-Auth": sdk.oauth2.accessToken,
      },
    });
  }

  const oauth2FetcherInstance = getOauth2FetcherInstance();

  sdk.my = my(oauth2FetcherInstance);

  return sdk;
}
