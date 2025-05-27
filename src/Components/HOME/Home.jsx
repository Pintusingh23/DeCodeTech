import React from 'react';
import Sidebar from './Sidebar';
import Header from './Header';
import HeroBanner from './HeroBanner';
import LearningProgress from './LearningProgress';
import ProgressCards from './ProgressCards';
import RecommendedCourses from './RecommendedCourses';
import Features from './Features';

const Home = () => {
  return (
    <div className="flex min-h-screen bg-gradient-to-br from-[#fff9f5] to-[#fff0e6] mt-24">
      <Sidebar />
      
      <main className="flex-1 p-8 space-y-8">
        <Header />
        <HeroBanner />
        <LearningProgress />
        <ProgressCards />
        <RecommendedCourses />
        <Features />
      </main>
    </div>
  );
};

export default Home;