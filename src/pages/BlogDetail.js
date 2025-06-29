import React from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min.js';

function BlogDetail() {
  const { id } = useParams();
  const navigate = useNavigate();

  const blogs = [
    {
      id: '1',
      title: 'React Basics',
      date: '2025-05-01',
      category: 'React',
      content: `React.js is a popular JavaScript library for building user interfaces. It allows you to build reusable UI components and manage complex state easily. In this article, we'll cover the basics of React including components, props, and state.`,
    },
    {
      id: '2',
      title: 'Node.js API Design',
      date: '2025-05-10',
      category: 'Node.js',
      content: `When designing APIs with Node.js, it’s important to consider REST principles, scalability, and security. This blog post walks through best practices for setting up Express routers, middleware, and error handling.`,
    },
    {
      id: '3',
      title: 'UI/UX Trends 2025',
      date: '2025-05-15',
      category: 'Design',
      content: `In 2025, UI/UX design focuses heavily on minimalism, accessibility, and immersive experiences. Learn about the latest tools and methodologies to keep your designs ahead of the curve.`,
    },
    {
      id: '4',
      title: 'SEO Tips for Startups',
      date: '2025-05-20',
      category: 'Marketing',
      content: `SEO is crucial for startups to gain visibility online. Key tips include keyword research, on-page SEO optimization, backlink strategies, and leveraging social signals.`,
    },
  ];

  const blog = blogs.find(b => b.id === id);

  if (!blog) {
    return (
      <div className="container py-5 text-center">
        <Helmet>
          <title>Blog Not Found | Nandi Softech Solutions</title>
          <meta
            name="description"
            content="The blog post you're looking for does not exist. Visit our blog page to explore more articles."
          />
        </Helmet>
        <h2 className="mb-3">Blog Not Found</h2>
        <button
          className="btn btn-primary mt-3"
          onClick={() => navigate('/blogs')}
        >
          Back to Blogs
        </button>
      </div>
    );
  }

  return (
    <div className="container py-5">
      <Helmet>
        <title>{`${blog.title} | Nandi Softech Solutions`}</title>
        <meta
          name="description"
          content={`${blog.content.slice(0, 150)}...`}
        />
      </Helmet>
      <h1 className="mb-3">{blog.title}</h1>
      <p className="text-muted">
        {blog.category} | {new Date(blog.date).toLocaleDateString()}
      </p>
      <hr />
      <p>{blog.content}</p>
      <button
        className="btn btn-secondary mt-4"
        onClick={() => navigate('/blogs')}
      >
        Back to Blogs
      </button>
    </div>
  );
}

export default BlogDetail;
