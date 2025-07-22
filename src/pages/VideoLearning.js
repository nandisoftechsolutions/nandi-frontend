import React from 'react';

const VideoLearning = () => {
  return (
    <div style={styles.container}>
      <h1 style={styles.text}>Video will be uploaded soon...</h1>
    </div>
  );
};

const styles = {
  container: {
    height: '100vh',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#f5f5f5',
  },
  text: {
    fontSize: '28px',
    fontWeight: '600',
    color: '#333',
  },
};

export default VideoLearning;
