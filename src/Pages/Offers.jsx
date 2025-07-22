import React, { useEffect, useState } from 'react'
import { motion, useInView, useAnimation } from 'framer-motion'
import { useRef } from 'react'
import gsap from 'gsap'
import { useLayoutEffect } from 'react'

// Animation variants for better organization
const containerVariants = {
  hidden: { opacity: 0 },
  visible: { 
    opacity: 1,
    transition: { 
      staggerChildren: 0.1,
      delayChildren: 0.3
    }
  }
};

const itemVariants = {
  hidden: { y: 20, opacity: 0 },
  visible: { 
    y: 0, 
    opacity: 1,
    transition: { 
      type: "spring",
      stiffness: 100,
      damping: 10
    }
  }
};

const companies = [
  { logo: 'https://upload.wikimedia.org/wikipedia/commons/a/a9/Amazon_logo.svg', name: 'Amazon', title: 'Product Manager' },
  { logo: 'https://upload.wikimedia.org/wikipedia/commons/2/2f/Google_2015_logo.svg', name: 'Google', title: 'Software Engineer' },
  { logo: 'https://upload.wikimedia.org/wikipedia/commons/f/fa/Apple_logo_black.svg', name: 'Apple', title: 'System Engineer' },
  { logo: 'https://upload.wikimedia.org/wikipedia/commons/0/05/Facebook_Logo_%282019%29.png', name: 'Meta', title: 'Data Scientist' },
  { logo: 'https://upload.wikimedia.org/wikipedia/commons/4/44/Microsoft_logo.svg', name: 'Microsoft', title: 'Financial Analyst' },
  { logo: 'https://upload.wikimedia.org/wikipedia/commons/0/08/Netflix_2015_logo.svg', name: 'Netflix', title: 'Marketing Manager' },
  { logo: 'https://upload.wikimedia.org/wikipedia/commons/e/e8/Tesla_logo.png', name: 'Tesla', title: 'Product Manager' },
  { logo: 'https://upload.wikimedia.org/wikipedia/commons/9/91/Octicons-mark-github.svg', name: 'GitHub', title: 'Business Operations' },
  { logo: 'https://upload.wikimedia.org/wikipedia/commons/6/69/Airbnb_Logo_Bélo.svg', name: 'Airbnb', title: 'Data Analyst' },
  { logo: 'https://upload.wikimedia.org/wikipedia/commons/4/41/Visa_Logo.png', name: 'Visa', title: 'Software Developer' },
  { logo: 'https://upload.wikimedia.org/wikipedia/commons/c/cc/Uber_logo_2018.png', name: 'Uber', title: 'Product Designer' },
  { logo: 'https://upload.wikimedia.org/wikipedia/commons/5/51/IBM_logo.svg', name: 'IBM', title: 'Cloud Architect' },
  { logo: 'https://upload.wikimedia.org/wikipedia/commons/1/19/Spotify_logo_without_text.svg', name: 'Spotify', title: 'UX Researcher' },
  // Additional reliable companies (using jsdelivr simple-icons)
  { logo: 'https://cdn.jsdelivr.net/gh/simple-icons/simple-icons/icons/twitter.svg', name: 'Twitter', title: 'Social Media Manager' },
  { logo: 'https://cdn.jsdelivr.net/gh/simple-icons/simple-icons/icons/samsung.svg', name: 'Samsung', title: 'Electronics Engineer' },
  { logo: 'https://cdn.jsdelivr.net/gh/simple-icons/simple-icons/icons/pinterest.svg', name: 'Pinterest', title: 'Content Curator' },
  { logo: 'https://cdn.jsdelivr.net/gh/simple-icons/simple-icons/icons/dropbox.svg', name: 'Dropbox', title: 'Cloud Engineer' },
  { logo: 'https://cdn.jsdelivr.net/gh/simple-icons/simple-icons/icons/reddit.svg', name: 'Reddit', title: 'Community Manager' },
  { logo: 'https://cdn.jsdelivr.net/gh/simple-icons/simple-icons/icons/stripe.svg', name: 'Stripe', title: 'Payments Engineer' },
  { logo: 'https://cdn.jsdelivr.net/gh/simple-icons/simple-icons/icons/shopify.svg', name: 'Shopify', title: 'E-commerce Specialist' },
  { logo: 'https://cdn.jsdelivr.net/gh/simple-icons/simple-icons/icons/cisco.svg', name: 'Cisco', title: 'Network Engineer' },
  { logo: 'https://cdn.jsdelivr.net/gh/simple-icons/simple-icons/icons/atlassian.svg', name: 'Atlassian', title: 'DevOps Specialist' },
  { logo: 'https://cdn.jsdelivr.net/gh/simple-icons/simple-icons/icons/paypal.svg', name: 'PayPal', title: 'Payments Specialist' },
  { logo: 'https://cdn.jsdelivr.net/gh/simple-icons/simple-icons/icons/linkedin.svg', name: 'LinkedIn', title: 'Business Analyst' },
];

