import React from "react";
import { useMoralis } from "react-moralis";
import { Skeleton, Table } from "antd";
import Text from "antd/lib/typography/Text";
import { getEllipsisTxt } from "../../helpers/formatters";
import { getExplorer } from "../../helpers/networks";
import "antd/dist/antd.css";
import { useERC20Transfers } from "hooks/useERC20Transfers";

function ERC20Transfers() {
  const { ERC20Transfers, chainId } = useERC20Transfers();
  const { Moralis } = useMoralis();

  const columns = [
    {
      title: "Token",
      dataIndex: "address",
      key: "address",
      render: (token) => getEllipsisTxt(token, 8),
    },
    {
      title: "From",
      dataIndex: "from_address",
      key: "from_address",
      render: (from) => getEllipsisTxt(from, 8),
    },
    {
      title: "To",
      dataIndex: "to_address",
      key: "to_address",
      render: (to) => getEllipsisTxt(to, 8),
    },
    {
      title: "Value",
      dataIndex: "value",
      key: "value",
      render: (value, item) =>
        parseFloat(Moralis.Units.FromWei(value, item.decimals)).toFixed(6),
    },
    {
      title: "Hash",
      dataIndex: "transaction_hash",
      key: "transaction_hash",
      render: (hash) => (
        <a
          href={`${getExplorer(chainId)}tx/${hash}`}
          target="_blank"
          rel="noreferrer"
        >
          View Transaction
        </a>
      ),
    },
  ];

  let key = 0;
  return (
    <div
      style={{
        width: "65vw",
        padding: "15px",
        boxShadow: "0 0 1.2rem rgb(8 96 242 / 15%)",
        borderRadius: "1rem",
      }}
    >
      <Text level={3}>
        <i className="fa-solid fa-timeline" />
        <span> ERC20 Transfers</span>
      </Text>
      <Skeleton loading={!ERC20Transfers}>
        <Table
          dataSource={ERC20Transfers}
          columns={columns}
          rowKey={(record) => {
            key++;
            return `${record.transaction_hash}-${key}`;
          }}
        />
      </Skeleton>
    </div>
  );
}

export default ERC20Transfers;
