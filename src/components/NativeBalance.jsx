import { useMoralis, useNativeBalance } from "react-moralis";
import { useAuthState } from "store/auth/state";

function NativeBalance() {
  const { account, chainId } = useMoralis();
  const { data: balance } = useNativeBalance({ chain: chainId });
  const { isAuthenticated } = useAuthState();

  if (!account || !isAuthenticated) return null;

  return (
    <div style={{ textAlign: "center", whiteSpace: "nowrap" }}>
      {balance.formatted}
    </div>
  );
}

export default NativeBalance;
