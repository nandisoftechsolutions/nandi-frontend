import React, { useEffect, useRef, useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import './VideoLearning.css';

// Auto-detect BASE_URL for local and production
const BASE_URL = process.env.REACT_APP_API_BASE_URL || window.location.origin;

function VideoLearning() {
  const [videos, setVideos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [username, setUsername] = useState(localStorage.getItem('username'));
  const navigate = useNavigate();
  const scrollRef = useRef(null);

  useEffect(() => {
    fetchVideos();

    const interval = setInterval(() => {
      const currentUser = localStorage.getItem('username');
      setUsername(currentUser);
    }, 500);

    return () => clearInterval(interval);
  }, []);

  const fetchVideos = async () => {
    try {
      setLoading(true);
      setError(null);
      const res = await axios.get(`${BASE_URL}/api/managevideo`);
      
      // Ensure the response data is an array
      if (!Array.isArray(res.data)) {
        throw new Error('Invalid data format: Expected an array');
      }
      
      setVideos(res.data);
    } catch (error) {
      console.error('Error fetching videos:', error);
      setError(error.message || 'Failed to load videos');
      setVideos([]); // Reset to empty array to prevent mapping errors
    } finally {
      setLoading(false);
    }
  };

  const scroll = (direction) => {
    if (scrollRef.current) {
      const scrollAmount = 320;
      scrollRef.current.scrollBy({
        left: direction === 'left' ? -scrollAmount : scrollAmount,
        behavior: 'smooth',
      });
    }
  };

  if (loading) {
    return (
      <div className="blogs-section-wrapper py-5">
        <div className="container text-center">
          <div className="spinner-border text-primary" role="status">
            <span className="visually-hidden">Loading...</span>
          </div>
          <p className="mt-2">Loading videos...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="blogs-section-wrapper py-5">
        <div className="container text-center">
          <div className="alert alert-danger">
            <p>Error: {error}</p>
            <button className="btn btn-primary" onClick={fetchVideos}>
              Retry
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="blogs-section-wrapper py-5">
      <div className="container">
        <h2 className="text-center mb-4 fw-bold text-primary">📚 Course Videos</h2>
        <hr />

        {videos.length === 0 ? (
          <div className="text-center py-4">
            <p className="text-muted">No videos available yet.</p>
            <button className="btn btn-primary" onClick={fetchVideos}>
              Refresh
            </button>
          </div>
        ) : (
          <div className="scroll-wrapper position-relative">
            <button className="arrow-btn left-arrow" onClick={() => scroll('left')}>&#10094;</button>

            <div className="scroll-container d-flex gap-3" ref={scrollRef}>
              {videos.map((video) => (
                <div key={video.id || video._id} className="blog-card flex-shrink-0">
                  <div className="image-wrapper position-relative">
                    <img
                      src={`${BASE_URL}/uploads/${video.thumbnail}`}
                      alt={video.title}
                      className="card-img-top w-100"
                      onError={(e) => {
                        e.target.onerror = null;
                        e.target.src = 'https://via.placeholder.com/320x180?text=No+Image';
                      }}
                    />
                    <div className="play-button-overlay">
                      <a href={video.youtubelink} target="_blank" rel="noopener noreferrer">
                        <i className="bi bi-play-circle-fill play-icon"></i>
                      </a>
                    </div>
                  </div>

                  <div className="card-body p-3">
                    <h5 className="card-title">{video.title}</h5>
                    <p className="card-text text-muted">
                      {video.description?.slice(0, 80)}...
                    </p>
                    {username ? (
                      <button
                        onClick={() => navigate(`/video/${video.id || video._id}`)}
                        className="btn btn-info w-100 mt-2 fw-semibold"
                      >
                        🎓 Learn More
                      </button>
                    ) : (
                      <p className="text-muted mt-2 text-center">🔒 Login to explore full content</p>
                    )}
                  </div>
                </div>
              ))}
            </div>

            <button className="arrow-btn right-arrow" onClick={() => scroll('right')}>&#10095;</button>
          </div>
        )}
      </div>
    </div>
  );
}

export default VideoLearning;