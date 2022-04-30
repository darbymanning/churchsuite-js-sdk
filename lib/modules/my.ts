import { encode } from "qss";
import type { ClientInstance } from "../main";
import type { Fetcher } from "../fetcher";
import type { BooleanAsNumber, EmailString, PaginatedResponse } from "../types";
import type { AddressBook } from "./addressBook";

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
   * @see {@link https://github.com/ChurchSuite/churchsuite-api/blob/master/modules/my.md#get-a-childs-details ChurchSuite My: Child}
   */
  interface Child {
    id: number;
    person_uuid: string;
    type_id: string;
    first_name: string;
    middle_name: null | string;
    last_name: string;
    name: string;
    formal_name: null | string;
    sex: AddressBook.Contact["sex"];
    date_of_birth: string;
    telephone: string;
    mobile: string;
    email: EmailString;
    address: {
      id: number;
      line1: string;
      line2: string;
      line3: string;
      city: string;
      county: string;
      postcode: string;
      country: string;
    };
    location: {
      address: string;
      latitude: null | number;
      longitude: null | number;
    };
    contact_id: number;
    parent: {
      additional_emails: EmailString[]; // TODO, is this right?
      additional_mobiles: string[];
      primary: {
        contact_id: number;
        first_name: string;
        last_name: string;
        sex: AddressBook.Contact["sex"];
        relationship: string; // TODO: "parent" and others
        email: EmailString;
        mobile: string;
        telephone: string;
        communication: {
          general_email: BooleanAsNumber;
          general_sms: BooleanAsNumber;
        };
      };
    };
    custom_fields: []; // TODO
    school: null | string; // TODO: is this string?
    medical_short: string;
    medical: string;
    doctor_details: null | string; // TODO: is this string?
    special_needs: null | string; // TODO: is this string?
    info: null | string; // TODO: is this string?
    communication: {
      general_email: BooleanAsNumber;
      general_sms: BooleanAsNumber;
      rota_email: BooleanAsNumber;
      rota_sms: BooleanAsNumber;
    };
    has_email_opt_out: boolean;
    has_rota_email_opt_out: boolean;
    has_rota_sms_opt_out: boolean;
    has_sms_opt_out: boolean;
    consent: {
      internal: null | boolean; // TODO: is this boolean?
      external: null | boolean; // TODO: is this boolean?
    };
    ongoing_consent: {
      required: BooleanAsNumber;
      request_ctime: null | string;
      granted_ctime: null | string;
      granted_name: null | string;
    };
    site_id: number;
    site_ids: string[];
    status: "active" | "archived";
    images: []; // TODO
    mtime: string;
    muser: string;
    ctime: string;
    cuser: string;
  }

  /**
   * Return the details of any children linked to the current contact
   * @see {@link https://github.com/ChurchSuite/churchsuite-api/blob/master/modules/my.md#get-a-contacts-children ChurchSuite My: Children}
   */
  interface Children extends PaginatedResponse {
    children: Child | [];
  }

  interface Methods {
    /** Return the contact details for the logged in contact */
    details: () => Fetcher.FetcherResponse<My.Details>;
    /** List/search other publicly visible contacts */
    contacts: (query?: string) => Fetcher.FetcherResponse<My.Contacts>;
    /** Return the details of any children linked to the current contact */
    children: () => Fetcher.FetcherResponse<My.Children>;
    /** Return the details of a specific child linked to the current contact */
    child: (id: number) => Fetcher.FetcherResponse<My.Child>;
  }
}

export default function ({
  get,
}: Fetcher.FetcherInstance): ClientInstance["my"] {
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
      return await get<My.Child>(`/v1/my/child/${id}`);
    },
  };
}
