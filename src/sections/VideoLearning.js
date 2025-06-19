import React, { useEffect, useRef, useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import './VideoLearning.css';

function VideoLearning() {
  const [videos, setVideos] = useState([]);
  const [username, setUsername] = useState(localStorage.getItem('username'));
  const navigate = useNavigate();
  const scrollRef = useRef(null); // For scrolling

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
      const res = await axios.get('http://localhost:5000/api/managevideo');
      setVideos(res.data);
    } catch (error) {
      console.error('Error fetching videos:', error);
    }
  };

  const scroll = (direction) => {
    const { current } = scrollRef;
    if (current) {
      const scrollAmount = 320; // Adjust as per card width
      current.scrollBy({
        left: direction === 'left' ? -scrollAmount : scrollAmount,
        behavior: 'smooth',
      });
    }
  };

  return (
    <div className="blogs-section-wrapper">
      <h2 className="text-center mb-4 fw-bold">📚 Course Videos</h2>
      <hr/>
      <div className="scroll-wrapper position-relative">
        {/* Left Scroll Button */}
        <button className="arrow-btn left-arrow" onClick={() => scroll('left')}>
          &#10094;
        </button>

        {/* Scrollable Video Cards */}
        <div className="scroll-container" ref={scrollRef}>
          {videos.map((video) => (
            <div key={video.id} className="blog-card">
              <div className="image-wrapper">
                <img
                  src={`http://localhost:5000/uploads/${video.thumbnail}`}
                  alt={video.title}
                  className="card-img-top"
                />
                <div className="play-button-overlay">
                  <a
                    href={video.youtubelink}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <i className="bi bi-play-circle-fill play-icon"></i>
                  </a>
                </div>
              </div>

              <div className="card-body">
                <h5 className="card-title">{video.title}</h5>
                <p className="card-text">
                  {video.description.slice(0, 80)}...
                </p>
                {username ? (
                  <button
                    onClick={() => navigate(`/video/${video.id}`)}
                    className="btn btn-info w-100 mt-2 fw-semibold"
                  >
                    🎓 Learn More
                  </button>
                ) : (
                  <p className="text-muted mt-2 text-center">
                    🔒 Login to explore full content
                  </p>
                )}
              </div>
            </div>
          ))}
        </div>

        {/* Right Scroll Button */}
        <button className="arrow-btn right-arrow" onClick={() => scroll('right')}>
          &#10095;
        </button>
      </div>
    </div>
  );
}

export default VideoLearning;
