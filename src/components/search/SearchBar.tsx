import React, { useState, useEffect, useCallback, useMemo } from "react";
import { Input, Table, Button, Alert, Card, Avatar, Tour, Drawer } from "antd";
import debounce from "lodash.debounce";
import {
  SearchOutlined, DownloadOutlined, QuestionCircleOutlined, OrderedListOutlined,
  CheckCircleOutlined
} from "@ant-design/icons";
import * as XLSX from "xlsx";
import { LABELS } from "../../constants/constants";
import "./SearchBar.css";

const SearchBar: React.FC = () => {
  const [searchText, setSearchText] = useState("");
  const [results, setResults] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [openTour, setOpenTour] = useState(false);
  const [drawerVisible, setDrawerVisible] = useState(false);

  // Fetch Data
  const fetchResults = useCallback(async (query: any) => {
    if (query.length < 3) {
      setResults([]);
      setError("");
      return;
    }
    setLoading(true);
    setError("");
    try {
      const response = await fetch(`${import.meta.env.VITE_API_URL}?q=${query}`);
      const data = await response.json();
      setResults(data.slice(0, 20));
    } catch (err) {
      setError(LABELS.ERROR.FETCH_FAILED);
    }
    setLoading(false);
  }, []);

  const debouncedFetchResults = useMemo(() => debounce(fetchResults, 300), [fetchResults]);

  useEffect(() => {
    if (searchText.length < 3) return;
    debouncedFetchResults(searchText);
    return () => debouncedFetchResults.cancel();
  }, [searchText, debouncedFetchResults]);

  // Download Function
  const handleDownload = () => {
    if (results.length === 0) {
      alert("No data available to download!");
      return;
    }
    const ws = XLSX.utils.json_to_sheet(results);
    const wb = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, "SearchResults");
    XLSX.writeFile(wb, "search_results.xlsx");
  };

  return (
    <div className="search-page-container">
      {/* Navbar */}
      <nav className="bg-blue-600 text-white p-4 nav-align">
        <h4 className="text-xl font-bold">{LABELS.PAGE_TITLE}</h4>
        <div className="button-align">
          <Button icon={<OrderedListOutlined />} onClick={() => setDrawerVisible(true)} className="nav-align-button">Steps & Tests</Button>
          <Button type="default" icon={<QuestionCircleOutlined />} onClick={() => setOpenTour(true)}>
            Help
          </Button>
        </div>
      </nav>

      {/* Search Box */}
      <div className="container-fluid">
        <div className="flex items-center space-x-2 search-tab">
          <Input
            placeholder={LABELS.SEARCH.PLACEHOLDER}
            value={searchText}
            onChange={(e) => setSearchText(e.target.value)}
            onPressEnter={() => fetchResults(searchText)}
            className="w-25"
          />
          <div className="nav-align-button-search">
            <Button type="primary" icon={<SearchOutlined />} onClick={() => fetchResults(searchText)} disabled={searchText.length < 3} loading={loading} className="search-button">
              {LABELS.SEARCH.BUTTON}
            </Button>
            <Button type="primary" icon={<DownloadOutlined />} onClick={handleDownload} className="search-button">
              {LABELS.SEARCH.DOWNLOAD}
            </Button>
          </div>  
        </div>
      </div>

      {/* Search Results */}
      <div className="container table-align">
        {error && <Alert message={error} type="error" showIcon />}
        <Table
          columns={[
            { title: "ID", dataIndex: "id", key: "id", align: "center" },
            { title: "Name", dataIndex: "name", key: "name" },
            {
              title: "Email",
              dataIndex: "email",
              key: "email",
              render: (text) => <a href={`mailto:${text}`}>{text}</a>,
            },
          ]}
          dataSource={results}
          rowKey="id"
          loading={loading}
          pagination={{ pageSize: 10 }}
          expandable={{
            expandedRowRender: (record) => (
              <p className="p-4 bg-gray-50">Post ID: {record.postId} <br /> Body: {record.body}</p>
            ),
          }}
        />
      </div>

      {/* Drawer for Implementation Details */}
      <Drawer title={LABELS.DRAWER.TITLE} placement="right" onClose={() => setDrawerVisible(false)} open={drawerVisible}>
        <h6>{LABELS.DRAWER.SECTIONS.TEST_SCENARIOS}</h6>
        <ul className="drawer-list-item">
          {LABELS.DRAWER.TEST_SCENARIOS.map((scenario, index) => (
            <li key={index}>✅ {scenario.text}</li>
          ))}
        </ul>
        <h6 className="mt-4">{LABELS.DRAWER.SECTIONS.TECH_COMPONENTS}</h6>
        <ul className="drawer-list-item">
          {LABELS.DRAWER.TECH_COMPONENTS.map((comp, index) => (
            <li key={index}>✔ {comp}</li>
          ))}
        </ul>
      </Drawer>

      {/* Footer */}
      <footer className="bg-blue-600 text-white text-center p-4 mt-6">
        <p>{LABELS.FOOTER}</p>
      </footer>

      {/* Tour Guide */}
      <Tour open={openTour} onClose={() => setOpenTour(false)} steps={LABELS.TOUR_STEPS} />
    </div>
  );
};

export default SearchBar;
