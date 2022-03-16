import React, { useState } from "react";
import { withRouter } from "react-router-dom";
import { Button, Card, Checkbox, Typography } from "antd";
import { generate_seed } from "utils/seed";
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

const Signup = () => {
  const [seed, setSeed] = useState("");

  function handleGenerateSeed() {
    setSeed(generate_seed());
  }

  return (
    <div>
      <h1 style={{ textAlign: "center", marginBottom: "12px" }}>Signup</h1>
      <div style={{ display: "flex", gap: "10px" }}></div>
      <Card
        style={styles.card}
        title={
          <>
            <div>
              <Text strong>
                Your recovey phrase (Seed) is being generated now
              </Text>
            </div>
            <Text style={{ color: "red" }} strong>
              Do not share your seed with anyone, KEEP YOUR RECOVERY PHRASE
              (SEED) SAFE!!
            </Text>
          </>
        }
      >
        <div style={{ textAlign: "center" }}>
          <div>
            <i style={{ fontSize: "30px" }} className="fa-solid fa-lock"></i>
          </div>
          <div>
            <Text strong>
              We are almost done, check the boxes below and click on Generate my
              Wallet (SEED)
            </Text>
          </div>
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              alignItems: "flex-start",
              margin: "10px",
            }}
          >
            <div>
              <Checkbox>
                I understand that all my funds are kept safely in this device,
                and not on TeiWallet servers.
              </Checkbox>
            </div>
            <div>
              <Checkbox>
                I understand that if this application was deleted, my TEI fUNDS
                can only be recovered with the (json) backup file or my seed
                phrase.
              </Checkbox>
            </div>
            <div>
              <Checkbox>
                I undestand that i will recive a Json file with my seed in it,
                with this Json file i can easy import my wallet again.
              </Checkbox>
            </div>
          </div>
          <Button
            style={{ marginBottom: "10px" }}
            type="primary"
            onClick={handleGenerateSeed}
          >
            Generate my Wallet (SEED)
          </Button>
        </div>
        <Card data-cy="seed-box">
          <p>{seed}</p>
        </Card>
      </Card>
    </div>
  );
};

export default withRouter(Signup);
