import React, { useState, useCallback } from "react";
import { Input, Button, Space } from "antd";
import { SearchOutlined, DownloadOutlined } from "@ant-design/icons";
import { debounce } from "lodash";
import { throttleDownload } from "../../Slot/debounce";
import "./SearchBar.css";

const { Search } = Input;

interface SearchBarProps {
  onSearch: (query: string) => void;
  onDownload: () => void;
}

const SearchBar: React.FC<SearchBarProps> = ({ onSearch, onDownload }) => {
  const [searchText, setSearchText] = useState("");

  // Debounced function for search
  const debouncedSearch = useCallback(
    debounce((value: string) => {
      if (value.length >= 3) {
        onSearch(value);
      }
    }, 500),
    [onSearch] // Ensure debounce always uses latest onSearch
  );

  // Handle input change (debounced search)
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setSearchText(value);
    debouncedSearch(value); // Trigger debounced search
  };

  return (
    <div className="search-container">
      <Search
        placeholder="Type to Search..."
        value={searchText}
        onChange={handleInputChange} // Debounced search on change
        enterButton={
          <Button 
            type="primary" 
            icon={<SearchOutlined />} 
            onClick={() => onSearch(searchText)} // Immediate search on button click
          >
            Search
          </Button>
        }
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
