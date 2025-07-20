import React from 'react';
import { Helmet } from 'react-helmet-async';

import HeroSection from '../sections/HeroSection';
import WhyChooseUs from '../sections/WhyChooseUs';
import StatsSection from '../sections/StatsSection';
import TechStack from '../sections/TechStack';
import VideoLearning from '../sections/VideoLearning';
import CTASection from '../sections/CTASection';
import Services from '../sections/Services';
import Portfolio from '../sections/Portfolio';
import BlogsSection from '../sections/BlogsSection';

const Home = () => {
  return (
    <>
      <Helmet>
        <title>Home | Nandi Softech Solutions</title>
        <meta
          name="description"
          content="Nandi Softech Solutions specializes in software development, testing, automation, and offers top-quality online courses to help your business and skills grow."
        />
      </Helmet>

      {/* H1 tag for SEO improvement */}
      <h1 style={{ position: 'absolute', left: '-9999px' }}>
        Welcome to Nandi Softech Solutions – Software Development, Testing & Training Services
      </h1>

      <HeroSection />
      <Services />
      <TechStack />
      <WhyChooseUs />
      <Portfolio />
      <BlogsSection />
      <VideoLearning />
      <StatsSection />
      <CTASection />
    </>
  );
};

export default Home;
