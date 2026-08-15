import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const IntroLoader = ({ onComplete }) => {
  const [progress, setProgress] = useState(0);
  const [step, setStep] = useState(0); // 0: D + Loading bar, 1: DECODE TECH reveal, 2: fade/slide out
  const [isVisible, setIsVisible] = useState(true);

  useEffect(() => {
    const duration = 650; // 0.65 seconds loading
    const intervalTime = 15;
    const increment = 100 / (duration / intervalTime);

    const timer = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          clearInterval(timer);
          return 100;
        }
        return Math.min(prev + increment, 100);
      });
    }, intervalTime);

    return () => clearInterval(timer);
  }, []);

  useEffect(() => {
    if (progress === 100) {
      // 1. Move to step 1 (reveal DECODE TECH)
      const t1 = setTimeout(() => setStep(1), 100);

      // 2. Move to step 2 (outro slide/fade out background)
      const t2 = setTimeout(() => setStep(2), 850);

      // 3. Complete and unmount
      const t3 = setTimeout(() => {
        setIsVisible(false);
        if (onComplete) onComplete();
      }, 1350);

      return () => {
        clearTimeout(t1);
        clearTimeout(t2);
        clearTimeout(t3);
      };
    }
  }, [progress, onComplete]);

  return (
    <AnimatePresence>
      {isVisible && (
        <div className="fixed inset-0 z-[9999] flex flex-col items-center justify-center font-['Space_Grotesk'] overflow-hidden select-none pointer-events-none">

          {/* Black Background Overlay Panel - Fades out in step 2 */}
          <motion.div
            initial={{ opacity: 1 }}
            animate={step === 2 ? { opacity: 0 } : { opacity: 1 }}
            transition={{ duration: 0.5, ease: 'easeInOut' }}
            className="absolute inset-0 bg-[#000000] pointer-events-auto z-0"
          />

          {/* Background overlay grid */}
          <motion.div
            initial={{ opacity: 0.1 }}
            animate={step === 2 ? { opacity: 0 } : { opacity: 0.1 }}
            className="absolute inset-0 bg-[linear-gradient(to_right,rgba(255,255,255,0.02)_1px,transparent_1px),linear-gradient(to_bottom,rgba(255,255,255,0.02)_1px,transparent_1px)] bg-[size:32px_32px] pointer-events-none z-0"
          />

          {/* Centered Logo/Word Reveal */}
          <div className="relative flex flex-col items-center justify-center z-10">
            {step === 0 ? (
              <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.3, ease: 'easeOut' }}
                className="flex flex-col items-center space-y-12"
              >
                {/* Large white geometric D */}
                <span className="text-[130px] md:text-[200px] font-black text-white leading-none tracking-tight select-none filter drop-shadow-[0_0_20px_rgba(255,255,255,0.1)]">
                  D
                </span>

                {/* Progress bar and counter */}
                <div className="flex flex-col items-center space-y-3 w-[240px] md:w-[320px]">
                  <div className="h-[2px] w-full bg-white/10 rounded-full overflow-hidden relative">
                    <div
                      className="absolute left-0 top-0 h-full bg-white transition-all duration-75 ease-out shadow-[0_0_12px_rgba(255,255,255,0.8)]"
                      style={{ width: `${progress}%` }}
                    />
                  </div>
                  <span className="text-zinc-500 text-xs md:text-sm font-medium tracking-[0.25em] uppercase">
                    {Math.round(progress)}
                  </span>
                </div>
              </motion.div>
            ) : (
              // Shared layout transition element that morphs to navbar logo
              step < 2 && (
                <motion.div
                  layoutId="brandLogo"
                  transition={{ type: 'spring', stiffness: 100, damping: 18 }}
                  className="relative flex items-center justify-center"
                >
                  <h1 className="text-[40px] sm:text-[56px] md:text-[68px] font-black text-white leading-none uppercase tracking-normal flex items-center justify-center">
                    <span>D</span>
                    <span className="text-zinc-300 font-medium lowercase tracking-wide ml-[1px]">
                      ecode Tech
                    </span>
                  </h1>
                </motion.div>
              )
            )}
          </div>

          {/* Radial atmospheric soft light */}
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-white/5 rounded-full blur-[160px] pointer-events-none z-0"></div>
        </div>
      )}
    </AnimatePresence>
  );
};

export default IntroLoader;
