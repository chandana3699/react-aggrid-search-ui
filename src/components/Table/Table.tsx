import React from "react";
import { Table, Card } from "antd";
import { User } from "../../models/userModel";

interface TableProps {
  data: User[];
  loading: boolean;
}

const UserTable: React.FC<TableProps> = ({ data, loading }) => {
  const columns = [
    { title: "ID", dataIndex: "id", key: "id", width: 80 },
    { title: "Name", dataIndex: "name", key: "name", width: 200 },
    {
      title: "Email",
      dataIndex: "email",
      key: "email",
      width: 250,
      render: (text: string) => <a href={`mailto:${text}`}>{text}</a>,
    },
  ];

  return (
    <Card className="table-container">
      <Table
        columns={columns}
        dataSource={data}
        rowKey="id"
        loading={loading}
        size="middle"
        bordered
        // scroll={{ y: 500 }} // Locks height to avoid resizing
        pagination={{ pageSize: 10 }} // Ensures uniform row count per page
        locale={{ emptyText: "No Data Available" }} // Show proper empty message
        expandable={{
          expandedRowRender: (record) => (
            <p style={{ margin: 0 }}>{record.body || "No additional details available."}</p>
          ),
          rowExpandable: (record) => !!record.body, // Expand only if 'body' exists
        }}
      />
    </Card>
  );
};

export default UserTable;
