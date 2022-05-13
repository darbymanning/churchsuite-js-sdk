import { encode } from "qss";
import { maybeBooleanToNumber } from "../utils";
import type { Fetcher } from "../fetcher";
import type {
  BooleanAsNumber,
  DateString,
  EmailString,
  ExternalLink,
  Image,
  PaginatedResponse,
} from "../types";
import type { ClientInstance } from "../main";

export declare namespace AddressBook {
  /**
   * Return the details regarding the Address Book module
   * @see {@link https://github.com/ChurchSuite/churchsuite-api/blob/master/modules/account.md#get-module ChurchSuite Account: Get module}
   */
  interface Info {
    id: "addressbook";
    name: string;
    order: number;
    options: {
      connect: {
        connect_tablet_access: BooleanAsNumber;
        connect_welcome_message: string;
        contact_edit_date_of_birth: BooleanAsNumber;
        contact_edit_marital_status: BooleanAsNumber;
        contact_edit_job: BooleanAsNumber;
        contact_edit_employer: BooleanAsNumber;
        contact_edit_photo: BooleanAsNumber;
        connect_contact_tag: [];
        connect_contact_date: string[] | Record<string, string>;
        contact_require_email: BooleanAsNumber;
        contact_require_mobile: BooleanAsNumber;
        contact_require_telephone: BooleanAsNumber;
        contact_edit_address: BooleanAsNumber;
        contact_require_address: BooleanAsNumber;
        contact_require_date_of_birth: BooleanAsNumber;
        contact_edit_sex: BooleanAsNumber;
        contact_require_marital_status: BooleanAsNumber;
        contact_edit_notes: BooleanAsNumber;
        contact_edit_children: BooleanAsNumber;
      };
      embed: [];
      module: {
        contact_title: BooleanAsNumber;
        contact_middle_name: BooleanAsNumber;
        contact_formal_name: BooleanAsNumber;
        contact_former_name: BooleanAsNumber;
        contact_address3: BooleanAsNumber;
        contact_job: BooleanAsNumber;
        contact_employer: BooleanAsNumber;
        contact_work_telephone: BooleanAsNumber;
        contact_student_details: BooleanAsNumber;
        public_access: BooleanAsNumber;
        public_visible: BooleanAsNumber;
        public_address: BooleanAsNumber;
        public_mobile: BooleanAsNumber;
        public_telephone: BooleanAsNumber;
        public_email: BooleanAsNumber;
        labels_format: "labels_L7160";
        contact_tags?: string;
        contact_key_dates?: Record<string, string>;
      };
      public: {
        public_access: BooleanAsNumber;
        contact_search: BooleanAsNumber;
        contact_search_tags: [];
        contact_search_members_tags: [];
        welcome_message: string;
        contact_edit_title: BooleanAsNumber;
        contact_edit_address: BooleanAsNumber;
        contact_edit_date_of_birth: BooleanAsNumber;
        contact_edit_sex: BooleanAsNumber;
        contact_edit_marital: BooleanAsNumber;
        contact_edit_job: BooleanAsNumber;
        contact_edit_employer: BooleanAsNumber;
        contact_edit_photo: BooleanAsNumber;
        public_reminders: BooleanAsNumber;
        external_links: [ExternalLink?];
        contact_edit_spouse?: BooleanAsNumber;
      };
    };
    mtime: string;
    muser: string;
  }

  interface Tag {
    id: number;
    tag_id: number;
    name: string;
    description: null | string;
    colour: string;
    type: string;
    tag_no_contacts: number;
    no_contacts: number;
    ctime: string;
    cuser: string;
    mtime: string;
    muser: string;
  }

