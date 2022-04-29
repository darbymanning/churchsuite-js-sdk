export default function ({
  get,
}: Fetcher.FetcherInstance): ClientInstance["smallGroups"] {
  return {
    async info() {
      return await get<SmallGroups.Info>("/v1/module/smallgroups");
    },
  };
}
