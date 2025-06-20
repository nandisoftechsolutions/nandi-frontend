import React from 'react';
import { useParams, useNavigate } from 'react-router-dom';
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
      content: `React.js is a popular JavaScript library for building user interfaces. It allows you to build reusable UI components...`,
    },
    {
      id: '2',
      title: 'Node.js API Design',
      date: '2025-05-10',
      category: 'Node.js',
      content: `When designing APIs with Node.js, it’s important to consider REST principles...`,
    },
    {
      id: '3',
      title: 'UI/UX Trends 2025',
      date: '2025-05-15',
      category: 'Design',
      content: `In 2025, UI/UX design focuses heavily on minimalism, accessibility, and immersive experiences...`,
    },
    {
      id: '4',
      title: 'SEO Tips for Startups',
      date: '2025-05-20',
      category: 'Marketing',
      content: `SEO is crucial for startups to gain visibility online. Key tips include keyword research, on-page SEO...`,
    },
  ];

  const blog = blogs.find(b => b.id === id);

  if (!blog) {
    return React.createElement(
      'div',
      { className: 'container py-5' },
      React.createElement('h2', null, 'Blog not found'),
      React.createElement(
        'button',
        { className: 'btn btn-primary mt-3', onClick: () => navigate('/blogs') },
        'Back to Blogs'
      )
    );
  }

  return React.createElement(
    'div',
    { className: 'container py-5' },
    React.createElement('h1', { className: 'mb-3' }, blog.title),
    React.createElement('p', { className: 'text-muted' }, `${blog.category} | ${new Date(blog.date).toLocaleDateString()}`),
    React.createElement('hr'),
    React.createElement('p', null, blog.content),
    React.createElement(
      'button',
      { className: 'btn btn-secondary mt-4', onClick: () => navigate('/blogs') },
      'Back to Blogs'
    )
  );
}

export default BlogDetail;
