import React from 'react';
import { FaArrowRight } from 'react-icons/fa';

const Features = () => {
  const features = [
    {
      title: "Interview Simulator",
      desc: "Practice your interviewing skills and get real-time AI-powered feedback.",
      icon: "💬"
    },
    {
      title: "Job-readiness checker",
      desc: "Analyze job postings to see what skills you need to advance your career.",
      icon: "✅"
    },
    {
      title: "Clubs",
      desc: "Connect with peers, join club events, and help each other grow.",
      icon: "👥"
    }
  ];

  return (
    <div className="space-y-5">
      <h2 className="text-2xl font-bold text-[#5a2d0c]">Discover more features</h2>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
        {features.map((feature, idx) => (
          <div 
            key={idx} 
            className="bg-white p-5 rounded-2xl shadow-md hover:shadow-lg transition-shadow duration-300 border border-white group"
          >
            <div className="text-3xl mb-3">{feature.icon}</div>
            <h4 className="font-semibold text-[#5a2d0c]">{feature.title}</h4>
            <p className="text-sm text-gray-600 mt-1">{feature.desc}</p>
            <button className="mt-4 text-orange-600 text-sm font-medium inline-flex items-center group-hover:underline">
              Learn more
              <FaArrowRight className="ml-1 text-xs" />
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Features;