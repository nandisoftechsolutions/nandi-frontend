import React from 'react';
import { useNavigate } from 'react-router-dom';

const CTASection = ({
  title = "Ready to Start Your Project?",
  description = "Place an order or get in touch with us today!",
  primaryBtnText = "Place Order",
  primaryBtnRoute = "/order",
  secondaryBtnText = "Contact Us",
  secondaryBtnRoute = "/contact",
}) => {
  const navigate = useNavigate();

  return (
    <section className="py-5 bg-success text-white text-center">
      <div className="container">
        <h2 className="mb-3">{title}</h2>
        <p className="lead">{description}</p>
        <div className="d-flex flex-column flex-sm-row justify-content-center gap-3 mt-4">
          <button
            onClick={() => navigate(primaryBtnRoute)}
            className="btn btn-light"
          >
            {primaryBtnText}
          </button>
          <button
            onClick={() => navigate(secondaryBtnRoute)}
            className="btn btn-outline-light"
          >
            {secondaryBtnText}
          </button>
        </div>
      </div>
    </section>
  );
};

export default CTASection;
