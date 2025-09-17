import React, { useEffect, useState, useRef } from 'react';

function Training() {
  const [urls, setUrls] = useState('');
  const iframeRef = useRef(null);

  useEffect(() => {
    if (typeof window !== 'undefined') {
      const savedUrl = localStorage.getItem('meetUrl');
      if (savedUrl) {
        setUrls(savedUrl);
      } else {
        console.warn('No URL found in localStorage for meetUrl');
      }
    }
  }, []);

  const handleFullscreen = () => {
    if (iframeRef.current) {
      const requestFullscreen =
        iframeRef.current.requestFullscreen ||
        iframeRef.current.mozRequestFullScreen ||
        iframeRef.current.webkitRequestFullscreen ||
        iframeRef.current.msRequestFullscreen;

      if (requestFullscreen) {
        requestFullscreen.call(iframeRef.current);
      } else {
        alert('Your browser does not support fullscreen mode');
      }
    }
  };

  return (
    <div>
      <center style={{ position: 'relative', top: '100px' }}>
        {urls ? (
          <>
            <iframe
              style={{ border: 'solid 1px rgba(61, 51, 51, 0.81)' }}
              ref={iframeRef}
              src={urls}
              height="450px"
              width="50%"
              title="Training Session"
              allow="microphone; camera; fullscreen; autoplay; display-capture; clipboard-write; download"
              />
            <div>
              <button
                className="default-btn"
                onClick={handleFullscreen}
                style={{ marginTop: '10px' }}
              >
                Go Fullscreen
              </button>
            </div>
          </>
        ) : (
          <p style={{ color: 'red' }}>No meeting URL found. Please set one in localStorage with the key "meetUrl".</p>
        )}
      </center>
      <br />
      <br />
      <br />
      <br />
      <br />
    </div>
  );
}

export default Training;
