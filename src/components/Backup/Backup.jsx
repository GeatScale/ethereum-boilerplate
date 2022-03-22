import { useState } from "react";
import { Button, Card, Form, Input, Modal, Typography } from "antd";
import Address from "components/Address/Address";
import { useAuthState } from "store/auth/state";
import { decryptWallet } from "helpers/wallet";
import { MIN_PASSWORD_LENGTH } from "constants/wallet";
import fileDownload from "js-file-download";

const { Text } = Typography;

const styles = {
  card: {
    boxShadow: "0 0.5rem 1.2rem rgb(189 197 209 / 20%)",
    border: "1px solid #e7eaf3",
    marginBottom: "30px",
    borderRadius: "0.5rem",
  },
};

export default function Backup() {
  const [isLoading, setLoading] = useState(false);
  const [modalOpen, setModalOpen] = useState(false);
  const [form, setForm] = useState({
    displaySeed:
      "xxxxx xxxxx xxxxx xxxxx xxxxx xxxxx xxxxx xxxxx xxxxx xxxxx xxxxx xxxxx",
    privateKey:
      "0xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx",
    password: "",
    error: "",
  });

  const { keyStore } = useAuthState();

  function changeForm(field, newValue) {
    setForm((current) => {
      return {
        ...current,
        [field]: newValue,
      };
    });
  }

  async function handleRevealSeed() {
    if (!keyStore) {
      changeForm("error", "Unable to load the key store of the wallet.");
      return;
    }

    setLoading(true);
    changeForm("error", "");

    try {
      const wallet = await decryptWallet(keyStore, form.password);
      changeForm("displaySeed", wallet.mnemonic.phrase);
      changeForm("privateKey", wallet.privateKey);
      setModalOpen(false);
    } catch (err) {
      console.log({ err });
      changeForm("error", "Invalid password.");
    }

    setLoading(false);
  }

  function handleExportJson() {
    fileDownload(keyStore, "Wallet-KeyStore.json");
  }

  const invalidPassword = form.password.length < MIN_PASSWORD_LENGTH;
  const blockConfirm = isLoading || invalidPassword;

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
          <Text strong style={{ color: "red", fontSize: "15px" }}>
            Remember not to share your security phrase with anyone.
          </Text>
        </center>
        <center>
          <Text strong>Your 12 word phrase.</Text>
          <Card style={{ marginBottom: "20px" }}>
            <Text>{form.displaySeed}</Text>
          </Card>
        </center>
        <center>
          <Text strong>Your Private Key</Text>
          <Card style={{ marginBottom: "20px" }}>
            <Text>{form.privateKey}</Text>
          </Card>
        </center>
        <div
          style={{
            display: "flex",
            justifyContent: "center",
          }}
        >
          <Button
            onClick={() => setModalOpen(true)}
            type="primary"
            style={{ margin: "2px" }}
          >
            Reveal Seed
          </Button>
          <Button
            onClick={handleExportJson}
            type="primary"
            style={{ margin: "2px" }}
          >
            Export encrypted file
          </Button>
        </div>
      </Card>
      <Modal
        visible={modalOpen}
        footer={null}
        onCancel={() => setModalOpen(false)}
        bodyStyle={{
          padding: "15px",
          fontWeight: "500",
        }}
      >
        <Card style={styles.card}>
          <Form
            style={{
              display: "flex",
              flexDirection: "column",
              gap: "15px",
              paddingTop: "15px",
            }}
          >
            <Input
              value={form.password}
              type="password"
              placeholder="Password"
              onChange={(e) => changeForm("password", e.target.value)}
            />
            <Button
              type="primary"
              disabled={blockConfirm}
              onClick={handleRevealSeed}
            >
              {`Login${isLoading ? "..." : ""}`}
            </Button>
            <br />
            {form.error && <Text type="danger">{form.error}</Text>}
          </Form>
        </Card>
      </Modal>
    </div>
  );
}
