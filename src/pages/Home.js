import React, { Suspense, lazy } from 'react';
import { Helmet } from 'react-helmet-async';

// Lazy load all sections for performance optimization
const HeroSection = lazy(() => import('../sections/HeroSection'));
const WhyChooseUs = lazy(() => import('../sections/WhyChooseUs'));
const StatsSection = lazy(() => import('../sections/StatsSection'));
const TechStack = lazy(() => import('../sections/TechStack'));
const VideoLearning = lazy(() => import('../sections/VideoLearning'));
const CTASection = lazy(() => import('../sections/CTASection'));
const Services = lazy(() => import('../sections/Services'));
const Portfolio = lazy(() => import('../sections/Portfolio'));
const BlogsSection = lazy(() => import('../sections/BlogsSection'));

const Home = () => {
  return (
    <>
      <Helmet>
        <title>Home | Nandi Softech Solutions</title>
        <meta
          name="description"
          content="Nandi Softech Solutions specializes in software development, testing, automation, and offers top-quality online courses to help your business and skills grow."
        />
        <link rel="canonical" href="https://nandisoftechsolutions.in/" />
      </Helmet>

      {/* Hidden H1 tag for SEO */}
      <h1 style={{ position: 'absolute', left: '-9999px' }}>
        Welcome to Nandi Softech Solutions – Software Development, Testing & Training Services
      </h1>

      {/* Suspense fallback loader */}
      <Suspense fallback={<div className="text-center p-5">Loading...</div>}>
        <HeroSection />
        <Services />
        <TechStack />
        <WhyChooseUs />
        <Portfolio />
        <BlogsSection />
        <VideoLearning />
        <StatsSection />
        <CTASection />
      </Suspense>
    </>
  );
};

export default Home;
