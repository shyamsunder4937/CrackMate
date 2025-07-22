import React, { useState, useRef, useEffect } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const faqs = [
  {
    question: 'What is CrackMate PathFinder?',
    answer:
      'CrackMate PathFinder is an AI-powered strategist that creates a personalized, day-wise learning and interview prep plan based on global hiring data, your target job, and your available time. It adapts to your progress and integrates learning, practice, and job application tracking in one tool.'
  },
  {
    question: 'How does the Automatic Learning Scheduler work?',
    answer:
      'The AI researches global hiring trends, skills, and interview questions to build a custom schedule for you. It updates your plan daily based on your progress and reschedules lessons if you fall behind.'
  },
  {
    question: 'What is CrackMate Copilot?',
    answer:
      'CrackMate Copilot is your real-time desktop AI companion. It answers coding and aptitude questions by voice, solves problems from screenshots, and personalizes answers using your resume. It features a distraction-free UI and privacy-first design.'
  },
  {
    question: 'How does ResumePro help my job search?',
    answer:
      'ResumePro is an AI resume builder that helps you create ATS-optimized resumes, checks your resume against real ATS algorithms, and provides personalized improvement suggestions and analytics.'
  },
  {
    question: 'What is CrackMate JobScan?',
    answer:
      'JobScan is an AI-powered job scanner that monitors thousands of job portals and company sites, sending you daily personalized job alerts and quick-apply links based on your skills and preferences.'
  },
  {
    question: 'Is my data private with CrackMate tools?',
    answer:
      'Yes. CrackMate Copilot processes everything in-memory and does not save anything locally without your consent. Your privacy is a top priority.'
  },
  {
    question: 'Can I use CrackMate for coding and technical interviews?',
    answer:
      'Absolutely! CrackMate includes mock coding tests, aptitude quizzes, and screenshot solving for coding and technical interviews.'
  },
  {
    question: 'Does CrackMate support all industries and job types?',
    answer:
      'Yes, CrackMate is designed to support a wide range of industries, job types, and interview formats.'
  },
];

const Questions = () => {
  const [openIndex, setOpenIndex] = useState(null);
  const sectionRef = useRef(null);

  useEffect(() => {
    if (sectionRef.current) {
      gsap.fromTo(
        sectionRef.current,
        { opacity: 0, y: 60 },
        {
          opacity: 1,
          y: 0,
          duration: 1.8,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: sectionRef.current,
            start: 'top 80%',
            toggleActions: 'play reverse play reverse',
          },
        }
      );
    }
  }, []);

  const toggle = idx => {
    setOpenIndex(openIndex === idx ? null : idx);
  };

  return (
    <section id="questions-section" ref={sectionRef} className="py-16 px-4 md:px-0 min-h-screen flex flex-col items-center justify-center bg-white">
      <div className="max-w-3xl w-full mx-auto">
        <div className="flex flex-col items-center mb-8">
          <span className="inline-block px-4 py-1 rounded-full bg-indigo-50 text-indigo-600 text-sm font-medium mb-4">FAQ</span>
          <h2 className="text-3xl md:text-5xl font-bold text-center mb-2 text-gray-900">Frequently Asked Questions about CrackMate</h2>
          <p className="text-gray-500 text-lg text-center max-w-2xl mb-4">Everything you need to know about PathFinder, Copilot, ResumePro, and JobScan.</p>
        </div>
        <div className="bg-gray-50 rounded-2xl shadow-sm p-2 md:p-6">
          {faqs.map((faq, idx) => (
            <div key={idx} className="border-b last:border-b-0 border-gray-200">
              <button
                className="w-full flex items-center justify-between py-5 px-4 text-left focus:outline-none text-lg font-semibold text-gray-900 hover:bg-gray-100 transition rounded-xl"
                onClick={() => toggle(idx)}
              >
                <span className="flex items-center">
                  <span className="mr-3 text-2xl text-gray-400">{openIndex === idx ? '-' : '+'}</span>
                  {faq.question}
                </span>
              </button>
              {openIndex === idx && (
                <div className="px-12 pb-5 text-gray-700 text-base animate-fade-in">
                  {faq.answer}
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Questions;