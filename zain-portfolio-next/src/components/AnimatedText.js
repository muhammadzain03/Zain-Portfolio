/**
 * AnimatedText.js
 * Purpose: Reusable animated text component for dynamic text displays
 * Features:
 * - Text animation effects
 * - Customizable text styles
 * - Responsive design
 * - Motion effects integration
 */

import React from 'react';

const AnimatedText = ({ text, className = "" }) => {
  return (
    <h1 className={`inline-block w-full text-dark font-bold capitalize text-5xl sm:text-6xl ${className}`}>
      {text.split(" ").map((word, index) => (
        <span
          key={index}
          className="inline-block animate-fade-in-up opacity-0"
          style={{ animationDelay: `${index * 75}ms` }}
        >
          {word}&nbsp;
        </span>
      ))}
    </h1>
  );
};

export default AnimatedText;
