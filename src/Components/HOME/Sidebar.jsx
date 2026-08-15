import React, { useState } from 'react';
import { FaCalendarAlt, FaFolderOpen, FaCode, FaThLarge, FaEllipsisH } from 'react-icons/fa';
import { Link } from 'react-router-dom';

const Sidebar = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

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
        w-72 bg-white/80 p-6 space-y-8 fixed md:sticky md:top-20 left-0 h-[calc(100vh-5rem)] 
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
          className="flex items-center space-x-3 group"
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
        <nav className="space-y-2">
          {[
            
          
            { 
              icon: <FaFolderOpen className="text-purple-500 text-sm" />, 
              name: "Projects", 
              path: "/projects",
             
            },
           
          ].map((item, index) => (
            <Link
              key={index}
              to={item.path}
              className="flex items-center justify-between p-3 rounded-xl hover:bg-orange-50 transition-all duration-200 group"
              onClick={() => setIsMobileMenuOpen(false)}
            >
              <div className="flex items-center gap-3">
                <div className={`w-6 h-6 rounded-full flex items-center justify-center 
                  ${index === 0 ? 'bg-orange-100' : 
                    index === 1 ? 'bg-blue-100' : 
                    index === 2 ? 'bg-purple-100' : 'bg-green-100'}`}
                >
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
        
        {/* Upgrade Card */}
        <div className="bg-gradient-to-br from-orange-50 to-amber-50 p-5 border border-orange-100 rounded-xl space-y-3 shadow-sm hover:shadow-md transition-shadow">
          <h3 className="font-bold text-gray-800">Jamna Academy Bootcamps</h3>
          <p className="text-sm text-gray-600">Go deeper and learn job-ready skills.</p>
          <button className="bg-gradient-to-r from-orange-500 to-amber-500 text-white py-2.5 px-5 rounded-xl w-full font-medium shadow hover:shadow-md transition-all hover:opacity-90 active:scale-95">
            lern more
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