import React, { useState } from "react";
import { Input, Button, Space } from "antd";
import { SearchOutlined, DownloadOutlined } from "@ant-design/icons";
import { debounceSearch, throttleDownload } from "../../Slot/debounce";
import "./SearchBar.css";

const { Search } = Input;

interface SearchBarProps {
  onSearch: (query: string) => void;
  onDownload: () => void;
}

const SearchBar: React.FC<SearchBarProps> = ({ onSearch, onDownload }) => {
  const [searchText, setSearchText] = useState("");

  // Function to handle search click with debounce
  const handleSearchClick = () => {
    if (searchText.length >= 3) {
      debounceSearch(() => onSearch(searchText));
    }
  };

  return (
    <div className="search-container">
      <Search
        placeholder="Type To Search..."
        value={searchText}
        onChange={(e) => setSearchText(e.target.value)}
        onSearch={handleSearchClick}
        enterButton={<SearchOutlined />}
        className="search-input w-25"
      />
      <Space className="button-group">
        <Button
          type="default"
          icon={<DownloadOutlined />}
          className="button-download"
          onClick={() => throttleDownload(onDownload)}
        >
          Download
        </Button>
      </Space>
    </div>
  );
};

export default SearchBar;
