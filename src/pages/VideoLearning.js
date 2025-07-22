import React, { useEffect, useState } from 'react';
import axios from 'axios';

const VideoLearning = () => {
  const [videos, setVideos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    axios.get('/api/videolist') // Update this URL based on your server route
      .then((response) => {
        const data = response.data;

        if (Array.isArray(data)) {
          setVideos(data);
        } else {
          console.error('Data is not an array:', data);
          setError('Unexpected response format.');
        }
      })
      .catch((err) => {
        console.error('Error fetching videos:', err);
        setError('Failed to load videos.');
      })
      .finally(() => setLoading(false));
  }, []);

  if (loading) return <p>Loading videos...</p>;
  if (error) return <p style={{ color: 'red' }}>{error}</p>;

  return (
    <div className="video-container" style={{ padding: '20px' }}>
      <h2>Video Learning</h2>
      {videos.length === 0 ? (
        <p>No videos available.</p>
      ) : (
        videos.map((video, index) => (
          <div key={index} style={{ marginBottom: '20px' }}>
            <h3>{video.title || `Video ${index + 1}`}</h3>
            <video
              src={video.url}
              controls
              width="100%"
              style={{ maxWidth: '600px' }}
            />
          </div>
        ))
      )}
    </div>
  );
};

export default VideoLearning;
