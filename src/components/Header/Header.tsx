import React from "react";
import { NavLink } from "react-router-dom";
import { HomeOutlined, DashboardOutlined, AppstoreOutlined, QuestionCircleOutlined, DingdingOutlined } from "@ant-design/icons";
import "./Header.css";

const Header: React.FC = () => {
  return (
    <nav className="navbar">
      <div className="logos" style={{ display: "inline-block"}}>
        <span className="logo-icon" style={{marginLeft: "20px"}}><DingdingOutlined /><h4>EMPLOYEE INFO</h4></span>
      </div>
      <ul className="nav-links">
        <li>
          <NavLink to="/" activeClassName="active">
            <HomeOutlined /> HOME
          </NavLink>
        </li>
        <li>
          <NavLink to="/about">
            <DashboardOutlined /> ABOUT
          </NavLink>
        </li>
        <li>
          <NavLink to="/services">
            <AppstoreOutlined /> SERVICES
          </NavLink>
        </li>
      
        <li>
          <NavLink to="/help">
            <QuestionCircleOutlined /> HELP
          </NavLink>
        </li>
      </ul>
   
    </nav>
  );
};

export default Header;
