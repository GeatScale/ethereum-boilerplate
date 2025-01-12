import { useMoralis, useERC20Balances } from "react-moralis";
import { Skeleton, Table } from "antd";
import Text from "antd/lib/typography/Text";
import { getEllipsisTxt } from "../helpers/formatters";

function ERC20Balance(props) {
  const { data: assets } = useERC20Balances(props);
  const { Moralis } = useMoralis();

  const columns = [
    {
      title: "",
      dataIndex: "logo",
      key: "logo",
      render: (logo) => (
        <img
          src={logo || "https://etherscan.io/images/main/empty-token.png"}
          alt="nologo"
          width="28px"
          height="28px"
        />
      ),
    },
    {
      title: "Name",
      dataIndex: "name",
      key: "name",
      render: (name) => name,
    },
    {
      title: "Symbol",
      dataIndex: "symbol",
      key: "symbol",
      render: (symbol) => symbol,
    },
    {
      title: "Balance",
      dataIndex: "balance",
      key: "balance",
      render: (value, item) =>
        parseFloat(Moralis?.Units?.FromWei(value, item.decimals)).toFixed(6),
    },
    {
      title: "Address",
      dataIndex: "token_address",
      key: "token_address",
      render: (address) => (
        <Text copyable={{ text: address }}>{getEllipsisTxt(address, 5)}</Text>
      ),
    },
  ];

  return (
    <div
      style={{
        width: "65vw",
        padding: "15px",
        boxShadow: "0 0 1.2rem rgb(8 96 242 / 15%)",
        borderRadius: "1rem",
      }}
    >
      <h1>
        <i className="fa-solid fa-coins" />
        <span> Token Balances</span>
      </h1>
      <Skeleton loading={!assets}>
        <Table
          dataSource={assets}
          columns={columns}
          rowKey={(record) => {
            return record.token_address;
          }}
        />
      </Skeleton>
    </div>
  );
}
export default ERC20Balance;
