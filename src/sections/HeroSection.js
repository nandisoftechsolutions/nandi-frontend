import React, { useState, useEffect } from 'react';
import './HeroSection.css';
import videoBg from '../assets/video/bghero.mp4';

import gearImg from '../assets/sections/gear.png';
import heartImg from '../assets/heart.png';
import heroImg from '../assets/servicehero.png';
import bgImg1 from '../assets/bgimage/bg.png';
import bgImg2 from '../assets/bgimage/bg10.png';
import bgImg3 from '../assets/bgimage/bg11.png';
import bgImg4 from '../assets/bgimage/bg12.png';

const bgImages = [gearImg, heartImg, heroImg, bgImg1, bgImg2, bgImg3, bgImg4];

const contentSlides = [
  {
    title: 'Welcome to Nandi Softech',
    subtitle: 'Innovative Software Development & Professional Testing Services',
    button: 'Get Started',
  },
  {
    title: 'We Build Business Software',
    subtitle: 'ERP Systems, Billing Apps, School & Shop Management, Custom CRM',
    button: 'Explore Services',
  },
  {
    title: 'Practical IT Courses for Everyone',
    subtitle: 'Learn Full Stack Development, Software Testing, and Cloud Tools with Real Projects',
    button: 'Join Courses',
  },
  {
    title: 'Learn From Industry Experts',
    subtitle: 'Trainers with 5+ Years of Experience in IT, Live Mentorship, Interview Preparation & Internships',
    button: 'Start Learning',
  },
  {
    title: 'Affordable Tech for Small Businesses',
    subtitle: 'Digitize Your Business With Our Custom Software — No Big Budgets Required',
    button: 'Talk to Us',
  },
  {
    title: 'Career-Focused Learning Paths',
    subtitle: 'From Basics to Advanced, Get Certified and Job-Ready — Even Without Prior Experience',
    button: 'View Roadmap',
  },
  {
    title: 'Support After Training',
    subtitle: 'We Help You With Resume Building, Mock Interviews, Freelance Projects, and Placement',
    button: 'Let’s Begin',
  },
];

const HeroSection = () => {
  const [showImage, setShowImage] = useState(false);
  const [currentIndex, setCurrentIndex] = useState(0);

  // Show image after video ends or timeout
  useEffect(() => {
    const timer = setTimeout(() => {
      setShowImage(true);
    }, 6000);
    return () => clearTimeout(timer);
  }, []);

  // Slide images and content
  useEffect(() => {
    let interval;
    if (showImage) {
      interval = setInterval(() => {
        setCurrentIndex((prev) => (prev + 1) % bgImages.length);
      }, 6000);
    }
    return () => clearInterval(interval);
  }, [showImage]);

  const currentContent = contentSlides[currentIndex] || {};

  return (
    <div className="hero-section position-relative">
      {!showImage && (
        <video
          className="hero-video"
          src={videoBg}
          autoPlay
          muted
          playsInline
          onEnded={() => setShowImage(true)}
        />
      )}

      {/* Dark overlay always on top */}
      <div className="overlay-dark" />

      {/* Background image shown after video */}
      <div
        className={`overlay-bg-image ${showImage ? 'visible' : 'hidden'}`}
        style={{ backgroundImage: `url(${bgImages[currentIndex]})` }}
      />

      <div className="hero-content text-center text-white">
        <h1 className="hero-title" style={{ visibility: showImage ? 'visible' : 'hidden' }}>
          {currentContent.title}
        </h1>

        {showImage && (
          <>
            <p className="hero-subtitle">{currentContent.subtitle}</p>
            <button className="atc-btn btn btn-light mt-3">{currentContent.button}</button>
          </>
        )}
      </div>
    </div>
  );
};

export default HeroSection;
