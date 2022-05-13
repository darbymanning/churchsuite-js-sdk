import { encode } from "qss";
import type { ClientInstance, ClientOptions } from "../main";
import type { Fetcher } from "../fetcher";
import type { PaginatedResponse } from "../types";
import type { AddressBook } from "./addressBook";
import type { Children } from "./children";
import fetcher from "../fetcher";

/**
 * The My section of the API allows data to be queried for a given contact
 * after they have passed through the OAuth process using the returned
 * OAuth token as the X-Auth header.
 *
 * Any data passed back obeys the public visibility settings that can be
 * set on a contact-by-contact basis.
 *
 * @see {@link https://github.com/ChurchSuite/churchsuite-api/blob/master/modules/my.md#my ChurchSuite My}
 * */
export declare namespace My {
  /**
   * Return the contact details for the logged in contact
   * @see {@link https://github.com/ChurchSuite/churchsuite-api/blob/master/modules/my.md#get-a-contacts-details ChurchSuite My: Details}
   */
  interface Details extends AddressBook.Contact {
    profile_meta_data: {
      sex: AddressBook.Contact["sex"];
      custom_fields: []; // TODO
    };
    public_hash: string;
    email_opt_out: boolean;
    rota_email_opt_out: boolean;
    sms_opt_out: boolean;
    rota_sms_opt_out: boolean;
    student_details: {
      line1: string;
      line2: string;
      line3: string;
      city: string;
      county: string;
      postcode: string;
      country: string;
      telephone: string;
      university: string;
      course: string;
      year_start: string;
      year_end: string;
    };
  }

  /**
   * List/search other publicly visible contacts
   * @see {@link https://github.com/ChurchSuite/churchsuite-api/blob/master/modules/my.md#listsearch-other-publicly-visible-contacts ChurchSuite My: Contacts}
   */
  type Contacts = AddressBook.Contacts;

  /**
   * Return the details of any children linked to the current contact
   * @see {@link https://github.com/ChurchSuite/churchsuite-api/blob/master/modules/my.md#get-a-contacts-children ChurchSuite My: Children}
   */
  interface Children extends PaginatedResponse {
    children: Children.Child | [];
  }

  interface Methods {
    /** Return the contact details for the logged in contact */
    details: () => Fetcher.FetcherResponse<Details>;
    /** List/search other publicly visible contacts */
    contacts: (query?: string) => Fetcher.FetcherResponse<Contacts>;
    /** Return the details of any children linked to the current contact */
    children: () => Fetcher.FetcherResponse<Children>;
    /** Return the details of a specific child linked to the current contact */
    child: (id: number) => Fetcher.FetcherResponse<Children.Child>;
  }
}

export default function (
  options: ClientOptions,
  sdk: ClientInstance
): ClientInstance["my"] {
  const get = <T>(...args: any) => {
    const { get } = fetcher.create({
      baseURL: "https://api.churchsuite.com",
      headers: {
        "X-Account": options["X-Account"],
        "X-Application": options["X-Application"],
        "X-Auth": sdk.oauth2?.getToken() || "",
      },
    });
    return get<T>(args);
  };

  return {
    async details() {
      return await get<My.Details>("/v1/my/details");
    },
    async contacts(query) {
      const params = query ? encode({ q: query }) : "";
      return await get<My.Contacts>(`/v1/my/contacts${params}`);
    },
    async children() {
      return await get<My.Children>("/v1/my/children");
    },
    async child(id) {
      return await get<Children.Child>(`/v1/my/child/${id}`);
    },
  };
}