  /**
   * Return data for a specific contact
   * @see {@link https://github.com/ChurchSuite/churchsuite-api/blob/master/modules/addressbook.md#get-a-contact ChurchSuite Address Book: Get a contact}
   */
  interface Contact {
    id: number;
    person_uuid: string;
    type_id: string;
    first_name: string;
    last_name: string;
    title: string;
    middle_name: string | null;
    formal_name: string | null;
    former_name: string | null;
    maiden_name: string | null;
    sex: "u" | "m" | "f" | null;
    date_of_birth: string;
    marital: string | null;
    spouse_id: string | null;
    address: string;
    address2: string;
    address3: string;
    city: string;
    county: string;
    postcode: string;
    country: string;
    latitude: number;
    longitude: number;
    telephone: string;
    mobile: string;
    work_telephone: string;
    email: EmailString;
    job: string | null;
    employer: string | null;
    public_options: {
      invited: boolean;
      access: boolean;
      visible: {
        enabled: boolean;
        address: boolean;
        email: boolean;
        mobile: boolean;
        telephone: boolean;
      };
    };
    communication: {
      general_email: BooleanAsNumber;
      general_sms: BooleanAsNumber;
      rota_email: BooleanAsNumber;
      rota_sms: BooleanAsNumber;
    };
    location: {
      address: string;
      latitude: string;
      longitude: string;
    };
    custom_fields: [];
    images: [] | Image[];
    ongoing_consent: {
      required: BooleanAsNumber;
      request_ctime: string | null;
      granted_ctime: string | null;
      granted_name: string | null;
    };
    status: "active" | "archived";
    site_id: number;
    site_ids: string[];
    multi_team_multi_role?: boolean;
    mtime: string;
    muser: string;
    ctime: string;
    cuser: string;
  }

  interface KeyDate {
    id: number;
    name: string;
    date: string;
    description: string;
    resource_keydate_id: number;
  }

  /**
   * List of contacts
   * @see {@link https://github.com/ChurchSuite/churchsuite-api/blob/master/modules/addressbook.md#listsearch-contacts ChurchSuite Address Book: List/search contacts}
   */
  interface Contacts extends PaginatedResponse {
    contacts: [] | Contact[];
  }

  /**
   * List of contact's tags
   * @see {@link https://github.com/ChurchSuite/churchsuite-api/blob/master/modules/addressbook.md#get-a-contacts-tags ChurchSuite Address Book: Get a contact's tags}
   */
  interface ContactTags extends PaginatedResponse {
    tags: [] | Tag[];
  }

  /**
   * List of tags
   * @see {@link https://github.com/ChurchSuite/churchsuite-api/blob/master/modules/addressbook.md#list-tags ChurchSuite Address Book: List tags}
   */
  type Tags = ContactTags;

  /**
   * List of key dates
   * @see {@link https://github.com/ChurchSuite/churchsuite-api/blob/master/modules/addressbook.md#list-key-dates ChurchSuite Address Book: List key dates}
   */
  interface KeyDates extends PaginatedResponse {
    keydates: [] | KeyDate[];
  }

  interface KeyDateContact {
    id: number;
    keydate_id: number;
    resource_type: string;
    resource_id: number;
    date: DateString;
    description: string;
    linked_resource_type: null; // TODO,
    linked_resource_id: number | null;
    mtime: string;
    muser: string;
    ctime: string;
    cuser: string;
  }

  /**
   * Key date's contacts
   * @see {@link https://github.com/ChurchSuite/churchsuite-api/blob/master/modules/addressbook.md#get-a-key-dates-contacts ChurchSuite Address Book: Get a key date's contacts}
   */
  interface KeyDateContacts extends PaginatedResponse {
    keydates: [] | KeyDateContact[];
  }

  /**
   * Return data for a specific tag
   * @see {@link https://github.com/ChurchSuite/churchsuite-api/blob/master/modules/addressbook.md#get-a-tag ChurchSuite Address Book: Get a tag}
   */
  interface ShowTag extends Tag {
    contacts?: [] | Contact[];
  }

