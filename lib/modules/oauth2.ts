import { encode } from "qss";
import fetcher from "../fetcher";
import type {
  ClientInstance,
  ClientOptions,
  OAuth2Options,
} from "../churchsuite";

export default function (
  options: ClientOptions,
  sdk: ClientInstance
): ClientInstance["oauth2"] {
  const { redirectUri, clientId, clientSecret } =
    options.oauth2 as Required<OAuth2Options>;
  const params = {
    response_type: "code",
    client_id: clientId,
    redirect_uri: redirectUri,
  };

  const authorizationUrlBase = `https://${options["X-Account"]}.churchsuite.com/oauth/authorize`;
  const tokenUrl = `https://${options["X-Account"]}.churchsuite.com/oauth/token`;
  const authorizationUrl = authorizationUrlBase + encode(params, "?");

  return {
    accessToken: options.oauth2?.accessToken,
    async createToken(code) {
      if (sdk.oauth2?.accessToken) return sdk.oauth2.accessToken;
      if (!code) throw Error("No temporary auth code provided.");

      const { post } = fetcher.create({
        headers: {
          "Content-Type": "application/x-www-form-urlencoded",
          "X-Account": options["X-Account"],
          "X-Application": options["X-Application"],
          "X-Auth": options["X-Auth"],
        },
      });

      const payload = encode({
        grant_type: "authorization_code",
        code,
        redirect_uri: redirectUri,
        client_id: clientId,
        client_secret: clientSecret,
      });

      const request = await post<{ access_token: string }>(tokenUrl, payload);

      if (request.response.status === 200 && sdk.oauth2) {
        sdk.oauth2.accessToken = request.data.access_token;
        return sdk.oauth2.accessToken;
      }

      return request;
    },
    setToken(newAccessToken) {
      if (sdk.oauth2) sdk.oauth2.accessToken = newAccessToken;
    },
    getToken() {
      return sdk.oauth2?.accessToken;
    },
    authorizationUrl,
    tokenUrl,
  };
}
