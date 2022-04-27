export type BooleanAsNumber = 0 | 1 | "0" | "1";

export interface ExternalLink {
  tags: [] | Tag;
  name: string;
  url: string;
}

interface PaginatedResponse {
  pagination: {
    no_results: number;
    page: number;
    per_page: number;
  };
}

export interface Tag {
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

export interface ContactBase {
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
  email: string;
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
  images: [];
  ongoing_consent: {
    required: BooleanAsNumber;
    request_ctime: string | null;
    granted_ctime: string | null;
    granted_name: string | null;
  };
  status: "active" | "archived";
  site_id: number;
  site_ids: string[];
  mtime: string;
  muser: string;
  ctime: string;
  cuser: string;
}

export interface Tracking {
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
 * Responses for data relating to the API user
 * @see {@link https://github.com/ChurchSuite/churchsuite-api/blob/master/modules/account.md ChurchSuite Account}
 */
export namespace Account {
  type Site = {
    id: string;
    name: string;
  };

  export type Module = {
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
  export interface User {
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
  export interface Profile {
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
}

export namespace AddressBook {
  /**
   * Return the details regarding the Address Book module
   * @see {@link https://github.com/ChurchSuite/churchsuite-api/blob/master/modules/account.md#get-module ChurchSuite Account: Get module}
   */
  export interface Info {
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

  /**
   * Return data for a specific contact
   * @see {@link https://github.com/ChurchSuite/churchsuite-api/blob/master/modules/addressbook.md#get-a-contact ChurchSuite Address Book: Get a contact}
   */
  export type Contact = ContactBase;

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
  export interface Contacts extends PaginatedResponse {
    contacts: [] | Contact[];
  }

  /**
   * List of contact's tags
   * @see {@link https://github.com/ChurchSuite/churchsuite-api/blob/master/modules/addressbook.md#get-a-contacts-tags ChurchSuite Address Book: Get a contact's tags}
   */
  export interface ContactTags extends PaginatedResponse {
    tags: [] | Tag[];
  }

  /**
   * List of tags
   * @see {@link https://github.com/ChurchSuite/churchsuite-api/blob/master/modules/addressbook.md#list-tags ChurchSuite Address Book: List tags}
   */
  export type Tags = ContactTags;

  /**
   * List of key dates
   * @see {@link https://github.com/ChurchSuite/churchsuite-api/blob/master/modules/addressbook.md#list-key-dates ChurchSuite Address Book: List key dates}
   */
  export interface KeyDates extends PaginatedResponse {
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
  export interface KeyDateContacts extends PaginatedResponse {
    keydates: [] | KeyDateContact[];
  }

  /**
   * Return data for a specific tag
   * @see {@link https://github.com/ChurchSuite/churchsuite-api/blob/master/modules/addressbook.md#get-a-tag ChurchSuite Address Book: Get a tag}
   */
  export interface ShowTag extends Tag {
    contacts?: [] | Contact[];
  }

  export interface CreateContactArgs {
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

  export type UpdateContactArgs = Partial<CreateContactArgs>;

  export interface CreateContactPayload {
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

  export type UpdateContactPayload = Partial<CreateContactPayload>;

  /**
   * Return data for a specific flow
   * @see {@link https://github.com/ChurchSuite/churchsuite-api/blob/master/modules/addressbook.md#get-a-flow ChurchSuite Address Book: Get a flow}
   */
  export interface Flow {
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
  export interface Flows extends PaginatedResponse {
    flows: [] | Flow[];
  }

  /**
   * Return tracking data for a specific flow
   * @see {@link https://github.com/ChurchSuite/churchsuite-api/blob/master/modules/addressbook.md#get-a-flows-tracking-data ChurchSuite Address Book: Get a flow's tracking data}
   */
  export interface FlowTracking extends PaginatedResponse {
    tracking: [] | Tracking[];
  }

  /**
   * Add contacts to be tracked through a flow
   * @see {@link https://github.com/ChurchSuite/churchsuite-api/blob/master/modules/addressbook.md#add-contacts-to-be-tracked-through-a-flow ChurchSuite Address Book: Add contacts to be tracked through a flow}
   */
  export interface AddContactsToFlowTracking {
    tracking: [] | Tracking[];
  }

  interface AddContactsToFlowPayload {
    action: "add";
    contacts: {
      contact_id: number;
      stage_id?: number;
    }[];
  }
}

export namespace Attendance {
  /**
   * Return the details regarding the Address Book module
   * @see {@link https://github.com/ChurchSuite/churchsuite-api/blob/master/modules/account.md#get-module ChurchSuite Account: Get Module}
   */
  export interface Info {
    id: "attendance";
    name: string;
    order: number;
    options: {
      connect: [];
      embed: [];
      module: {
        show_attendance_recording: BooleanAsNumber;
        module_password?: string;
      };
      public: [];
    };
    mtime: string;
    muser: string;
  }
}

export namespace Calendar {
  /**
   * Return the details regarding the Address Book module
   * @see {@link https://github.com/ChurchSuite/churchsuite-api/blob/master/modules/account.md#get-module ChurchSuite Account: Get Module}
   */
  export interface Info {
    id: "calendar";
    name: string;
    order: number;
    options: {
      connect: [];
      embed: {
        embed_access: BooleanAsNumber;
      };
      module: {
        display_start_day: 1 | 2 | 3 | 4 | 5 | 6 | 7;
        event_status: "confirmed" | "pending" | "cancelled";
        leave_working_hours: string;
        leave_working_day_hours: string;
        leave_working_day_start: string;
        leave_working_day_end: string;
        module_password?: string;
      };
      public: {
        public_access: BooleanAsNumber;
      };
    };
    mtime: string;
    muser: string;
  }

  interface Site {
    id: number;
    name: string;
    initials: null | string;
    color: string;
    order: number;
    address: {
      id: null | number;
      line1: string;
      line2: string;
      line3: string;
      city: string;
      county: string;
      postcode: string;
      country: string;
    };
    mtime: string;
    muser: string;
    ctime: string;
    cuser: string;
  }

  interface Question {
    id: number;
    name: string;
    response_type: string;
    response_options: string;
    required: boolean;
    hidden: boolean;
    value: null; // TODO
    order: number;
    ctime: string;
    cuser: string;
    mtime: string;
    muser: string;
  }

  export interface Event {
    id: number;
    identifier: string;
    sequence: null; // TODO
    name: string;
    datetime_start: string;
    datetime_end: string;
    description: null | string;
    category: {
      id: number;
      name: string;
      color: `#${HexString}`;
    };
    status: "confirmed" | "pending" | "cancelled";
    visible_to: []; // TODO
    brand: {
      brand_css: string;
      color: HexString;
      emblem: null; // TODO;
      logo: string;
      name: string;
    };
    capacity: null | number;
    images: [];
    location: {
      address: string;
      latitude: string | null;
      longitude: string | null;
      name: string;
      type: "physical" | "online";
      url: string | null;
    };
    signup_options: {
      notification: BooleanAsNumber;
      connect: {
        visible: BooleanAsNumber;
      };
      embed: {
        visible: BooleanAsNumber;
        enabled: BooleanAsNumber;
      };
      public: {
        visible: BooleanAsNumber;
        enabled: BooleanAsNumber;
        featured: BooleanAsNumber;
      };
      sequence_signup: BooleanAsNumber;
      signup_cancel: BooleanAsNumber;
      signup_enabled: BooleanAsNumber;
      tickets: {
        enabled: BooleanAsNumber;
        url: string;
      };
      visible_to_tags: [];
      fixed_questions: {
        name: {
          name: string;
          response_type: "Text";
          required: true;
          hidden: false;
        };
        email: {
          name: string;
          response_type: "Email";
          required: "first" | boolean;
          hidden: false;
        };
        mobile: {
          name: string;
          response_type: "Phone";
          required: boolean;
          hidden: boolean;
        };
        notes: {
          name: string;
          response_type: "Paragraph";
          required: boolean;
          hidden: boolean;
        };
      };
    };
    site: null | Site;
    pin: number;
    invite_hash: null; // TODO
    questions?: Question[];
    public_visible: boolean;
    mtime: string;
    muser: string;
    ctime: string;
    cuser: string;
  }

  export interface Events extends PaginatedResponse {
    events: [] | Event[];
  }

  interface EventTicket {
    id: number;
    uid: string;
    name: string;
    description: string;
    datetime_start: string | null;
    datetime_end: string | null;
    paid: string;
    paid_status: "unpaid" | "paid"; // TODO (this is a guess)
    price: string;
    currency: {
      code: string;
      country: string;
      symbol: string;
    };
    quantity: number | null;
    no_sold: number;
    hidden: boolean;
    pay_on_arrival: boolean;
    pay_on_arrival_label: string;
    order: number;
    ctime: string;
    cuser: string;
    mtime: string;
    muser: string;
  }

  export interface EventTickets extends PaginatedResponse {
    tickets: [] | EventTicket[];
  }

  export interface EventSignUp {
    batch_id: string;
    event_id: number;
    event_sequence: null; // TODO
    event_sequence_signup: boolean;
    event_identifier: string;
    expires: null; // TODO
    first_name: string;
    last_name: string;
    email: EmailString;
    mobile: string;
    method: string;
    notes: string;
    payments: []; // TODO
    person: {
      email: EmailString;
      first_name: string;
      id: string | number;
      images: []; // TODO
      last_name: string;
      mobile: string;
      notes: string;
      sex: ContactBase["sex"];
      ticket: EventTicket;
      type: "contact";
      communication: {
        general_email: BooleanAsNumber;
        general_sms: BooleanAsNumber;
        rota_email: BooleanAsNumber;
        rota_sms: BooleanAsNumber;
      };
    };
  }

  interface EventSignUps extends PaginatedResponse {
    signups: [] | EventSignUp;
  }

  interface EventSignupPayload {
    first_name: string;
    last_name: string;
    mobile?: string;
    email: EmailString;
    notes?: string;
    ticket_id?: number;
  }

  interface EventCreateSignupPayload {
    action: "add";
    signups: EventSignupPayload[];
  }

  interface EventUpdateSignupPayload {
    signups: EventSignupPayload[];
  }

  interface EventSignUpResponse {
    event_id: string;
    signups: EventSignUp[];
  }

  interface Category {
    id: number;
    name: string;
    colour: `#${HexString}`;
    status: "active" | "archived"; // TODO: guess
    brand_id: null; // TODO: guess
    brand: {
      brand_css: string;
      color: HexString;
      emblem: null; // TODO
      logo: string;
      name: string;
    };
    ctime: string;
    cuser: string;
    mtime: string;
    muser: string;
  }

  interface Categories extends PaginatedResponse {
    categories: [] | Category[];
  }
}

export namespace Children {
  /**
   * Return the details regarding the Address Book module
   * @see {@link https://github.com/ChurchSuite/churchsuite-api/blob/master/modules/account.md#get-module ChurchSuite Account: Get Module}
   */
  export interface Info {
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
        connect_checkin_ticket_size: "Brother-205S";
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
}

export namespace Giving {
  /**
   * Return the details regarding the Address Book module
   * @see {@link https://github.com/ChurchSuite/churchsuite-api/blob/master/modules/account.md#get-module ChurchSuite Account: Get Module}
   */
  export interface Info {
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
}

export namespace Rotas {
  /**
   * Return the details regarding the Address Book module
   * @see {@link https://github.com/ChurchSuite/churchsuite-api/blob/master/modules/account.md#get-module ChurchSuite Account: Get Module}
   */
  export interface Info {
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
}

export namespace SmallGroups {
  /**
   * Return the details regarding the Address Book module
   * @see {@link https://github.com/ChurchSuite/churchsuite-api/blob/master/modules/account.md#get-module ChurchSuite Account: Get Module}
   */
  export interface Info {
    id: "smallgroups";
    name: string;
    order: number;
    options: {
      connect: {
        connect_hide_dow_filter: BooleanAsNumber;
        connect_hide_tag_filter: BooleanAsNumber;
        connect_hide_map: BooleanAsNumber;
        connect_hide_list: BooleanAsNumber;
        connect_hide_meeting_details: BooleanAsNumber;
        connect_hide_dates: BooleanAsNumber;
        connect_hide_description: BooleanAsNumber;
      };
      embed: {
        embed_map_enabled: BooleanAsNumber;
        embed_list_enabled: BooleanAsNumber;
        embed_hide_meeting_details: BooleanAsNumber;
        embed_hide_dates: BooleanAsNumber;
        embed_hide_description: BooleanAsNumber;
        embed_notification_email: string;
        embed_notification_email_obfuscate: BooleanAsNumber;
        embed_signup_page_title: string;
        embed_signup_page_message: string;
        embed_signup_flow: string;
      };
      module: {
        section_clusters: BooleanAsNumber;
      };
      public: {
        public_access: BooleanAsNumber;
        attendance_edit: BooleanAsNumber;
        group_index: BooleanAsNumber;
        group_edit_name: BooleanAsNumber;
        group_edit_meeting_details: BooleanAsNumber;
        group_edit_description: BooleanAsNumber;
        group_edit_photo: BooleanAsNumber;
        public_hide_meeting_details: BooleanAsNumber;
        public_hide_dates: BooleanAsNumber;
        public_hide_description: BooleanAsNumber;
      };
    };
    mtime: string;
    muser: string;
  }
}

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
export namespace My {
  /**
   * Return the contact details for the logged in contact
   * @see {@link https://github.com/ChurchSuite/churchsuite-api/blob/master/modules/my.md#get-a-contacts-details ChurchSuite My: Details}
   */
  export interface Details extends ContactBase {
    profile_meta_data: {
      sex: ContactBase["sex"];
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

  interface Contact extends ContactBase {
    multi_team_multi_role: boolean;
  }

  /**
   * List/search other publicly visible contacts
   * @see {@link https://github.com/ChurchSuite/churchsuite-api/blob/master/modules/my.md#listsearch-other-publicly-visible-contacts ChurchSuite My: Contacts}
   */
  export interface Contacts extends PaginatedResponse {
    contacts: [] | Contact[];
  }

  /**
   * Return the details of any children linked to the current contact
   * @see {@link https://github.com/ChurchSuite/churchsuite-api/blob/master/modules/my.md#get-a-childs-details ChurchSuite My: Child}
   */
  export interface Child {
    id: number;
    person_uuid: string;
    type_id: string;
    first_name: string;
    middle_name: null | string;
    last_name: string;
    name: string;
    formal_name: null | string;
    sex: ContactBase["sex"];
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
        sex: ContactBase["sex"];
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
  export interface Children extends PaginatedResponse {
    children: Child | [];
  }
}

export interface OAuth2Options {
  accessToken?: string;
  clientId: string;
  clientSecret: string;
  code?: string;
  redirectUri: string;
}

export interface ClientOptions {
  "X-Account": string;
  "X-Application": string;
  "X-Auth": string;
  oauth2?: OAuth2Options;
}

export type FetcherResponse<T> = Promise<{
  data: T;
  response: any;
  status: number;
  statusText: string;
}>;

export interface ListContactsArgs {
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

export interface ListEventsArgs {
  /** Return future events whose name contains the string provided */
  query?: string;
  /** Return events starting from a specific date */
  startDate?: DateString;
  /** Return events until a specific date */
  endDate?: DateString;
  /** Group sequence events together only showing the next event in that sequence */
  groupBySequence?: boolean;
  /** Group sequence events together only showing the next events in that sequence with unique names */
  groupBySequenceAndName?: boolean;
  /** Return events within categories provided */
  categories?: number[];
}

type d = 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | 0;
type YYYY = `19${d}${d}` | `20${d}${d}`;
type oneToNine = 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9;
type MM = `0${oneToNine}` | `1${0 | 1 | 2}`;
type DD = `${0}${oneToNine}` | `${1 | 2}${d}` | `3${0 | 1}`;

type DateString = `${YYYY}-${MM}-${DD}`;
type EmailString = `${string}@${string}.${string}`;

type HexString = `${string | number}${string | number}${string | number}${
  | string
  | number}${string | number}${string | number}`;

export interface ClientInstance {
  account: {
    user: () => FetcherResponse<Account.User>;
    profile: () => FetcherResponse<Account.Profile>;
  };
  addressBook: {
    info: () => FetcherResponse<AddressBook.Info>;
    contacts: {
      /** List/search contacts */
      list: (args?: ListContactsArgs) => FetcherResponse<AddressBook.Contacts>;
      /** Return data for a specific contact */
      show: (id: number) => FetcherResponse<AddressBook.Contact>;
      /** Return tags for a specific contact */
      tags: (id: number) => FetcherResponse<AddressBook.ContactTags>;
      /** Return key dates for a specific contact */
      keyDates: (id: number) => FetcherResponse<AddressBook.KeyDates>;
      /** Create a contact */
      create: (
        args: AddressBook.CreateContactArgs
      ) => FetcherResponse<AddressBook.Contact>;
      /** Update a contact */
      update: (
        id: number,
        args: AddressBook.UpdateContactArgs
      ) => FetcherResponse<AddressBook.Contact>;
      /** Delete a contact */
      del: (id: number) => void;
    };
    tags: {
      /** Return tags ordered alphabetically */
      list: () => FetcherResponse<AddressBook.Tags>;
      /** Return data for a specific tag */
      show: (
        id: number,
        contacts?: boolean
      ) => FetcherResponse<AddressBook.ShowTag>;
      /** Return contacts for a specific tag */
      contacts: (id: number) => FetcherResponse<AddressBook.Contacts>;
    };
    flows: {
      /** Return flows ordered alphabetically */
      list: () => FetcherResponse<AddressBook.Flows>;
      /** Return data for a specific flow */
      show: (id: number) => FetcherResponse<AddressBook.Flow>;
      /** Return tracking for a specific flow */
      tracking: (id: number) => FetcherResponse<AddressBook.FlowTracking>;
      /** Add contacts to be tracked through a flow */
      addContacts: (
        id: number,
        args: AddressBook.AddContactsToFlowPayload
      ) => FetcherResponse<AddressBook.AddContactsToFlowTracking>;
    };
    keyDates: {
      /** Return key dates ordered alphabetically */
      list: () => FetcherResponse<AddressBook.KeyDates>;
      /** Return data for a specific key date */
      show: (id: number) => FetcherResponse<AddressBook.KeyDate>;
      /** Return contacts for a specific key date */
      contacts: (id: number) => FetcherResponse<AddressBook.KeyDateContacts>;
    };
  };
  attendance: {
    info: () => FetcherResponse<Attendance.Info>;
  };
  calendar: {
    info: () => FetcherResponse<Calendar.Info>;
    events: {
      /** List/search events */
      list: (args: ListEventsArgs) => FetcherResponse<Calendar.Events>;
      /** Return data for a specific event */
      show: (
        idOrIdentifier: number | string
      ) => FetcherResponse<Calendar.Event>;
      /** Return tickets data for a specific event */
      tickets: (id: number) => FetcherResponse<Calendar.EventTickets>;
      signups: {
        /** Return data regarding people who have signed up for a specific event */
        list: (id: number) => FetcherResponse<Calendar.EventSignUps>;
        /** Create a new sign up for a specific event */
        create: (
          id: number,
          args: Calendar.EventCreateSignupPayload
        ) => FetcherResponse<Calendar.EventSignUpResponse>;
        /** Update the specified sign up for a specific event */
        update: (
          eventId: number,
          signUpId: number,
          args: Calendar.EventUpdateSignupPayload
        ) => FetcherResponse<Calendar.EventSignUp>;
        /** Remove the specified sign up for a specific event */
        del: (eventId: number, signUpId: number) => void;
      };
    };
    /** Return categories ordered alphabetically */
    categories: () => FetcherResponse<Calendar.Categories>;
  };
  children: {
    info: () => FetcherResponse<Children.Info>;
  };
  giving: {
    info: () => FetcherResponse<Giving.Info>;
  };
  my?: {
    /** Return the contact details for the logged in contact */
    details: () => FetcherResponse<My.Details>;
    /** List/search other publicly visible contacts */
    contacts: (query?: string) => FetcherResponse<My.Contacts>;
    /** Return the details of any children linked to the current contact */
    children: () => FetcherResponse<My.Children>;
    /** Return the details of a specific child linked to the current contact */
    child: (id: number) => FetcherResponse<My.Child>;
  };
  oauth2?: {
    accessToken?: string;
    authorizationUrl: string;
    tokenUrl: string;
    createToken: (code?: string) => Promise<any>;
    getToken: () => string | undefined;
    setToken: (newAccessToken: string) => void;
  };
  rotas: {
    info: () => FetcherResponse<Rotas.Info>;
  };
  smallGroups: {
    info: () => FetcherResponse<SmallGroups.Info>;
  };
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
export declare function createClient(options: ClientOptions): ClientInstance;

export default createClient;
