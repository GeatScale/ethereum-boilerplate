import { Button, Card, Checkbox, Form, Typography } from "antd";
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

export default function Slide() {
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
              We are almost done, check the boxes below and click on Get seed
            </Text>
          </div>
          <div
            style={{
              display: "grid",
              alignContent: "center",
              textAlign: "left",
              marginTop: "10px",
              marginBottom: "30px",
            }}
          >
            <Form required>
              <Checkbox>
                I understand that all my funds are kept safely in this device,
                and not on TeiWallet servers.
              </Checkbox>
            </Form>
            <Form required>
              <Checkbox>
                I understand that if this application was deleted, my TEI fUNDS
                can only be recovered with the (json) backup file or my seed
                phrase.
              </Checkbox>
            </Form>
            <Form required>
              <Checkbox>
                I undestand that i will recive a Json file with my seed in it,
                with this Json file i can easy import my wallet again.
              </Checkbox>
            </Form>
          </div>
          <Button type="primary">See my seed </Button>
        </div>
      </Card>
    </div>
  );
}
