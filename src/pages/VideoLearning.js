import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";

const VideoLearning = () => {
  const [groupedVideos, setGroupedVideos] = useState({});

  useEffect(() => {
    axios.get("http://localhost:5000/api/videos")
      .then((res) => {
        const data = res.data;

        const grouped = data.reduce((acc, video) => {
          const { subject } = video;
          if (!acc[subject]) {
            acc[subject] = [];
          }
          acc[subject].push(video);
          return acc;
        }, {});

        setGroupedVideos(grouped);
      })
      .catch((error) => {
        console.error("Error fetching videos:", error);
      });
  }, []);

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-4 text-center">Video Learning</h1>
      {Object.keys(groupedVideos).map((subject) => (
        <div key={subject} className="mb-6">
          <h2 className="text-xl font-semibold mb-2">{subject}</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {groupedVideos[subject].map((video) => (
              <div key={video.id} className="border rounded-lg p-4 shadow-md">
                <h3 className="text-lg font-bold mb-2">{video.title}</h3>
                <p className="mb-2">{video.description}</p>
                <Link
                  to={`/video/${video.id}`}
                  className="text-blue-600 hover:underline"
                >
                  Watch Video
                </Link>
              </div>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
};

export default VideoLearning;
