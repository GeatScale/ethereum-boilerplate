import { useLocation } from "react-router";
import { Menu } from "antd";
import { NavLink } from "react-router-dom";

function MenuItems() {
  const { pathname } = useLocation();

  return (
    <Menu
      theme="light"
      mode="horizontal"
      style={{
        display: "flex",
        fontSize: "17px",
        fontWeight: "500",
        width: "100%",
        justifyContent: "center",
      }}
      defaultSelectedKeys={[pathname]}
    >
      <Menu.Item key="/wallet">
        <NavLink to="/wallet">
          <i className="fa-solid fa-wallet" /> Wallet
        </NavLink>
      </Menu.Item>
      <Menu.Item key="/1inch">
        <NavLink to="/1inch">
          <i className="fa-solid fa-shuffle" /> Swap Crowdfunding
        </NavLink>
      </Menu.Item>
      <Menu.Item key="/erc20balance">
        <NavLink to="/erc20balance">
          <i className="fa-solid fa-coins" /> Balances
        </NavLink>
      </Menu.Item>
      <Menu.Item key="/erc20transfers">
        <NavLink to="/erc20transfers">
          <i className="fa-solid fa-timeline" /> Activity
        </NavLink>
      </Menu.Item>
      <Menu.Item key="/backup">
        <NavLink to="/backup">
          <i className="fa-solid fa-clock-rotate-left" /> Backup
        </NavLink>
      </Menu.Item>
    </Menu>
  );
}

export default MenuItems;