  interface CreateContactArgs {
    firstName: string;
    lastName: string;
    middleName?: string;
    formalName?: string;
    maidenName?: string;
    dateOfBirth?: DateString;
    sex?: "m" | "f";
    title?: string;
    marital?:
      | "married"
      | "single"
      | "divorced"
      | "widowed"
      | "engaged"
      | "cohabiting"
      | "separated";
    spouseId?: number;
    address?: string;
    address2?: string;
    address3?: string;
    city?: string;
    county?: string;
    postcode?: string;
    latitude?: number;
    longitude?: number;
    telephone?: number;
    mobile?: number;
    workTelephone?: number;
    email?: EmailString;
    employer?: string;
    communication?: {
      generalEmail: boolean;
      generalSms: boolean;
      rotaEmail: boolean;
      rotaSms: boolean;
    };
    status?: "active" | "archived";
    siteId?: number;
    siteIds?: number[];
  }

  type UpdateContactArgs = Partial<CreateContactArgs>;

  interface CreateContactPayload {
    first_name: CreateContactArgs["firstName"];
    last_name: CreateContactArgs["lastName"];
    middle_name?: CreateContactArgs["middleName"];
    formal_name?: CreateContactArgs["formalName"];
    maiden_name?: CreateContactArgs["maidenName"];
    date_of_birth?: CreateContactArgs["dateOfBirth"];
    sex?: CreateContactArgs["sex"];
    title?: CreateContactArgs["title"];
    marital?: CreateContactArgs["marital"];
    spouse_id?: CreateContactArgs["spouseId"];
    address?: CreateContactArgs["address"];
    address2?: CreateContactArgs["address2"];
    address3?: CreateContactArgs["address3"];
    city?: CreateContactArgs["city"];
    county?: CreateContactArgs["county"];
    postcode?: CreateContactArgs["postcode"];
    latitude?: CreateContactArgs["latitude"];
    longitude?: CreateContactArgs["longitude"];
    telephone?: CreateContactArgs["telephone"];
    mobile?: CreateContactArgs["mobile"];
    work_telephone?: CreateContactArgs["workTelephone"];
    email?: CreateContactArgs["email"];
    employer?: CreateContactArgs["employer"];
    communication?: {
      general_email?: BooleanAsNumber;
      general_sms?: BooleanAsNumber;
      rota_email?: BooleanAsNumber;
      rota_sms?: BooleanAsNumber;
    };
    status?: CreateContactArgs["status"];
    site_id?: CreateContactArgs["siteId"];
    site_ids?: CreateContactArgs["siteIds"];
  }

  type UpdateContactPayload = Partial<CreateContactPayload>;

  interface Tracking {
    id: number;
    resource_id: number;
    resource_type: string;
    stage_id: number;
    due_date: DateString;
    due_user: string;
    mtime: string;
    muser: string;
    ctime: string;
    cuser: string;
  }

  /**
   * Return data for a specific flow
   * @see {@link https://github.com/ChurchSuite/churchsuite-api/blob/master/modules/addressbook.md#get-a-flow ChurchSuite Address Book: Get a flow}
   */
  interface Flow {
    id: number;
    name: string;
    notification_days: string;
    status: "active" | "archived";
    mtime: string;
    muser: string;
    ctime: string;
    cuser: string;
  }

  /**
   * List flows
   * @see {@link https://github.com/ChurchSuite/churchsuite-api/blob/master/modules/addressbook.md#list-flows ChurchSuite Address Book: List flows}
   */
  interface Flows extends PaginatedResponse {
    flows: [] | Flow[];
  }

  /**
   * Return tracking data for a specific flow
   * @see {@link https://github.com/ChurchSuite/churchsuite-api/blob/master/modules/addressbook.md#get-a-flows-tracking-data ChurchSuite Address Book: Get a flow's tracking data}
   */
  interface FlowTracking extends PaginatedResponse {
    tracking: [] | Tracking[];
  }

