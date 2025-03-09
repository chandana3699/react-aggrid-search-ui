import React, { useState, useEffect, useCallback, useMemo } from "react";
import { Input, Table, Typography, Button, Alert } from "antd";
import debounce from "lodash.debounce";
import "antd/dist/reset.css";
import { LABELS } from "../../constants/constants";
import { Comment } from "../../models/comments"
import "./SearchBar.css";

const { Title } = Typography;
//Env Access for Endpoint
const COMMENTS_API_URL = import.meta.env.VITE_API_URL;

// API call for fetching data
const fetchComments = async (query: string): Promise<Comment[]> => {
  try {
     //ToDo: Perform User Input Validations
    const response = await fetch(`${COMMENTS_API_URL}?q=${query}`);
    if (!response.ok) throw new Error("Failed to fetch results");
    return await response.json();
  } catch (CommentsApiError) {
    console.error(`Error fetching data: ${CommentsApiError}`);
    return [];
  }
};

// Table columns 
const columns = [
  { title: "ID", dataIndex: "id", key: "id", width: 80, align: "center" },
  { title: "Post ID", dataIndex: "postId", key: "postId", width: 100, align: "center" },
  { title: "Name", dataIndex: "name", key: "name", width: 200, sorter: (a: Comment, b: Comment) => a.name.localeCompare(b.name) },
  { title: "Email", dataIndex: "email", key: "email", width: 250, sorter: (a: Comment, b: Comment) => a.email.localeCompare(b.email) },
  { title: "Body", dataIndex: "body", key: "body", width: 300, render: (text: string) => (text.length > 64 ? `${text.substring(0, 64)}...` : text) },
];

const SearchPage: React.FC = () => {
  //UseState for State Management
  const [searchText, setSearchText] = useState<string>("");
  const [results, setResults] = useState<Comment[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string>("");

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
      setResults(data.slice(0, 20));
    } 
    catch (err) {
      setError(LABELS.ERROR_MESSAGE);
    }
    setLoading(false);
  }, []);

  const debouncedFetchResults = useMemo(() => debounce(fetchResults, 300), [fetchResults]);

  useEffect(() => {
    if (searchText.length < 3) return;
    debouncedFetchResults(searchText);
    return () => debouncedFetchResults.cancel();
  }, [searchText, debouncedFetchResults]);

  return (
    <div className="search-container">
      <div className="header-container">
        <Title level={2} className="title-align">{LABELS.PAGE_TITLE}</Title>
        <div>
          <Input
            placeholder={LABELS.SEARCH_PLACEHOLDER}
            value={searchText}
            className="input-align"
            onChange={(e) => setSearchText(e.target.value)}
            onPressEnter={() => fetchResults(searchText)}
          />
          <Button type="primary" onClick={() => fetchResults(searchText)} disabled={searchText.length < 3} loading={loading}>
            {LABELS.SEARCH_BUTTON}
          </Button>
        </div>
      </div>

      {error && <Alert message={error} type="error" showIcon className="alert-align" />}

      <Table
        columns={columns}
        dataSource={results}
        rowKey="id"
        loading={loading}
        pagination={{ pageSize: 10, showSizeChanger: false }}
        bordered
        className="table-container"
      />
    </div>
  );
};

export default SearchPage;
