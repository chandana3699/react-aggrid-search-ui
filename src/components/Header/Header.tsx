import React from "react";
import { NavLink } from "react-router-dom";
import { HomeOutlined, DashboardOutlined, AppstoreOutlined, UserOutlined, QuestionCircleFilled, QuestionCircleOutlined } from "@ant-design/icons";
import "./Header.css";

const Header: React.FC = () => {
  return (
    <nav className="navbar">
      <div className="logo">
        <span className="logo-icon">🅱</span>
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
