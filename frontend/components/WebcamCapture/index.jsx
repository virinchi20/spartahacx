import React, { useRef, useState } from 'react';
import Webcam from 'react-webcam';
import { Button, message, Spin } from 'antd';
import axios from 'axios';
import { useCurrentUser } from '@/lib/user';
import toast from 'react-hot-toast';

const WebcamCapture = () => {
  const webcamRef = useRef(null);
  const [image, setImage] = useState(null);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);

  const { data: { user } = {}, mutate, isValidating } = useCurrentUser();

  const capture = () => {
    if (webcamRef.current) {
      const imageSrc = webcamRef.current.getScreenshot();
      setImage(imageSrc);
    }
  };

  const sendToBackend = async () => {
    if (!image) {
      message.warning('Please capture an image first!');
      return;
    }

    setLoading(true);
    try {
      const blob = await fetch(image).then((res) => res.blob());
      const formData = new FormData();
      formData.append('image', blob, 'captured_image.jpg');
      formData.append('username', user.username);

      const localUrl = 'http://127.0.0.1:5000/items/checksafety';
      const response = await axios.post(localUrl, formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });

      if (response.status === 200 || response.status === 201) {
        console.log('response: ', response.data.safe_to_eat.safe_to_eat);
      }
      
      response.data.safe_to_eat.safe_to_eat
          ? toast.success('Safe to Eat')
          : toast.error('Throw it Right Away')

    } finally {
      setLoading(false);
    }
  };

  return (
    <div
      style={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        height: '100vh',
        backgroundColor: '#f7fafc',
        flexDirection: 'column',
        padding: '0 1rem',
        width: '100%',
      }}
    >
      <h2
        style={{
          fontSize: '1rem',
          fontWeight: '600',
          color: '#4a5568',
          marginBottom: '1rem',
        }}
      >
        📷 Webcam Capture
      </h2>

      {error && (
        <p style={{ color: '#e53e3e', fontSize: '0.875rem' }}>{error}</p>
      )}

      <div
        style={{
          display: 'flex',
          justifyContent: 'center',
          gap: '1rem',
          width: '100%',
          marginBottom: '1rem',
        }}
      >
        <div
          style={{
            border: '1px solid #e2e8f0',
            borderRadius: '0.375rem',
            overflow: 'hidden',
            width: '350px', // Adjusted width
            height: 'auto',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
          }}
        >
          <Webcam
            audio={false}
            ref={webcamRef}
            screenshotFormat="image/jpeg"
            style={{ borderRadius: '0.375rem', width: '100%', height: 'auto' }}
            videoConstraints={{
              width: 250, // Adjusted width
              height: 180, // Adjusted height
              facingMode: 'user',
            }}
            onUserMediaError={() =>
              setError('Camera access denied or unavailable')
            }
          />
        </div>

        {image && (
          <div
            style={{
              marginTop: '1rem',
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
            }}
          >
            <h3
              style={{
                fontSize: '0.875rem',
                color: '#4a5568',
                marginBottom: '0.5rem',
              }}
            >
              Captured Image
            </h3>
            <img
              src={image}
              alt="Captured"
              style={{
                borderRadius: '0.375rem',
                border: '1px solid #e2e8f0',
                width: '10rem', // Adjusted width
                height: '8rem', // Adjusted height
              }}
            />
          </div>
        )}
      </div>

      <div
        style={{
          display: 'flex',
          justifyContent: 'center',
          gap: '1rem',
          marginTop: '1rem',
          width: '100%',
        }}
      >
        <Button type="primary" onClick={capture} style={{ width: '7rem' }}>
          {' '}
          {/* Adjusted button width */}
          📸 Capture
        </Button>
        <Button
          type="default"
          onClick={sendToBackend}
          style={{ width: '7rem' }}
          disabled={loading}
        >
          {loading ? <Spin size="small" /> : '🚀 Send'}
        </Button>
      </div>
    </div>
  );
};

export default WebcamCapture;
