import React, { useRef, useEffect } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
gsap.registerPlugin(ScrollTrigger);

const stats = [
  { value: '99%', label: 'Customers Satisfaction' },
  { value: '400+', label: 'Candidates' },
  { value: '350+', label: 'Successful Interviews' },
  { value: '20+', label: 'Offers in the Past 30 Days' },
];

const testimonials = [
  {
    quote:
      'CrackMate helped me get my first job in tech! The mock interviews and resume tips were so practical.',
    name: 'Amit',
    title: 'Support Executive',
    company: 'Tata Consultancy',
    avatar: 'https://images.unsplash.com/photo-1517841905240-472988babdf9?auto=format&fit=facearea&w=256&h=256&facepad=2&q=80', // Indian male, Unsplash
  },
  {
    quote:
      'I was nervous about interviews, but CrackMate made me confident. The daily practice questions are amazing.',
    name: 'Priya',
    title: 'Sales Associate',
    company: 'Reliance Retail',
    avatar: 'https://images.unsplash.com/photo-1529626455594-4ff0802cfb7e?auto=format&fit=facearea&w=256&h=256&facepad=2&q=80', // Indian female, Unsplash
  },
  {
    quote:
      'The AI feedback is so helpful! I improved my answers and got selected as a developer.',
    name: 'Rohit',
    title: 'Junior Developer',
    company: 'Infosys',
    avatar: 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?auto=format&fit=facearea&w=256&h=256&facepad=2&q=80', // Indian male, Unsplash
  },
];

const ReviewPage = () => {
  const marqueeRef = useRef(null);
  const statsRef = useRef(null);
  const testimonialRef = useRef(null);
  const animationRef = useRef(null);

  // GSAP scroll-triggered animation for stats
  useEffect(() => {
    if (statsRef.current) {
      gsap.fromTo(
        statsRef.current,
        { y: 60, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 1,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: statsRef.current,
            start: 'top 85%',
            toggleActions: 'play reverse play reverse',
          },
        }
      );
    }
    if (testimonialRef.current) {
      gsap.fromTo(
        testimonialRef.current,
        { y: 60, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 1,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: testimonialRef.current,
            start: 'top 85%',
            toggleActions: 'play reverse play reverse',
          },
        }
      );
    }
  }, []);

  useEffect(() => {
    const marquee = marqueeRef.current;
    if (!marquee) return;
    const totalWidth = marquee.scrollWidth / 2;
    gsap.set(marquee, { x: 0 });
    animationRef.current = gsap.to(marquee, {
      x: -totalWidth,
      duration: 18,
      ease: 'none',
      repeat: -1,
      modifiers: {
        x: gsap.utils.unitize(x => parseFloat(x) % -totalWidth),
      },
    });
    return () => animationRef.current && animationRef.current.kill();
  }, []);

  // Pause on hover
  const handleMouseEnter = () => {
    if (animationRef.current) animationRef.current.pause();
  };
  const handleMouseLeave = () => {
    if (animationRef.current) animationRef.current.resume();
  };

  return (
    <section className="py-20 px-4 md:px-8 bg-white overflow-hidden">
      <div className="max-w-7xl mx-auto">
        {/* Section Header */}
        <div className="text-center mb-10">
          <span className="inline-block px-4 py-1 rounded-full bg-[#A8AFB5] text-[#110F40] text-sm font-medium mb-4">
            Testimonials
          </span>
          <h2 className="text-3xl md:text-5xl font-bold mb-2 text-[#110F40]">
            CrackMate Copilot is Your Secret Weapon
          </h2>
          <p className="text-base md:text-xl text-[#A8AFB5] max-w-3xl mx-auto">
            We Help You Land Job Offers and Secure Your Dream Career
          </p>
        </div>
        {/* Main Content: Stats (left) + Testimonials (right) */}
        <div className="flex flex-col md:flex-row gap-10 items-center justify-center w-full max-w-6xl mx-auto">
          {/* Stats 2x2 grid on left */}
          <div ref={statsRef} className="grid grid-cols-2 gap-6 w-full md:w-auto md:mr-8">
            {stats.map((stat, idx) => (
              <div
                key={stat.label}
                className="bg-[#A8AFB5]/30 rounded-2xl border border-[#A8AFB5] shadow-md hover:shadow-xl transition-shadow duration-300 p-8 flex flex-col items-center justify-center min-w-[140px] min-h-[120px] group"
              >
                <div className="text-2xl md:text-3xl font-extrabold text-[#110F40] mb-2 group-hover:text-[#A8AFB5] transition-colors">{stat.value}</div>
                <p className="text-[#110F40] font-medium text-base md:text-lg text-center whitespace-pre-line opacity-80">{stat.label}</p>
              </div>
            ))}
          </div>
          {/* Testimonials on right */}
          <div ref={testimonialRef} className="flex-1 flex flex-col justify-center items-start max-w-xl w-full bg-white rounded-2xl shadow-lg p-8 border border-gray-100 overflow-hidden min-h-[220px]">
            <div
              className="relative w-full h-full flex items-center cursor-pointer"
              style={{ minHeight: 120 }}
              onMouseEnter={handleMouseEnter}
              onMouseLeave={handleMouseLeave}
            >
              <div
                ref={marqueeRef}
                className="flex gap-12"
                style={{ width: 'max-content' }}
              >
                {[...testimonials, ...testimonials].map((testimonial, idx) => (
                  <div
                    key={idx}
                    className="w-full flex-shrink-0 flex flex-col justify-between pr-8 max-w-xs"
                    style={{ minWidth: '320px' }}
                  >
                    <p className="text-[#110F40] text-lg mb-6 opacity-80">{testimonial.quote}</p>
                    <div className="flex items-center gap-4 mt-auto">
                      <img
                        src={testimonial.avatar}
                        alt={testimonial.name}
                        className="w-14 h-14 rounded-full object-cover border-2 border-[#A8AFB5]"
                      />
                      <div className="flex flex-col">
                        <span className="font-bold text-[#110F40] text-lg">
                          {testimonial.name}, {testimonial.title} at {testimonial.company}
                        </span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ReviewPage;
   