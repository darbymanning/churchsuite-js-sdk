import type { ClientInstance } from "../main";
import type { Fetcher } from "../fetcher";
import type {
  BooleanAsNumber,
  DateString,
  EmailString,
  PaginatedResponse,
} from "../types";
import type { AddressBook } from "./addressBook";
import type { PartialDeep } from "type-fest";
import { maybeBooleanToNumber } from "../utils";
import { encode } from "qss";

export declare namespace Children {
  /**
   * Return the details regarding the Address Book module
   * @see {@link https://github.com/ChurchSuite/churchsuite-api/blob/master/modules/account.md#get-module ChurchSuite Account: Get Module}
   */
  interface Info {
    id: "children";
    name: string;
    order: number;
    options: {
      connect: {
        badge_child_first_name: BooleanAsNumber;
        badge_child_group_name: BooleanAsNumber;
        badge_child_last_name: BooleanAsNumber;
        badge_child_medical_short: BooleanAsNumber;
        badge_child_session_date: BooleanAsNumber;
        badge_child_session_name: BooleanAsNumber;
        badge_child_type: BooleanAsNumber;
        badge_child_uid: BooleanAsNumber;
        badge_room_first_name: BooleanAsNumber;
        badge_room_group_name: BooleanAsNumber;
        badge_room_last_name: BooleanAsNumber;
        badge_room_medical_short: BooleanAsNumber;
        badge_room_session_date: BooleanAsNumber;
        badge_room_session_name: BooleanAsNumber;
        badge_room_type: BooleanAsNumber;
        badge_room_uid: BooleanAsNumber;
        connect_gathering: BooleanAsNumber;
        connect_checkin_ticket_size: "Brother-205S"; // TODO
        connect_checkin_register_pin: string;
        connect_checkin_search_name: BooleanAsNumber;
        connect_checkin_search_phone: BooleanAsNumber;
        connect_checkin_search_barcode: BooleanAsNumber;
        visitor_delete_after: string | number;
        visitor_confirm_email?: string;
      };
      embed: [];
      module: {
        child_address3: BooleanAsNumber;
        child_consent_use_external: BooleanAsNumber;
        child_consent_use_internal: BooleanAsNumber;
      };
      public: {
        public_access: BooleanAsNumber;
        welcome_message: string;
        child_edit_photo: BooleanAsNumber;
        child_edit_consent_use_external: BooleanAsNumber;
        child_edit_consent_use_internal: BooleanAsNumber;
        child_edit_dob: BooleanAsNumber;
        child_edit_sex: BooleanAsNumber;
      };
    };
    mtime: string;
    muser: string;
  }

  /**
   * Return data for a specific child
   * @see {@link https://github.com/ChurchSuite/churchsuite-api/blob/master/modules/children.md#get-a-child ChurchSuite Children: Get a child}
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
   * List of children
   * @see {@link https://github.com/ChurchSuite/churchsuite-api/blob/master/modules/children.md#listsearch-children ChurchSuite Children: List/search children}
   */
  interface Children extends PaginatedResponse {
    children: [] | Child[];
  }

  /**
   * List of child's tags
   * @see {@link https://github.com/ChurchSuite/churchsuite-api/blob/master/modules/children.md#get-a-childs-tags ChurchSuite Children: Get a child's tags}
   */
  interface Tags extends PaginatedResponse {
    tags: [] | Tag[];
  }

  /**
   * Get a tag
   * @see {@link https://github.com/ChurchSuite/churchsuite-api/blob/master/modules/children.md#get-a-tag ChurchSuite Children: Get a tag}
   */
  type Tag = Omit<AddressBook.Tag, "tag_no_contacts" | "no_contacts"> & {
    tag_no_children: number;
    no_children: number;
  };

  /**
   * List of child's key dates
   * @see {@link https://github.com/ChurchSuite/churchsuite-api/blob/master/modules/children.md#get-a-childs-key-dates ChurchSuite Children: List child's key dates}
   */
  interface KeyDates extends PaginatedResponse {
    keydates: [] | AddressBook.KeyDate[];
  }

  interface KeyDateChild {
    id: number;
    keydate_id: number;
    resource_type: "children_child";
    resource_id: number;
    date: DateString;
    description: string;
    linked_resource_type: null; // TODO
    linked_resource_id: null; // TODO
    mtime: string;
    muser: string;
    ctime: string;
    cuser: string;
  }

