import React from "react";
import "./Footer.css";

const Footer: React.FC = () => {
  return (
    <footer className="footer">
      <p className="copyright">&copy; {new Date().getFullYear()} Employee Search System | Designed for Productivity</p>
    </footer>
  );
};

export default Footer;
