import React from 'react';
import Link from 'next/link';

const HireMe = () => {
  return (
    <div className="mt-12 flex justify-center">
      <Link
        href="mailto:muhammadzain0476@gmail.com"
        className="px-8 py-3 bg-primary text-white font-semibold rounded-md shadow hover:bg-primaryDark transition"
      >
        Contact Me
      </Link>
    </div>
  );
};

export default HireMe;
