import React, { useRef, useEffect, useState, useLayoutEffect } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

const logos = [
  { src: "/logos/CircleLogo.png", alt: "Microsoft Teams" },
  { src: "/logos/zoom.jpeg", alt: "Zoom" },
  { src: "/logos/google.jpeg", alt: "Amazon Chime" },
  { src: "/logos/skype.jpeg", alt: "Skype" },
  { src: "/logos/_Google Meet.jpeg", alt: "Google Meet" },
];

const statsData = [
  { value: 95, label: 'Interview Success Rate', suffix: '%' },
  { value: 500000, label: 'Successful Interviews', suffix: '+' },
  { value: 25000, label: 'Job Offers', suffix: '+' },
];

const Homepage = () => {
  const marqueeRef = useRef(null);
  const setRef = useRef(null);
  const [repeatCount, setRepeatCount] = useState(2);
  const sectionRef = useRef(null);
  const mainContentRef = useRef(null);
  const leftColRef = useRef(null);
  const rightColRef = useRef(null);
  const statsRowRef = useRef(null);
  const logosRowRef = useRef(null);
  const headingRef = useRef(null);
  const paraRef = useRef(null);
  const buttonRef = useRef(null);
  const statNumRefs = useRef([]);
  const logoImgRefs = useRef([]);

  useLayoutEffect(() => {
    gsap.registerPlugin(ScrollTrigger);
    let ctx = gsap.context(() => {
      // Main section fade/slide
      gsap.fromTo(
        sectionRef.current,
        { y: -100, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 1,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: sectionRef.current,
            start: 'top 80%',
            toggleActions: 'play reverse play reverse',
          },
        }
      );
      // Staggered left column: heading, para, button
      gsap.from([
        headingRef.current,
        paraRef.current,
        buttonRef.current
      ], {
        opacity: 0,
        y: 40,
        duration: 0.8,
        stagger: 0.15,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: leftColRef.current,
          start: 'top 85%',
          toggleActions: 'play reverse play reverse',
        },
      });
      // Parallax/scale effect for right card
      gsap.fromTo(
        rightColRef.current,
        { scale: 0.92, opacity: 0 },
        {
          scale: 1,
          opacity: 1,
          duration: 1,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: rightColRef.current,
            start: 'top 90%',
            toggleActions: 'play reverse play reverse',
          },
        }
      );
      // Stats row: count up numbers
      statNumRefs.current.forEach((el, idx) => {
        if (el) {
          let obj = { val: 0 };
          gsap.to(obj, {
            val: statsData[idx].value,
            duration: 1.2,
            ease: 'power3.out',
            scrollTrigger: {
              trigger: el,
              start: 'top 95%',
              toggleActions: 'play reverse play reverse',
              onUpdate: () => {
                el.textContent =
                  statsData[idx].suffix === '%'
                    ? `${Math.round(obj.val)}%`
                    : statsData[idx].suffix === '+'
                    ? `${Math.round(obj.val).toLocaleString()}+`
                    : Math.round(obj.val);
              },
            },
            onUpdate: () => {
              el.textContent =
                statsData[idx].suffix === '%'
                  ? `${Math.round(obj.val)}%`
                  : statsData[idx].suffix === '+'
                  ? `${Math.round(obj.val).toLocaleString()}+`
                  : Math.round(obj.val);
            },
          });
        }
      });
      // Logos row: staggered fade/slide in
      gsap.from(logoImgRefs.current, {
        opacity: 0,
        y: 30,
        duration: 0.7,
        stagger: 0.12,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: logosRowRef.current,
          start: 'top 95%',
          toggleActions: 'play reverse play reverse',
        },
      });
      ScrollTrigger.refresh();
    });
    return () => ctx.revert();
  }, []);

  useEffect(() => {
    function updateRepeat() {
      if (marqueeRef.current && setRef.current) {
        const containerWidth = marqueeRef.current.offsetWidth;
        const setWidth = setRef.current.offsetWidth;
        // Ensure the row is at least twice as wide as the container for a seamless loop
        const minRepeats = Math.ceil((containerWidth * 2) / setWidth);
        setRepeatCount(Math.max(2, minRepeats));
      }
    }
    updateRepeat();
    window.addEventListener('resize', updateRepeat);
    return () => window.removeEventListener('resize', updateRepeat);
  }, []);

  return (
    <div ref={sectionRef} className="min-h-screen flex flex-col bg-white relative overflow-x-hidden">
      {/* Spacer for fixed header */}
      <div className="h-16 md:h-20" />
      {/* Glow/gradient background */}
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
        <div className="w-[400px] h-[400px] md:w-[600px] md:h-[600px] rounded-full bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-blue-100 via-transparent to-transparent opacity-60 blur-2xl"></div>
      </div>
      {/* Main content: two columns */}
      <div ref={mainContentRef} className="relative z-10 flex flex-col md:flex-row items-center justify-between w-full max-w-6xl px-2 sm:px-4 gap-8 md:gap-0 mx-auto">
        {/* Left: Text content */}
        <div ref={leftColRef} className="flex-1 flex flex-col items-start text-left w-full md:w-auto">
          <div className="mb-6 inline-flex items-center bg-white/80 border border-gray-200 rounded-full px-4 py-2 text-gray-700 text-sm font-medium shadow-sm">
            It stays undetectable. Here&apos;s how we know.
            <button className="ml-2 bg-[#110F40] hover:bg-blue-700 text-white rounded-full w-7 h-7 flex items-center justify-center text-lg">→</button>
          </div>
          <h1 ref={headingRef} className="text-2xl sm:text-3xl md:text-5xl font-bold leading-tight mb-2">
            Your AI Partner From Preparation to Placement
          </h1>
          <p ref={paraRef} className="text-gray-700 text-base sm:text-lg mb-6 mt-2 max-w-xl">
            AI-powered learning, practice, resume, and job search — all in one platform. PathFinder, Copilot, ResumePro, and JobScan help you learn, practice, apply, and land your dream job.
          </p>
          <button className="bg-[#110F40] hover:bg-[#110F40]/80 text-white font-semibold px-6 py-3 rounded-xl text-base sm:text-lg shadow mb-4 w-full sm:w-auto transition-all">
            Start Free Trial
          </button>
          <div className="flex items-center gap-2 mb-6">
            <span className="text-blue-600 text-lg sm:text-xl">✔</span>
            <span className="text-gray-600 text-base">No Credit Card</span>
          </div>
          <div className="flex items-center gap-3 text-gray-600 text-base flex-wrap">
            <span>Available For</span>
            {/* Placeholder icons, replace with real icons as needed */}
            <span className="text-2xl"></span>
            <span className="text-2xl"></span>
            <span className="text-2xl">📱</span>
          </div>
        </div>
        {/* Right: Mockup card */}
        <div ref={rightColRef} className="flex-1 flex items-center justify-center w-full md:w-auto mt-8 md:mt-0 mb-32 md:mb-0">
          <div className="bg-[#181828] rounded-3xl shadow-2xl border border-[#e0e0e0] p-3 sm:p-4 md:p-6 w-full max-w-xs sm:max-w-sm md:max-w-md h-[260px] sm:h-[320px] md:h-[400px] flex flex-col justify-between">
            {/* Top bar */}
            <div className="flex items-center justify-between mb-2">
              <span className="text-white font-semibold text-base flex items-center gap-2">
                <span className="inline-block w-6 h-6 bg-gray-700 rounded-full mr-2"></span>
                Interview Copilot
              </span>
              <span className="text-gray-300 text-sm">● ● ●</span>
            </div>
            {/* Main content area */}
            <div className="flex-1 flex flex-col md:flex-row gap-2">
              <div className="flex-1 bg-[#23233a] rounded-lg p-3 text-left text-xs sm:text-sm text-white/80">
                <span className="text-purple-400 font-semibold">Problem:</span> As a se
                <div className="mt-8 w-full h-16 sm:h-24 bg-gray-800/40 rounded-lg flex items-center justify-center text-gray-500 text-xs">
                  <img src="/img-2.jpeg" alt="User video" className="w-full h-full object-cover rounded-lg" />
                </div>
              </div>
              <div className="flex-1 flex flex-col gap-2">
                <div className="bg-[#23233a] rounded-lg p-2 text-xs text-white/80 mb-1">
                  <span className="font-semibold">Sentiments</span>
                  <div className="mt-1 flex flex-wrap gap-1">
                    <span className="bg-gray-700/60 rounded px-2 py-0.5 text-xs">Passionate</span>
                    <span className="bg-gray-700/60 rounded px-2 py-0.5 text-xs">Ambitious</span>
                    <span className="bg-gray-700/60 rounded px-2 py-0.5 text-xs">Interested</span>
                  </div>
                </div>
                <div className="bg-[#23233a] rounded-lg p-2 text-xs text-white/80 flex-1">
                  <span className="font-semibold">Context retrieval</span>
                  <div className="mt-1 text-gray-400">Google's mi</div>
                </div>
              </div>
            </div>
            {/* Bottom bar */}
            <div className="flex gap-2 mt-10 sm:mt-4 flex-col sm:flex-row">
              <button className="flex-1 flex items-center justify-center gap-2 bg-black text-white rounded-lg py-2 text-xs font-medium">
                <span className="inline-block w-4 h-4 bg-white/20 rounded-full"></span>
                Real-time audio transcr
              </button>
              <button className="flex-1 flex items-center justify-center gap-2 bg-black text-white rounded-lg py-2 text-xs font-medium">
                <span className="inline-block w-4 h-4 bg-white/20 rounded-full"></span>
                Receive tailored assistance ins
              </button>
            </div>
          </div>
        </div>
      </div>
      {/* Stats Row */}
      <div ref={statsRowRef} className="w-full max-w-5xl mx-auto mt-28 md:mt-16 flex flex-col md:flex-row items-center justify-between gap-6 md:gap-8 z-10 relative px-2">
        {statsData.map((stat, idx) => (
          <div key={stat.label} className="flex-1 flex flex-col items-center min-w-[120px]">
            <span ref={el => (statNumRefs.current[idx] = el)} className="text-2xl sm:text-3xl font-bold text-[#2d3be7]">0</span>
            <span className="text-gray-700 mt-1 text-sm sm:text-base text-center">{stat.label}</span>
          </div>
        ))}
      </div>
      {/* Integration Logos Row */}
      <div ref={logosRowRef} className="w-full max-w-8xl mx-auto mt-12 md:mt-16 mb-8 flex flex-col items-center overflow-hidden px-2 sm:px-4">
        <span className="text-base sm:text-lg font-medium text-gray-700 mb-4 text-center">Seamlessly Integrate With All Meeting Softwares</span>
        <div className="relative w-full h-14 sm:h-16 overflow-hidden" ref={marqueeRef}>
          <div className="flex animate-marquee gap-6 sm:gap-8 h-14 sm:h-16 items-center whitespace-nowrap w-full">
            {/* The first set is used for measuring width */}
            <div className="flex gap-6 sm:gap-8" ref={setRef}>
              {logos.map((logo, idx) => (
                <img
                  key={`measure-${idx}`}
                  src={logo.src}
                  alt={logo.alt}
                  className="h-8 sm:h-10"
                  ref={el => (logoImgRefs.current[idx] = el)}
                />
              ))}
            </div>
            {/* Dynamically repeat the logos for seamless loop */}
            {Array(repeatCount - 1).fill(null).flatMap((_, i) =>
              logos.map((logo, idx) => (
                <img
                  key={`${i}-${idx}`}
                  src={logo.src}
                  alt={logo.alt}
                  className="h-8 sm:h-10"
                  ref={i === 0 ? undefined : undefined}
                />
              ))
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Homepage;