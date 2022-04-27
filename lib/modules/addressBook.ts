import { encode } from "qss";
import { maybeBooleanToNumber } from "../utils";
import type { AddressBook, ClientInstance } from "../churchsuite";
import type { FetcherInstance } from "../fetcher";

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
}: FetcherInstance): ClientInstance["addressBook"] {
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
