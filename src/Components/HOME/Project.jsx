import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const projects = [
  {
    type: 'Practice Project',
    title: 'Visualize Twitch Gaming Data',
    desc: 'Transform Twitch streaming data into charts and graphs using Matplotlib.',
    icon: '📊'
  },
  {
    type: 'Practice Project',
    title: 'Analyze Hacker News Trends',
    desc: 'Query Hacker News data using SQL to discover trends.',
    icon: '🔍'
  },
  {
    type: 'Practice Project',
    title: 'Create a Playlist App With the Spotify API (Part One)',
    desc: 'Program a React app that lets users create custom Spotify playlists.',
    icon: '🎵'
  },
  {
    type: 'Practice Project',
    title: 'Analyze and Visualize Netflix Stock Data',
    desc: 'Act as a "Yahoo Finance" data analyst to generate a stock profile for Netflix.',
    icon: '📈'
  },
  {
    type: 'Practice Project',
    title: 'Decrypt Secret Messages',
    desc: 'Practice decrypting intercepted data using the command line to thwart Evil Corp.',
    icon: '🔐'
  },
  {
    type: 'Portfolio Project',
    title: 'Build Your Own Reddit App',
    desc: 'Use real data from the Reddit API and display it using React and Redux.',
    icon: '🛠️'
  },
];

const Project = () => {
  const [selected, setSelected] = useState(null);

  return (
    <div className="bg-gradient-to-b from-[#fef1e7] to-[#fce8d8] min-h-screen px-4 py-8 sm:px-6 sm:py-12 lg:px-8 mt-20">
      {/* Hero Section */}
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="text-center max-w-3xl mx-auto mb-12 sm:mb-16"
      >
        <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-gray-900 mb-4 leading-tight">
          Build Your <span className="text-orange-600">Tech Portfolio</span>
        </h1>
        <p className="text-gray-700 text-lg sm:text-xl max-w-2xl mx-auto">
          With a Plus or Pro account, work on real-world projects to apply your learning and showcase your skills.
        </p>
      </motion.div>

      {/* Project Cards Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 max-w-7xl mx-auto">
        {projects.map((proj, i) => (
          <motion.div
            key={i}
            className={`rounded-2xl p-6 border-2 transition-all cursor-pointer relative overflow-hidden
              ${selected === i
                ? 'border-blue-500 shadow-xl bg-white'
                : 'border-gray-200 bg-white hover:border-orange-300 hover:shadow-lg'
              }`}
            onClick={() => setSelected(i === selected ? null : i)}
            whileHover={{ y: -5 }}
            whileTap={{ scale: 0.98 }}
            layout
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3, delay: i * 0.05 }}
          >
            <div className="absolute top-4 right-4 text-2xl">
              {proj.icon}
            </div>
            
            <span className={`inline-block px-3 py-1 rounded-full text-xs font-semibold mb-3
              ${proj.type.includes('Portfolio') 
                ? 'bg-purple-100 text-purple-800' 
                : 'bg-blue-100 text-blue-800'
              }`}
            >
              {proj.type}
            </span>
            
            <h3 className="text-xl font-bold text-gray-900 mb-3 pr-8">{proj.title}</h3>
            
            <AnimatePresence>
              {selected === i && (
                <motion.div
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: 'auto' }}
                  exit={{ opacity: 0, height: 0 }}
                  transition={{ duration: 0.3 }}
                  className="overflow-hidden"
                >
                  <p className="text-gray-600 mb-4">{proj.desc}</p>
                  <button className="w-full bg-orange-100 hover:bg-orange-200 text-orange-700 font-medium py-2 px-4 rounded-lg transition-colors">
                    Start Project
                  </button>
                </motion.div>
              )}
            </AnimatePresence>
          </motion.div>
        ))}
      </div>

      {/* CTA Section */}
      <motion.div 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.5 }}
        className="text-center mt-16"
      >
        <button className="bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 text-white font-semibold px-8 py-4 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1 active:translate-y-0">
          Explore All Projects →
        </button>
        <p className="mt-4 text-gray-600">Unlock 50+ projects with Pro membership</p>
      </motion.div>
    </div>
  );
};

export default Project;