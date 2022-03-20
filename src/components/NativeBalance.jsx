import { useEffect } from "react";

import { useMoralis, useNativeBalance } from "react-moralis";
import { useAuthState } from "store/auth/state";

function NativeBalance() {
  const { account, chainId } = useMoralis();
  const {
    data: balance,
    getBalances,
    isLoading,
  } = useNativeBalance({ chain: chainId });
  const { isAuthenticated } = useAuthState();

  async function refreshBalance() {
    function reset() {
      setTimeout(() => {
        refreshBalance();
      }, 15000);
    }

    try {
      if (!isLoading) {
        await getBalances();
        reset();
      }
    } catch (err) {
      reset();
    }
  }

  useEffect(() => {
    refreshBalance();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  if (!account || !isAuthenticated) return null;

  return (
    <div style={{ textAlign: "center", whiteSpace: "nowrap" }}>
      {balance.formatted}
    </div>
  );
}

export default NativeBalance;