  /**
   * Get a key date's children
   * @see {@link https://github.com/ChurchSuite/churchsuite-api/blob/master/modules/children.md#get-a-key-dates-children ChurchSuite Children: Get a key date's children}
   */
  interface KeyDateChildren extends PaginatedResponse {
    keydates: [] | KeyDateChild[];
  }

  /**
   * Get a child group
   * @see {@link https://github.com/ChurchSuite/churchsuite-api/blob/master/modules/children.md#get-a-child-group ChurchSuite Children: Get a child group}
   */
  interface Group {
    id: number;
    name: string;
    gathering_id: number;
    gathering_name: string;
    checkin_badges_child: number;
    checkin_badges_pickup: number;
    checkin_badges_room: number;
    checkin_capacity: number | null; // TODO: check this should be 'number'
    checkin_ratio: number | null; // TODO: check this should be 'number'
    entry_age: number; // TODO: can thigs be null?
    entry_age_months: number; // TODO: can thigs be null?
    entry_month: number | null; // TODO: check this should be 'number'
    entry_rule: string;
    status: string; // TODO: what are states? "active" and...?
    ctime: string;
    cuser: string;
    mtime: string;
    muser: string;
  }

  interface Groups extends PaginatedResponse {
    groups: [] | Group[];
  }

  /**
   * Get a child gathering
   * @see {@link https://github.com/ChurchSuite/churchsuite-api/blob/master/modules/children.md#get-a-child-gathering ChurchSuite Children: Get a child gathering}
   */
  interface Gathering {
    id: number;
    site_id: number;
    name: string;
    max_age: number;
    max_age_months: number;
    exit_month: number;
    status: string; // TODO: confirm values: 'active'
    ctime: string;
    cuser: string;
    mtime: string;
    muser: string;
    groups: [] | Group[]; // TODO: can this be an empty array?
  }

  /**
   * List child gatherings
   * @see {@link https://github.com/ChurchSuite/churchsuite-api/blob/master/modules/children.md#list-child-gatherings ChurchSuite Children: List child gatherings}
   */
  interface Gatherings extends PaginatedResponse {
    gatherings: [] | Gathering[];
  }

  /**
   * Get the attendance data for a child group
   * @see {@link https://github.com/ChurchSuite/churchsuite-api/blob/master/modules/children.md#get-the-attendance-data-for-a-child-group ChurchSuite Children: Get the attendance data for a child group}
   */
  type Attendance = Record<
    string,
    {
      total: number;
      notes: string;
    } & {
      [key: string]: string | number;
    }
  >;

  interface ListChildrenArgs {
    /** Return people whose Name, Address, Email, Telephone, Mobile or Parent Name contains the string provided */
    query?: string;
    /** Return a specific page of contacts */
    page?: number;
    /** The number of contacts to return for each page */
    perPage?: number;
  }

  interface CreateChildArgs {
    firstName: string;
    lastName: string;
    middleName?: string | null;
    name?: string;
    formalName?: string;
    sex?: AddressBook.Contact["sex"];
    dateOfBirth?: DateString;
    telephone?: string;
    mobile?: string;
    email?: EmailString;
    address?: string;
    address2?: string;
    address3?: string;
    city?: string;
    county?: string;
    postcode?: string;
    primaryCarerUserId?: number;
    school?: string;
    medicalShort?: string;
    medical?: string;
    doctorDetails?: string;
    specialNeeds?: string;
    info?: string;
    communication?: {
      generalEmail?: boolean;
      generalSms?: boolean;
      rotaEmail?: boolean;
      rotaSms?: boolean;
    };
    hasEmailOptOut?: boolean;
    hasRotaEmailOptOut?: boolean;
    hasRotaSmsOptOut?: boolean;
    hasSmsOptOut?: boolean;
    consent?: {
      internal?: boolean;
      external?: boolean;
    };
    ongoingConsentRequired?: boolean;
    siteId: number;
    siteIds?: string[];
    status?: "active"; // TODO
    images?: []; // TODO
  }

  type UpdateChildArgs = CreateChildArgs;

