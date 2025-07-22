import React, { useEffect, useState } from 'react';
import axios from 'axios';

const VideoLearning = () => {
  const [videos, setVideos] = useState([]);

  useEffect(() => {
    const fetchVideos = async () => {
      try {
        const res = await axios.get('http://localhost:5000/api/videos');
        const data = res.data;
        console.log("Fetched videos:", data);

        if (Array.isArray(data)) {
          setVideos(data);
        } else if (Array.isArray(data.videos)) {
          setVideos(data.videos);
        } else {
          console.warn("API returned unexpected data format:", data);
          setVideos([]);
        }
      } catch (error) {
        console.error('Error fetching videos:', error);
      }
    };

    fetchVideos();
  }, []);

  return (
    <div className="video-learning">
      <h2>Video Learning</h2>

      {videos.length === 0 ? (
        <p>No videos available.</p>
      ) : (
        <ul>
          {videos.map((video) => (
            <li key={video._id || video.id}>
              <h4>{video.title}</h4>
              <video width="400" controls>
                <source src={video.url} type="video/mp4" />
                Your browser does not support HTML video.
              </video>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default VideoLearning;
