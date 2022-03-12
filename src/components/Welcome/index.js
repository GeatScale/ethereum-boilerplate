import React from "react";
import { Card, Typography, Button } from "antd";
import { withRouter } from "react-router-dom";
const { Text } = Typography;

const styles = {
  title: {
    fontSize: "20px",
    fontWeight: "700",
  },
  text: {
    fontSize: "16px",
  },
  card: {
    boxShadow: "0 0.5rem 1.2rem rgb(189 197 209 / 20%)",
    border: "1px solid #e7eaf3",
    marginBottom: "30px",
    borderRadius: "0.5rem",
  },
};

const Welcome = ({ history }) => {
  return (
    <div>
      <h1 style={{ textAlign: "center", marginBottom: "12px" }}>
        New to TeiWallet?
      </h1>
      <div style={{ display: "flex", gap: "10px" }}></div>
      <Card
        style={styles.card}
        title={
          <>
            <i className="fa-solid fa-user-plus"></i>{" "}
            <Text strong> Yes, let's get set up</Text>
          </>
        }
      >
        <div style={{ textAlign: "center" }}>
          <div>
            <Text strong>Create new wallet</Text>
          </div>
          <div>
            <Text>Privacy in sending, receiving and storing values</Text>
          </div>
          <div style={{ marginBottom: "15px" }}>
            <Text>
              The wallet has been fully developed in our own blockchain Possible
              to send, receive and store cryptoassets safely
            </Text>
          </div>
          <Button type="primary" onClick={() => history.push(`/signup`)}>
            Create
          </Button>
        </div>
      </Card>
      <div>
        <Card
          style={styles.card}
          title={
            <>
              <i className="fa-solid fa-unlock-keyhole"></i>{" "}
              <Text strong> No, i already have a seed phrase</Text>
            </>
          }
        >
          <div style={{ textAlign: "center" }}>
            <div style={{ marginBottom: "15px" }}>
              <Text strong>Restore by</Text>
            </div>
            <Button style={{ marginRight: "10px" }} type="primary">
              Seed
            </Button>
            <Button type="primary">Json file</Button>
          </div>
        </Card>
      </div>
    </div>
  );
};
export default withRouter(Welcome);
