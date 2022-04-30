import type { ClientInstance } from "../main";
import type { Fetcher } from "../fetcher";
import type { BooleanAsNumber } from "../types";

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

  interface Methods {
    info: () => Fetcher.FetcherResponse<Children.Info>;
  }
}

export default function ({
  get,
}: Fetcher.FetcherInstance): ClientInstance["children"] {
  return {
    async info() {
      return await get<Children.Info>("/v1/module/children");
    },
  };
}
