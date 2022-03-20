import { Skeleton } from "antd";
import Blockies from "react-blockies";
import { useMoralis } from "react-moralis";
import { useAuthState } from "store/auth/state";

/**
 * Shows a blockie image for the provided wallet address
 * @param {*} props
 * @returns <Blockies> JSX Elemenet
 */

function Blockie(props) {
  const { account } = useMoralis();
  const { isAuthenticated } = useAuthState();
  if (!props.address && (!account || !isAuthenticated))
    return <Skeleton.Avatar active size={40} />;

  return (
    <Blockies
      seed={
        props.currentWallet
          ? account.toLowerCase()
          : props.address.toLowerCase()
      }
      className="identicon"
      {...props}
    />
  );
}

export default Blockie;
