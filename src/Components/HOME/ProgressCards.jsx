import React from 'react';
import { FaChartLine, FaBullseye, FaUserEdit, FaArrowRight } from 'react-icons/fa';
import { Link } from 'react-router-dom';

const ProgressCards = () => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
      {/* Card 1 */}
      <div className="bg-zinc-900/40 backdrop-blur-md rounded-2xl shadow-xl p-6 hover:shadow-2xl hover:shadow-orange-500/5 hover:-translate-y-1.5 transition-all duration-500 border border-zinc-800/80 hover:border-zinc-700/80 hover:bg-zinc-900/60 group">
        <div className="flex items-center gap-3 mb-3">
          <div className="p-3 bg-blue-950/40 rounded-xl text-blue-400 group-hover:scale-110 transition-transform duration-300">
            <FaChartLine className="text-lg" />
          </div>
          <h4 className="font-bold text-lg text-zinc-100 group-hover:text-orange-400 transition-colors duration-300">
            Interactive Learning
          </h4>
        </div>
        <p className="text-sm text-zinc-400 mb-5 leading-relaxed">Learn with hands-on coding exercises and real-world projects</p>
        <Link to="/web-development">
          <span className="text-orange-500 text-sm font-semibold inline-flex items-center cursor-pointer">
            Learn more
            <FaArrowRight className="ml-1.5 text-xs group-hover:translate-x-1.5 transition-transform duration-300" />
          </span>
        </Link>
      </div>

      {/* Card 2 */}
      <div className="bg-zinc-900/40 backdrop-blur-md rounded-2xl shadow-xl p-6 hover:shadow-2xl hover:shadow-orange-500/5 hover:-translate-y-1.5 transition-all duration-500 border border-zinc-800/80 hover:border-zinc-700/80 hover:bg-zinc-900/60 group">
        <div className="flex items-center gap-3 mb-3">
          <div className="p-3 bg-purple-950/40 rounded-xl text-purple-400 group-hover:scale-110 transition-transform duration-300">
            <FaBullseye className="text-lg" />
          </div>
          <h4 className="font-bold text-lg text-zinc-100 group-hover:text-orange-400 transition-colors duration-300">
            Coding Challenges
          </h4>
        </div>
        <p className="text-sm text-zinc-400 mb-5 leading-relaxed">Practice with LeetCode and Codeforces problems</p>
        <Link to="/LeetCode">
          <button className="text-orange-500 border border-orange-500/30 hover:border-orange-500 px-4 py-1.5 rounded-xl text-sm font-semibold hover:bg-orange-500/10 active:scale-95 transition-all duration-300">
            Set target
          </button>
        </Link>
      </div>

      {/* Card 3 */}
      <div className="bg-zinc-900/40 backdrop-blur-md rounded-2xl shadow-xl p-6 hover:shadow-2xl hover:shadow-orange-500/5 hover:-translate-y-1.5 transition-all duration-500 border border-zinc-800/80 hover:border-zinc-700/80 hover:bg-zinc-900/60 group">
        <div className="flex items-center gap-3 mb-3">
          <div className="p-3 bg-green-950/40 rounded-xl text-green-400 group-hover:scale-110 transition-transform duration-300">
            <FaUserEdit className="text-lg" />
          </div>
          <h4 className="font-bold text-lg text-zinc-100 group-hover:text-orange-400 transition-colors duration-300">
            Your goal
          </h4>
        </div>
        <p className="text-sm text-zinc-400 mb-5 leading-relaxed">Grow in my existing role</p>
        <Link to="/content">
          <button className="text-orange-500 text-sm font-semibold underline hover:text-orange-400 active:scale-95 transition-all duration-300">
            Edit
          </button>
        </Link>
      </div>
    </div>
  );
};

export default ProgressCards;