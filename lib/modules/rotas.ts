import type { ClientInstance, Rotas } from "../churchsuite";
import type { FetcherInstance } from "../fetcher";

export default function ({ get }: FetcherInstance): ClientInstance["rotas"] {
  return {
    async info() {
      return await get<Rotas.Info>("/v1/module/rotas");
    },
  };
}
