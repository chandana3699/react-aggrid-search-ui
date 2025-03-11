import React from "react";

const Footer: React.FC = () => {
  return (
    <footer className="bg-blue-600 text-whites text-center p-4 mt-6">
      <p>&copy; {new Date().getFullYear()} Employee Search System | Designed for Productivity</p>
    </footer>
  );
};

export default Footer;
