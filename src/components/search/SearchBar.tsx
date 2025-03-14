import React, { useState, useCallback } from "react";
import { Input, Button, Space } from "antd";
import { SearchOutlined, DownloadOutlined } from "@ant-design/icons";
import { debounce } from "lodash";
import "./SearchBar.css";

interface SearchBarProps {
  onSearch: (query: string) => void;
  onDownload: () => void;
}

const SearchBar: React.FC<SearchBarProps> = ({ onSearch, onDownload }) => {
  const [searchText, setSearchText] = useState("");

  // Debounced search function, triggered only when clicking "Search"
  const debouncedSearch = useCallback(
    debounce((value: string) => {
      onSearch(value);
    }, 500),
    [onSearch]
  );

  // Handle search when clicking the button
  const handleSearchClick = () => {
    if (searchText.trim().length >= 3) {
      debouncedSearch(searchText.trim());
    } else {
      onSearch(""); // Reset to default users
    }
  };

  // Handle clearing the input
  const handleClearSearch = () => {
    setSearchText("");
    onSearch(""); // Reset to default users
  };

  return (
    <div className="search-bar-container">
      <Space className="search-group">
        <Input
          placeholder="Search Employees..."
          value={searchText}
          onChange={(e) => setSearchText(e.target.value)}
          className="search-input"
          allowClear
          onPressEnter={handleSearchClick} // Search on Enter
          onClear={handleClearSearch} // Reset on Clear
        />
        <Button type="primary" icon={<SearchOutlined />} className="button-search" onClick={handleSearchClick}>
          Search
        </Button>
        <Button type="default" icon={<DownloadOutlined />} className="button-download" onClick={onDownload}>
          Download
        </Button>
      </Space>
    </div>
  );
};

export default SearchBar;
