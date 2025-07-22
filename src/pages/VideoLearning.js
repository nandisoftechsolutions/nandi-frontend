// File: VideoLearning.js

import React, { useState, useEffect } from 'react';
import axios from 'axios';

const VideoLearning = () => {
  const [videos, setVideos] = useState([]);
  const [loading, setLoading] = useState(true);

  const getVideos = async () => {
    try {
      const res = await axios.get('http://localhost:5000/managevideo');
      if (Array.isArray(res.data)) {
        setVideos(res.data);
      } else {
        console.error('Unexpected response format:', res.data);
        setVideos([]);
      }
    } catch (err) {
      console.error('Error fetching videos:', err);
      setVideos([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getVideos();
  }, []);

  const groupByCourse = (videosArray) => {
    return (Array.isArray(videosArray) ? videosArray : []).reduce((acc, video) => {
      const course = video.course || 'Uncategorized';
      if (!acc[course]) acc[course] = [];
      acc[course].push(video);
      return acc;
    }, {});
  };

  const groupedVideos = groupByCourse(videos);

  if (loading) return <div className="text-center py-5">🔄 Loading videos...</div>;
  if (!Array.isArray(videos) || videos.length === 0)
    return <div className="text-center py-5">🚫 No videos available</div>;

  return (
    <div className="container py-5">
      <h2 className="text-center mb-5 fw-bold">📚 Full Course Videos</h2>

      {groupedVideos && typeof groupedVideos === 'object' &&
        Object.entries(groupedVideos).map(([courseId, courseVideos], idx) => (
          <div key={idx} className="mb-5">
            <h4 className="mb-4 fw-bold text-primary">{courseId}</h4>
            <div className="row row-cols-1 row-cols-md-2 row-cols-lg-3 g-4">
              {(Array.isArray(courseVideos) ? courseVideos : []).map((video, index) => (
                <div className="col" key={index}>
                  <div className="card h-100 shadow-sm">
                    <div className="ratio ratio-16x9">
                      <iframe
                        src={video.url}
                        title={video.title || `Video ${index + 1}`}
                        allowFullScreen
                        frameBorder="0"
                      ></iframe>
                    </div>
                    <div className="card-body">
                      <h5 className="card-title">{video.title || 'Untitled Video'}</h5>
                      <p className="card-text">{video.description || 'No description available.'}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        ))}
    </div>
  );
};

export default VideoLearning;
