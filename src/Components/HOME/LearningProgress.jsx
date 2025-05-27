import React from 'react';
import { FaArrowRight } from 'react-icons/fa';

const LearningProgress = () => {
  return (
    <div className="bg-white rounded-2xl shadow-md p-6 hover:shadow-lg transition-shadow duration-300 border border-white">
      <div className="flex justify-between items-center">
        <div>
          <div className="w-full bg-gray-200 rounded-full h-2 mb-2">
            <div className="bg-orange-500 h-2 rounded-full" style={{width: '0%'}}></div>
          </div>
          <h3 className="text-xl font-bold text-[#5a2d0c]">Learn SQL</h3>
          <p className="text-sm text-gray-600">Current Module: Manipulation</p>
        </div>
        <div className="flex gap-3">
          <button className="border border-orange-200 px-4 py-1 rounded-lg text-orange-600 hover:bg-orange-50 transition-colors duration-200">
            Make a plan
          </button>
          <button className="text-gray-500 hover:text-black transition-colors duration-200">
            Dismiss
          </button>
        </div>
      </div>
      <button className="mt-4 bg-gradient-to-r from-orange-600 to-amber-600 text-white w-full py-3 rounded-lg font-semibold hover:opacity-90 transition-opacity duration-200 flex items-center justify-center gap-2">
        Resume 
        <FaArrowRight />
      </button>
    </div>
  );
};

export default LearningProgress;