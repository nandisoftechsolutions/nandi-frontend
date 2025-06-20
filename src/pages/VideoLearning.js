import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import './VideoLearning.css';
import BASE_URL from '../api';

function VideoLearning() {
  const navigate = useNavigate();
  const user = JSON.parse(localStorage.getItem('user') || 'null');

  const [videos, setVideos] = useState([]);
  const [enrolledMap, setEnrolledMap] = useState({});

  useEffect(() => {
    const fetchVideos = async () => {
      try {
        const res = await axios.get(`${BASE_URL}/api/managevideo`);
        setVideos(res.data);

        if (user?.email) {
          const uniqueCourseIds = [...new Set(res.data.map(v => v.course_id).filter(Boolean))];
          const enrollmentStatus = {};

          await Promise.all(
            uniqueCourseIds.map(async (courseId) => {
              try {
                const { data } = await axios.get(`${BASE_URL}/api/courses/${courseId}/is-enrolled`, {
                  params: { userEmail: user.email },
                });
                enrollmentStatus[courseId] = data.enrolled;
              } catch (err) {
                console.error(`Enrollment check failed for course ${courseId}:`, err);
              }
            })
          );
          setEnrolledMap(enrollmentStatus);
        }
      } catch (error) {
        console.error('❌ Error fetching videos:', error);
      }
    };

    fetchVideos();
  }, [user?.email]);

  const groupedVideos = videos.reduce((acc, video) => {
    const course = video.course || 'Uncategorized';
    if (!acc[course]) acc[course] = [];
    acc[course].push(video);
    return acc;
  }, {});

  return (
    <div className="container py-5">
      <h2 className="text-center mb-5 fw-bold">📚 Full Course Video Library</h2>

      {Object.entries(groupedVideos).map(([courseName, courseVideos], idx) => {
        const courseId = courseVideos[0]?.course_id;
        const isEnrolled = enrolledMap[courseId] || false;

        return (
          <div key={idx} className="mb-5">
            <div className="row mb-4">
              <div className="col">
                <h2 className="fw-bold text-dark border-bottom pb-2">{courseName}</h2>
              </div>
            </div>

            <div className="row row-cols-1 row-cols-sm-2 row-cols-md-3 row-cols-lg-4 g-4">
              {courseVideos.map((video, index) => {
                const isUnlocked = isEnrolled || index < 2;

                return (
                  <div key={video.id} className="col">
                    <div className="video-card h-100 shadow-sm rounded overflow-hidden">
                      <div className="video-card-img-wrapper position-relative">
                        <img
                          src={`${BASE_URL}/uploads/${video.thumbnail}`}
                          alt={video.title}
                          className="video-card-img w-100"
                          style={{ objectFit: 'cover', height: '200px' }}
                        />

                        {isUnlocked ? (
                          <div
                            className="play-icon-center"
                            onClick={() => navigate(`/video/${video.id}`)}
                            style={{ cursor: 'pointer', position: 'absolute', top: '40%', left: '45%' }}
                          >
                            <i className="bi bi-play-circle-fill play-icon fs-2 text-white"></i>
                          </div>
                        ) : (
                          <div
                            className="locked-overlay d-flex justify-content-center align-items-center"
                            onClick={() => navigate('/purchase')}
                            style={{
                              cursor: 'pointer',
                              position: 'absolute',
                              top: 0,
                              left: 0,
                              width: '100%',
                              height: '100%',
                              backgroundColor: 'rgba(0,0,0,0.5)',
                              color: '#fff',
                              fontSize: '2rem',
                            }}
                          >
                            <i className="bi bi-lock-fill"></i>
                          </div>
                        )}
                      </div>

                      <div className="video-card-body p-3 d-flex flex-column">
                        <h5 className="fw-semibold text-dark mb-2">{video.title}</h5>
                        <p className="text-muted mb-3 flex-grow-1">
                          {video.description?.slice(0, 80)}...
                        </p>

                        {user?.email ? (
                          isUnlocked ? (
                            <button
                              onClick={() => navigate(`/video/${video.id}`)}
                              className="btn btn-info fw-semibold"
                            >
                              🎓 Learn More
                            </button>
                          ) : (
                            <button
                              className="btn btn-outline-secondary fw-semibold"
                              onClick={() => navigate('/purchase')}
                            >
                              🔒 Subscribe to unlock
                            </button>
                          )
                        ) : (
                          <p className="text-muted text-center mt-2">🔒 Login to explore content</p>
                        )}
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>

            <hr className="mt-5 border-dark" />
          </div>
        );
      })}
    </div>
  );
}

export default VideoLearning;
