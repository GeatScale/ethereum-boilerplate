import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import Account from "components/Account/Account";
import Chains from "components/Chains";
import ERC20Balance from "components/ERC20Balance";
import ERC20Transfers from "components/ERC20Transfers";
import DEX from "components/DEX";
import Wallet from "components/Wallet";
import Welcome from "components/Welcome";
import Signup from "components/Signup";
import Login from "components/Login";
import { Layout, Tabs } from "antd";
import "antd/dist/antd.css";
import NativeBalance from "components/NativeBalance";
import "./style.css";
import Backup from "components/Backup/Backup";
import Text from "antd/lib/typography/Text";
import MenuItems from "./components/MenuItems";
import Logo from "./assets/Logo";
import InitController from "./InitController";
import { useAuthState } from "store/auth/state";

const { Header, Footer } = Layout;

const styles = {
  content: {
    display: "flex",
    justifyContent: "center",
    fontFamily: "Roboto, sans-serif",
    color: "#041836",
    marginTop: "130px",
    padding: "10px",
  },
  header: {
    position: "fixed",
    zIndex: 1,
    width: "100%",
    background: "#fff",
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    fontFamily: "Roboto, sans-serif",
    borderBottom: "2px solid rgba(0, 0, 0, 0.06)",
    padding: "0 10px",
    boxShadow: "0 1px 10px rgb(151 164 175 / 10%)",
  },
  headerRight: {
    display: "flex",
    gap: "20px",
    alignItems: "center",
    fontSize: "15px",
    fontWeight: "600",
  },
};
const App = () => {
  const { isAuthenticated } = useAuthState();

  return (
    <Layout style={{ height: "100vh", overflow: "auto" }}>
      <Router>
        <InitController />
        <Header style={styles.header}>
          <a href="#">
            <Logo />
          </a>
          {isAuthenticated && (
            <>
              <MenuItems />
              <div style={styles.headerRight}>
                <Chains />
                <NativeBalance />
                <Account />
              </div>
            </>
          )}
        </Header>

        <div style={styles.content}>
          <Switch>
            <Route path="/login">
              <Login />
            </Route>
            <Route path="/wallet">
              <Wallet />
            </Route>
            <Route path="/erc20balance">
              <ERC20Balance />
            </Route>
            <Route path="/erc20transfers">
              <ERC20Transfers />
            </Route>
            <Route path="/swap">
              <Tabs defaultActiveKey="1" style={{ alignItems: "center" }}>
                <Tabs.TabPane tab={<span>Ethereum</span>} key="1">
                  <DEX chain="eth" />
                </Tabs.TabPane>
              </Tabs>
            </Route>
            <Route path="/backup">
              <Backup />
            </Route>
            <Route exact path="/welcome">
              <Welcome />
            </Route>
            <Route exact path="/signup">
              <Signup />
            </Route>
            <Route exact path="/"></Route>
          </Switch>
        </div>
      </Router>
      <Footer style={{ textAlign: "center" }}>
        <Text>
          <Text>Powered by </Text>
          <a
            href="https://teiwallet.com.br/"
            target="_blank"
            rel="noopener noreferrer"
          >
            TeiWallet
          </a>
        </Text>
        <center>
          <a
            href="https://teiwallet.com.br/"
            target="_blank"
            rel="noopener noreferrer"
          >
            <Logo />
          </a>
        </center>
      </Footer>
    </Layout>
  );
};

export default App;