  /**
   * Add contacts to be tracked through a flow
   * @see {@link https://github.com/ChurchSuite/churchsuite-api/blob/master/modules/addressbook.md#add-contacts-to-be-tracked-through-a-flow ChurchSuite Address Book: Add contacts to be tracked through a flow}
   */
  interface AddContactsToFlowTracking {
    tracking: [] | Tracking[];
  }

  interface AddContactsToFlowPayload {
    action: "add";
    contacts: {
      contact_id: number;
      stage_id?: number;
    }[];
  }

  interface ListContactsArgs {
    /** Return contacts whose Name matches the string provided */
    name?: string;
    /** Return contacts whose Name, Address, Job, Email, Telephone or Mobile contains the string provided */
    query?: string;
    /** Return a specific page of contacts */
    page?: number;
    /** The number of contacts to return for each page */
    perPage?: number;
    /** Return contacts filtered by "Allow My ChurchSuite access" */
    publicAccess?: boolean;
    /** Return contacts filtered by "Allow My ChurchSuite access" */
    publicVisible?: boolean;
    /** Return either archived or active uses */
    view?: "active" | "archived";
  }

  interface Methods {
    info: () => Fetcher.FetcherResponse<Info>;
    contacts: {
      /** List/search contacts */
      list: (args?: ListContactsArgs) => Fetcher.FetcherResponse<Contacts>;
      /** Return data for a specific contact */
      show: (id: number) => Fetcher.FetcherResponse<Contact>;
      /** Return tags for a specific contact */
      tags: (id: number) => Fetcher.FetcherResponse<ContactTags>;
      /** Return key dates for a specific contact */
      keyDates: (id: number) => Fetcher.FetcherResponse<KeyDates>;
      /** Create a contact */
      create: (args: CreateContactArgs) => Fetcher.FetcherResponse<Contact>;
      /** Update a contact */
      update: (
        id: number,
        args: UpdateContactArgs
      ) => Fetcher.FetcherResponse<Contact>;
      /** Delete a contact */
      del: (id: number) => void;
    };
    tags: {
      /** Return tags ordered alphabetically */
      list: () => Fetcher.FetcherResponse<Tags>;
      /** Return data for a specific tag */
      show: (
        id: number,
        contacts?: boolean
      ) => Fetcher.FetcherResponse<ShowTag>;
      /** Return contacts for a specific tag */
      contacts: (id: number) => Fetcher.FetcherResponse<Contacts>;
    };
    flows: {
      /** Return flows ordered alphabetically */
      list: () => Fetcher.FetcherResponse<Flows>;
      /** Return data for a specific flow */
      show: (id: number) => Fetcher.FetcherResponse<Flow>;
      /** Return tracking for a specific flow */
      tracking: (id: number) => Fetcher.FetcherResponse<FlowTracking>;
      /** Add contacts to be tracked through a flow */
      addContacts: (
        id: number,
        args: AddContactsToFlowPayload
      ) => Fetcher.FetcherResponse<AddContactsToFlowTracking>;
    };
    keyDates: {
      /** Return key dates ordered alphabetically */
      list: () => Fetcher.FetcherResponse<KeyDates>;
      /** Return data for a specific key date */
      show: (id: number) => Fetcher.FetcherResponse<KeyDate>;
      /** Return contacts for a specific key date */
      contacts: (id: number) => Fetcher.FetcherResponse<KeyDateContacts>;
    };
  }
}

