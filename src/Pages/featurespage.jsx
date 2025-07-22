import React, { useState, useRef, useEffect } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
gsap.registerPlugin(ScrollTrigger);

const tabs = [
  { label: 'PathFinder ' },
  { label: 'Copilot' },
  { label: 'ResumePro ' },
  { label: 'JobScan ' },
];

const featuresContent = [
  {
    title: 'PathFinder',
    heading: 'Your AI strategist — from goal to offer',
    description: 'Automatic learning scheduler, adaptive rescheduling, integrated practice, dashboard, job alerts, and deep integration with Copilot & ResumePro.',
    image: '/logos/CircleLogo.png',
  },
  {
    title: 'Copilot',
    heading: 'AI by your side, whenever you need',
    description: 'Real-time desktop companion for voice Q&A, screenshot solving, resume-aware answers, beautiful UI, and privacy-first design.',
    image: '/logos/zoom.jpeg',
  },
  {
    title: 'ResumePro',
    heading: 'Craft resumes that get seen — and selected',
    description: 'Build ATS-beating resumes with AI, analytics, and personalized suggestions for your target job and skills.',
    image: '/logos/google.jpeg',
  },
  {
    title: 'JobScan',
    heading: 'Opportunities find you',
    description: 'AI job scanner with global search, personalized alerts, daily notifications, and smart filtering for your dream roles.',
    image: '/logos/skype.jpeg',
  },
];

const FeaturesPage = () => {
  const [activeTab, setActiveTab] = useState(0); // Default to 'PathFinder'
  const featureSectionRef = useRef(null);
  const textRef = useRef(null);
  const imageRef = useRef(null);
  const containerRef = useRef(null);

  // Set active tab based on URL hash
  useEffect(() => {
    const handleHashChange = () => {
      const hash = window.location.hash.replace('#', '');
      const idx = sectionIds.indexOf(hash);
      if (idx !== -1) setActiveTab(idx);
    };
    handleHashChange(); // On mount
    window.addEventListener('hashchange', handleHashChange);
    return () => window.removeEventListener('hashchange', handleHashChange);
  }, []);

  useEffect(() => {
    const handleGotoFeature = (e) => {
      const { id } = e.detail;
      const idx = sectionIds.indexOf(id);
      if (idx !== -1) {
        setActiveTab(idx);
        setTimeout(() => {
          const el = document.getElementById(id);
          if (el) el.scrollIntoView({ behavior: 'smooth' });
        }, 100);
      }
    };
    window.addEventListener('gotoFeature', handleGotoFeature);
    return () => window.removeEventListener('gotoFeature', handleGotoFeature);
  }, []);

  // Scroll-triggered animation for the whole section
  useEffect(() => {
    if (containerRef.current) {
      gsap.fromTo(
        containerRef.current,
        { y: 60, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 1,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: containerRef.current,
            start: 'top 80%',
            toggleActions: 'play reverse play reverse',
          },
        }
      );
    }
  }, []);

  useEffect(() => {
    if (featureSectionRef.current && textRef.current && imageRef.current) {
      gsap.fromTo(
        textRef.current,
        { x: -60, opacity: 0 },
        { x: 0, opacity: 1, duration: 0.8, ease: 'power3.out', delay: 0.1 }
      );
      gsap.fromTo(
        imageRef.current,
        { x: 60, opacity: 0 },
        { x: 0, opacity: 1, duration: 0.8, ease: 'power3.out', delay: 0.3 }
      );
    }
  }, [activeTab]);

  const sectionIds = ['pathfinder', 'copilot', 'resumepro', 'jobscan'];
  const { heading, description, image } = featuresContent[activeTab];

  return (
    <div
      ref={containerRef}
      id="features-section"
      className="w-full min-h-screen bg-white flex flex-col items-center pt-12 px-2 md:px-0"
    >
      {/* Section Title */}
      <span className="inline-block mb-2 px-4 py-1 rounded-full bg-purple-50 text-purple-500 text-base font-semibold">CrackMate Suite Features</span>
      {/* Main Heading */}
      <h1 className="text-3xl md:text-4xl font-bold text-center mb-2">What CrackMate Offers</h1>
      {/* Subtitle */}
      <p className="text-gray-500 text-lg text-center max-w-2xl mb-8">
        All-in-one AI tools for learning, practicing, resume building, and job search.
      </p>
      {/* Tabs */}
      <div className="flex flex-wrap justify-center gap-2 md:gap-4 mb-10 overflow-x-auto w-full max-w-full scrollbar-hide">
        {tabs.map((tab, idx) => (
          <button
            key={tab.label}
            onClick={() => setActiveTab(idx)}
            className={`px-4 sm:px-6 py-2 rounded-full text-base sm:text-lg font-medium transition-all border border-gray-200 focus:outline-none min-w-[120px] sm:min-w-[0] ${
              activeTab === idx
                ? 'bg-indigo-600 text-white shadow-md'
                : 'bg-white text-gray-700 hover:bg-gray-100'
            }`}
          >
            {tab.label}
          </button>
        ))}
      </div>
      {/* Feature Sections: Render all, only show active visually */}
      <div className="relative w-full flex flex-col items-center">
        {featuresContent.map((feature, idx) => (
          <div
            key={feature.title}
            id={sectionIds[idx]}
            ref={activeTab === idx ? featureSectionRef : null}
            className={`w-full max-w-5xl scroll-mt-100 ${activeTab === idx ? 'relative opacity-100 pointer-events-auto' : 'absolute opacity-0 pointer-events-none'} transition-all duration-300`}
            style={{ top: 0, left: 0 }}
          >
            <div className="flex flex-col md:flex-row items-center justify-center bg-white rounded-2xl shadow-lg p-4 sm:p-6 md:p-12 gap-4 sm:gap-8">
              {/* Left: Text */}
              <div ref={activeTab === idx ? textRef : null} className="flex-1 flex flex-col items-start justify-center text-left w-full">
                <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold mb-3 sm:mb-4 leading-tight">{feature.heading}</h2>
                <p className="text-gray-500 text-base sm:text-lg mb-3 sm:mb-4 max-w-md">{feature.description}</p>
                <button className="bg-[#110F40] hover:bg-[#A8AFB5] text-white font-semibold px-4 sm:px-6 py-3 rounded-xl text-base shadow mb-3 sm:mb-4 w-full sm:w-auto transition-all">
                  Try {feature.title}
                </button>
              </div>
              {/* Right: Image */}
              <div ref={activeTab === idx ? imageRef : null} className="flex-1 flex items-center justify-center w-full mt-2 md:mt-0">
                <div className="bg-gray-100 rounded-xl p-2 sm:p-4 shadow-inner w-full max-w-xs sm:max-w-md">
                  <img
                    src={feature.image}
                    alt={feature.heading}
                    className="w-full h-auto object-contain rounded-lg max-h-48 sm:max-h-72"
                  />
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default FeaturesPage;