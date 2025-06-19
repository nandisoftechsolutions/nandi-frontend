import React from 'react';

const Newsletter = () => {
  return (
    <section className="py-5 bg-primary text-white text-center">
      <h2>Subscribe to Our Newsletter</h2>
      <form className="container d-flex justify-content-center mt-3">
        <input type="email" placeholder="Enter your email" className="form-control w-25 me-2" />
        <button className="btn btn-light">Subscribe</button>
      </form>
    </section>
  );
};

export default Newsletter;