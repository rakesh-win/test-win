import React, { useEffect, useState } from 'react';
import { Input } from '@mui/material';

function ExamModal({ isOpen, onClose, message, onSubmit }) {
  const [inputValue, setInputValue] = useState('');

  useEffect(() => {
    const certiName = localStorage.getItem('certiName');
    if (certiName) {
      setInputValue(certiName);
    }
  }, []);

  const handleSubmit = () => {
    localStorage.setItem('certiName', inputValue);
    if (onSubmit) {
      onSubmit(inputValue);
    } else {
      console.log('Input value:', inputValue);
    }
    onClose();
    // Don't reset input so user sees their name next time too
  };

  if (!isOpen) return null;

  const overlayStyle = {
    position: 'fixed',
    top: 0, left: 0, right: 0, bottom: 0,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    zIndex: 9999,
  };

  const modalStyle = {
    backgroundColor: '#fff',
    padding: '24px',
    borderRadius: '8px',
    width: '620px',
    textAlign: 'center',
    boxShadow: '0 4px 12px rgba(0, 0, 0, 0.15)',
  };

  const messageStyle = {
    marginBottom: '16px',
  };

  const buttonStyle = {
    marginTop: '12px',
  };

  return (
    <div style={overlayStyle}>
      <div style={modalStyle}>
        <p style={messageStyle}>{message}</p>
        <Input
          fullWidth
          placeholder="Enter your name"
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
        />
        <button className='default-btn' style={buttonStyle} onClick={handleSubmit}>
          Save & Close
        </button>
      </div>
    </div>
  );
}

export default ExamModal;
