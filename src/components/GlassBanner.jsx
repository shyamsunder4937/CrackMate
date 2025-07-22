import React from "react";
import GlitchText from "./GlitchText/GlitchText.jsx";

const GlassBanner = ({ text = "CrackMate" }) => (
  <div className="w-full flex justify-center items-center py-12 bg-[#f5f6fa] relative overflow-hidden">
    <GlitchText>{text}</GlitchText>
  </div>
);

export default GlassBanner; 