  interface Methods {
    info: () => Fetcher.FetcherResponse<Info>;
    children: {
      list: (args: ListChildrenArgs) => Fetcher.FetcherResponse<Children>;
      show: (id: number) => Fetcher.FetcherResponse<Child>;
      tags: (id: number) => Fetcher.FetcherResponse<Tags>;
      keyDates: (id: number) => Fetcher.FetcherResponse<KeyDates>;
      groups: (id: number) => Fetcher.FetcherResponse<Groups>;
      create: (args: CreateChildArgs) => Fetcher.FetcherResponse<Child>;
      update: (
        id: number,
        args: UpdateChildArgs
      ) => Fetcher.FetcherResponse<Child>;
      /** Delete a child */
      del: (id: number) => void;
    };
    gatherings: {
      list: () => Fetcher.FetcherResponse<Gatherings>;
      show: (id: number) => Fetcher.FetcherResponse<Gathering>;
    };
    groups: {
      show: (id: number) => Fetcher.FetcherResponse<Gathering>;
      attendance: (id: number) => Fetcher.FetcherResponse<Attendance>;
      children: (id: number) => Fetcher.FetcherResponse<Children>;
    };
    tags: {
      list: () => Fetcher.FetcherResponse<Tags>;
      show: (id: number) => Fetcher.FetcherResponse<Tag>;
      children: (id: number) => Fetcher.FetcherResponse<Children>;
    };
    keyDates: {
      list: () => Fetcher.FetcherResponse<KeyDates>;
      show: (id: number) => Fetcher.FetcherResponse<AddressBook.KeyDate>;
      children: (id: number) => Fetcher.FetcherResponse<KeyDateChildren>;
    };
  }
}

function resolveChildForApi(
  args: Children.CreateChildArgs | Children.UpdateChildArgs
): PartialDeep<Children.Child> {
  return {
    first_name: args.firstName,
    last_name: args.lastName,
    middle_name: args.middleName,
    formal_name: args.formalName,
    date_of_birth: args.dateOfBirth,
    sex: args.sex,
    address: {
      line1: args.address,
      line2: args.address2,
      line3: args.address3,
      city: args.city,
      county: args.county,
      postcode: args.postcode,
    },
    telephone: args.telephone,
    mobile: args.mobile,
    email: args.email,
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
}: Fetcher.FetcherInstance): ClientInstance["children"] {
  return {
    async info() {
      return await get<Children.Info>("/v1/module/children");
    },
    children: {
      async list(args) {
        const params = args
          ? encode(
              {
                q: args.query,
                page: args.page,
                per_page: args.perPage,
              },
              "?"
            )
          : "";

        return await get<Children.Children>(`/v1/children/children${params}`);
      },
      async show(id) {
        return await get<Children.Child>(`/v1/children/child/${id}`);
      },
      async tags(id) {
        return await get<Children.Tags>(`/v1/children/child/${id}/tags`);
      },
      async keyDates(id) {
        return await get<Children.KeyDates>(
          `/v1/children/child/${id}/keydates`
        );
      },
      async groups(id) {
        return await get<Children.Groups>(`/v1/children/child/${id}/groups`);
      },
      async create(args) {
        const body = resolveChildForApi(args);
        return await post<Children.Child>("/v1/children/child", body);
      },
      async update(id, args) {
        const body = resolveChildForApi(args);
        return await put<Children.Child>(`/v1/children/child/${id}`, body);
      },
      async del(id) {
        return await del<void>(`/v1/children/child/${id}`);
      },
    },
    gatherings: {
      async list() {
        return await get<Children.Gatherings>("/v1/children/gatherings");
      },
      async show(id: number) {
        return await get<Children.Gathering>(`/v1/children/gathering/${id}`);
      },
    },
    groups: {
      async show(id: number) {
        return await get<Children.Gathering>(`/v1/children/group/${id}`);
      },
      async attendance(id: number) {
        return await get<Children.Attendance>(
          `/v1/children/group/${id}/attendance`
        );
      },
      async children(id: number) {
        return await get<Children.Children>(
          `/v1/children/group/${id}/children`
        );
      },
    },
    tags: {
      async list() {
        return await get<Children.Tags>("/v1/children/tags");
      },
      async show(id: number) {
        return await get<Children.Tag>(`/v1/children/tag/${id}`);
      },
      async children(id: number) {
        return await get<Children.Children>(`/v1/children/tag/${id}/children`);
      },
    },
    keyDates: {
      async list() {
        return await get<Children.KeyDates>("/v1/children/keydates");
      },
      async show(id: number) {
        return await get<AddressBook.KeyDate>(`/v1/children/keydates/${id}`);
      },
      async children(id: number) {
        return await get<Children.KeyDateChildren>(
          `/v1/children/keydates/${id}/children`
        );
      },
    },
  };
}
