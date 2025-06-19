import React from 'react';
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
      <HeroSection />
      <Services/>
      <TechStack />
      <WhyChooseUs />
      <Portfolio/>
      <BlogsSection/>
      <VideoLearning/>
      <StatsSection />
      
      <CTASection/>
    </>
  );
};

export default Home;