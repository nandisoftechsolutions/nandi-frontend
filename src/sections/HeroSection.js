import React, { useState, useEffect } from 'react';
import './HeroSection.css';
import videoBg from '../assets/video/bghero.mp4';

const bgImages = [
  require('../assets/sections/gear.png'),
  require('../assets/heart.png'),
  require('../assets/servicehero.png'),
  require('../assets/bgimage/bg.png'),
  require('../assets/bgimage/bg10.png'),
  require('../assets/bgimage/bg11.png'),
  require('../assets/bgimage/bg12.png'),
];

const contentSlides = [
  {
    title: "Welcome to Nandi Softech",
    subtitle: "Innovative Software and Testing Solutions",
    button: "Get Started",
  },
  {
    title: "We Build Business Software",
    subtitle: "Custom ERP, Billing, Inventory & Automation Tools",
    button: "Explore Services",
  },
  {
    title: "We Teach Modern Tech",
    subtitle: "Join Our Courses in Web Development, Testing, and AI",
    button: "Join Courses",
  },
  {
    title: "Affordable IT for Every Business",
    subtitle: "From Schools to Shops, We Build Digital Solutions",
    button: "Talk to Us",
  },
  {
    title: "Learn Coding With Us",
    subtitle: "We Start With Scratch, We Provide Certifications",
    button: "Let's Create",
  },
];

const HeroSection = () => {
  const [showImage, setShowImage] = useState(false);
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const videoTimer = setTimeout(() => {
      setShowImage(true);
    }, 6000); // after 6s, start images

    return () => clearTimeout(videoTimer);
  }, []);

  useEffect(() => {
    let imageInterval;
    if (showImage) {
      imageInterval = setInterval(() => {
        setCurrentIndex((prevIndex) => (prevIndex + 1) % bgImages.length);
      }, 6000);
    }
    return () => clearInterval(imageInterval);
  }, [showImage]);

  const currentContent = contentSlides[currentIndex] || {};

  return (
    <div className="hero-section">
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

      <div className="overlay-dark" />

      {showImage && (
        <>
          <div
            className="overlay-bg-image"
            style={{
              backgroundImage: `url(${bgImages[currentIndex]})`,
            }}
          />

          <div className="hero-content">
            <h1 className="hero-title">{currentContent?.title}</h1>
            <p className="hero-subtitle">{currentContent?.subtitle}</p>
            <button className="atc-btn">{currentContent?.button}</button>
          </div>
        </>
      )}
    </div>
  );
};

export default HeroSection;
