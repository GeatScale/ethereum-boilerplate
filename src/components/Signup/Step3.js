import React from "react";
import { Button, Card, Form, Input, Typography } from "antd";

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

const Step3 = ({
  form,
  changeForm,
  saveKeyStore,
  minCharacters,
  isLoading,
}) => {
  const invalidPassword =
    form.password !== form.checkPassword ||
    form.password.length < minCharacters;
  const blockConfirm = isLoading || invalidPassword;

  return (
    <div>
      <Card
        style={styles.card}
        title={
          <>
            <center>
              <Text strong>Create a password</Text>
            </center>
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
              <Input
                value={form.checkPassword}
                type="password"
                placeholder="Confirm Password"
                onChange={(e) => changeForm("checkPassword", e.target.value)}
              />
              <Button
                type="primary"
                disabled={blockConfirm}
                onClick={saveKeyStore}
              >
                {`Confirm${isLoading ? "..." : ""}`}
              </Button>
            </Form>
          </>
        }
      ></Card>
    </div>
  );
};

export default Step3;
