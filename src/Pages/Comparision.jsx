import React from 'react'
import { motion, useInView } from 'framer-motion'
import { useRef } from 'react'

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

// Comparison data
const ourFeatures = [
  'Unlimited Sessions',
  'Coding Copilot',
  'Industry Knowledge Base',
  'Extensive Question Banks',
  'Interview Report',
  'Stealth Mode',
  'Pick & Train AI Model'
];

const competitorDisadvantages = [
  'Extremely High Price',
  'Session/Credit Limit',
  'No Coding Copilot',
  'No Question Banks',
  'No Interview Report',
  'Technical Glitches',
  'Lack Customization'
];

const Comparision = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: false, amount: 0.3 });
  
  // Card hover animation variants
  const cardVariants = {
    initial: { scale: 1 },
    hover: {
      scale: 1.02,
      boxShadow: "0 10px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)",
      transition: { duration: 0.3, ease: "easeOut" }
    }
  };
  
  return (
    <div ref={ref} className="w-full min-h-screen flex items-center justify-center bg-white px-4 md:px-8 py-16">
      <motion.div 
        initial={{ opacity: 0 }}
        animate={isInView ? { opacity: 1 } : { opacity: 0 }}
        transition={{ duration: 0.5 }}
        className="flex flex-col w-full max-w-6xl mx-auto gap-8 items-center">
        {/* Text */}
        <motion.div 
          initial={{ y: -30, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="flex flex-col justify-center items-center text-center mb-8">
          <motion.span 
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.4, delay: 0.5 }}
            className="inline-block mb-2 px-3 py-1 rounded-full bg-[#110F40] text-white text-sm font-medium">Comparison</motion.span>
          <motion.h2 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.7 }}
            className="text-4xl md:text-5xl font-bold mb-4 leading-tight text-[#110F40]">
            Why <span className="text-[#110F40]">CrackMate</span> Is
            The Best Choice
          </motion.h2>
          <motion.p 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.9 }}
            className="text-[#110F40] text-lg max-w-md">
            See how we stack up against the competition with our AI-powered interview preparation platform
          </motion.p>
        </motion.div>
        
        {/* Comparison Cards Container */}
        <div className="flex flex-col md:flex-row w-full max-w-5xl justify-center items-center gap-4 md:gap-0 relative">
          {/* Our Features Card */}
          <motion.div 
            variants={cardVariants}
            whileHover="hover"
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="bg-white rounded-xl shadow-md p-6 md:p-8 w-full md:w-[45%] border border-[#A8AFB5]"
          >
            <div className="bg-[#110F40] text-white font-bold text-xl rounded-full py-2 px-6 inline-block mb-6 mx-auto">
              CrackMate AI
            </div>
            
            <div className="text-lg font-medium mb-4 text-[#110F40]">
              What we offer:
            </div>
            
            <ul className="space-y-4">
              {ourFeatures.map((feature, idx) => (
                <li key={idx} className="flex items-center">
                  <div className="bg-[#A8AFB5] rounded-full p-1 mr-3">
                    <svg className="w-5 h-5 text-[#110F40]" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                    </svg>
                  </div>
                  <span className="text-[#110F40] font-medium">{feature}</span>
                </li>
              ))}
            </ul>
            
            <button className="mt-8 w-full bg-[#110F40] hover:bg-[#23206a] text-white font-bold py-3 px-4 rounded-lg transition duration-300">
              Free trial
            </button>
          </motion.div>
          
          {/* VS Badge */}
          <div className="bg-[#A8AFB5] text-[#110F40] font-bold text-2xl rounded-full h-16 w-16 flex items-center justify-center z-10 mx-4 my-4 md:my-0 border-2 border-[#110F40]">
            VS
          </div>
          
          {/* Competitors Card */}
          <motion.div 
            variants={cardVariants}
            whileHover="hover"
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.4 }}
            className="bg-white rounded-xl shadow-md p-6 md:p-8 w-full md:w-[45%] border border-[#A8AFB5]"
          >
            <div className="bg-[#A8AFB5] text-[#110F40] font-bold text-xl rounded-full py-2 px-6 inline-block mb-6 mx-auto">
              Our Competitors
            </div>
            
            <div className="text-lg font-medium mb-4 text-[#110F40]">
              Against:
            </div>
            
            <ul className="space-y-4">
              {competitorDisadvantages.map((disadvantage, idx) => (
                <li key={idx} className="flex items-center">
                  <div className="bg-[#A8AFB5] rounded-full p-1 mr-3">
                    <svg className="w-5 h-5 text-[#110F40]" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd" />
                    </svg>
                  </div>
                  <span className="text-[#110F40] font-medium">{disadvantage}</span>
                </li>
              ))}
            </ul>
            
            <div className="mt-8 w-full bg-[#A8AFB5] text-[#110F40] font-bold py-3 px-4 rounded-lg text-center">
              💰 💰 💰
            </div>
          </motion.div>
        </div>
      </motion.div>
    </div>
  )
}

export default Comparision