import React from 'react';

import { Link } from 'react-router-dom';
const RecommendedCourses = () => {
  const courses = [
    {
      title: "Web Development",
      desc: "Learn HTML, CSS, and JavaScript from scratch.",
      hours: "17 hours",
      courses: "9 Courses",
      icon: "📊",
      color: "bg-blue-950/40 text-blue-400"
    },
    {
      title: "Data Structures & Algorithms",
      desc: "Master DSA concepts with practical examples.",
      hours: "13 hours",
      courses: "5 Courses",
      icon: "🗃️",
      color: "bg-purple-950/40 text-purple-400"
    },
    {
      title: "HTML & CSS Fundamentals",
      desc: "Build beautiful and responsive websites.",
      hours: "90 hours",
      courses: "17 Courses",
      icon: "⚙️",
      color: "bg-green-950/40 text-green-400"
    }
  ];

  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-extrabold text-zinc-100 tracking-tight">Popular Courses</h2>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {courses.map((rec, idx) => (
          <div 
            key={idx} 
            className="bg-zinc-900/40 backdrop-blur-md p-6 shadow-xl rounded-3xl space-y-4 hover:shadow-2xl hover:shadow-orange-500/5 hover:-translate-y-1.5 transition-all duration-500 border border-zinc-800/80 hover:border-zinc-700/80 hover:bg-zinc-900/60 group"
          >
            <div className={`w-12 h-12 rounded-2xl ${rec.color} flex items-center justify-center text-xl mb-4 shadow-sm group-hover:scale-110 transition-transform duration-300`}>
              {rec.icon}
            </div>
            <h3 className="font-bold text-lg text-zinc-100 transition-colors duration-300 group-hover:text-orange-400">{rec.title}</h3>
            <p className="text-sm text-zinc-400 leading-relaxed">{rec.desc}</p>
            <div className="flex justify-between items-center pt-3 border-t border-zinc-800/60 text-zinc-500">
              <p className="text-xs">{rec.courses} • With Certificate</p>
              <p className="text-xs font-medium">⏱ {rec.hours}</p>
            </div>
            <Link to="/web-development">
              <button className="mt-4 w-full py-2.5 rounded-xl border border-orange-500/30 text-orange-500 font-semibold hover:bg-orange-500/10 active:scale-95 transition-all duration-300">
                Explore
              </button>
            </Link>
          </div>
        ))}
      </div>
    </div>
  );
};

export default RecommendedCourses;