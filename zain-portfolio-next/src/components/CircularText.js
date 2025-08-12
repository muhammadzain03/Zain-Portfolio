/**
 * CircularText.js
 * Purpose: Circular rotating text badge used by the Contact launcher.
 * Details: Pure SVG text-on-path with slow clockwise spin.
 */

import React from 'react';

const CircularText = () => {
  return (
    <div className="relative w-48 h-48 flex items-center justify-center group">
      <style jsx>{`
        @keyframes spin-cw {
          0% { transform: rotate(0deg); }
          100% { transform: rotate(360deg); }
        }
      `}</style>
      {/* SVG for rotating text */}
      <svg 
        viewBox="0 0 100 100" 
        className="w-full h-full absolute"
        style={{
          animation: 'spin-cw 30s linear infinite'
        }}
      >
        <defs>
          <path
            id="textCircle"
            d="M 50,50 m -35,0 a 35,35 0 1,1 70,0 a 35,35 0 1,1 -70,0"
            fill="none"
          />
        </defs>
        <text className="fill-dark dark:fill-light text-[6.2px] tracking-[0.5px] uppercase font-bold">
          <textPath
            href="#textCircle"
            textLength="220"
            lengthAdjust="spacingAndGlyphs"
          >
            • Muhammad Zain • Software Engineering • University of Calgary   
          </textPath>
        </text>
      </svg>
      
      {/* Center circle with "Contact" text */}
      <div className="w-[4.5rem] h-[4.5rem] bg-dark dark:bg-light rounded-full flex items-center justify-center shadow-lg transition-all duration-300 group-hover:scale-[0.97] group-hover:shadow-sm">
        <div className="absolute inset-0 bg-gradient-to-br from-primary/20 to-primaryDark/20 dark:from-primaryDark/20 dark:to-primary/20 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
        <span className="text-light dark:text-dark text-base font-medium relative z-10">Contact</span>
      </div>
    </div>
  );
};

export default CircularText; 