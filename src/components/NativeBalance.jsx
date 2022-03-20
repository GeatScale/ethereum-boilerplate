import { useMoralis, useNativeBalance } from "react-moralis";
import { useAuthState } from "store/auth/state";

function NativeBalance(props) {
  const { data: balance } = useNativeBalance(props);
  const { account } = useMoralis();
  const { isAuthenticated } = useAuthState();

  if (!account || !isAuthenticated) return null;

  return (
    <div style={{ textAlign: "center", whiteSpace: "nowrap" }}>
      {balance.formatted}
    </div>
  );
}

export default NativeBalance;
