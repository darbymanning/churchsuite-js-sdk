import type { ClientInstance } from "../main";
import type { Fetcher } from "../fetcher";
import type {
  BooleanAsNumber,
  DateString,
  EmailString,
  Image,
  PaginatedResponse,
} from "../types";
import { AddressBook } from "./addressBook";

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
        embed_notification_email: EmailString;
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

  interface Cluster {
    id: number;
    name: string;
    mtime: string;
    muser: string;
    ctime: string;
    cuser: string;
  }

  interface Tag {
    id: number;
    tag_id: number;
    name: string;
    color: string;
    num_groups: number;
    mtime: string;
    muser: string;
    ctime: string;
    cuser: string;
  }

  interface Group {
    id: number;
    identifier: string;
    reference: string;
    name: string;
    date_start: DateString;
    date_end: "" | DateString;
    custom_frequency: string;
    frequency: string; // TODO: "custom" ar...?
    day: string; // TODO: "1" or ..?
    site: null | number; // TODO: is number correct?
    time: null | string; // TODO: is string correct?
    location: {
      address: null | string;
      latitude: null | string;
      longitude: null | string;
      name: string;
      type: "physical" | "online";
      url: null | string;
      address_name: string;
    };
    description: null | string;
    images: [] | Image[];
    no_members: number;
    public_visible: boolean;
    public_signup: boolean;
    embed_visible: boolean;
    embed_signup: boolean;
    connect_visible: boolean;
    connect_signup: boolean;
    signup_enabled: boolean;
    signup_date_start: "" | DateString;
    signup_date_end: "" | DateString;
    signup_capacity: null | number;
    signup_member_status: "active" | "pending";
    signup_confirm_email: boolean;
    signup_confirm_email_from_name: null | string;
    signup_confirm_email_from_email: null | EmailString;
    signup_confirm_email_subject: null | string;
    signup_confirm_email_body: null | string;
    signup_details_visible: "after_signup" | "immediate";
    signup_link_visible: boolean;
    signup_full: boolean;
    cluster_id: null | number;
    cluster: null | Cluster;
    custom_fields: [];
    embed_signup_page_title: string;
    embed_signup_page_message: string;
    tags?: Tag[];
    mtime: string;
    muser: string;
    ctime: string;
    cuser: string;
  }

  interface Groups extends PaginatedResponse {
    groups: [] | Group[];
  }

  type GroupsToTags = Record<string, string[]>;

  interface Members extends PaginatedResponse {
    members: [] | AddressBook.Contact[];
  }

  interface AddMemberArgs {
    members: (`child_${number}` | `contact_${number}`)[];
    sendConfirmation: boolean;
  }

  interface AddMemberPayload {
    action: "add";
    members: (`child_${number}` | `contact_${number}`)[];
    send_confirmation: boolean;
  }

  interface Tags extends PaginatedResponse {
    tags: [] | Tags[];
  }

  interface Clusters extends PaginatedResponse {
    clusters: [] | Clusters[];
  }

  interface Methods {
    info: () => Fetcher.FetcherResponse<SmallGroups.Info>;
    groups: {
      list: () => Fetcher.FetcherResponse<Groups>;
      show: (id: number) => Fetcher.FetcherResponse<Group>;
      tags: (id: number) => Fetcher.FetcherResponse<Tags>;
      members: (id: number) => Fetcher.FetcherResponse<Members>;
      addMembers: (
        id: number,
        args: AddMemberArgs
      ) => Fetcher.FetcherResponse<Group>;
    };
    tags: {
      list: () => Fetcher.FetcherResponse<Tags>;
      show: (id: number) => Fetcher.FetcherResponse<Tag>;
      groups: (id: number) => Fetcher.FetcherResponse<Groups>;
    };
    clusters: {
      list: () => Fetcher.FetcherResponse<Clusters>;
      show: (id: number) => Fetcher.FetcherResponse<Cluster>;
    };
  }
}

function resolveMemberForApi(
  args: SmallGroups.AddMemberArgs
): SmallGroups.AddMemberPayload {
  return {
    action: "add",
    members: args.members,
    send_confirmation: args.sendConfirmation,
  };
}

export default function ({
  get,
  post,
}: Fetcher.FetcherInstance): ClientInstance["smallGroups"] {
  return {
    async info() {
      return await get<SmallGroups.Info>("/v1/module/smallgroups");
    },
    groups: {
      async list() {
        return await get<SmallGroups.Groups>("/v1/smallgroups/groups");
      },
      async show(id) {
        return await get<SmallGroups.Group>(`/v1/smallgroups/group/${id}`);
      },
      async tags(id) {
        return await get<SmallGroups.Tags>(`/v1/smallgroups/group/${id}/tags`);
      },
      async members(id) {
        return await get<SmallGroups.Members>(
          `/v1/smallgroups/group/${id}/members`
        );
      },
      async addMembers(id, args: SmallGroups.AddMemberArgs) {
        const body = resolveMemberForApi(args);
        return await post<SmallGroups.Group>(
          `/v1/smallgroups/group/${id}/members`,
          body
        );
      },
    },
    tags: {
      async list() {
        return await get<SmallGroups.Tags>("/v1/smallgroups/tags");
      },
      async show(id) {
        return await get<SmallGroups.Tag>(`/v1/smallgroups/tag/${id}`);
      },
      async groups(id) {
        return await get<SmallGroups.Groups>(
          `/v1/smallgroups/tag/${id}/groups`
        );
      },
    },
    clusters: {
      async list() {
        return await get<SmallGroups.Clusters>("/v1/smallgroups/clusters");
      },
      async show(id) {
        return await get<SmallGroups.Cluster>(`/v1/smallgroups/cluster/${id}`);
      },
    },
  };
}
