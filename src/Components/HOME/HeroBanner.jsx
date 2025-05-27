import React from 'react';
import { FaArrowRight } from 'react-icons/fa';

const HeroBanner = () => {
  return (
    <div className="bg-gradient-to-r from-amber-400 to-orange-400 rounded-2xl flex flex-col-reverse md:flex-row items-center justify-between p-6 md:p-8 shadow-lg hover:shadow-xl transition-shadow duration-300 gap-6 md:gap-0">
      <div className="max-w-lg space-y-2 md:space-y-3 text-center md:text-left">
        <span className="bg-blue-700 text-white text-xs px-3 py-1 rounded-full inline-flex items-center mx-auto md:mx-0">
          <span className="w-2 h-2 bg-white rounded-full mr-2 animate-pulse"></span>
          Recently added
        </span>
        <h2 className="text-xl md:text-2xl lg:text-3xl font-bold text-white">
          Data Analytics & Visualization Bootcamp
        </h2>
        <p className="text-white/90 text-sm md:text-base">
          Join our expert-led bootcamp to gain in-demand coding skills and build portfolio-ready projects.
        </p>
        <a 
          href="#" 
          className="font-bold text-white inline-flex items-center group justify-center md:justify-start"
        >
          Register now 
          <FaArrowRight className="ml-2 group-hover:translate-x-1 transition-transform duration-200" />
        </a>
      </div>
      <img
        src="https://cdn-icons-png.flaticon.com/512/919/919827.png"
        alt="Bootcamp Graphic"
        className="w-32 h-32 md:w-40 md:h-40 lg:w-48 lg:h-48 object-contain transform hover:scale-105 transition-transform duration-300"
      />
    </div>
  );
};

export default HeroBanner;