import React from 'react';

const CircularText = () => {
  return (
    <div className="relative w-28 h-28 flex items-center justify-center">
      {/* SVG for rotating text */}
      <svg viewBox="0 0 100 100" className="w-full h-full animate-spin-slow">
        {/* Circular Text */}
        <circle cx="50" cy="50" r="49" fill="none" />
        
        {/* Individual letters positioned around the circle */}
        <text className="text-[4px] font-medium uppercase fill-dark dark:fill-light tracking-[1px]" textAnchor="middle">
          {/* M */}
          <textPath href="#textCircle" startOffset="0%">M</textPath>
          {/* U */}
          <textPath href="#textCircle" startOffset="8%">U</textPath>
          {/* H */}
          <textPath href="#textCircle" startOffset="16%">H</textPath>
          {/* A */}
          <textPath href="#textCircle" startOffset="24%">A</textPath>
          {/* M */}
          <textPath href="#textCircle" startOffset="32%">M</textPath>
          {/* M */}
          <textPath href="#textCircle" startOffset="40%">M</textPath>
          {/* A */}
          <textPath href="#textCircle" startOffset="48%">A</textPath>
          {/* D */}
          <textPath href="#textCircle" startOffset="56%">D</textPath>
          {/* Space and dash */}
          <textPath href="#textCircle" startOffset="64%">—</textPath>
          {/* Z */}
          <textPath href="#textCircle" startOffset="72%">Z</textPath>
          {/* A */}
          <textPath href="#textCircle" startOffset="80%">A</textPath>
          {/* I */}
          <textPath href="#textCircle" startOffset="88%">I</textPath>
          {/* N */}
          <textPath href="#textCircle" startOffset="96%">N</textPath>
        </text>

        {/* Define the circle path for text */}
        <path
          id="textCircle"
          d="M 50,50 m -40,0 a 40,40 0 1,1 80,0 a 40,40 0 1,1 -80,0"
          fill="none"
        />
      </svg>
      
      {/* Center circle with "Contact" text */}
      <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-16 h-16 bg-dark dark:bg-light rounded-full flex items-center justify-center">
        <span className="text-light dark:text-dark text-sm font-medium">Contact</span>
      </div>
    </div>
  );
};

export default CircularText; 