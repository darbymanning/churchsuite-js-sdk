export default function ({
  get,
}: Fetcher.FetcherInstance): ClientInstance["children"] {
  return {
    async info() {
      return await get<Children.Info>("/v1/module/children");
    },
  };
}
