import React from "react";

const LandingVideo = () => (
  <div className="flex flex-col items-center justify-center w-full my-8 sm:my-12 px-2 sm:px-0">
    <div className="w-full max-w-2xl rounded-xl overflow-hidden shadow-lg">
      
      <video
        className="w-full h-auto object-cover rounded-xl min-h-[180px]"
        controls
        poster="/img-2.jpeg"
      >
        <source src="/crackmate-demo.mp4" type="video/mp4" />
        Your browser does not support the video tag.
      </video>
    </div>
  </div>
);

export default LandingVideo; 