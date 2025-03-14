import React, { useState, useEffect } from "react";
import { notification } from "antd";
import SearchBar from "../../components/Search/SearchBar";
import UserTable from "../../components/Table/Table";
import { fetchUsers, fetchUsersFilter } from "../../Services/Api";
import { User } from "../../models/userModel";
import * as XLSX from "xlsx";
import "./SearchPage.css";

const SearchPage: React.FC = () => {
  const [users, setUsers] = useState<User[]>([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    loadDefaultUsers(); // Load default 20 users initially
  }, []);

  const loadDefaultUsers = async () => {
    setLoading(true);
    const result = await fetchUsers("");
    setUsers(result.slice(0, 20)); // Always show 20 items
    setLoading(false);
  };

  const handleSearch = async (query: string) => {
    setLoading(true);
    const trimmedQuery = query.trim();

    if (trimmedQuery.length < 3) {
      await loadDefaultUsers();
    } else {
      const result = await fetchUsersFilter(trimmedQuery);
      setUsers(result);
    }
    setLoading(false);
  };

  const handleDownload = () => {
    if (users.length === 0) {
      notification.warning({
        message: "Download Failed",
        description: "No data available to download.",
        placement: "topRight",
      });
      return;
    }

    const ws = XLSX.utils.json_to_sheet(users);
    const wb = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, "Users");
    XLSX.writeFile(wb, "users.xlsx");

    notification.success({
      message: "Download Successful",
      description: "Users data has been downloaded.",
      placement: "topRight",
    });
  };

  return (
    <div className="search-page-container">
      <SearchBar onSearch={handleSearch} onDownload={handleDownload} />
      <UserTable data={users} loading={loading} />
    </div>
  );
};

export default SearchPage;
