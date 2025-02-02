import UploadImage from '@/components/UploadImage';
import Dashboard from './index';
import { Table } from 'antd';
import { useEffect, useState } from 'react';

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
    title: 'Average Expire Days',
    dataIndex: 'expiresAt',
    key: 'expiresAt',
    render: (_, el, index) => {
      const diffInMs = new Date(el.expiresAt) - new Date();
      const daysLeft = Math.ceil(diffInMs / (1000 * 60 * 60 * 24));
      return daysLeft
    },
  },
];

export default function Add() {
  const [itemList, setItemList] = useState([]);
  useEffect(() => {
    if (itemList) console.log('itemList 2: ', itemList);
  }, [setItemList]);
  return (
    <Dashboard>
      <h1 style={{ marginLeft: '37px', fontSize: '24px' }}>
        Add your Items Here
      </h1>
      <div>
        <UploadImage setItemList={setItemList} />
        {itemList && (
          <Table
            columns={columns}
            dataSource={itemList}
            bordered
            pagination={false}
            rowClassName="table-row-hover"
            style={{
              borderRadius: '8px',
              boxShadow: '0 2px 8px rgba(0, 0, 0, 0.1)',
            }}
          />
        )}
      </div>
    </Dashboard>
  );
}
