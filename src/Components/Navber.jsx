import React, { useEffect, useState } from 'react';
import { FaSearch, FaBell, FaBars, FaTimes } from 'react-icons/fa';
import { Link } from 'react-router-dom';

const Navbar = () => {
  const [showAnnouncement, setShowAnnouncement] = useState(true);
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 50) {
        setShowAnnouncement(false);
        setScrolled(true);
      } else {
        setShowAnnouncement(true);
        setScrolled(false);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navBgClass = scrolled ? 'bg-white' : 'bg-[#fff4ec]';
  const textColorClass = scrolled ? 'text-black' : 'text-[#1f1f3a]';
  const borderClass = scrolled ? 'border-b border-black' : 'border-b border-transparent';

  return (
    <div className="fixed top-0 left-0 w-full z-50">
      {/* Announcement Bar */}
      <div
        className={`bg-yellow-400 text-black text-sm text-center px-4 flex justify-between items-center transition-all duration-500 ease-in-out overflow-hidden ${
          showAnnouncement ? 'py-2 h-auto' : 'h-0 py-0'
        }`}
      >
        <span className="truncate">
          Become a Data Analyst in just 10 weeks. Register & learn from an ex-Microsoft consultant.
        </span>
        <div className="flex items-center space-x-4">
          <a href="#" className="text-blue-800 font-bold whitespace-nowrap">REGISTER NOW</a>
          <button
            onClick={() => setShowAnnouncement(false)}
            className="text-xl font-bold focus:outline-none"
          >
            ×
          </button>
        </div>
      </div>

      {/* Main Navbar */}
      <div
        className={`${navBgClass} px-4 sm:px-6 py-3 sm:py-4 flex justify-between items-center transition-colors duration-300 ${borderClass}`}
      >
        {/* Logo and Desktop Navigation */}
        <div className="flex items-center">
          <div className={`flex items-center space-x-6 ${textColorClass}`}>
            <h1 className="text-lg sm:text-xl font-bold">
              <span className="border px-1">project</span> management
            </h1>
            
            {/* Desktop Navigation */}
            <nav className={`hidden md:flex space-x-4 text-sm ${textColorClass}`}>
              <Link to="/" className='text-purple-600 hover:text-purple-800'>Home</Link>
              <Link to="/web-development" className='text-purple-600 hover:text-purple-800'>Web development ▾</Link>
              <Link to="/Dsa" className="text-purple-600 font-medium hover:text-purple-800">Dsa▾</Link>
              <Link to="/Leetcode" className='text-purple-600 hover:text-purple-800'>Leedcode▾</Link>
              <Link to="/Codeforces" className='text-purple-600 hover:text-purple-800'>Codeforces▾</Link>
            </nav>
          </div>
        </div>

        {/* Mobile Menu Button */}
        <div className="md:hidden">
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className={`${textColorClass} focus:outline-none`}
          >
            {mobileMenuOpen ? <FaTimes size={24} /> : <FaBars size={24} />}
          </button>
        </div>

        {/* Desktop Right Side Icons */}
        <div className="hidden md:flex items-center space-x-4">
          <FaSearch className={`${textColorClass} text-lg cursor-pointer hover:text-purple-600`} />
          <FaBell className={`${textColorClass} text-lg cursor-pointer hover:text-purple-600`} />
          <div className="w-8 h-8 rounded-full bg-yellow-800 flex items-center justify-center text-white font-bold text-xs">
            ##
          </div>
          <button className="bg-purple-700 text-white px-4 py-1 rounded font-semibold text-sm hover:bg-purple-800 transition whitespace-nowrap">
            Upgrade plan
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {mobileMenuOpen && (
        <div className={`md:hidden ${navBgClass} px-4 py-2 border-t ${scrolled ? 'border-black' : 'border-transparent'}`}>
          <nav className="flex flex-col space-y-3 text-sm">
            <Link 
              to="/" 
              className='text-purple-600 py-1 hover:text-purple-800'
              onClick={() => setMobileMenuOpen(false)}
            >
              Home
            </Link>
            <Link 
              to="/web-development" 
              className='text-purple-600 py-1 hover:text-purple-800'
              onClick={() => setMobileMenuOpen(false)}
            >
              Web development ▾
            </Link>
            <Link 
              to="/Dsa" 
              className="text-purple-600 font-medium py-1 hover:text-purple-800"
              onClick={() => setMobileMenuOpen(false)}
            >
              Dsa▾
            </Link>
            <Link 
              to="/Leetcode" 
              className='text-purple-600 py-1 hover:text-purple-800'
              onClick={() => setMobileMenuOpen(false)}
            >
              Leedcode▾
            </Link>
            <Link 
              to="/Codeforces" 
              className='text-purple-600 py-1 hover:text-purple-800'
              onClick={() => setMobileMenuOpen(false)}
            >
              Codeforces▾
            </Link>
          </nav>
          
          <div className="flex items-center justify-between mt-4 pt-4 border-t border-gray-300">
            <div className="flex items-center space-x-4">
              <FaSearch className={`${textColorClass} text-lg cursor-pointer hover:text-purple-600`} />
              <FaBell className={`${textColorClass} text-lg cursor-pointer hover:text-purple-600`} />
              <div className="w-8 h-8 rounded-full bg-yellow-800 flex items-center justify-center text-white font-bold text-xs">
                ##
              </div>
            </div>
            <button className="bg-purple-700 text-white px-4 py-1 rounded font-semibold text-sm hover:bg-purple-800 transition">
              Upgrade plan
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Navbar;