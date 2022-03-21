import { Button, Card, Typography } from "antd";
import Address from "components/Address/Address";

const { Text } = Typography;

export default function Contract() {
  return (
    <div
      style={{
        margin: "auto",
        display: "flex",
        gap: "20px",
        marginTop: "25",
        width: "50vw",
        boxShadow: "0 0 1.2rem rgb(8 96 242 / 15%)",
        borderRadius: "1rem",
      }}
    >
      <Card
        title={
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
            }}
          >
            Export your SEED:
            <Address avatar="left" copyable size={8} />
          </div>
        }
        size="large"
        style={{
          width: "100%",
          boxShadow: "0 0.5rem 1.2rem rgb(189 197 209 / 20%)",
          border: "1px solid #e7eaf3",
          borderRadius: "0.5rem",
        }}
      >
        <center>
          <Text strong>Your 12 word phrase.</Text>
          <Card style={{ marginBottom: "20px" }}>
            <Text delete>
              loyal chief tense rough victory unit marriage mean fresh wasp
              mirror you
            </Text>
          </Card>
          <Text strong>Your wallet private key.</Text>
          <Card style={{ marginBottom: "20px" }}>
            <Text>
              0xba95d5688aa1e4269ed758db5fc9bcd4f3497e5623fc0e8129408d63c6b63ed0
            </Text>
          </Card>
          <Text strong style={{ color: "red", fontSize: "15px" }}>
            Remember not to share your security phrase with anyone.
          </Text>
        </center>
        <center>
          <Button type="primary">Copy phrase</Button>
          <Button type="primary" style={{ marginLeft: "5px" }}>
            Export encrypted file
          </Button>
        </center>
      </Card>
    </div>
  );
}
