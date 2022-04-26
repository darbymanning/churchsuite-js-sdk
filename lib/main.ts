import { encode } from "qss";
import fetcher from "./fetcher";
import type {
  Account,
  AddressBook,
  Attendance,
  Calendar,
  Children,
  ClientInstance,
  ClientOptions,
  Giving,
  Rotas,
  SmallGroups,
} from "./churchsuite";

function maybeBooleanToNumber(boolean?: boolean) {
  if (typeof boolean === "undefined") return;
  return boolean ? 1 : 0;
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

export default function createClient(options: ClientOptions): ClientInstance {
  const { del, get, post, put } = fetcher.create({
    baseURL: "https://api.churchsuite.com",
    headers: {
      "X-Account": options["X-Account"],
      "X-Application": options["X-Application"],
      "X-Auth": options["X-Auth"],
    },
  });

  return {
    account: {
      async user() {
        return await get<Account.User>("/v1/whoami");
      },
      async profile() {
        return await get<Account.Profile>("/v1/profile");
      },
    },
    addressBook: {
      async info() {
        return await get<AddressBook.Info>("/v1/module/addressbook");
      },
      contacts: {
        async list(args) {
          const params = args
            ? encode(
                {
                  name: args?.name,
                  q: args?.query,
                  page: args?.page,
                  per_page: args?.perPage,
                  public_access: maybeBooleanToNumber(args.publicAccess),
                  public_visible: maybeBooleanToNumber(args.publicVisible),
                  view: args?.view,
                },
                "?"
              )
            : "";

          return await get<AddressBook.Contacts>(
            `/v1/addressbook/contacts${params}`
          );
        },
        async show(id) {
          return await get<AddressBook.Contact>(
            `/v1/addressbook/contact/${id}`
          );
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

          return await post<AddressBook.Contact>(
            "/v1/addressbook/contact",
            body
          );
        },
        async update(id: number, args) {
          const body = resolveContactForApi(args);

          return await put<AddressBook.Contact>(
            `/v1/addressbook/contact/${id}`,
            body
          );
        },
        async del(id: number) {
          return await del<AddressBook.Contact>(
            `/v1/addressbook/contact/${id}`
          );
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
          return await get<AddressBook.KeyDate>(
            `/v1/addressbook/keydate/${id}`
          );
        },
        async contacts(id) {
          return await get<AddressBook.KeyDateContacts>(
            `/v1/addressbook/keydate/${id}/contacts`
          );
        },
      },
    },
    attendance: {
      async info() {
        return await get<Attendance.Info>("/v1/module/attendance");
      },
    },
    calendar: {
      async info() {
        return await get<Calendar.Info>("/v1/module/calendar");
      },
      events: {
        /** List/search events */
        async list() {
          return await get<Calendar.Events>("v1/calendar/events");
        },
        /** Return data for a specific event */
        async show(id) {
          return await get<Calendar.Event>(`v1/calendar/event/${id}`);
        },
        /** Return tickets data for a specific event */
        async tickets(id) {
          return await get<Calendar.EventTickets>(
            `v1/calendar/events/${id}/tickets`
          );
        },
        signups: {
          /** Return data regarding people who have signed up for a specific event */
          async list(id) {
            return await get<Calendar.EventSignUps>(
              `v1/calendar/events/${id}/signups`
            );
          },
          /** Create a new sign up for a specific event */
          async create(id, args) {
            return await post<Calendar.EventSignUpResponse>(
              `v1/calendar/event/${id}/signups`,
              args
            );
          },
          /** Update the specified sign up for a specific event */
          async update(eventId, signUpId, args) {
            return await put<Calendar.EventSignUp>(
              `v1/calendar/event/${eventId}/signup/${signUpId}`,
              args
            );
          },
          /** Remove the specified sign up for a specific event */
          async del(eventId, signUpId) {
            return await del(`v1/calendar/event/${eventId}/signup/${signUpId}`);
          },
        },
      },
      /** Return categories ordered alphabetically */
      async categories() {
        return await get<Calendar.Categories>("v1/calendar/categories");
      },
    },
    children: {
      async info() {
        return await get<Children.Info>("/v1/module/children");
      },
    },
    giving: {
      async info() {
        return await get<Giving.Info>("/v1/module/giving");
      },
    },
    rotas: {
      async info() {
        return await get<Rotas.Info>("/v1/module/rotas");
      },
    },
    smallGroups: {
      async info() {
        return await get<SmallGroups.Info>("/v1/module/smallgroups");
      },
    },
  };
}
