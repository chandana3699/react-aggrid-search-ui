import React from "react";
import SearchBar from "./components/search/SearchBar"; {/* Import Search Page */}

const App: React.FC = () => {
  return (
    <div className="container mt-4">
      <SearchBar/> {/* Rendering Search Page */}
    </div>
  );
};

export default App;
