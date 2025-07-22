import React from 'react';

const footerLinks = [
  {
    heading: 'Product',
    links: [
      { label: 'Pricing', href: '#' },
      { label: 'CrackMate Copilot', href: '#' },
      { label: 'CrackMate Pathfinder', href: '#' },
    ],
  },
  {
    heading: 'Free Tools',
    links: [
      { label: 'AI Resume Builder', href: '#' },
      { label: 'AI Cover Letter', href: '#' },
      { label: 'Cold Email Generator', href: '#' },
      { label: 'ATS Checker', href: '#' },
    ],
  },
  // Removed 'Compare Us' section
  {
    heading: 'Company',
    links: [
      { label: 'About', href: '#' },
      { label: 'Blog', href: '#' },
      { label: 'Affiliate Program', href: '#' },
      { label: 'Contact', href: '#' },
    ],
  },
];

const smallLinks = [
  {
    heading: 'Resources',
    links: [
      { label: 'Is CrackMate AI discreet?', href: '#' },
      { label: 'Articles', href: '#' },
      { label: 'Question Bank', href: '#' },
      { label: 'Interview Blogs', href: '#' },
      { label: 'Testimonials', href: '#' },
    ],
  },
  {
    heading: 'Legal',
    links: [
      { label: 'Privacy', href: '#' },
      { label: 'Terms', href: '#' },
      { label: 'Refund ', href: '#' },
    ],
  },
];

const Footer = () => (
  <footer className="bg-[#f4f5fb] pt-20 pb-8 px-4 md:px-0 rounded-t-3xl border-t border-gray-100">
    <div className="max-w-7xl mx-auto flex flex-col md:flex-row md:items-start md:justify-between gap-16 px-2 md:px-8">
      {/* Left: Logo and tagline */}
      <div className="flex flex-col items-center md:items-start md:w-1/4 mb-8 md:mb-0">
        {/* Logo: Use CircleLogo.png */}
        <div className="mb-4">
          <img src="/logos/CircleLogo.png" alt="CrackMate Logo" className="w-12 h-12 object-contain" />
        </div>
        <p className="text-gray-900 font-semibold text-lg mb-1 text-center md:text-left">
          CrackMate – The Complete AI Job Cracking Suite
        </p>
        <p className="text-gray-600 text-base mb-2 text-center md:text-left">
          PathFinder, Copilot, ResumePro, and JobScan: AI-powered learning, practice, resume, and job search — all in one platform. Unleash your potential and land your dream job with confidence.
        </p>
        <a href="mailto:support@crackmate.ai" className="text-gray-500 text-base hover:underline mb-4">support@crackmate.ai</a>
      </div>
      {/* Center: Main links - adjust grid to 3 columns since 'Compare Us' is removed */}
      <div className="flex-1 grid grid-cols-2 md:grid-cols-3 gap-10 md:gap-16">
        {footerLinks.map((col) => (
          <div key={col.heading}>
            <h4 className="font-semibold text-gray-900 mb-3">{col.heading}</h4>
            <ul className="space-y-2">
              {col.links.map((link) => (
                <li key={link.label}>
                  <a href={link.href} className="text-gray-500 hover:text-gray-900 transition text-base whitespace-nowrap">{link.label}</a>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
      {/* Right: Small links */}
      <div className="flex flex-col gap-10 md:w-1/4 mt-8 md:mt-0">
        <div className="flex flex-row gap-16">
          {smallLinks.map((col) => (
            <div key={col.heading}>
              <h4 className="font-semibold text-gray-900 mb-3">{col.heading}</h4>
              <ul className="space-y-2">
                {col.links.map((link) => (
                  <li key={link.label}>
                    <a href={link.href} className="text-gray-500 hover:text-gray-900 transition text-base whitespace-nowrap">{link.label}</a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>
    </div>
  </footer>
);

export default Footer; 