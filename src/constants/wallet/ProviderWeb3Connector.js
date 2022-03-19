import axios from "axios";
import { fromHexToDecimal } from "moralis/lib/weapp/utils/convert";
import verifyChainId from "moralis/lib/weapp/utils/verifyChainId";
import AbstractWeb3Connector from "moralis/lib/weapp/Web3Connector/AbstractWeb3Connector";
import { getMoralisRpcs } from "moralis/lib/weapp/Web3Connector/MoralisRpcs";

class MiniRpcProvider {
  constructor(chainId, url) {
    this.chainId = chainId;
    this.url = url;
    const parsed = new URL(url);
    this.host = parsed.host;
    this.path = parsed.pathname;
  }

  request = async (method, params) => {
    if (typeof method !== "string") {
      // eslint-disable-next-line prefer-destructuring
      params = method.params;
      // eslint-disable-next-line prefer-destructuring
      method = method.method;
    }

    try {
      const response = await axios.post(
        this.url,
        JSON.stringify({
          jsonrpc: "2.0",
          id: 1,
          method,
          params,
        }),
      );

      console.log({ response });

      if (!response) {
        throw new Error("No response");
      }

      if (!response.status || response.status > 400) {
        throw new Error(
          `Error response [${response.status}] ${response.statusText}`,
        );
      }

      const body = response.response;

      if ("error" in body) {
        throw new Error(
          body?.error?.message,
          body?.error?.code,
          body?.error?.data,
        );
      }

      if (!("result" in body)) {
        throw new Error(`Received unexpected JSON-RPC response`);
      }

      return body.result;
    } catch (error) {
      throw new Error(
        `Failed to make "${method}" request with networkConnector: "${error.message}"`,
      );
    }
  };
}

/**
 * Connect to web3 via a network url
 * Note: this has no knowledge of any user accounts
 */
class ProviderWeb3Connector extends AbstractWeb3Connector {
  type = "network";

  constructor({ urls, defaultChainId, speedyNodeApiKey, account = null } = {}) {
    super();

    if (!urls && speedyNodeApiKey) {
      urls = getMoralisRpcs(speedyNodeApiKey);
    }

    if (!urls && !speedyNodeApiKey) {
      throw new Error(
        "Cannot connect to rpc: No urls or speedyNodeApiKey provided for ProviderWeb3Connector.",
      );
    }
    if (process.env.PARSE_BUILD !== "node" && speedyNodeApiKey) {
      // eslint-disable-next-line no-console
      console.warn(
        "Using speedyNodeApiKey on the browser enviroment is not recommended, as it is publicly visible.",
      );
    }

    this.chainId = verifyChainId(
      defaultChainId ?? Number(Object.keys(urls)[0]),
    );
    this.providers = Object.keys(urls).reduce((accumulator, chainId) => {
      accumulator[Number(chainId)] = new MiniRpcProvider(
        Number(chainId),
        urls[Number(chainId)],
      );
      return accumulator;
    }, {});

    this.account = account;
  }

  async activate({ chainId: providedChainId } = {}) {
    console.log("activate");
    if (providedChainId) {
      this.chainId = verifyChainId(providedChainId);
    }

    const provider = this.providers[fromHexToDecimal(this.chainId)];

    if (!provider) {
      throw new Error(`No rpc url provided for chainId ${this.chainId}`);
    }

    return {
      provider,
      chainId: this.chainId,
      account: this.account,
    };
  }
}

export default ProviderWeb3Connector;
