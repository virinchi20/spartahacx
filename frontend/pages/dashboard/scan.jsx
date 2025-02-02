import UploadImageForCheck from '@/components/UploadImageForCheck';
import Dashboard from './index';
import { Table } from 'antd';
import { useEffect, useState } from 'react';
import toast from 'react-hot-toast';

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
      return daysLeft;
    },
  },
];

export default function Scan() {
  const [safetyCheck, setSafetyCheck] = useState('');
  useEffect(() => {
    if (safetyCheck === 'Safe to Eat') {
      toast.success(safetyCheck);
    }
    if (safetyCheck === 'Throw it Right Away') {
      toast.error(safetyCheck);
    }
  }, [setSafetyCheck, safetyCheck]);
  return (
    <Dashboard>
      <h1 style={{ marginLeft: '37px', fontSize: '24px' }}>
        Scan your Items Here
      </h1>
      <UploadImageForCheck setSafetyCheck={setSafetyCheck} />
    </Dashboard>
  );
}