// Simple horizontal marquee animation for mobile
const marqueeKeyframes = `@keyframes marquee-x { 0% { transform: translateX(0); } 100% { transform: translateX(-50%); } }`;

const Offers = () => {
  const containerRef = useRef(null);
  const firstScrollerRef = useRef(null);
  const secondScrollerRef = useRef(null);
  const ref = useRef(null);
  const isInView = useInView(ref, { once: false, amount: 0.3 });
  
  // Animation controls for content fade-in
  const controls = useAnimation();
  
  // State to track card heights for precise animation
  const [cardHeight, setCardHeight] = useState(0);
  const [containerHeight, setContainerHeight] = useState(0);
  const [scrollAnimation, setScrollAnimation] = useState(null);
  const [isMobile, setIsMobile] = useState(false);

  // Detect mobile vs desktop
  useLayoutEffect(() => {
    function handleResize() {
      setIsMobile(window.innerWidth < 768);
    }
    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);
  
  // Animation controls for content fade-in
  useEffect(() => {
    if (isInView) {
      controls.start({
        opacity: 1,
        y: 0,
        transition: {
          duration: 0.5,
          staggerChildren: 0.1
        }
      });
    } else {
      controls.start({ opacity: 0, y: 20 });
    }
  }, [isInView, controls]);
  
  // 1. Calculate cardHeight after cards are rendered
  useEffect(() => {
    if (firstScrollerRef.current) {
      const height = firstScrollerRef.current.offsetHeight;
      if (height !== cardHeight) setCardHeight(height);
    }
  }, [companies.length, isInView]);

  // 2. Setup GSAP animation when cardHeight is known
  useEffect(() => {
    if (!isInView || !firstScrollerRef.current || !secondScrollerRef.current || cardHeight === 0) return;

    // Kill any existing animation
    if (scrollAnimation) scrollAnimation.kill();

    // Set initial positions
    gsap.set(firstScrollerRef.current, { y: 0 });
    gsap.set(secondScrollerRef.current, { y: cardHeight });

    // Create seamless vertical loop
    const totalHeight = cardHeight * 2;
    const tl = gsap.timeline({ repeat: -1, defaults: { ease: 'none' } });
    tl.to([firstScrollerRef.current, secondScrollerRef.current], {
      y: `-=${cardHeight}`,
      duration: 20,
      modifiers: {
        y: gsap.utils.wrap([0, totalHeight]), // wrap y between 0 and totalHeight
      },
    });

    setScrollAnimation(tl);

    // Cleanup
    return () => tl.kill();
  }, [isInView, cardHeight]);
  
  // Card hover animation variants
  const cardVariants = {
    initial: { scale: 1 },
    hover: {
      scale: 1.05,
      boxShadow: "0 10px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)",
      transition: { duration: 0.3, ease: "easeOut" }
    }
  };
  
  // Function to create a card component
  const Card = ({ company, index }) => (
    <div
      className="card rounded-2xl border border-gray-200 bg-white shadow-sm flex flex-col items-center justify-center p-5 w-full max-w-[280px] mx-auto min-h-[110px] mb-4"
      style={{ minWidth: 220, marginBottom: 24 }}
    >
      <img
        src={company.logo}
        alt={`${company.name} logo`}
        className="h-8 mb-2 object-contain"
        loading="eager"
      />
      <div className="font-semibold text-gray-900 text-base text-center">
        {company.name}
      </div>
      <div className="text-gray-400 text-sm text-center">
        {company.title}
      </div>
    </div>
  );

  // Render two sets of cards for seamless vertical looping
  const allCards = [
    ...companies.map((company, index) => (
      <div
        key={`first-${company.name}-${index}`}
        className="card rounded-2xl border border-gray-200 bg-white shadow-sm flex flex-col items-center justify-center p-5 w-full max-w-[280px] mx-auto min-h-[110px] mb-4 flex-shrink-0"
        style={{ minWidth: 220, marginBottom: 24 }}
      >
        <img
          src={company.logo}
          alt={`${company.name} logo`}
          className="h-8 mb-2 object-contain"
          loading="eager"
        />
        <div className="font-semibold text-gray-900 text-base text-center">
          {company.name}
        </div>
        <div className="text-gray-400 text-sm text-center">
          {company.title}
        </div>
      </div>
    )),
    ...companies.map((company, index) => (
      <div
        key={`second-${company.name}-${index}`}
        className="card rounded-2xl border border-gray-200 bg-white shadow-sm flex flex-col items-center justify-center p-5 w-full max-w-[280px] mx-auto min-h-[110px] mb-4 flex-shrink-0"
        style={{ minWidth: 220, marginBottom: 24 }}
      >
        <img
          src={company.logo}
          alt={`${company.name} logo`}
          className="h-8 mb-2 object-contain"
          loading="eager"
        />
        <div className="font-semibold text-gray-900 text-base text-center">
          {company.name}
        </div>
        <div className="text-gray-400 text-sm text-center">
          {company.title}
        </div>
      </div>
    )),
  ];

  // For mobile: horizontal marquee
  const horizontalCards = [
    ...companies.map((company, index) => (
      <div
        key={`horiz-${company.name}-${index}`}
        className="card rounded-2xl border border-gray-200 bg-white shadow-sm flex flex-col items-center justify-center p-4 min-w-[180px] max-w-[180px] mx-2 min-h-[110px] mb-2 flex-shrink-0"
      >
        <img
          src={company.logo}
          alt={`${company.name} logo`}
          className="h-8 mb-2 object-contain"
          loading="eager"
        />
        <div className="font-semibold text-gray-900 text-base text-center">
          {company.name}
        </div>
        <div className="text-gray-400 text-sm text-center">
          {company.title}
        </div>
      </div>
    )),
    ...companies.map((company, index) => (
      <div
        key={`horiz2-${company.name}-${index}`}
        className="card rounded-2xl border border-gray-200 bg-white shadow-sm flex flex-col items-center justify-center p-4 min-w-[180px] max-w-[180px] mx-2 min-h-[110px] mb-2 flex-shrink-0"
      >
        <img
          src={company.logo}
          alt={`${company.name} logo`}
          className="h-8 mb-2 object-contain"
          loading="eager"
        />
        <div className="font-semibold text-gray-900 text-base text-center">
          {company.name}
        </div>
        <div className="text-gray-400 text-sm text-center">
          {company.title}
        </div>
      </div>
    )),
  ];

  return (
    <div className="w-full min-h-screen flex flex-col md:flex-row items-center justify-center bg-white px-2 md:px-8 py-8 md:py-0">
      {/* Left: Description */}
      <div className="flex-1 flex flex-col justify-center items-center text-center max-w-lg w-full py-8 md:py-0 md:pr-12">
        <span className="inline-block mb-3 sm:mb-4 px-3 py-1 rounded-full bg-indigo-50 text-indigo-500 text-sm sm:text-base font-medium">Real Results</span>
        <h2 className="text-2xl sm:text-3xl md:text-5xl font-extrabold mb-3 sm:mb-4 leading-tight">
          Our Users Got<br />
          <span className="text-black">the <span className="text-[#A8AFB5]">Job Offers.</span></span><br />
          You Can Too.
        </h2>
        <p className="text-gray-500 text-base sm:text-lg max-w-md mb-2">
          Our AI-driven interview prep has already helped users land roles at leading companies
        </p>
      </div>
      {/* Right: Animated Cards (vertical on desktop, horizontal on mobile) */}
      {/* Desktop vertical animation */}
      <div className="hidden md:flex flex-1 items-center justify-center w-full max-w-xs h-[500px] overflow-hidden relative rounded-xl shadow-lg bg-gray-50 py-8 mt-8 md:mt-0">
        <div className="flex flex-col animate-marquee-vertical items-center w-full">
          {allCards}
        </div>
      </div>
      {/* Mobile horizontal marquee */}
      <div className="md:hidden w-full flex items-center justify-center overflow-x-hidden relative py-6">
        <style>{marqueeKeyframes}</style>
        <div
          className="flex items-center w-[200vw]"
          style={{
            animation: 'marquee-x 30s linear infinite',
          }}
        >
          {horizontalCards}
        </div>
      </div>
    </div>
  );
}

export default Offers