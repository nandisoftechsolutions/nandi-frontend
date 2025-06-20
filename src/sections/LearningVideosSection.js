import React from 'react';
import './LearningVideosSection.css'; // optional styling


const videos = [
  {
    title: 'React Login Page',
    thumbnail: 'https://img.youtube.com/vi/dQw4w9WgXcQ/0.jpg',
    link: 'https://www.youtube.com/watch?v=dQw4w9WgXcQ',
  },
  {
    title: 'Node API Basics',
    thumbnail: 'https://img.youtube.com/vi/3fumBcKC6RE/0.jpg',
    link: 'https://www.youtube.com/watch?v=3fumBcKC6RE',
  },
];

const LearningVideosSection = () => (
  <section className="py-5 bg-light">
    <div className="container text-center">
      <h2 className="mb-4 text-primary fw-bold">Learn with Us</h2>
      <div className="row mt-4">
        {videos.map((v, i) => (
          <div key={i} className="col-md-6 mb-4">
            <div className="card h-100 shadow-sm">
              <img
                src={v.thumbnail}
                alt={v.title}
                className="card-img-top"
                onError={(e) =>
                  (e.target.src = 'https://via.placeholder.com/320x180?text=No+Thumbnail')
                }
              />
              <div className="card-body">
                <h5 className="card-title">{v.title}</h5>
                <a
                  href={v.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn btn-primary mt-2"
                >
                  🎥 Watch Video
                </a>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  </section>
);

export default LearningVideosSection;
