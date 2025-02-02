import React, { useState } from 'react';
import { InboxOutlined } from '@ant-design/icons';
import { Upload, message, Image, Typography } from 'antd';
import axios from 'axios'; // Import Axios for API requests
import { useCurrentUser } from '@/lib/user';

const { Dragger } = Upload;
const { Text } = Typography;

const UploadImageForCheck = ({ setSafetyCheck }) => {
  const [imageUrl, setImageUrl] = useState(null);
  const [scannedItems, setScannedItems] = useState([]);

  const boxSize = 295; // Size for both upload area and image preview

  const { data: { user } = {}, mutate, isValidating } = useCurrentUser();
  const handleFileSelect = async (file) => {
    const imagePreviewUrl = URL.createObjectURL(file);
    setImageUrl(imagePreviewUrl);

    // message.loading('Uploading...');

    // Create FormData object for file upload
    const formData = new FormData();
    formData.append('image', file);
    formData.append('username', user.username);

    try {
      const localUrl = 'http://127.0.0.1:5000/items/checksafety';
      const response = await axios.post(localUrl, formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });

      if (response.status === 200 || response.status === 201) {
        console.log('response: ', response.data.safe_to_eat.safe_to_eat);
      }
      setSafetyCheck(
        response.data.safe_to_eat.safe_to_eat
          ? 'Safe to Eat'
          : 'Throw it Right Away'
      );
    } catch (err) {
      console.log('err: ', err);
    }
  };

  return (
    <div
      style={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        minHeight: '65vh',
        backgroundColor: '#f4f7fc',
        padding: '20px',
        borderRadius: '10px',
        boxShadow: '0px 8px 16px rgba(0, 0, 0, 0.1)',
        gap: '30px',
        flexWrap: 'wrap', // Responsive
      }}
    >
      {/* Upload Area (Left Side) */}
      <Dragger
        customRequest={({ file, onSuccess }) => {
          handleFileSelect(file);
          onSuccess(); // Simulate success
        }}
        showUploadList={false}
        multiple={false}
        onDrop={(e) => console.log('Dropped file:', e.dataTransfer.files)}
        style={{
          borderRadius: '12px',
          backgroundColor: '#fff',
          border: '2px dashed #1890ff',
          padding: '30px',
          width: '300px',
          height: '300px',
          transition: '0.3s',
          textAlign: 'center',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
        }}
      >
        <p className="ant-upload-drag-icon" style={{ color: '#1890ff' }}>
          <InboxOutlined style={{ fontSize: '48px' }} />
        </p>
        <Text strong style={{ fontSize: '16px' }}>
          Drag & Drop an image here
        </Text>
        <p className="ant-upload-hint" style={{ color: '#666', marginTop: 8 }}>
          Click or drag an image to upload. Selecting a new image replaces the
          existing one.
        </p>
      </Dragger>

      {/* Display Selected Image (Right Side) */}
      {imageUrl && (
        <div
          style={{
            width: `${boxSize}px`,
            height: `${boxSize}px`,
            background: '#fff',
            borderRadius: '12px',
            boxShadow: '0px 4px 12px rgba(0, 0, 0, 0.1)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            overflow: 'hidden',
          }}
        >
          <Image
            src={imageUrl}
            alt="Uploaded"
            width={boxSize}
            height={boxSize}
            style={{
              objectFit: 'cover', // Ensures it fills the box properly
              borderRadius: '12px',
            }}
          />
        </div>
      )}
    </div>
  );
};

export default UploadImageForCheck;
