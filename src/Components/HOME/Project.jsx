import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const projects = [
  {
    type: 'Practice Project',
    title: 'Visualize Twitch Gaming Data',
    desc: 'Transform Twitch streaming data into charts and graphs using Matplotlib.',
  },
  {
    type: 'Practice Project',
    title: 'Analyze Hacker News Trends',
    desc: 'Query Hacker News data using SQL to discover trends.',
  },
  {
    type: 'Practice Project',
    title: 'Create a Playlist App With the Spotify API (Part One)',
    desc: 'Program a React app that lets users create custom Spotify playlists.',
  },
  {
    type: 'Practice Project',
    title: 'Analyze and Visualize Netflix Stock Data',
    desc: 'Act as a "Yahoo Finance" data analyst to generate a stock profile for Netflix.',
  },
  {
    type: 'Practice Project',
    title: 'Decrypt Secret Messages',
    desc: 'Practice decrypting intercepted data using the command line to thwart Evil Corp.',
  },
  {
    type: 'Portfolio Project',
    title: 'Build Your Own Reddit App',
    desc: 'Use real data from the Reddit API and display it using React and Redux.',
  },
];

const Project = () => {
  const [selected, setSelected] = useState(null);

  return (
    <div className="bg-[#fef1e7] min-h-screen p-6">
      {/* Hero */}
      <div className="text-center max-w-3xl mx-auto py-10">
        <h1 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-3">
          Projects help you build your tech portfolio
        </h1>
        <p className="text-gray-700 text-lg">
          With a Plus or Pro account, you can work on real-world projects to apply your learning and showcase your skills.
          Get started with one of our handpicked options.
        </p>
      </div>

      {/* Project Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto">
        {projects.map((proj, i) => (
          <motion.div
            key={i}
            className={`rounded-xl p-5 border transition cursor-pointer ${
              selected === i
                ? 'border-blue-600 shadow-2xl bg-white'
                : 'border-gray-300 bg-white hover:shadow-md'
            }`}
            onClick={() => setSelected(i === selected ? null : i)}
            whileTap={{ scale: 0.95 }}
            layout
          >
            <h4 className="text-sm text-gray-500 font-semibold mb-1">{proj.type}</h4>
            <h3 className="text-lg font-bold text-gray-900 mb-2">{proj.title}</h3>
            <AnimatePresence>
              {selected === i && (
                <motion.p
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: 'auto' }}
                  exit={{ opacity: 0, height: 0 }}
                  className="text-gray-700 text-sm"
                >
                  {proj.desc}
                </motion.p>
              )}
            </AnimatePresence>
          </motion.div>
        ))}
      </div>

      {/* Explore Button */}
      <div className="text-center mt-10">
        <button className="bg-purple-600 hover:bg-purple-700 text-white font-semibold px-6 py-3 rounded-xl">
          Explore all projects →
        </button>
      </div>
    </div>
  );
};

export default Project;
