// components/ImageUpload.js
import { Upload, Button, message } from 'antd';
import { UploadOutlined } from '@ant-design/icons';
import axios from 'axios';

const UploadImage = () => {
    const handleUpload = async (file) => {
    const formData = new FormData();
    formData.append('image', file);
    for (let pair of formData.entries()) {
      console.log(`${pair[0]}:`, pair[1]);
    }
    try {
      const response = await axios.post('/api/upload', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });

      if (response.status === 200) {
        message.success('Image uploaded successfully');
      }
    } catch (error) {
      message.error('Upload failed');
    }
  };

  return (
    <Upload
      customRequest={({ file, onSuccess, onError }) => {
        handleUpload(file)
          .then(() => onSuccess())
          .catch(onError);
      }}
      showUploadList={false}
    >
      <Button icon={<UploadOutlined />}>Click to Upload</Button>
    </Upload>
  );
};

export default UploadImage;
