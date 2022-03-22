import React, { useEffect } from "react";
import { useMoralis, useNativeBalance } from "react-moralis";
import { Skeleton, Table } from "antd";
import Text from "antd/lib/typography/Text";
import { getEllipsisTxt } from "../../helpers/formatters";
import useNativeTransactions from "hooks/useNativeTransactions";
import "antd/dist/antd.css";

function NativeTransactions() {
  const { nativeTransactions, getNativeTransations, chainId, isLoading } =
    useNativeTransactions();
  const { account, Moralis } = useMoralis();
  const { nativeToken } = useNativeBalance();

  useEffect(() => {
    getNativeTransations({ params: { chain: chainId } });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [chainId]);

  const columns = [
    {
      title: "From",
      dataIndex: "from_address",
      key: "from_address",
      render: (from) => getEllipsisTxt(from, 5),
    },
    {
      title: "To",
      dataIndex: "to_address",
      key: "to_address",
      render: (to) => getEllipsisTxt(to, 5),
    },
    {
      title: "Direction",
      dataIndex: "from_address",
      key: "direction",
      render: (from) =>
        from?.toLowerCase() === account?.toLowerCase() ? "Out" : "In",
    },
    {
      title: "Value",
      dataIndex: "value",
      key: "value",
      render: (value) =>
        // missing second argument in FromWei, decimals
        parseFloat(Moralis.Units.FromWei(value)).toFixed(6),
    },
    {
      title: "Hash",
      dataIndex: "hash",
      key: "hash",
      render: (hash) => (
        <a
          href={
            chainId === "0x1"
              ? `https://etherscan.io/tx/${hash}`
              : chainId === "0x38"
              ? `https://bscscan.com/tx/${hash}`
              : chainId === "0x89"
              ? `https://polygonscan.com/tx/${hash}`
              : `https://explorer.avax.network/search?query=${hash}`
          }
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
        marginBottom: "20px",
      }}
    >
      <Text level={2}>
        <i className="fa-solid fa-timeline" />
        <span> {nativeToken?.name} Transfers</span>
      </Text>
      <Skeleton loading={isLoading && nativeTransactions.length === 0}>
        <Table
          dataSource={nativeTransactions}
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

export default NativeTransactions;
