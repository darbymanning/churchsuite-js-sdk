export default function ({
  get,
}: Fetcher.FetcherInstance): ClientInstance["rotas"] {
  return {
    async info() {
      return await get<Rotas.Info>("/v1/module/rotas");
    },
  };
}
