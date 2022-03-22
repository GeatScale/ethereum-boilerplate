import NativeTransactions from "components/NativeTransactions";
import ERC20Transfers from "components/ERC20Transfers";

const History = () => {
  return (
    <div>
      <NativeTransactions />
      <ERC20Transfers />
    </div>
  );
};

export default History;
