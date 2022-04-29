export default function ({
  get,
}: Fetcher.FetcherInstance): ClientInstance["attendance"] {
  return {
    async info() {
      return await get<Attendance.Info>("/v1/module/attendance");
    },
  };
}
