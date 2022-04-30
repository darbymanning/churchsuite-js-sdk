import { encode } from "qss";
import type { ClientInstance } from "../main";
import type { Fetcher } from "../fetcher";
import type {
  BooleanAsNumber,
  DateString,
  EmailString,
  HexString,
  PaginatedResponse,
} from "../types";
import type { AddressBook } from "./addressBook";

export declare namespace Calendar {
  /**
   * Return the details regarding the Address Book module
   * @see {@link https://github.com/ChurchSuite/churchsuite-api/blob/master/modules/account.md#get-module ChurchSuite Account: Get Module}
   */
  interface Info {
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

  interface Event {
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

  interface Events extends PaginatedResponse {
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

  interface EventTickets extends PaginatedResponse {
    tickets: [] | EventTicket[];
  }

  interface EventSignUp {
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
      sex: AddressBook.Contact["sex"];
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

  interface ListEventsArgs {
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

  interface Methods {
    info: () => Fetcher.FetcherResponse<Calendar.Info>;
    events: {
      /** List/search events */
      list: (args: ListEventsArgs) => Fetcher.FetcherResponse<Calendar.Events>;
      /** Return data for a specific event */
      show: (
        idOrIdentifier: number | string
      ) => Fetcher.FetcherResponse<Calendar.Event>;
      /** Return tickets data for a specific event */
      tickets: (id: number) => Fetcher.FetcherResponse<Calendar.EventTickets>;
      signups: {
        /** Return data regarding people who have signed up for a specific event */
        list: (id: number) => Fetcher.FetcherResponse<Calendar.EventSignUps>;
        /** Create a new sign up for a specific event */
        create: (
          id: number,
          args: Calendar.EventCreateSignupPayload
        ) => Fetcher.FetcherResponse<Calendar.EventSignUpResponse>;
        /** Update the specified sign up for a specific event */
        update: (
          eventId: number,
          signUpId: number,
          args: Calendar.EventUpdateSignupPayload
        ) => Fetcher.FetcherResponse<Calendar.EventSignUp>;
        /** Remove the specified sign up for a specific event */
        del: (eventId: number, signUpId: number) => void;
      };
    };
    /** Return categories ordered alphabetically */
    categories: () => Fetcher.FetcherResponse<Calendar.Categories>;
  }
}

export default function ({
  get,
  post,
  put,
  del,
}: Fetcher.FetcherInstance): ClientInstance["calendar"] {
  return {
    async info() {
      return await get<Calendar.Info>("/v1/module/calendar");
    },
    events: {
      /** List/search events */
      async list(args) {
        const params = args
          ? encode(
              {
                q: args.query,
                start_date: args.startDate,
                end_date: args.endDate,
                group_by_sequence: args.groupBySequence,
                group_by_sequence_and_name: args.groupBySequenceAndName,
                categories: args.categories?.toString(),
              },
              "?"
            )
          : "";

        return await get<Calendar.Events>(`/v1/calendar/events${params}`);
      },
      /** Return data for a specific event */
      async show(id) {
        return await get<Calendar.Event>(`/v1/calendar/event/${id}`);
      },
      /** Return tickets data for a specific event */
      async tickets(id) {
        return await get<Calendar.EventTickets>(
          `/v1/calendar/events/${id}/tickets`
        );
      },
      signups: {
        /** Return data regarding people who have signed up for a specific event */
        async list(id) {
          return await get<Calendar.EventSignUps>(
            `/v1/calendar/events/${id}/signups`
          );
        },
        /** Create a new sign up for a specific event */
        async create(id, args) {
          return await post<Calendar.EventSignUpResponse>(
            `/v1/calendar/event/${id}/signups`,
            args
          );
        },
        /** Update the specified sign up for a specific event */
        async update(eventId, signUpId, args) {
          return await put<Calendar.EventSignUp>(
            `/v1/calendar/event/${eventId}/signup/${signUpId}`,
            args
          );
        },
        /** Remove the specified sign up for a specific event */
        async del(eventId, signUpId) {
          return await del(`/v1/calendar/event/${eventId}/signup/${signUpId}`);
        },
      },
    },
    /** Return categories ordered alphabetically */
    async categories() {
      return await get<Calendar.Categories>("/v1/calendar/categories");
    },
  };
}
