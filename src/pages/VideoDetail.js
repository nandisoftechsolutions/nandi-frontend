import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import slugify from 'slugify';
import './VideoDetails.css';
import { BsHeart, BsHeartFill, BsShare, BsLock } from 'react-icons/bs';
import BASE_URL from '../api';

const VideoDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const [video, setVideo] = useState(null);
  const [relatedVideos, setRelatedVideos] = useState([]);
  const [likesData, setLikesData] = useState({ likes: 0, dislikes: 0 });
  const [userLiked, setUserLiked] = useState(null);
  const [copied, setCopied] = useState(false);
  const [showMoreDesc, setShowMoreDesc] = useState(false);
  const [courseName, setCourseName] = useState('');
  const [isEnrolled, setIsEnrolled] = useState(false);

  const user = JSON.parse(localStorage.getItem('user') || 'null');
  const username = user?.name || '';
  const userEmail = user?.email || '';
  const courseSlug = slugify(courseName || '', { lower: true });

  useEffect(() => {
    const fetchData = async () => {
      try {
        const { data: videoData } = await axios.get(`${BASE_URL}/api/managevideo/${id}`);
        setVideo(videoData);
        setCourseName(videoData.course || '');

        if (userEmail && videoData.course_id) {
          const enrollRes = await axios.get(`${BASE_URL}/api/courses/${videoData.course_id}/is-enrolled`, {
            params: { userEmail },
          });
          setIsEnrolled(enrollRes.data.enrolled);
        }

        if (videoData.course_id) {
          const relatedRes = await axios.get(`${BASE_URL}/api/coursevideos/bycourse/${videoData.course_id}`);
          const filtered = Array.isArray(relatedRes.data)
            ? relatedRes.data.filter((v) => String(v.id) !== String(id))
            : [];
          setRelatedVideos(filtered);
        }

        const likeRes = await axios.get(`${BASE_URL}/api/likes/${id}?user=${username}`);
        setLikesData({ likes: likeRes.data.likes, dislikes: likeRes.data.dislikes });
        setUserLiked(likeRes.data.userLiked);
      } catch (err) {
        console.error('Error loading video details:', err);
        alert('Failed to load video');
      }
    };

    fetchData();
  }, [id, username, userEmail]);

  const handleLike = async (isDislike) => {
    if (!username) return alert('Login to react');
    const action = isDislike ? 'dislike' : 'like';
    if (userLiked === action) return;

    try {
      await axios.post(`${BASE_URL}/api/likes/${id}`, {
        user_name: username,
        is_dislike: isDislike,
      });
      const res = await axios.get(`${BASE_URL}/api/likes/${id}?user=${username}`);
      setLikesData({ likes: res.data.likes, dislikes: res.data.dislikes });
      setUserLiked(res.data.userLiked);
    } catch (err) {
      console.error('Like failed:', err);
    }
  };

  const handleCopy = () => {
    if (!username) return alert('Login to share');
    navigator.clipboard.writeText(video?.youtubelink || '');
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleCourseRedirect = () => {
    if (!video?.course_id) return;
    navigate(`/course/${courseSlug}/coursedetails`, {
      state: { courseData: video.course_id },
    });
  };

  if (!video) return <div className="text-center py-5">🔄 Loading...</div>;

  return (
    <div className="container-fluid py-4">
      <br />
      <br />

      <div className="row mb-4 align-items-center">
        <div className="col-12 col-md-6">
          <h2 className="fw-bold mb-2">{courseName}</h2>
        </div>
        <div className="col-12 col-md-6">
          <div className="input-group">
            <input type="text" className="form-control" placeholder="Search" />
            <span className="input-group-text"><i className="bi bi-search"></i></span>
          </div>
        </div>
      </div>
      <hr />

      <div className="row">
        <div className="col-lg-8 mb-4">
          <div className="mb-3">
            {video.videos ? (
              <video width="100%" controls autoPlay>
                <source src={`${BASE_URL}/uploads/${video.videos}`} type="video/mp4" />
              </video>
            ) : (
              <iframe
                width="100%"
                height="450"
                src={video.youtubelink?.replace('watch?v=', 'embed/')}
                frameBorder="0"
                allowFullScreen
                title="YouTube Video"
              ></iframe>
            )}
          </div>

          <h4 className="fw-bold mb-3">{video.title}</h4>

          <div className="d-flex flex-wrap gap-3 align-items-center mb-3">
            <div className="d-flex align-items-center gap-2">
              <img
                src={video.teacher_profile_picture ? `${BASE_URL}/uploads/${video.teacher_profile_picture}` : '/default-user.png'}
                onError={(e) => {
                  e.target.onerror = null;
                  e.target.src = '/default-user.png';
                }}
                width="40"
                height="40"
                className="rounded-circle object-fit-cover"
                alt="Teacher"
              />
              <strong>{video.teacher_name || 'Unknown Teacher'}</strong>
            </div>
            <div className="d-flex flex-wrap gap-2">
              <button className="btn btn-outline-danger" onClick={() => handleLike(false)} disabled={userLiked === 'like'}>
                <BsHeart /> {likesData.likes}
              </button>
              <button className="btn btn-outline-dark" onClick={() => handleLike(true)} disabled={userLiked === 'dislike'}>
                <BsHeartFill /> {likesData.dislikes}
              </button>
              <button className="btn btn-outline-secondary" onClick={handleCopy}>
                <BsShare /> {copied ? 'Copied!' : 'Share'}
              </button>
              {isEnrolled ? (
                <button className="btn btn-outline-success" disabled>✅ Subscribed</button>
              ) : (
                <button className="btn btn-success" onClick={handleCourseRedirect}>📚 Subscribe</button>
              )}
            </div>
          </div>

          <div className="bg-light rounded p-3 mb-4">
            {showMoreDesc ? video.description : `${video.description?.slice(0, 200)}...`}
            {video.description?.length > 200 && (
              <span
                className="text-primary ms-2"
                role="button"
                onClick={() => setShowMoreDesc((prev) => !prev)}
              >
                {showMoreDesc ? 'See less' : 'See more'}
              </span>
            )}
          </div>
        </div>

        <div className="col-lg-4">
          <h5 className="fw-bold mb-3">📂 Related Videos</h5>
          {relatedVideos.map((v, idx) => (
            <div
              key={v.id}
              className={`card mb-3 shadow-sm ${!isEnrolled && idx > 1 ? 'locked' : ''}`}
              style={{
                cursor: !isEnrolled && idx > 1 ? 'not-allowed' : 'pointer',
                opacity: !isEnrolled && idx > 1 ? 0.6 : 1,
                borderRadius: '10px',
                overflow: 'hidden',
              }}
              onClick={() => {
                if (!isEnrolled && idx > 1) return alert('Subscribe to unlock more videos');
                navigate(`/video/${v.id}`);
              }}
            >
              <img
                src={v.thumbnail ? `${BASE_URL}/uploads/${v.thumbnail}` : '/default-thumbnail.jpg'}
                alt={v.title}
                style={{
                  width: '100%',
                  height: '140px',
                  objectFit: 'cover',
                  borderRadius: '0px',
                }}
              />
              <div className="card-body d-flex justify-content-between align-items-center">
                <h6 className="card-title text-truncate mb-0">{v.title}</h6>
                {!isEnrolled && idx > 1 && <BsLock />}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default VideoDetails;
