import React, { useState } from "react";
import { useHistory } from "react-router-dom";
import { Button, Card, Form, Input, Typography, Modal } from "antd";
import { useAuthState } from "store/auth/state";
import { MIN_PASSWORD_LENGTH } from "constants/wallet";
import { decryptWallet } from "helpers/wallet";
const { Title, Text } = Typography;

const styles = {
  card: {
    boxShadow: "0 0.5rem 1.2rem rgb(189 197 209 / 20%)",
    border: "1px solid #e7eaf3",
    marginBottom: "30px",
    borderRadius: "0.5rem",
  },
};

const Login = () => {
  const [isLoading, setLoading] = useState(false);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [form, setForm] = useState({
    password: "",
    error: "",
  });

  const { setIsAuthenticated, keyStore, clearAuthData } = useAuthState();
  const history = useHistory();

  function changeForm(field, newValue) {
    setForm((current) => {
      return {
        ...current,
        [field]: newValue,
      };
    });
  }

  async function handleLogin() {
    if (!keyStore) {
      changeForm("error", "Unable to load the key store of the wallet.");
      return;
    }

    setLoading(true);
    changeForm("error", "");

    try {
      console.log({ keyStore });
      const wallet = await decryptWallet(keyStore, form.password);
      if (wallet?.address) {
        setIsAuthenticated(true);
        history.push("/wallet");
        return;
      }
    } catch (err) {
      console.log({ err });
      changeForm("error", "Invalid password.");
    }

    setLoading(false);
  }

  function handleCreateNewWallet() {
    clearAuthData();
    history.push("/welcome");
  }

  const invalidPassword = form.password.length < MIN_PASSWORD_LENGTH;
  const blockConfirm = isLoading || invalidPassword;

  return (
    <div>
      <Title style={{ textAlign: "center", marginBottom: "12px" }} level={3}>
        Login
      </Title>
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
          <Button type="primary" disabled={blockConfirm} onClick={handleLogin}>
            {`Login${isLoading ? "..." : ""}`}
          </Button>
          <br />
          {form.error && <Text type="danger">{form.error}</Text>}
          <a onClick={() => setIsModalVisible(true)}>Create a new wallet?</a>
        </Form>
      </Card>
      <Modal
        visible={isModalVisible}
        footer={null}
        onCancel={() => setIsModalVisible(false)}
        bodyStyle={{
          padding: "15px",
          fontWeight: "500",
        }}
      >
        <center>
          <Title level={4}>You are sure you want to create a new wallet?</Title>
          <Text level={4}>
            This will reset all the local storaged date of the current wallet.
            <br />
            Check if your seed phrase is safe before continuing.
          </Text>
          <div
            style={{
              paddingTop: "15px",
              display: "flex",
              gap: "10px",
              justifyContent: "center",
            }}
          >
            <Button onClick={() => setIsModalVisible(false)}>Cancel</Button>
            <Button type="primary" onClick={handleCreateNewWallet}>
              Confirm
            </Button>
          </div>
        </center>
      </Modal>
    </div>
  );
};

export default Login;
