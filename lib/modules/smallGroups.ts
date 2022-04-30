import type { ClientInstance } from "../main";
import type { Fetcher } from "../fetcher";
import type { BooleanAsNumber } from "../types";

export declare namespace SmallGroups {
  /**
   * Return the details regarding the Address Book module
   * @see {@link https://github.com/ChurchSuite/churchsuite-api/blob/master/modules/account.md#get-module ChurchSuite Account: Get Module}
   */
  interface Info {
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

  interface Methods {
    info: () => Fetcher.FetcherResponse<SmallGroups.Info>;
  }
}

export default function ({
  get,
}: Fetcher.FetcherInstance): ClientInstance["smallGroups"] {
  return {
    async info() {
      return await get<SmallGroups.Info>("/v1/module/smallgroups");
    },
  };
}
