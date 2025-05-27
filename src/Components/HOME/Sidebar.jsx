import React, { useState } from 'react';
import { FaCalendarAlt, FaFolderOpen, FaCode, FaThLarge, FaEllipsisH } from 'react-icons/fa';
import { Link } from 'react-router-dom';

const Sidebar = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  return (
    <>
      {/* Mobile Menu Button (only visible on small screens) */}
      <button 
        className="md:hidden fixed top-4 left-4 z-50 bg-white p-2 rounded-lg shadow-md border border-gray-200"
        onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
      >
        <FaEllipsisH className="text-orange-500" />
      </button>

      {/* Sidebar */}
      <aside className={`${isMobileMenuOpen ? 'translate-x-0' : '-translate-x-full'} md:translate-x-0 transform transition-transform duration-300 ease-in-out w-64 bg-white/50 p-6 space-y-6 fixed md:sticky top-0 left-0 h-screen backdrop-blur-sm border-r border-orange-100 z-40 overflow-y-auto`}>
        {/* Close button for mobile */}
        <button 
          className="md:hidden absolute top-4 right-4 text-gray-500 hover:text-gray-700"
          onClick={() => setIsMobileMenuOpen(false)}
        >
          ✕
        </button>

        <Link to="/Deshboard" className="flex items-center space-x-3 mb-6">
          <h2 className="text-xl font-bold flex items-center space-x-3 text-[#5a2d0c]">
            <FaThLarge className="text-orange-500" /> 
            <span>Dashboard</span>
          </h2>
        </Link>
        
        <nav className="space-y-3 text-sm text-gray-700">
          <Link 
            to="/learning" 
            className="block hover:font-medium cursor-pointer hover:text-orange-600 transition-all duration-200 flex items-center gap-3 p-2 rounded-lg hover:bg-orange-50"
            onClick={() => setIsMobileMenuOpen(false)}
          >
            <div className="w-6 h-6 rounded-full bg-orange-100 flex items-center justify-center">
              <div className="w-2 h-2 rounded-full bg-orange-500"></div>
            </div>
            My learning
          </Link>
          <Link 
            to="/events" 
            className="hover:font-medium cursor-pointer flex items-center gap-3 p-2 rounded-lg hover:bg-orange-50 hover:text-orange-600 transition-all duration-200"
            onClick={() => setIsMobileMenuOpen(false)}
          >
            <div className="w-6 h-6 rounded-full bg-blue-100 flex items-center justify-center text-blue-500">
              <FaCalendarAlt size={14} />
            </div>
            Events
          </Link>
          <Link 
            to="/projects" 
            className="hover:font-medium cursor-pointer flex items-center justify-between p-2 rounded-lg hover:bg-orange-50 hover:text-orange-600 transition-all duration-200"
            onClick={() => setIsMobileMenuOpen(false)}
          >
            <span className="flex items-center gap-3">
              <div className="w-6 h-6 rounded-full bg-purple-100 flex items-center justify-center text-purple-500">
                <FaFolderOpen size={14} />
              </div>
              Projects
            </span>
            <span className="bg-orange-100 text-orange-700 text-xs px-2 py-0.5 rounded-full">Upgrade</span>
          </Link>
          <div 
            className="hover:font-medium cursor-pointer flex items-center gap-3 p-2 rounded-lg hover:bg-orange-50 hover:text-orange-600 transition-all duration-200"
            onClick={() => setIsMobileMenuOpen(false)}
          >
            <div className="w-6 h-6 rounded-full bg-green-100 flex items-center justify-center text-green-500">
              <FaCode size={14} />
            </div>
            Workspaces
          </div>
        </nav>
        
        <div className="bg-gradient-to-r from-orange-50 to-amber-50 p-4 border border-orange-100 rounded-xl space-y-3 shadow-sm">
          <h3 className="font-bold text-[#5a2d0c]">Upgrade your plan</h3>
          <p className="text-xs text-gray-600">Go deeper and learn job-ready skills.</p>
          <button className="bg-gradient-to-r from-orange-600 to-amber-600 text-white py-2 px-4 rounded-lg w-full font-medium shadow-md hover:shadow-lg transition-all duration-300 hover:opacity-90">
            Upgrade plan
          </button>
        </div>
      </aside>

      {/* Overlay for mobile */}
      {isMobileMenuOpen && (
        <div 
          className="fixed inset-0 bg-black bg-opacity-50 z-30 md:hidden"
          onClick={() => setIsMobileMenuOpen(false)}
        />
      )}
    </>
  );
};

export default Sidebar;