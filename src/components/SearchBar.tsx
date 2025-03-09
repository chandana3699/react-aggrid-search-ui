import React, { useState, useEffect, useCallback, useMemo } from "react";
import { Input, Table, Typography, Button, Alert, Row, Col } from "antd";
import debounce from "lodash.debounce";
import "antd/dist/reset.css";

const { Title } = Typography;
const API_URL = import.meta.env.VITE_API_URL;
// API call for fetching data
const fetchComments = async (query: string) => {
  try {
    // const response = await fetch(`https://jsonplaceholder.typicode.com/comments?q=${query}`);
    const response = await fetch(`${API_URL}?q=${query}`);
    if (!response.ok) throw new Error("Failed to fetch results");
    return await response.json();
  } catch (error) {
    console.error("Error fetching data:", error);
    return [];
  }
};

// Table columns with equal width
const columns = [
  {
    title: "ID",
    dataIndex: "id",
    key: "id",
    width: "10%",
    align: "center",
  },
  {
    title: "Post ID",
    dataIndex: "postId",
    key: "postId",
    width: "15%",
    align: "center",
  },
  {
    title: "Name",
    dataIndex: "name",
    key: "name",
    width: "25%",
    align: "center",
    sorter: (a: { name: string }, b: { name: string }) => a.name.localeCompare(b.name),
  },
  {
    title: "Email",
    dataIndex: "email",
    key: "email",
    width: "25%",
    align: "center",
    sorter: (a: { email: string }, b: { email: string }) => a.email.localeCompare(b.email),
  },
  {
    title: "Body",
    dataIndex: "body",
    key: "body",
    width: "25%",
    align: "center",
    render: (text: string) => (text.length > 64 ? text.substring(0, 64) + "..." : text),
  },
];

const SearchBar: React.FC = () => {
  const [searchText, setSearchText] = useState("");
  const [results, setResults] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  // Function to fetch results
  const fetchResults = useCallback(async (query: string) => {
    if (query.length < 3) {
      setResults([]);
      setError("");
      return;
    }

    setLoading(true);
    setError("");

    try {
      const data = await fetchComments(query);
      setResults(data.slice(0, 50)); // Max 50 results
    } catch (err) {
      setError("Failed to fetch results. Try again.");
    }

    setLoading(false);
  }, []);

  // Memoized debounced function
  const debouncedFetchResults = useMemo(() => debounce(fetchResults, 300), [fetchResults]);

  useEffect(() => {
    debouncedFetchResults(searchText);
    return () => debouncedFetchResults.cancel(); // Cleanup on unmount
  }, [searchText, debouncedFetchResults]);

  return (
    <div
      className="container"
      style={{
        padding: "20px",
        fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif',
      }}
    >
      {/* Header Row with Border */}
      <Row
        justify="space-between"
        align="middle"
        style={{
          marginBottom: 20,
          padding: "10px",
          border: "1px solid #d9d9d9",
          borderRadius: "8px",
          background: "#fafafa",
        }}
      >
        <Col>
          <Title level={2} style={{ margin: 0, fontSize: "20px" }}>Search Page</Title>
        </Col>
        <Col>
          <Input
            placeholder="Type To Search..."
            value={searchText}
            onChange={(e) => setSearchText(e.target.value)}
            onPressEnter={() => fetchResults(searchText)}
            style={{ width: 300, marginRight: 10 }}
          />
          <Button 
            type="primary" 
            onClick={() => fetchResults(searchText)} 
            disabled={searchText.length < 3} 
            loading={loading}
          >
            Search
          </Button>
        </Col>
      </Row>

      {/* Error Message */}
      {error && <Alert message={error} type="error" showIcon style={{ marginBottom: 20 }} />}

      {/* Table with Border but No Pagination Border */}
      <Table
        columns={columns}
        dataSource={results}
        rowKey="id"
        loading={loading}
        pagination={{ pageSize: 10, showSizeChanger: false }}
        bordered
        style={{ borderRadius: "8px", overflow: "hidden" }}
      />
    </div>
  );
};

export default SearchBar;
