import React, { useEffect, useState } from 'react';
import axios from 'axios';
import BASE_URL from '../api';

const StatsSection = ({ title = 'Our Achievements', stats = [] }) => {
  const [fetchedStats, setFetchedStats] = useState([]);

  const defaultStats = [
    { count: '120+', label: 'Projects Delivered' },
    { count: '50+', label: 'Happy Clients' },
    { count: '15+', label: 'Ongoing Projects' },
    { count: '8+', label: 'Years in Business' },
  ];

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const response = await axios.get(`${BASE_URL}/api/stats`);
        if (Array.isArray(response.data)) {
          setFetchedStats(response.data);
        }
      } catch (err) {
        console.error('Error fetching stats:', err);
      }
    };

    fetchStats();
  }, []);

  const displayStats = stats.length > 0 ? stats : (fetchedStats.length > 0 ? fetchedStats : defaultStats);

  return (
    <section className="py-5 bg-dark text-white text-center">
      <div className="container">
        <h2 className="mb-4 fw-bold">{title}</h2>
        <div className="row justify-content-center g-4">
          {displayStats.map((item, index) => (
            <div key={index} className="col-6 col-sm-4 col-md-3">
              <div className="p-4 rounded shadow-sm bg-secondary bg-opacity-10 border border-light h-100">
                <h2 className="fw-bold display-6">{item.count}</h2>
                <p className="mb-0 text-light">{item.label}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default StatsSection;
