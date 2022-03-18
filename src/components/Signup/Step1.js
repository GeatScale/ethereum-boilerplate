import React from "react";
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

const Step1 = ({ changeCheckBox, form, goNextStep, changeForm }) => {
  function cantGenerateSeed() {
    return !form.checkbox1 || !form.checkbox2 || !form.checkbox3;
  }

  function handleGenerateSeed() {
    if (cantGenerateSeed()) return;
    changeForm("seed", generate_seed());
  }

  const dontHaveSeed = form.seed === "";

  return (
    <div>
      <Card
        style={styles.card}
        title={
          <>
            <div>
              <Text strong>Your recovey phrase is being generated now</Text>
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
              Wallet.
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
              <Checkbox
                onChange={(e) => changeCheckBox("checkbox1", e)}
                checked={form.checkbox1}
              >
                I understand that all my funds are kept safely in this device,
                and not on TeiWallet servers.
              </Checkbox>
            </div>
            <div>
              <Checkbox
                onChange={(e) => changeCheckBox("checkbox2", e)}
                checked={form.checkbox2}
              >
                I understand that if this application was deleted, my TEI FUNDS
                can only be recovered with the (json) backup file or my seed
                phrase.
              </Checkbox>
            </div>
            <div>
              <Checkbox
                onChange={(e) => changeCheckBox("checkbox3", e)}
                checked={form.checkbox3}
              >
                I undestand that i will recive a Json file with my seed in it,
                with this Json file i can easy import my wallet again.
              </Checkbox>
            </div>
          </div>
          {dontHaveSeed && (
            <Button
              style={{ marginBottom: "10px" }}
              type="primary"
              onClick={handleGenerateSeed}
              disabled={cantGenerateSeed()}
            >
              Generate my Wallet (SEED)
            </Button>
          )}
        </div>
        {!dontHaveSeed && (
          <center style={{ marginTop: "20px" }}>
            <Text strong style={{ color: "red" }}>
              COPY YOUR SEED
            </Text>
            <Card style={{ fontWeight: "bold", textAlign: "center" }}>
              {form.seed}
            </Card>
            <center>
              <Button
                style={{ marginTop: "10px" }}
                type="primary"
                onClick={goNextStep}
              >
                Confirm Wallet
              </Button>
            </center>
          </center>
        )}
      </Card>
    </div>
  );
};

export default Step1;
