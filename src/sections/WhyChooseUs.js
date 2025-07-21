import React from 'react';
import './WhyChooseUs.css';
import chooseBg from '../assets/sections/choose.jpg'; // Webpack will resolve correctly in dev & prod

const WhyChooseUs = () => {
  const reasons = [
    {
      icon: '✅',
      title: 'Client Satisfaction',
      desc: 'We prioritize our clients and ensure 100% satisfaction in every project.'
    },
    {
      icon: '🚀',
      title: 'Fast Delivery',
      desc: 'We work with speed and precision to meet your deadlines without compromising quality.'
    },
    {
      icon: '💡',
      title: 'Innovative Solutions',
      desc: 'We deliver creative, out-of-the-box tech solutions tailored to your needs.'
    },
    {
      icon: '🔒',
      title: 'Secure Code',
      desc: 'We follow the best security practices to keep your application safe and sound.'
    }
  ];

  return (
    <section
      className="why-choose-us-section text-white"
      style={{
        backgroundImage: `url(${chooseBg})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundRepeat: 'no-repeat',
      }}
    >
      <div className="container py-5">
        <h1 className="section-title text-center mb-5">Why Choose Us?</h1>
        <div className="row justify-content-center">
          {reasons.map((item, index) => (
            <div key={index} className="col-12 col-sm-6 col-lg-3 mb-4 d-flex">
              <div className="reason-card p-4 rounded text-white w-100 shadow h-100">
                <div className="icon display-4 mb-3">{item.icon}</div>
                <h5 className="fw-semibold">{item.title}</h5>
                <p>{item.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default WhyChooseUs;
