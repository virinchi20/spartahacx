// import React from 'react';
import Dashboard from './index';
import { Table } from 'antd';

// // Define mock data for the table
const data = [
  { key: '1', name: 'Item 1', expirationDate: '2025-02-15' },
  { key: '2', name: 'Item 2', expirationDate: '2025-03-01' },
  { key: '3', name: 'Item 3', expirationDate: '2025-04-10' },
  { key: '4', name: 'Item 4', expirationDate: '2025-02-05' },
  { key: '5', name: 'Item 5', expirationDate: '2025-05-20' },
];

// // Define columns for the table
const columns = [
  {
    title: 'Index',
    dataIndex: 'index',
    key: 'index',
    render: (_, record, index) => index + 1, // Displaying index number (1-based)
  },
  {
    title: 'Item Name',
    dataIndex: 'name',
    key: 'name',
  },
  {
    title: 'Days Left to Expire',
    dataIndex: 'expirationDate',
    key: 'expirationDate',
  },
];

export default function List() {
  return (
    <Dashboard>
        <h1>Listing Items from my Fridge</h1>
        <div style={{ padding: '20px', marginTop: '10px' }}>
          <Table
            columns={columns}
            dataSource={data}
            bordered
            pagination={false}
            rowClassName="table-row-hover"
            style={{
              borderRadius: '8px',
              boxShadow: '0 2px 8px rgba(0, 0, 0, 0.1)',
            }}
          />
        </div>
    </Dashboard>
  );
}
