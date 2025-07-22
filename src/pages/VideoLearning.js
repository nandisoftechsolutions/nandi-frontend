// File: VideoLearning.js

import React, { useState, useEffect } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import axios from 'axios';
import { Badge } from '@/components/ui/badge';

const VideoLearning = () => {
  const [videos, setVideos] = useState([]);
  const [groupedVideos, setGroupedVideos] = useState({});
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchVideos = async () => {
      try {
        const res = await axios.get('http://localhost:5000/api/managevideo');
        const data = res.data;

        setVideos(data);

        // ✅ Group videos by course_id safely
        if (Array.isArray(data)) {
          const grouped = data.reduce((acc, video) => {
            const courseId = video.course_id || 'Unknown';
            if (!acc[courseId]) acc[courseId] = [];
            acc[courseId].push(video);
            return acc;
          }, {});
          setGroupedVideos(grouped);
        } else {
          setGroupedVideos({});
        }

        setLoading(false);
      } catch (err) {
        console.error('Failed to fetch videos:', err);
        setGroupedVideos({});
        setLoading(false);
      }
    };

    fetchVideos();
  }, []);

  if (loading) return <p className="text-center text-gray-500">Loading videos...</p>;

  return (
    <div className="p-6">
      <h2 className="text-2xl font-bold mb-6">Course Video Library</h2>

      {groupedVideos && typeof groupedVideos === 'object' && Object.entries(groupedVideos).map(([courseId, courseVideos], idx) => (
        <div key={courseId} className="mb-10">
          <h3 className="text-xl font-semibold mb-4">
            Course: <Badge>{courseId}</Badge>
          </h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
            {Array.isArray(courseVideos) && courseVideos.map((video) => (
              <Card key={video.id} className="shadow-md">
                <CardContent>
                  <h4 className="text-lg font-bold mb-2">{video.title}</h4>
                  <p className="text-gray-700 text-sm mb-3">{video.description}</p>
                  <video controls className="w-full rounded">
                    <source src={`http://localhost:5000/uploads/${video.video_url}`} type="video/mp4" />
                    Your browser does not support the video tag.
                  </video>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
};

export default VideoLearning;
