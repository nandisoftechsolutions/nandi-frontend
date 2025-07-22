// File: VideoLearning.js

import React, { useEffect, useState } from "react";
import axios from "axios";

const VideoLearning = () => {
  const [videos, setVideos] = useState([]);
  const [groupedVideos, setGroupedVideos] = useState({});
  const [selectedCourse, setSelectedCourse] = useState("");

  useEffect(() => {
    const fetchVideos = async () => {
      try {
        const res = await axios.get("http://localhost:5000/api/videos");
        setVideos(res.data);

        console.log("Fetched videos from API:", res.data);

        const grouped = res.data.reduce((acc, video) => {
          const courseId = video.course_id || "Unassigned";
          if (!acc[courseId]) {
            acc[courseId] = [];
          }
          acc[courseId].push(video);
          return acc;
        }, {});
        setGroupedVideos(grouped);

        // Auto-select first course
        const firstCourse = Object.keys(grouped)[0] || "";
        setSelectedCourse(firstCourse);
      } catch (error) {
        console.error("Error fetching videos:", error);
      }
    };

    fetchVideos();
  }, []);

  const handleCourseChange = (event) => {
    setSelectedCourse(event.target.value);
  };

  const courseVideos = groupedVideos[selectedCourse];

  return (
    <div className="container my-5">
      <h2 className="text-center mb-4">🎓 Learn with Videos</h2>

      <div className="mb-3">
        <label htmlFor="courseSelect" className="form-label fw-bold">
          Select a Course:
        </label>
        <select
          id="courseSelect"
          className="form-select"
          value={selectedCourse}
          onChange={handleCourseChange}
        >
          {Object.keys(groupedVideos).map((courseId) => (
            <option key={courseId} value={courseId}>
              {courseId}
            </option>
          ))}
        </select>
      </div>

      <div className="row row-cols-1 row-cols-sm-2 row-cols-md-3 row-cols-lg-4 g-4">
        {Array.isArray(courseVideos) ? (
          courseVideos.map((video, index) => (
            <div key={index} className="col">
              <div className="card h-100 shadow-sm border-0">
                <iframe
                  className="card-img-top"
                  height="200"
                  src={video.video_url}
                  title={video.video_title}
                  frameBorder="0"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                ></iframe>
                <div className="card-body">
                  <h5 className="card-title">{video.video_title}</h5>
                </div>
              </div>
            </div>
          ))
        ) : (
          <div className="col">
            <p className="text-danger">⚠️ No videos available for this course.</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default VideoLearning;
