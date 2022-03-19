import { useEffect } from "react";
import { useMoralis } from "react-moralis";
import { useHistory, useLocation } from "react-router-dom";
import ProviderWeb3Connector from "constants/wallet/ProviderWeb3Connector";
import { useAuthState } from "store/auth/state";

const InitController = () => {
  const { isWeb3Enabled, enableWeb3 } = useMoralis();
  const { isAuthenticated, address, keyStore, setIsAuthenticated } =
    useAuthState();
  const history = useHistory();
  const location = useLocation();

  function handleNotAuthenticated() {
    history.push("/login");
  }

  function handleNoKeyStore() {
    setIsAuthenticated(false);
    if (location.pathname !== "welcome") history.push("/welcome");
  }

  function initAppAuth() {
    console.log({ isAuthenticated, address, keyStore });
    if (keyStore && !isAuthenticated) return handleNotAuthenticated();
    if (!keyStore) return handleNoKeyStore();

    enableWeb3({
      connector: ProviderWeb3Connector,
      speedyNodeApiKey: process.env.REACT_APP_MORALIS_API_KEY,
      account: address,
    });
  }

  useEffect(() => {
    initAppAuth();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    if (!isWeb3Enabled && isAuthenticated && address) {
      initAppAuth();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [address, isAuthenticated]);

  return null;
};

export default InitController;
