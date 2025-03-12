import React from "react";
import { NavLink } from "react-router-dom";
import { HomeOutlined, DashboardOutlined, AppstoreOutlined, QuestionCircleOutlined, DingdingOutlined } from "@ant-design/icons";
import "./Header.css";

const Header: React.FC = () => {
  return (
    <nav className="navbar">
      <div className="logos" style={{ display: "inline-block"}}>
        <span className="logo-icon" style={{marginLeft: "20px"}}><DingdingOutlined /><h4>Employee Info</h4></span>
      </div>
      <ul className="nav-links">
        <li>
          <NavLink to="/" activeClassName="active">
            <HomeOutlined /> Home
          </NavLink>
        </li>
        <li>
          <NavLink to="/about">
            <DashboardOutlined /> About
          </NavLink>
        </li>
        <li>
          <NavLink to="/services">
            <AppstoreOutlined /> Services
          </NavLink>
        </li>
      
        <li>
          <NavLink to="/help">
            <QuestionCircleOutlined /> Help
          </NavLink>
        </li>
      </ul>
   
    </nav>
  );
};

export default Header;