function resolveContactForApi(
  args: AddressBook.CreateContactArgs | AddressBook.UpdateContactArgs
): AddressBook.CreateContactPayload | AddressBook.UpdateContactPayload {
  return {
    first_name: args.firstName,
    last_name: args.lastName,
    middle_name: args.middleName,
    formal_name: args.formalName,
    maiden_name: args.maidenName,
    date_of_birth: args.dateOfBirth,
    sex: args.sex,
    title: args.title,
    marital: args.marital,
    spouse_id: args.spouseId,
    address: args.address,
    address2: args.address2,
    address3: args.address3,
    city: args.city,
    county: args.county,
    postcode: args.postcode,
    latitude: args.latitude,
    longitude: args.longitude,
    telephone: args.telephone,
    mobile: args.mobile,
    work_telephone: args.workTelephone,
    email: args.email,
    employer: args.employer,
    communication: args.communication && {
      general_email: maybeBooleanToNumber(args.communication.generalEmail),
      general_sms: maybeBooleanToNumber(args.communication.generalSms),
      rota_email: maybeBooleanToNumber(args.communication.rotaEmail),
      rota_sms: maybeBooleanToNumber(args.communication.rotaSms),
    },
    status: args.status,
    site_id: args.siteId,
    site_ids: args.siteIds,
  };
}

export default function ({
  get,
  post,
  put,
  del,
}: Fetcher.FetcherInstance): ClientInstance["addressBook"] {
  return {
    async info() {
      return await get<AddressBook.Info>("/v1/module/addressbook");
    },
    contacts: {
      async list(args) {
        const params = args
          ? encode(
              {
                name: args.name,
                q: args.query,
                page: args.page,
                per_page: args.perPage,
                public_access: maybeBooleanToNumber(args.publicAccess),
                public_visible: maybeBooleanToNumber(args.publicVisible),
                view: args.view,
              },
              "?"
            )
          : "";

        return await get<AddressBook.Contacts>(
          `/v1/addressbook/contacts${params}`
        );
      },
      async show(id) {
        return await get<AddressBook.Contact>(`/v1/addressbook/contact/${id}`);
      },
      async tags(id) {
        return await get<AddressBook.ContactTags>(
          `/v1/addressbook/contact/${id}/tags`
        );
      },
      async keyDates(id) {
        return await get<AddressBook.KeyDates>(
          `/v1/addressbook/contact/${id}/keydates`
        );
      },
      async create(args) {
        const body = resolveContactForApi(args);

        return await post<AddressBook.Contact>("/v1/addressbook/contact", body);
      },
      async update(id: number, args) {
        const body = resolveContactForApi(args);

        return await put<AddressBook.Contact>(
          `/v1/addressbook/contact/${id}`,
          body
        );
      },
      async del(id: number) {
        return await del<AddressBook.Contact>(`/v1/addressbook/contact/${id}`);
      },
    },
    tags: {
      async list() {
        return await get<AddressBook.Tags>("/v1/addressbook/tags");
      },
      async show(id, contacts) {
        const params = contacts && encode({ contacts });
        return await get<AddressBook.ShowTag>(
          `/v1/addressbook/tag/${id}${params}`
        );
      },
      async contacts(id) {
        return await get<AddressBook.Contacts>(
          `/v1/addressbook/tag/${id}/contacts`
        );
      },
    },
    flows: {
      async list() {
        return await get<AddressBook.Flows>("/v1/addressbook/flows");
      },
      async show(id) {
        return await get<AddressBook.Flow>(`/v1/addressbook/flow/${id}`);
      },
      async tracking(id) {
        return await get<AddressBook.FlowTracking>(
          `/v1/addressbook/flow/${id}/tracking`
        );
      },
      async addContacts(id, args) {
        return await post<AddressBook.AddContactsToFlowTracking>(
          `/v1/addressbook/flow/${id}/tracking`,
          args
        );
      },
    },
    keyDates: {
      async list() {
        return await get<AddressBook.KeyDates>("/v1/addressbook/keydates");
      },
      async show(id) {
        return await get<AddressBook.KeyDate>(`/v1/addressbook/keydate/${id}`);
      },
      async contacts(id) {
        return await get<AddressBook.KeyDateContacts>(
          `/v1/addressbook/keydate/${id}/contacts`
        );
      },
    },
  };
}
