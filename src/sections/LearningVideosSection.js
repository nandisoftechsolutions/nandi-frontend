import React from 'react';

const videos = [
  { title: 'React Login Page', thumbnail: 'https://img.youtube.com/vi/dQw4w9WgXcQ/0.jpg', link: '#' },
  { title: 'Node API Basics', thumbnail: 'https://img.youtube.com/vi/3fumBcKC6RE/0.jpg', link: '#' },
];

const LearningVideosSection = () => (
  <section className="py-5">
    <div className="container text-center">
      <h2>Learn with Us</h2>
      <div className="row mt-4">
        {videos.map((v, i) => (
          <div key={i} className="col-md-6 mb-3">
            <div className="card h-100">
              <img src={v.thumbnail} alt={v.title} className="card-img-top" />
              <div className="card-body">
                <h5 className="card-title">{v.title}</h5>
                <a href={v.link} className="btn btn-primary">Watch</a>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  </section>
);

export default LearningVideosSection;
