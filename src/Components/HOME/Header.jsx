import React, { useState } from 'react';

const Header = ({ onSearch }) => {
  const [searchQuery, setSearchQuery] = useState('');

  const handleSearchChange = (e) => {
    const query = e.target.value;
    setSearchQuery(query);
    if (onSearch) {
      onSearch(query);
    }
  };

  const handleSearchSubmit = (e) => {
    e.preventDefault();
    if (onSearch) {
      onSearch(searchQuery);
    }
  };

  return (
    <div className="flex flex-col md:flex-row justify-between items-center gap-4 md:gap-0 px-4 py-3 sm:px-6 sm:py-4">
      <h1 className="text-2xl sm:text-3xl font-bold text-[#5a2d0c] text-center md:text-left w-full md:w-auto">
        DeCode Academy Bootcamps
      </h1>
      <form onSubmit={handleSearchSubmit} className="relative w-full md:w-64">
        <input 
          type="text" 
          value={searchQuery}
          onChange={handleSearchChange}
          placeholder="Search courses, projects..." 
          className="w-full pl-4 pr-10 py-2 rounded-full border border-gray-200 focus:outline-none focus:ring-2 focus:ring-orange-300 focus:border-transparent text-sm bg-white/50 backdrop-blur-sm"
        />
        <button 
          type="submit"
          className="absolute right-3 top-2 text-gray-400 hover:text-gray-600"
          aria-label="Search"
        >
          <svg 
            xmlns="http://www.w3.org/2000/svg" 
            className="h-5 w-5" 
            fill="none" 
            viewBox="0 0 24 24" 
            stroke="currentColor"
          >
            <path 
              strokeLinecap="round" 
              strokeLinejoin="round" 
              strokeWidth={2} 
              d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" 
            />
          </svg>
        </button>
      </form>
    </div>
  );
};

export default Header;