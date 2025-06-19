import React from 'react';
import './WhyChooseUs.css';
import chooseBg from '../assets/sections/choose.jpg';

const WhyChooseUs = () => {
  const reasons = [
    { icon: '✅', title: 'Client Satisfaction' },
    { icon: '🚀', title: 'Fast Delivery' },
    { icon: '💡', title: 'Innovative Solutions' },
    { icon: '🔒', title: 'Secure Code' }
  ];

  return (
    <section
      className="why-choose-us-section text-white"
      style={{ backgroundImage: `url(${chooseBg})` }}
    >
      <div className="container py-5">
        <h1 className="mb-4 fw-bold">Why Choose Us?</h1>
        <div className="row">
          <div className="col-12 col-md-6">
            <div className="row">
              {reasons.map((item, index) => (
                <div key={index} className="col-12 col-sm-6 mb-4">
                  <div className="reason-card p-4 rounded shadow-sm">
                    <div className="display-5 mb-3">{item.icon}</div>
                    <h5 className="fw-semibold">{item.title}</h5>
                  </div>
                </div>
              ))}
            </div>
          </div>
          {/* Right half left intentionally empty */}
          <div className="col-12 col-md-6 d-none d-md-block">{/* Empty space */}</div>
        </div>
      </div>
    </section>
  );
};

export default WhyChooseUs;
