import React from "react";
import { Table, Card } from "antd";
import { User } from "../../models/userModel";

interface TableProps {
  data: User[];
  loading: boolean;
}

const UserTable: React.FC<TableProps> = ({ data, loading }) => {
  const columns = [
    { title: "ID", dataIndex: "id", key: "id" },
    { title: "Name", dataIndex: "name", key: "name" },
    {
      title: "Email",
      dataIndex: "email",
      key: "email",
      render: (text: string) => <a href={`mailto:${text}`}>{text}</a>,
    },
  ];

  return (
    <Card className="table-container container">
      <Table
        columns={columns}
        dataSource={data}
        rowKey="id"
        loading={loading}
        expandable={{
          expandedRowRender: (record) => (
            <p style={{ margin: 0 }}>
              
           {record.body}
            </p>
          ),
        }}
      />
    </Card>
  );
};

export default UserTable;
