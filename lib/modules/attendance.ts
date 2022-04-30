import type { ClientInstance } from "../main";
import type { Fetcher } from "../fetcher";
import type { BooleanAsNumber } from "../types";

export declare namespace Attendance {
  /**
   * Return the details regarding the Address Book module
   * @see {@link https://github.com/ChurchSuite/churchsuite-api/blob/master/modules/account.md#get-module ChurchSuite Account: Get Module}
   */
  interface Info {
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

  interface Methods {
    info: () => Fetcher.FetcherResponse<Attendance.Info>;
  }
}

export default function ({
  get,
}: Fetcher.FetcherInstance): ClientInstance["attendance"] {
  return {
    async info() {
      return await get<Attendance.Info>("/v1/module/attendance");
    },
  };
}
