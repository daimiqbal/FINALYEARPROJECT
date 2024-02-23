
import React, { useState, useEffect, useContext } from "react";
import { Menu, Button, Layout } from "antd";
import { useRouter } from "next/router";
import { toast } from "react-toastify";
import axios from "axios";
import { Context } from "../context";

const { Header } = Layout;
const { Item, SubMenu } = Menu;

const TopNav = () => {
  const [current, setCurrent] = useState("");
  const [collapsed, setCollapsed] = useState(false);

  const { state, dispatch } = useContext(Context);
  const { user } = state;

  const router = useRouter();

  useEffect(() => {
    setCurrent(window.location.pathname);
  }, [process.browser && window.location.pathname]);

  const handleMenuCollapse = () => {
    setCollapsed(!collapsed);
  };

  const logout = async () => {
    dispatch({ type: "LOGOUT" });
    window.localStorage.removeItem("user");
    const { data } = await axios.get("/api/logout");
    toast(data.message);
    router.push("/login");
  };
  const login = async ()=>{
    router.push("/login");
  }
  return (
    <Header>
      <Menu
        mode="horizontal"
        theme="light dark"
        selectedKeys={[current]}
        className={`Header ${collapsed ? "collapsed" : ""}`}
      >
        <Item key="/">
          <a href="/" className="logo-link">
            <img
              src="/images/web-logo.png"
              alt="Logo"
              className="logo-image"
              style={{ width: "80px", height: "auto" }}
            />
            <span>Travel Ease</span>
          </a>
        </Item>
  
        <Menu
          mode="horizontal"
          theme="light dark"
          selectedKeys={[current]}
          className={`Header ${collapsed ? "collapsed" : ""}`}
          style={{ display: "flex", justifyContent: "flex-end" }}
        >
          {user && (
            <SubMenu key="packages" title="Packages">
              {!user.role.includes("Agency") && (
                <Item key="/offeredpackages">
                  <a
                    href="http://localhost:3001/offeredpackages"
                    className="weight"
                  >
                    Offered Packages
                  </a>
                </Item>
              )}
              {!user.role.includes("Agency") && (
                <Item key="/comparepackages">
                  <a
                    href="http://localhost:3001/comparepackages"
                    className="weight"
                  >
                    Compare Packages
                  </a>
                </Item>
              )}
              {!user.role.includes("Agency") && (
                <Item key="/customizepackages">
                  <a
                    href="http://localhost:3001/customizepackages"
                    className="weight"
                  >
                    Add Customize Packages
                  </a>
                </Item>
              )}
              {user.role.includes("Agency") ? (
                <Item key="/createnewpackage">
                  <a
                    href="http://localhost:3001/createnewpackage"
                    className="weight"
                  >
                    Create Tour package
                  </a>
                </Item>
              ) : (
                <Item key="/user/register">
                  <a
                    href="http://localhost:3001/user/register"
                    className="weight"
                  >
                    Enlist Agency
                  </a>
                </Item>
              )}
            </SubMenu>
          )}
          {user && user.role && user.role.includes("Agency") && (
            <Item key="/instructor">
              <a href="/instructor" className="weight">
                Agency
              </a>
            </Item>
          )}
  
          {user && user.role && !user.role.includes("Agency") && (
            <Item key="/user">
              <a href="/user" className="weight">
                Dashboard
              </a>
            </Item>
          )}
  
          {user === null && 
          <Item key="/login" onClick={login}>Login</Item>}
          {user !== null && (
            <Item key="/logout" onClick={logout}>
              Logout
            </Item>
          )}
        </Menu>
      </Menu>
    </Header>
  );
  
};

export default TopNav;
