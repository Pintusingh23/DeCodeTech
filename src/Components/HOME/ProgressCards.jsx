import React from 'react';
import { FaChartLine, FaBullseye, FaUserEdit, FaArrowRight } from 'react-icons/fa';

const ProgressCards = () => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
      <div className="bg-white rounded-2xl shadow-md p-5 hover:shadow-lg transition-shadow duration-300 border border-white group">
        <div className="flex items-center gap-3 mb-3">
          <div className="p-2 bg-blue-100 rounded-lg text-blue-600">
            <FaChartLine />
          </div>
          <h4 className="font-semibold text-[#5a2d0c]">Subjects and languages</h4>
        </div>
        <p className="text-sm text-gray-500 mb-4">Take action to stay motivated</p>
        <a href="#" className="text-orange-600 text-sm font-medium inline-flex items-center group-hover:underline">
          Continue in Learn SQL
          <FaArrowRight className="ml-1 text-xs" />
        </a>
      </div>
      
      <div className="bg-white rounded-2xl shadow-md p-5 hover:shadow-lg transition-shadow duration-300 border border-white group">
        <div className="flex items-center gap-3 mb-3">
          <div className="p-2 bg-purple-100 rounded-lg text-purple-600">
            <FaBullseye />
          </div>
          <h4 className="font-semibold text-[#5a2d0c]">Weekly target</h4>
        </div>
        <p className="text-sm text-gray-500 mb-4">No weekly target set yet</p>
        <button className="text-orange-600 border border-orange-200 px-3 py-1 rounded-lg text-sm font-medium hover:bg-orange-50 transition-colors duration-200">
          Set target
        </button>
      </div>
      
      <div className="bg-white rounded-2xl shadow-md p-5 hover:shadow-lg transition-shadow duration-300 border border-white group">
        <div className="flex items-center gap-3 mb-3">
          <div className="p-2 bg-green-100 rounded-lg text-green-600">
            <FaUserEdit />
          </div>
          <h4 className="font-semibold text-[#5a2d0c]">Your goal</h4>
        </div>
        <p className="text-sm text-gray-500 mb-1">Grow in my existing role</p>
        <button className="text-orange-600 text-sm underline hover:text-orange-700 transition-colors duration-200">
          Edit
        </button>
      </div>
    </div>
  );
};

export default ProgressCards;