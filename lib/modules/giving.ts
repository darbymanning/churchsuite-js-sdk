export default function ({
  get,
}: Fetcher.FetcherInstance): ClientInstance["giving"] {
  return {
    async info() {
      return await get<Giving.Info>("/v1/module/giving");
    },
  };
}
