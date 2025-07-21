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
  const [courseTitles, setCourseTitles] = useState({});
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchVideos = async () => {
      try {
        const res = await axios.get(`${BASE_URL}/api/managevideo`);
        const videoList = Array.isArray(res.data)
          ? res.data
          : Array.isArray(res.data.videos)
          ? res.data.videos
          : [];

        setVideos(videoList);

        const courseIds = [
          ...new Set(videoList.map((v) => v.course_id).filter(Boolean)),
        ];

        const titleMap = {};
        await Promise.all(
          courseIds.map(async (id) => {
            try {
              const { data } = await axios.get(`${BASE_URL}/api/courses/${id}`);
              titleMap[id.toString()] = data?.title || 'Untitled Course';
            } catch {
              titleMap[id.toString()] = 'Untitled Course';
            }
          })
        );
        setCourseTitles(titleMap);

        if (user?.email) {
          const enrollmentStatus = {};
          await Promise.all(
            courseIds.map(async (courseId) => {
              try {
                const { data } = await axios.get(
                  `${BASE_URL}/api/courses/${courseId}/is-enrolled`,
                  { params: { userEmail: user.email } }
                );
                enrollmentStatus[courseId.toString()] = data?.enrolled;
              } catch {
                enrollmentStatus[courseId.toString()] = false;
              }
            })
          );
          setEnrolledMap(enrollmentStatus);
        }
      } catch (err) {
        console.error('Error fetching videos:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchVideos();
  }, [user?.email]);

  const groupedVideos = videos.reduce((acc, video) => {
    const courseId = video.course_id?.toString() || 'uncategorized';
    if (!acc[courseId]) acc[courseId] = [];
    acc[courseId].push(video);
    return acc;
  }, {});

  if (loading) return <div className="text-center py-5">🔄 Loading videos...</div>;

  if (!videos.length) return <div className="text-center py-5">🚫 No videos available</div>;

  return (
    <div className="container py-5">
      <h2 className="text-center mb-5 fw-bold">📚 Full Course Videos</h2>

      {Object.entries(groupedVideos).map(([courseId, courseVideos], idx) => {
        const title = courseTitles[courseId] || 'Untitled Course';
        const isEnrolled = enrolledMap[courseId] || false;

        return (
          <div key={courseId || idx} className="mb-5">
            <h2 className="fw-bold text-dark border-bottom pb-2">{title}</h2>
            <div className="row row-cols-1 row-cols-sm-2 row-cols-md-3 row-cols-lg-4 g-4">
              {Array.isArray(courseVideos) &&
                courseVideos.map((video, index) => {
                  const isUnlocked = isEnrolled || index < 2;

                  return (
                    <div key={video._id || index} className="col">
                      <div className="video-card h-100 shadow-sm rounded overflow-hidden">
                        <div className="position-relative">
                          <img
                            src={
                              video.thumbnail
                                ? `${BASE_URL}/uploads/${video.thumbnail}`
                                : '/default-thumbnail.jpg'
                            }
                            alt={video.title}
                            className="w-100"
                            style={{ objectFit: 'cover', height: '200px' }}
                          />
                          {isUnlocked ? (
                            <div
                              onClick={() => navigate(`/video/${video._id}`)}
                              className="position-absolute top-50 start-50 translate-middle"
                              style={{ cursor: 'pointer' }}
                            >
                              <i className="bi bi-play-circle-fill text-white fs-2"></i>
                            </div>
                          ) : (
                            <div
                              className="locked-overlay position-absolute top-0 start-0 w-100 h-100 d-flex align-items-center justify-content-center"
                              style={{
                                backgroundColor: 'rgba(0,0,0,0.5)',
                                color: '#fff',
                                fontSize: '2rem',
                                cursor: 'pointer',
                              }}
                              onClick={() => navigate('/purchase')}
                            >
                              <i className="bi bi-lock-fill"></i>
                            </div>
                          )}
                        </div>
                        <div className="p-3 d-flex flex-column">
                          <h5 className="fw-semibold text-dark mb-2">{video.title}</h5>
                          <p className="text-muted mb-3 flex-grow-1">
                            {video.description?.slice(0, 80)}...
                          </p>
                          {user?.email ? (
                            isUnlocked ? (
                              <button
                                className="btn btn-info fw-semibold"
                                onClick={() => navigate(`/video/${video._id}`)}
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
                            <p className="text-muted text-center mt-2">
                              🔒 Login to explore content
                            </p>
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
