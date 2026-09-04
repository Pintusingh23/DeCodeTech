import React, { useState } from 'react';
import { FaCalendarAlt, FaFolderOpen, FaCode, FaThLarge, FaEllipsisH, FaLaptopCode, FaBrain, FaServer, FaCogs, FaBook, FaRocket } from 'react-icons/fa';
import { Link, useLocation } from 'react-router-dom';

const Sidebar = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const location = useLocation();

  const navItems = [
    { 
      icon: <FaFolderOpen className="text-purple-500 text-sm" />, 
      name: "Projects", 
      path: "/projects",
    },
  ];

  const trackItems = [
    { 
      icon: <FaCode className="text-sm" />, 
      name: "DSA Track", 
      path: "/Dsa",
      color: "from-violet-500 to-purple-600",
      bgColor: "bg-violet-100",
      textColor: "text-violet-600",
    },
    { 
      icon: <FaLaptopCode className="text-sm" />, 
      name: "Dev Track", 
      path: "/web-development",
      color: "from-blue-500 to-cyan-500",
      bgColor: "bg-blue-100",
      textColor: "text-blue-600",
    },
    { 
      icon: <FaBrain className="text-sm" />, 
      name: "AI / ML", 
      path: "/AIML",
      color: "from-pink-500 to-rose-500",
      bgColor: "bg-pink-100",
      textColor: "text-pink-600",
    },
    { 
      icon: <FaServer className="text-sm" />, 
      name: "System Design", 
      path: "/system-design",
      color: "from-emerald-500 to-teal-500",
      bgColor: "bg-emerald-100",
      textColor: "text-emerald-600",
    },
    { 
      icon: <FaCogs className="text-sm" />, 
      name: "DevOps", 
      path: "/devops",
      color: "from-amber-500 to-orange-500",
      bgColor: "bg-amber-100",
      textColor: "text-amber-600",
    },
    { 
      icon: <FaBook className="text-sm" />, 
      name: "Core Subjects", 
      path: "/core-subjects",
      color: "from-indigo-500 to-blue-600",
      bgColor: "bg-indigo-100",
      textColor: "text-indigo-600",
    },
  ];

  return (
    <>
      {/* Mobile Menu Button */}
      <button 
        className="md:hidden fixed top-24 right-0 z-50 bg-white p-3 rounded-xl shadow-lg border border-gray-200 hover:bg-gray-50 transition-all"
        onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
        aria-label="Toggle menu"
      >
        <FaEllipsisH className="text-orange-500 text-lg" />
      </button>

      {/* Sidebar */}
      <aside 
        className={`${isMobileMenuOpen ? 'translate-x-0' : '-translate-x-full'} 
        md:translate-x-0 transform transition-all duration-300 ease-in-out 
        w-72 bg-white/80 p-6 space-y-6 fixed md:sticky md:top-20 left-0 h-[calc(100vh-5rem)] 
        backdrop-blur-md border-r border-orange-100 z-40 overflow-y-auto`}
      >
        {/* Close button for mobile */}
        <button 
          className="md:hidden absolute top-5 right-5 text-gray-500 hover:text-gray-700 transition-colors"
          onClick={() => setIsMobileMenuOpen(false)}
          aria-label="Close menu"
        >
          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
            <path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd" />
          </svg>
        </button>

        {/* Dashboard Link */}
        <Link 
          to="/" 
          className={`flex items-center space-x-3 group p-2 rounded-xl transition-all ${
            location.pathname === '/' || location.pathname === '/Deshboard' 
              ? 'bg-orange-100' 
              : 'hover:bg-orange-50'
          }`}
          onClick={() => setIsMobileMenuOpen(false)}
        >
          <div className="p-2 bg-orange-100 rounded-lg group-hover:bg-orange-200 transition-colors">
            <FaThLarge className="text-orange-600 text-lg" />
          </div>
          <h2 className="text-xl font-bold text-gray-800 group-hover:text-orange-600 transition-colors">
            Dashboard
          </h2>
        </Link>
        
        {/* Navigation */}
        <nav className="space-y-1">
          {navItems.map((item, index) => (
            <Link
              key={index}
              to={item.path}
              className={`flex items-center justify-between p-3 rounded-xl transition-all duration-200 group ${
                location.pathname === item.path 
                  ? 'bg-orange-50 border border-orange-200' 
                  : 'hover:bg-orange-50'
              }`}
              onClick={() => setIsMobileMenuOpen(false)}
            >
              <div className="flex items-center gap-3">
                <div className="w-6 h-6 rounded-full flex items-center justify-center bg-purple-100">
                  {item.icon}
                </div>
                <span className="text-gray-700 group-hover:text-orange-600 font-medium transition-colors">
                  {item.name}
                </span>
              </div>
              {item.badge && (
                <span className="bg-orange-100 text-orange-700 text-xs px-2 py-1 rounded-full">
                  {item.badge}
                </span>
              )}
            </Link>
          ))}
        </nav>

        {/* Placement Tracks Section */}
        <div className="space-y-3">
          <div className="flex items-center gap-2 px-2">
            <FaRocket className="text-orange-500 text-xs" />
            <h3 className="text-xs font-bold text-gray-400 uppercase tracking-wider">
              Placement Tracks
            </h3>
            <div className="flex-1 h-px bg-gradient-to-r from-orange-200 to-transparent"></div>
          </div>
          
          <nav className="space-y-1">
            {trackItems.map((track, index) => {
              const isActive = location.pathname === track.path;
              return (
                <Link
                  key={index}
                  to={track.path}
                  className={`flex items-center gap-3 p-3 rounded-xl transition-all duration-200 group relative overflow-hidden ${
                    isActive 
                      ? 'bg-gradient-to-r ' + track.color + ' text-white shadow-md' 
                      : 'hover:bg-gray-50'
                  }`}
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  <div className={`w-7 h-7 rounded-lg flex items-center justify-center transition-all duration-200 ${
                    isActive 
                      ? 'bg-white/20' 
                      : track.bgColor
                  }`}>
                    <span className={isActive ? 'text-white' : track.textColor}>
                      {track.icon}
                    </span>
                  </div>
                  <span className={`font-medium transition-colors text-sm ${
                    isActive 
                      ? 'text-white' 
                      : 'text-gray-700 group-hover:text-gray-900'
                  }`}>
                    {track.name}
                  </span>
                  {!isActive && (
                    <svg 
                      className="w-4 h-4 ml-auto text-gray-300 group-hover:text-gray-500 transition-all group-hover:translate-x-0.5" 
                      fill="none" viewBox="0 0 24 24" stroke="currentColor"
                    >
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                    </svg>
                  )}
                </Link>
              );
            })}
          </nav>
        </div>
        
        {/* Upgrade Card */}
        <div className="bg-gradient-to-br from-orange-50 to-amber-50 p-5 border border-orange-100 rounded-xl space-y-3 shadow-sm hover:shadow-md transition-shadow">
          <h3 className="font-bold text-gray-800">deCode Academy</h3>
          <p className="text-sm text-gray-600">Go deeper and learn job-ready skills.</p>
          <button className="bg-gradient-to-r from-orange-500 to-amber-500 text-white py-2.5 px-5 rounded-xl w-full font-medium shadow hover:shadow-md transition-all hover:opacity-90 active:scale-95">
            LEARN MORE
          </button>
        </div>
      </aside>

      {/* Overlay for mobile */}
      {isMobileMenuOpen && (
        <div 
          className="fixed inset-0 bg-black/30 backdrop-blur-sm z-30 md:hidden"
          onClick={() => setIsMobileMenuOpen(false)}
        />
      )}
    </>
  );
};

export default Sidebar;