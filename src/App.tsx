import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Header from "./components/Header/Header";
import SearchPage from "./Pages/SearchPage/SearchPage";
import Footer from "./components/Footer/Footer";
import "./App.css";
import "./index.css";

const App: React.FC = () => {
  return (
    <div className="banner-img1">
      <Router>
        <Header />
        <Routes>
          <Route path="/" element={<SearchPage />} />
          <Route path="/about" element={<SearchPage />} />
          <Route path="/services" element={<SearchPage />} />
          <Route path="/help" element={<SearchPage />} />
        </Routes>
        <Footer />
      </Router>
    </div>
  );
};

export default App;
