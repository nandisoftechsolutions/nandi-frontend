import React from 'react';

const Newsletter = () => {
  return (
    <section className="py-5 bg-primary text-white text-center">
      <div className="container">
        <h2>Subscribe to Our Newsletter</h2>
        <form
          className="row justify-content-center align-items-center mt-4"
          onSubmit={(e) => e.preventDefault()}
        >
          <div className="col-md-4 col-sm-8 col-10 mb-2 mb-md-0">
            <label htmlFor="newsletterEmail" className="visually-hidden">
              Email Address
            </label>
            <input
              type="email"
              id="newsletterEmail"
              placeholder="Enter your email"
              className="form-control"
              required
            />
          </div>
          <div className="col-auto">
            <button type="submit" className="btn btn-light px-4">
              Subscribe
            </button>
          </div>
        </form>
      </div>
    </section>
  );
};

export default Newsletter;
