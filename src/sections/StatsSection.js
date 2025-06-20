import React from 'react';

const StatsSection = ({ title = 'Our Achievements', stats = [] }) => {
 
  const defaultStats = [
    { count: '120+', label: 'Projects Delivered' },
    { count: '50+', label: 'Happy Clients' },
    { count: '15+', label: 'Ongoing Projects' },
    { count: '8+', label: 'Years in Business' },
  ];

  const displayStats = stats.length > 0 ? stats : defaultStats;

  return (
    <section className="py-5 bg-dark text-white text-center">
      <div className="container">
        <h1 className="mb-4">{title}</h1>
        <div className="row justify-content-center">
          {displayStats.map((item, index) => (
            <div key={index} className="col-6 col-sm-4 col-md-3 mb-4">
              <div className="p-3 border border-light rounded shadow-sm bg-secondary bg-opacity-10">
                <h1 className="fw-bold">{item.count}</h1>
                <p className="mb-0">{item.label}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default StatsSection;
