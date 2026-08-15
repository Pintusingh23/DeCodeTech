import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';

const CircularBrand = () => {
  const [isShattered, setIsShattered] = useState(false);
  const [isAnimating, setIsAnimating] = useState(false);
  const [isHovered, setIsHovered] = useState(false);
  const [windowWidth, setWindowWidth] = useState(typeof window !== 'undefined' ? window.innerWidth : 1200);

  useEffect(() => {
    const handleResize = () => setWindowWidth(window.innerWidth);
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const isMobile = windowWidth < 768;
  const letterSpacing = isMobile ? 18 : 28;

  // Word letters: D E C O D E [space] T E C H
  const brandWord = ['D', 'E', 'C', 'O', 'D', 'E', ' ', 'T', 'E', 'C', 'H'];

  // Static random scatter offsets
  const [scatters, setScatters] = useState([]);

  useEffect(() => {
    const radiusLimit = isMobile ? 100 : 140;
    const items = brandWord.map((char, index) => {
      const initialX = (index - 5) * letterSpacing;
      const randomAngle = Math.PI * (0.2 + Math.random() * 0.6);
      const randomDist = 50 + Math.random() * (radiusLimit - 70);
      
      const scatterX = randomDist * Math.cos(randomAngle);
      const scatterY = randomDist * Math.sin(randomAngle) + 40;
      const randomRotation = Math.random() * 120 - 60;

      return { x: scatterX, y: scatterY, rotate: randomRotation };
    });
    setScatters(items);
  }, [windowWidth]);

  const handleTrigger = () => {
    if (isAnimating) return;
    setIsAnimating(true);
    setIsShattered(true);

    // 1. Hold shattered state, then reform
    setTimeout(() => {
      setIsShattered(false);
    }, 1100);

    // 2. Complete animation cycle
    setTimeout(() => {
      setIsAnimating(false);
    }, 2000);
  };

  return (
    <div
      onClick={handleTrigger}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      className={`relative flex items-center justify-center cursor-pointer w-[300px] h-[300px] md:w-[400px] md:h-[400px] rounded-full border bg-zinc-950/90 select-none overflow-hidden transition-all duration-500 group ${
        isShattered 
          ? 'border-cyan-400 shadow-[0_0_50px_rgba(0,149,255,0.7)]' 
          : isHovered 
            ? 'border-blue-400 shadow-[0_0_35px_rgba(0,102,255,0.45)]' 
            : 'border-blue-900/60 shadow-[0_0_20px_rgba(0,102,255,0.15)]'
      }`}
    >
      {/* Deep electric blue ambient glow */}
      <div 
        className={`absolute rounded-full bg-blue-600/10 blur-[80px] pointer-events-none transition-all duration-750 z-0 ${
          isShattered ? 'w-[200px] h-[200px] bg-cyan-500/20 blur-[50px]' : isHovered ? 'w-[190px] h-[190px] bg-blue-500/15' : 'w-[140px] h-[140px]'
        }`}
      />

      {/* Grid pattern overlay inside the circle */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,rgba(0,102,255,0.02)_1px,transparent_1px),linear-gradient(to_bottom,rgba(0,102,255,0.02)_1px,transparent_1px)] bg-[size:24px_24px] pointer-events-none z-0" />

      {/* Orbiting blue glowing particles */}
      <div className="absolute inset-0 pointer-events-none z-10">
        <div className="absolute w-full h-full rounded-full border border-blue-500/5 animate-[spin_30s_linear_infinite]" />
        <div className="absolute w-full h-full rounded-full border border-cyan-500/3 animate-[spin_45s_linear_infinite_reverse]" />
        
        {/* Particle 1 */}
        <div className="absolute top-1/2 left-4 w-1.5 h-1.5 rounded-full bg-cyan-400 shadow-[0_0_8px_rgba(6,182,212,0.8)] animate-pulse" />
        {/* Particle 2 */}
        <div className="absolute bottom-6 right-1/3 w-1 h-1 rounded-full bg-blue-400 shadow-[0_0_6px_rgba(59,130,246,0.8)] animate-pulse" />
      </div>

      {/* Interactive letters list */}
      <div className="relative flex items-center justify-center z-20 w-full h-full">
        {brandWord.map((char, index) => {
          const initialX = (index - 5) * letterSpacing;
          const scatter = scatters[index] || { x: initialX, y: 120, rotate: 45 };

          return (
            <motion.span
              key={index}
              initial={{ x: initialX, y: 0, opacity: 1, scale: 1, rotate: 0 }}
              animate={
                isShattered
                  ? {
                      x: scatter.x,
                      y: scatter.y,
                      opacity: 0.9,
                      rotate: scatter.rotate,
                      scale: 0.9,
                    }
                  : {
                      x: initialX,
                      y: 0,
                      opacity: 1,
                      scale: 1,
                      rotate: 0,
                    }
              }
              transition={
                isShattered
                  ? {
                      type: 'spring',
                      stiffness: 60,
                      damping: 10,
                      delay: index * 0.02,
                    }
                  : {
                      type: 'spring',
                      stiffness: 90,
                      damping: 14,
                      delay: (brandWord.length - index) * 0.035,
                    }
              }
              style={{
                textShadow: isShattered 
                  ? '0 0 12px rgba(6,182,212,0.8)' 
                  : isHovered 
                    ? '0 0 10px rgba(0,102,255,0.6)' 
                    : '0 0 6px rgba(0,102,255,0.3)',
              }}
              className="absolute text-xl sm:text-2xl md:text-3.5xl font-black text-white uppercase tracking-wider"
            >
              {char}
            </motion.span>
          );
        })}
      </div>

      {/* Understated interaction indicator */}
      <span className="absolute bottom-4 text-[9px] font-bold text-zinc-500 uppercase tracking-[0.25em] pointer-events-none select-none z-20 transition-opacity duration-300">
        {isAnimating ? 'Reforming...' : 'Click to Shatter'}
      </span>
    </div>
  );
};

export default CircularBrand;
