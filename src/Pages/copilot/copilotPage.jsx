import React, { useRef, useLayoutEffect } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { FaCrown, FaRegClock } from 'react-icons/fa';

const tools = [
  {
    logo: "PathFinder",
    title: "AI Learning Scheduler",
    desc: "Personalized, adaptive day-wise job prep plan with built-in practice & real-time progress tracking.",
    button: "Learn More"
  },
  {
    logo: "Copilot",
    title: "Real-time Interview Assistant",
    desc: "Voice Q&A, screenshot solving, and resume-aware answers — your instant AI companion for interviews.",
    button: "Try Copilot"
  },
  {
    logo: "ResumePro",
    title: "AI Resume Builder",
    desc: "Create ATS-optimized resumes with analytics, suggestions, and modern templates.",
    button: "Build Resume"
  },
  {
    logo: "JobScan",
    title: "Smart Job Finder",
    desc: "AI scans global jobs, matches to your profile, and sends daily personalized alerts.",
    button: "Find Jobs"
  }
];

const CopilotPage = () => {
  const topSectionRef = useRef(null);
  const cardsRef = useRef([]);

  useLayoutEffect(() => {
    gsap.registerPlugin(ScrollTrigger);
    let ctx = gsap.context(() => {
      // Top section animation
      if (topSectionRef.current) {
        gsap.from(topSectionRef.current, {
          opacity: 0,
          y: 40,
          duration: 1,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: topSectionRef.current,
            start: 'top 80%',
            toggleActions: 'play reverse play reverse',
          },
        });
      }

      // Cards animation: animate each card individually
      cardsRef.current.forEach((card, idx) => {
        if (card) {
          gsap.from(card, {
            opacity: 0,
            y: 60,
            duration: 1,
            delay: idx * 0.15,
            ease: 'power3.out',
            scrollTrigger: {
              trigger: card,
              start: 'top 85%',
              toggleActions: 'play reverse play reverse',
            },
          });
        }
      });

      // Refresh ScrollTrigger after mount/layout
      ScrollTrigger.refresh();
    });

    return () => ctx.revert();
  }, []);

  return (
    <div id="copilot-section" className="w-full min-h-screen flex flex-col items-center justify-center bg-white py-8 md:py-16 px-2 sm:px-4">
      {/* Top Section */}
      <div ref={topSectionRef} className="w-full flex flex-col items-center mb-8 md:mb-12 px-2 max-w-2xl md:max-w-3xl lg:max-w-4xl mx-auto">
        <span className="px-3 py-1 rounded-full bg-[#A8AFB5] text-[#110F40] text-sm md:text-base font-semibold mb-3 md:mb-4">Core Technology</span>
        <h1 className="text-2xl sm:text-3xl md:text-5xl font-extrabold text-center text-[#110F40] mb-3 md:mb-4 leading-tight">How CrackMate AI Tools Works?</h1>
        <p className="text-[#A8AFB5] text-center text-base sm:text-lg max-w-xs sm:max-w-xl md:max-w-2xl">Get real-time, personalized coaching tailored to your resume, job description, and company</p>
      </div>
      {/* Cards Section */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-12 w-full max-w-md sm:max-w-2xl md:max-w-3xl lg:max-w-4xl xl:max-w-5xl mx-auto">
        {tools.map((tool, idx) => (
          <div
            key={tool.title}
            id={tool.logo.toLowerCase()}
            ref={el => (cardsRef.current[idx] = el)}
            className="relative rounded-2xl overflow-hidden shadow-xl min-h-[260px] flex flex-col justify-between bg-[#A8AFB5]/30 border-[#A8AFB5] border group"
          >
            {/* Logo & Content */}
            <div className="p-6">
              <span className="text-[#110F40] text-2xl font-extrabold">{tool.logo}</span>
              <h3 className="text-[#110F40] text-xl font-semibold mt-2">{tool.title}</h3>
              <p className="text-[#110F40] mt-2 text-base opacity-80">{tool.desc}</p>
            </div>
            <div className="p-6 pt-0">
              {idx === 0 ? (
                <div className="relative group inline-block">
                  <span className="absolute left-1/2 -translate-x-1/2 -top-8 px-3 py-1 rounded bg-gray-900 text-white text-xs opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none z-20 whitespace-nowrap shadow-lg">
                    Launching soon!
                  </span>
                  <button
                    className="flex items-center gap-2 bg-gradient-to-r from-yellow-400 via-yellow-500 to-yellow-600 text-white font-bold px-5 py-2 rounded-lg shadow-lg border-2 border-yellow-400 hover:from-yellow-500 hover:to-yellow-700 transition relative focus:outline-none focus:ring-2 focus:ring-yellow-400 focus:ring-offset-2 animate-pulse"
                    aria-label="Premium PathFinder"
                  >
                    <FaCrown className="text-white drop-shadow mr-1" />
                    FlagShip Tool
                    <svg width="20" height="20" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" /></svg>
                  </button>
                </div>
              ) : (
                <div className="relative group inline-block">
                  <span className="absolute left-1/2 -translate-x-1/2 -top-8 px-3 py-1 rounded bg-gray-900 text-white text-xs opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none z-20 whitespace-nowrap shadow-lg">
                    Launching soon!
                  </span>
                  <button
                    className="flex items-center gap-2 bg-gradient-to-r from-blue-400 via-blue-500 to-blue-700 text-white font-bold px-5 py-2 rounded-lg shadow-lg border-2 border-blue-400 hover:from-blue-500 hover:to-blue-800 transition relative focus:outline-none focus:ring-2 focus:ring-blue-400 focus:ring-offset-2 animate-pulse"
                    aria-label="Coming Soon"
                    tabIndex="-1"
                    disabled
                  >
                    <FaRegClock className="text-white mr-1" />
                    Coming Soon
                    <span className="ml-2 w-2 h-2 bg-white rounded-full animate-pulse shadow-[0_0_8px_2px_rgba(59,130,246,0.5)]"></span>
                  </button>
                </div>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default CopilotPage;
