import { useMoralis } from "react-moralis";
import Transfer from "./components/Transfer";
import NativeBalance from "../NativeBalance";
import Address from "../Address/Address";
import QRCode from "qrcode.react";
import Blockie from "../Blockie";
import { Card } from "antd";

const styles = {
  title: {
    fontSize: "30px",
    fontWeight: "600",
  },
  header: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    gap: "5px",
  },
  card: {
    boxShadow: "0 0 1.2rem rgb(8 96 242 / 20%)",
    borderRadius: "1rem",
    width: "450px",
    fontSize: "16px",
    fontWeight: "500",
  },
};

function Wallet() {
  const { account } = useMoralis();

  return (
    account && (
      <Card
        style={styles.card}
        title={
          <div style={styles.header}>
            <center>
              <Blockie scale={5} avatar currentWallet style />
              <center>
                <QRCode style={{ width: 100, height: 100 }} value={account} />
              </center>
              <Address size="6" copyable address={account} />
              <NativeBalance />
            </center>
          </div>
        }
      >
        <Transfer />
      </Card>
    )
  );
}

export default Wallet;
