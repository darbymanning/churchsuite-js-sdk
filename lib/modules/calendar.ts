import type { Calendar, ClientInstance } from "../churchsuite";
import type { FetcherInstance } from "../fetcher";

export default function ({
  get,
  post,
  put,
  del,
}: FetcherInstance): ClientInstance["calendar"] {
  return {
    async info() {
      return await get<Calendar.Info>("/v1/module/calendar");
    },
    events: {
      /** List/search events */
      async list() {
        return await get<Calendar.Events>("/v1/calendar/events");
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
