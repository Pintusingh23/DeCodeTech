import React, { useEffect, useState } from 'react';
import { FaSearch, FaBell, FaBars, FaTimes } from 'react-icons/fa';
import { Link, useLocation } from 'react-router-dom';
import { motion } from 'framer-motion';

const Navbar = ({ isLoading = false }) => {
  const [showAnnouncement, setShowAnnouncement] = useState(true);
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [mobileDropdownOpen, setMobileDropdownOpen] = useState(false);
  const location = useLocation();

  const isHome = location.pathname === '/';

  useEffect(() => {
    const handleScroll = () => {
      const isScrolled = window.scrollY > 50;
      setShowAnnouncement(!isScrolled);
      setScrolled(isScrolled);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Dynamic Theme Navigation Classes
  const navClasses = isHome
    ? {
      bg: scrolled ? 'bg-zinc-950/90 backdrop-blur-md' : 'bg-black/50 backdrop-blur-sm',
      text: 'text-zinc-100',
      border: scrolled ? 'border-b border-zinc-900/60' : 'border-b border-transparent',
      link: 'text-zinc-300 hover:text-white font-medium transition-colors duration-200'
    }
    : {
      bg: scrolled ? 'bg-[#211D31]/95 backdrop-blur-md' : 'bg-[#211D31]/50 backdrop-blur-sm',
      text: 'text-[#F8F7FF]',
      border: scrolled ? 'border-b border-[#C8C1F0]/10' : 'border-b border-transparent',
      link: 'text-[#B8B2CC] hover:text-[#9B8DE3] font-medium transition-colors duration-200'
    };

  const navItems = [
    { path: "/", label: "Home" },
    { path: "/web-development", label: "Web development ▾" },
    { path: "/Dsa", label: "Dsa▾", isBold: true },
    { path: "/Python", label: "Python▾" },
    { path: "/Datamining", label: "Data mining▾" },
    { path: "/AIML", label: "AI ML▾" },
    { path: "/computerarchitecture", label: "Computer Architecture▾" },
    { path: "/mysql", label: "MY SQL▾" }
  ];

  return (
    <div className="fixed top-0 left-0 w-full z-50 font-['Space_Grotesk']">
      {/* Announcement Bar */}
      <div
        className={`${isHome ? 'bg-zinc-900 text-zinc-300' : 'bg-[#1A1625] text-[#B8B2CC]'} border-b border-[#C8C1F0]/10 text-xs px-4 flex justify-between items-center transition-all duration-500 ease-in-out overflow-hidden ${showAnnouncement ? 'py-2.5 h-auto' : 'h-0 py-0'}`}
      >
        <span className="truncate tracking-wide select-none">
          🚀 Master coding with Decode Tech - Your ultimate learning destination!
        </span>
        <a href="/web-development" className={`${isHome ? 'text-yellow-400' : 'text-[#9B8DE3]'} font-bold whitespace-nowrap hover:underline tracking-wider text-[11px] uppercase`}>
          LEARN NOW
        </a>
      </div>

      {/* Main Navigation */}
      <div
        className={`${navClasses.bg} px-4 sm:px-8 py-3.5 sm:py-5 flex justify-between items-center transition-all duration-300 ${navClasses.border}`}
      >
        <div className="flex items-center space-x-6 lg:space-x-10">
          {/* Brand Logo */}
          {!isLoading ? (
            <motion.div
              layoutId="brandLogo"
              transition={{ type: 'spring', stiffness: 100, damping: 18 }}
            >
              <Link to="/" className={`text-xl md:text-2xl font-black uppercase tracking-tight flex items-center select-none transition-colors duration-300 ${isHome ? 'text-white' : 'text-[#F8F7FF]'}`}>
                <span>D</span>
                <span className={`font-medium lowercase tracking-wide ml-[1px] transition-colors duration-300 ${isHome ? 'text-zinc-400' : 'text-[#B8B2CC]'}`}>ecode Tech</span>
              </Link>
            </motion.div>
          ) : (
            <div className="w-[100px] h-[32px]" />
          )}

          {/* Desktop Navigation */}
          <nav className="hidden xl:flex items-center space-x-6 lg:space-x-8">
            {navItems.map((item, index) => (
              item.type === "dropdown" ? (
                <div
                  key={index}
                  className="relative"
                  onMouseEnter={() => setDropdownOpen(true)}
                  onMouseLeave={() => setDropdownOpen(false)}
                >
                  <button className={`${navClasses.link} flex items-center focus:outline-none uppercase tracking-wider text-xs`}>
                    {item.label}
                  </button>
                  {dropdownOpen && (
                    <div className="absolute top-full left-0 mt-2 w-48 bg-[#29243A] border border-[#C8C1F0]/20 rounded-xl shadow-[0_8px_30px_rgba(0,0,0,0.5)] z-50 p-1">
                      {item.items.map((subItem, subIndex) => (
                        <Link
                          key={subIndex}
                          to={subItem.path}
                          className="block px-4 py-2.5 text-xs text-[#B8B2CC] hover:text-[#F8F7FF] rounded-lg hover:bg-[rgba(255,255,255,0.06)] transition-colors"
                        >
                          {subItem.label}
                        </Link>
                      ))}
                    </div>
                  )}
                </div>
              ) : (
                <Link
                  key={index}
                  to={item.path}
                  className={`${navClasses.link} uppercase tracking-wider text-xs ${item.isBold ? 'font-bold text-[#9B8DE3]' : ''}`}
                >
                  {item.label}
                </Link>
              )
            ))}
          </nav>
        </div>

        {/* Right Side Controls */}
        <div className="flex items-center space-x-4">
          {/* Desktop Icons */}
          <div className="hidden xl:flex items-center space-x-6">
            <FaBell className={`${isHome ? 'text-zinc-400 hover:text-white' : 'text-[#B8B2CC] hover:text-[#9B8DE3]'} text-lg cursor-pointer transition-colors`} />
            <Link to="/contact">
              <button className={`${isHome ? 'border-zinc-800 hover:border-zinc-700 text-zinc-200 hover:text-white hover:bg-zinc-900/60' : 'border-[#C8C1F0]/20 hover:border-[#9B8DE3] text-[#F8F7FF] hover:bg-[rgba(117,96,199,0.15)]'} border px-4 py-2 rounded-xl font-bold text-xs uppercase tracking-wider active:scale-95 transition-all duration-300 shadow-sm`}>
                Contact us
              </button>
            </Link>
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className={`xl:hidden focus:outline-none transition-colors ${isHome ? 'text-zinc-400 hover:text-white' : 'text-[#B8B2CC] hover:text-[#F8F7FF]'}`}
            aria-label="Toggle menu"
          >
            {mobileMenuOpen ? (
              <FaTimes className="text-xl" />
            ) : (
              <FaBars className="text-xl" />
            )}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {mobileMenuOpen && (
        <div className={`xl:hidden ${navClasses.bg} px-6 py-6 border-t border-[#C8C1F0]/10`}>
          <nav className="flex flex-col space-y-4">
            {navItems.map((item, index) => (
              item.type === "dropdown" ? (
                <div key={index}>
                  <button
                    onClick={() => setMobileDropdownOpen(!mobileDropdownOpen)}
                    className={`${navClasses.link} w-full flex justify-between items-center py-2 uppercase tracking-wider text-xs`}
                  >
                    <span>{item.label}</span>
                    <span>{mobileDropdownOpen ? '▲' : '▼'}</span>
                  </button>
                  {mobileDropdownOpen && (
                    <div className="pl-4 space-y-2 pt-1">
                      {item.items.map((subItem, subIndex) => (
                        <Link
                          key={subIndex}
                          to={subItem.path}
                          className="block text-[#B8B2CC] hover:text-[#F8F7FF] text-xs uppercase tracking-wider py-1.5"
                          onClick={() => setMobileMenuOpen(false)}
                        >
                          {subItem.label}
                        </Link>
                      ))}
                    </div>
                  )}
                </div>
              ) : (
                <Link
                  key={index}
                  to={item.path}
                  className={`${navClasses.link} py-2 uppercase tracking-wider text-xs block ${item.isBold ? 'font-bold text-[#9B8DE3]' : ''}`}
                  onClick={() => setMobileMenuOpen(false)}
                >
                  {item.label}
                </Link>
              )
            ))}
          </nav>

          <div className={`flex items-center justify-between mt-6 pt-6 border-t border-[#C8C1F0]/10`}>
            <div className="flex items-center space-x-6 text-[#B8B2CC]">
              <FaSearch className="text-lg cursor-pointer hover:text-[#9B8DE3] transition-colors" />
              <FaBell className="text-lg cursor-pointer hover:text-[#9B8DE3] transition-colors" />
            </div>
            <Link to="/Contact" onClick={() => setMobileMenuOpen(false)}>
              <button className="border border-[#C8C1F0]/20 text-[#F8F7FF] hover:bg-[rgba(117,96,199,0.15)] px-4 py-2 rounded-xl font-bold text-xs uppercase tracking-wider active:scale-95 transition-all">
                Contact us
              </button>
            </Link>
          </div>
        </div>
      )}
    </div>
  );
};

export default Navbar;
