import type { Attendance, ClientInstance } from "../churchsuite";
import type { FetcherInstance } from "../fetcher";

export default function ({
  get,
}: FetcherInstance): ClientInstance["attendance"] {
  return {
    async info() {
      return await get<Attendance.Info>("/v1/module/attendance");
    },
  };
}
