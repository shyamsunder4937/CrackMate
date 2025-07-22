

import React, { useState, useRef, useEffect } from 'react';
import { FaBook, FaQuestionCircle, FaUserFriends, FaSearch, FaMagic, FaFileAlt, FaBriefcase } from "react-icons/fa";
import { Bars3Icon, XMarkIcon } from '@heroicons/react/24/outline';
import gsap from 'gsap';


export default function Header() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [featuresOpen, setFeaturesOpen] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  
  React.useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 50) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };
    
    window.addEventListener('scroll', handleScroll);
    
    // Clean up the event listener
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  // Smooth scroll to section by id
  const scrollToSection = (id) => {
    setFeaturesOpen(false);
    setMobileMenuOpen(false);
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
      setTimeout(() => {
        if (window.ScrollTrigger) window.ScrollTrigger.refresh();
      }, 700);
    } else {
      window.location.hash = '#' + id;
      setTimeout(() => {
        const el2 = document.getElementById(id);
        if (el2) {
          el2.scrollIntoView({ behavior: 'smooth' });
          setTimeout(() => {
            if (window.ScrollTrigger) window.ScrollTrigger.refresh();
          }, 700);
        }
      }, 300);
    }
  };
  
  // --- Sliding underline indicator state/refs ---
  const navItems = [
    { label: 'Home', id: 'home' },
    { label: 'Tools', id: 'tools' },
    { label: 'Pricing', id: 'pricing' },
    { label: 'Resources', id: 'resources' },
  ];
  const navRefs = useRef([]);
  const indicatorRef = useRef(null);
  const navContainerRef = useRef(null);
  const [hoveredIdx, setHoveredIdx] = useState(null);

  // Animate indicator to hovered nav item
  const animateIndicator = (idx) => {
    if (navRefs.current[idx] && indicatorRef.current && navContainerRef.current) {
      const navItem = navRefs.current[idx];
      const containerRect = navContainerRef.current.getBoundingClientRect();
      const itemRect = navItem.getBoundingClientRect();
      const left = itemRect.left - containerRect.left;
      const width = itemRect.width;
      gsap.to(indicatorRef.current, {
        x: left,
        width: width,
        opacity: 1,
        duration: 0.35,
        ease: 'power3.out',
      });
    }
  };

  // Hide indicator
  const hideIndicator = () => {
    if (indicatorRef.current) {
      gsap.to(indicatorRef.current, {
        opacity: 0,
        duration: 0.25,
      });
    }
  };

  // On hover change
  useEffect(() => {
    if (hoveredIdx !== null) {
      animateIndicator(hoveredIdx);
    } else {
      hideIndicator();
    }
    // eslint-disable-next-line
  }, [hoveredIdx]);

  // Responsive: update indicator on resize if visible
  useEffect(() => {
    const handleResize = () => {
      if (hoveredIdx !== null) animateIndicator(hoveredIdx);
    };
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
    // eslint-disable-next-line
  }, [hoveredIdx]);
  
  return (
    <header className={
      `w-full flex justify-center py-2 sm:py-4 fixed top-0 z-50 bg-white transition-all duration-300`
    }>
      <nav
        className={
          `
            ${!isScrolled ? 'w-full rounded-none px-1 sm:px-4 py-1 sm:py-2' : 'w-[98%] max-w-7xl rounded-2xl px-2 sm:px-6 md:px-8 py-2 sm:py-3'}
            flex items-center justify-between bg-white text-gray-900 
            ${isScrolled ? 'shadow-lg' : ''}
            transition-all duration-300
          `
        }
      >
        {/* Logo and Brand */}
        <div className="flex items-center space-x-0">
          <a href="/">
            <img
              src="/CircleLogo-removebg-preview.png"
              alt="Crack Mate Logo"
              width={isScrolled ? 32 : 40}
              height={isScrolled ? 32 : 40}
              className={`w-[${isScrolled ? '32px' : '40px'}] sm:w-[${isScrolled ? '36px' : '48px'}] h-auto transition-all duration-300`}
            />
          </a>
          <span className={`font-bold ${isScrolled ? 'text-sm sm:text-base' : 'text-base sm:text-lg'} text-gray-900 transition-all duration-300`}>
            Crack
            <span
              className="font-bold"
              style={{
                background: 'linear-gradient(90deg, #d1d5db 0%, #A8AFB5 50%, #f3f4f6 100%)',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
                display: 'inline-block'
              }}
            >
              Mate
            </span>
          </span>
        </div>
        {/* Hamburger for mobile */}
        <div className="flex items-center sm:hidden">
          <button onClick={() => setMobileMenuOpen(!mobileMenuOpen)} className="p-2 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500">
            {mobileMenuOpen ? (
              <XMarkIcon className="h-7 w-7 text-gray-900" />
            ) : (
              <Bars3Icon className="h-7 w-7 text-gray-900" />
            )}
          </button>
        </div>
        {/* Navigation Links (desktop) */}
        <div
          className="hidden sm:flex items-center space-x-6 md:space-x-8 relative"
          ref={navContainerRef}
        >
          {/* Sliding underline indicator */}
          <div
            ref={indicatorRef}
            style={{
              position: 'absolute',
              bottom: 0,
              left: 0,
              height: '3px',
              width: 0,
              background: 'linear-gradient(90deg, #110F40 0%, #23206a 100%)',
              borderRadius: '2px',
              opacity: 0,
              pointerEvents: 'none',
              zIndex: 20,
              transition: 'none', // gsap handles
            }}
          />
          {/* Home */}
          <a
            href="#"
            className="text-base md:text-lg font-medium text-gray-900 hover:text-blue-900 transition relative"
            ref={el => navRefs.current[0] = el}
            onMouseEnter={() => setHoveredIdx(0)}
            onMouseLeave={() => setHoveredIdx(null)}
          >
            Home
          </a>
          {/* Features Dropdown Parent */}
          <div
            className="relative group"
            ref={el => navRefs.current[1] = el}
            onMouseEnter={() => { setHoveredIdx(1); setFeaturesOpen(true); }}
            onMouseLeave={() => { setHoveredIdx(null); setFeaturesOpen(false); }}
          >
            <button
              className="flex items-center text-base md:text-lg font-medium text-gray-900 hover:text-blue-900 transition focus:outline-none"
              type="button"
              onClick={() => scrollToSection('copilot-section')}
            >
              Tools
              <svg className="ml-1 w-4 h-4 text-gray-500 group-hover:text-blue-900" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" /></svg>
            </button>
            {/* Dropdown */}
            {featuresOpen && (
              <div
                className="absolute left-0 top-full w-64 bg-white rounded-xl shadow-2xl border border-gray-100 z-50 animate-fade-in-up"
                style={{ minWidth: '16rem' }}
              >
                <div className="px-6 pt-4 pb-2 border-b border-gray-100">
                  <span className="block text-xs font-semibold text-blue-700 uppercase tracking-wider mb-1">Tools</span>
                  <span className="block text-sm text-gray-500">Explore CrackMate's powerful tools</span>
                </div>
                <ul className="py-2">
                  <li>
                    <button
                      className="w-full flex items-center gap-3 text-left px-6 py-3 text-gray-900 hover:bg-blue-50 hover:text-blue-900 text-base font-medium transition group"
                      onClick={() => {
                        window.dispatchEvent(new CustomEvent('gotoFeature', { detail: { id: 'pathfinder' } }));
                        setTimeout(() => {
                          const el = document.getElementById('features-section');
                          if (el) {
                            el.scrollIntoView({ behavior: 'smooth' });
                            setTimeout(() => {
                              if (window.ScrollTrigger) window.ScrollTrigger.refresh();
                            }, 700);
                          }
                        }, 100);
                      }}
                    >
                      <FaSearch className="w-5 h-5 text-blue-500 group-hover:scale-110 group-hover:text-blue-700 transition-transform" />
                      Path Finder
                    </button>
                  </li>
                  <li>
                    <button
                      className="w-full flex items-center gap-3 text-left px-6 py-3 text-gray-900 hover:bg-blue-50 hover:text-blue-900 text-base font-medium transition group"
                      onClick={() => {
                        window.dispatchEvent(new CustomEvent('gotoFeature', { detail: { id: 'copilot' } }));
                        setTimeout(() => {
                          const el = document.getElementById('features-section');
                          if (el) {
                            el.scrollIntoView({ behavior: 'smooth' });
                            setTimeout(() => {
                              if (window.ScrollTrigger) window.ScrollTrigger.refresh();
                            }, 700);
                          }
                        }, 100);
                      }}
                    >
                      <FaMagic className="w-5 h-5 text-blue-500 group-hover:scale-110 group-hover:text-blue-700 transition-transform" />
                      Copilot
                    </button>
                  </li>
                  <li>
                    <button
                      className="w-full flex items-center gap-3 text-left px-6 py-3 text-gray-900 hover:bg-blue-50 hover:text-blue-900 text-base font-medium transition group"
                      onClick={() => {
                        window.dispatchEvent(new CustomEvent('gotoFeature', { detail: { id: 'resumepro' } }));
                        setTimeout(() => {
                          const el = document.getElementById('features-section');
                          if (el) {
                            el.scrollIntoView({ behavior: 'smooth' });
                            setTimeout(() => {
                              if (window.ScrollTrigger) window.ScrollTrigger.refresh();
                            }, 700);
                          }
                        }, 100);
                      }}
                    >
                      <FaFileAlt className="w-5 h-5 text-blue-500 group-hover:scale-110 group-hover:text-blue-700 transition-transform" />
                      ResumePro
                    </button>
                  </li>
                  <li>
                    <button
                      className="w-full flex items-center gap-3 text-left px-6 py-3 text-gray-900 hover:bg-blue-50 hover:text-blue-900 text-base font-medium transition group"
                      onClick={() => {
                        window.dispatchEvent(new CustomEvent('gotoFeature', { detail: { id: 'jobscan' } }));
                        setTimeout(() => {
                          const el = document.getElementById('features-section');
                          if (el) {
                            el.scrollIntoView({ behavior: 'smooth' });
                            setTimeout(() => {
                              if (window.ScrollTrigger) window.ScrollTrigger.refresh();
                            }, 700);
                          }
                        }, 100);
                      }}
                    >
                      <FaBriefcase className="w-5 h-5 text-blue-500 group-hover:scale-110 group-hover:text-blue-700 transition-transform" />
                      JobScan
                    </button>
                  </li>
                </ul>
              </div>
            )}
          </div>
          {/* Pricing */}
          <a
            href="#"
            className="text-base md:text-lg font-medium text-gray-900 hover:text-blue-900 transition relative"
            ref={el => navRefs.current[2] = el}
            onMouseEnter={() => setHoveredIdx(2)}
            onMouseLeave={() => setHoveredIdx(null)}
          >
            Pricing
          </a>
          {/* Resources Dropdown */}
          <div
            className="relative group"
            ref={el => navRefs.current[3] = el}
            onMouseEnter={() => setHoveredIdx(3)}
            onMouseLeave={() => setHoveredIdx(null)}
          >
            <button className="flex items-center text-base md:text-lg font-medium text-gray-900 hover:text-blue-900 transition focus:outline-none">
              Resources
              <svg className="ml-1 w-4 h-4 text-gray-500 group-hover:text-blue-900" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" /></svg>
            </button>
            {/* Resources Dropdown */}
            <div className="absolute left-0 top-full w-80 bg-white rounded-xl shadow-2xl border border-gray-100 z-50 hidden group-hover:block animate-fade-in-up" style={{ minWidth: '20rem' }}>
              <div className="flex flex-col gap-4 p-5">
                <div className="flex items-start gap-3">
                  <FaBook className="text-indigo-500 text-xl mt-1" />
                  <div>
                    <div className="font-semibold">Blog</div>
                    <div className="text-xs text-gray-500">Discover the latest industry news, updates and information.</div>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <FaQuestionCircle className="text-indigo-500 text-xl mt-1" />
                  <div>
                    <div className="font-semibold flex items-center gap-2">
                      Help Center
                      <span className="bg-indigo-100 text-indigo-600 text-[10px] font-bold px-2 py-0.5 rounded-full ml-1">NEW</span>
                    </div>
                    <div className="text-xs text-gray-500">All the boring stuff that you (hopefully won't) need.</div>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <FaUserFriends className="text-indigo-500 text-xl mt-1" />
                  <div>
                    <div className="font-semibold">Testimonials</div>
                    <div className="text-xs text-gray-500">Discover success stories from our users.</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        {/* Start for free Button (desktop) */}
        <div className="hidden sm:block">
          <a href="#" className="bg-[#110F40] hover:bg-[#23206a] text-white font-bold px-5 md:px-6 py-2 rounded-xl shadow transition text-base md:text-lg">Start for free</a>
        </div>
        {/* Mobile menu */}
        {mobileMenuOpen && (
          <div className="absolute top-full left-0 w-full bg-white shadow-2xl rounded-b-2xl z-50 flex flex-col items-start px-4 py-4 sm:hidden animate-fade-in-up">
            <a href="#" className="text-base font-medium text-gray-900 hover:text-blue-900 transition py-2 w-full">Home</a>
            <div className="w-full">
              <button
                className="flex items-center text-base font-medium text-gray-900 hover:text-blue-900 transition focus:outline-none w-full py-2"
                onClick={() => setFeaturesOpen(!featuresOpen)}
              >
                Tools
                <svg className="ml-1 w-4 h-4 text-gray-500" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" /></svg>
              </button>
              {featuresOpen && (
                <div className="pl-4">
                  <button className="block text-left py-2 text-gray-900 hover:text-blue-900 w-full" onClick={() => { window.dispatchEvent(new CustomEvent('gotoFeature', { detail: { id: 'pathfinder' } })); setTimeout(() => { const el = document.getElementById('features-section'); if (el) { el.scrollIntoView({ behavior: 'smooth' }); setTimeout(() => { if (window.ScrollTrigger) window.ScrollTrigger.refresh(); }, 700); } }, 100); setMobileMenuOpen(false); }}>Path Finder</button>
                  <button className="block text-left py-2 text-gray-900 hover:text-blue-900 w-full" onClick={() => { window.dispatchEvent(new CustomEvent('gotoFeature', { detail: { id: 'copilot' } })); setTimeout(() => { const el = document.getElementById('features-section'); if (el) { el.scrollIntoView({ behavior: 'smooth' }); setTimeout(() => { if (window.ScrollTrigger) window.ScrollTrigger.refresh(); }, 700); } }, 100); setMobileMenuOpen(false); }}>Copilot</button>
                  <button className="block text-left py-2 text-gray-900 hover:text-blue-900 w-full" onClick={() => { window.dispatchEvent(new CustomEvent('gotoFeature', { detail: { id: 'resumepro' } })); setTimeout(() => { const el = document.getElementById('features-section'); if (el) { el.scrollIntoView({ behavior: 'smooth' }); setTimeout(() => { if (window.ScrollTrigger) window.ScrollTrigger.refresh(); }, 700); } }, 100); setMobileMenuOpen(false); }}>ResumePro</button>
                  <button className="block text-left py-2 text-gray-900 hover:text-blue-900 w-full" onClick={() => { window.dispatchEvent(new CustomEvent('gotoFeature', { detail: { id: 'jobscan' } })); setTimeout(() => { const el = document.getElementById('features-section'); if (el) { el.scrollIntoView({ behavior: 'smooth' }); setTimeout(() => { if (window.ScrollTrigger) window.ScrollTrigger.refresh(); }, 700); } }, 100); setMobileMenuOpen(false); }}>JobScan</button>
                </div>
              )}
            </div>
            <a href="#" className="text-base font-medium text-gray-900 hover:text-blue-900 transition py-2 w-full">Pricing</a>
            <a href="#" className="text-base font-medium text-gray-900 hover:text-blue-900 transition py-2 w-full">Resources</a>
            <a href="#" className="bg-[#110F40] hover:bg-[#A8AFB5] text-white font-bold px-5 py-2 rounded-xl shadow transition text-base mt-2 w-full text-center">Start for free</a>
          </div>
        )}
      </nav>
    </header>
  );
}