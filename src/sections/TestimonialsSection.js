import React from 'react';
import { FaQuoteLeft } from 'react-icons/fa';

const testimonials = [
  { name: 'Client A', quote: 'They built our dream website!' },
  { name: 'Client B', quote: 'Amazing service and support!' },
  { name: 'Client C', quote: 'Highly professional and punctual.' },
];

const TestimonialsSection = () => (
  <section className="py-5 bg-light">
    <div className="container text-center">
      <h2 className="mb-4 text-primary">What Our Clients Say</h2>
      <div className="row justify-content-center">
        {testimonials.map((t, i) => (
          <div key={i} className="col">
            <div className="cardses h-100 shadow-sm border-1 testimonial-card">
              <div className="card-body position-relative p-4">
                <FaQuoteLeft className="text-primary mb-3 fs-3" />
                <p className="card-text fst-italic text-dark">“{t.quote}”</p>
                <h6 className="mt-3 mb-0 text-secondary fw-semibold">{t.name}</h6>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  </section>
);

export default TestimonialsSection;
