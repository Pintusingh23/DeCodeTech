import React from "react";
import { Link } from "react-router-dom";
import { BookOpen, Clock, ArrowRight, Cpu, CircuitBoard } from "lucide-react";
import { motion } from "framer-motion";
import { useState, useEffect } from 'react';
import { calculateTotalDuration } from '../../../utils/durationCalc';

const computerCourses = [
  {
    id: "lecture",
    title: "Architecture Lectures",
    level: "Beginner",
    description: "Master digital logic, CPU design, memory organization, and system architecture.",
    icon: Cpu,
    image: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/c/c-original.svg",
    path: "/computer/lecture",
    color: "from-[#7560C7] to-[#9B8DE3]",
    shadow: "shadow-[#7560C7]/20",
    bgAccent: "bg-[#7560C7]/20 text-[#C8C1F0]",
  },
  {
    id: "assessment",
    title: "Assessment Lab",
    level: "Assessment",
    description: "Solve practical problems on logic gates, circuit design, and performance metrics.",
    icon: CircuitBoard,
    image: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/raspberrypi/raspberrypi-original.svg",
    path: "/computer/assessment",
    color: "from-[#7560C7] to-[#9B8DE3]",
    shadow: "shadow-[#7560C7]/20",
    bgAccent: "bg-[#7560C7]/20 text-[#C8C1F0]",
  },
];

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.2
    }
  }
};

const itemVariants = {
  hidden: { opacity: 0, y: 30 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { type: "spring", stiffness: 100, damping: 12 }
  }
};

const ComputerArt = () => {
  const [stats, setStats] = useState({
    lecture: { lessons: 0, duration: '0m' },
    assessment: { lessons: 0, duration: '0m' }
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchComputerStats = async () => {
      try {
        const [lectureRes, labRes] = await Promise.allSettled([
          fetch('https://de-code-tech-backend.vercel.app/api/computerarchitecture/lecture').then(res => res.json()),
          fetch('https://de-code-tech-backend.vercel.app/api/computerarchitecture/lab').then(res => res.json())
        ]);

        const lectureData = lectureRes.status === 'fulfilled' && lectureRes.value.data ? lectureRes.value.data : [];
        const labData = labRes.status === 'fulfilled' && labRes.value.data ? labRes.value.data : [];

        setStats({
          lecture: {
            lessons: lectureData.length,
            duration: calculateTotalDuration(lectureData)
          },
          assessment: {
            lessons: labData.length,
            duration: calculateTotalDuration(labData)
          }
        });
      } catch (error) {
        console.error("Error fetching Computer Architecture stats:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchComputerStats();
  }, []);

  return (
    <div className="min-h-screen bg-[#211D31] flex flex-col items-center justify-center p-6 mt-16 relative overflow-hidden">

      {/* Background Decorations */}
      <div className="absolute top-[-10%] left-[-10%] w-96 h-96 bg-indigo-400/20 rounded-full blur-[100px]" />
      <div className="absolute bottom-[-10%] right-[-10%] w-96 h-96 bg-rose-400/20 rounded-full blur-[100px]" />

      <motion.div
        className="text-center z-10 mb-16"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
        <h1 className="text-4xl md:text-5xl font-extrabold text-[#F8F7FF] mb-4 tracking-tight">
          Master <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#7560C7] to-[#9B8DE3]">Computer Architecture</span>
        </h1>
        <p className="text-[#B8B2CC] max-w-2xl mx-auto text-lg">
          From digital logic to system design, build your foundation in how computers work at the hardware level.
        </p>
      </motion.div>

      <motion.div
        className="w-full max-w-5xl grid grid-cols-1 md:grid-cols-2 gap-10 z-10"
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        {computerCourses.map((course) => (
          <Link
            to={course.path}
            key={course.id}
            className="bg-[rgba(255,255,255,0.06)] backdrop-blur-xl rounded-3xl p-8 shadow-[0_8px_30px_rgb(0,0,0,0.04)] hover:shadow-[0_8px_30px_rgb(0,0,0,0.12)] transition-all duration-300 transform hover:-translate-y-2 cursor-pointer border border-gray-100 group relative overflow-hidden flex flex-col h-full"
          >
            <div className={`absolute top-0 right-0 w-32 h-32 bg-gradient-to-br ${course.color} rounded-bl-full -z-10 transition-transform duration-500 group-hover:scale-150 opacity-10`}></div>

            <div className="flex-grow">
              <div className="flex justify-between items-start mb-6">
                <course.icon className="w-12 h-12 text-[#F8F7FF] group-hover:scale-110 transition-transform" />
                <span className={`text-xs font-bold px-3 py-1 rounded-full uppercase tracking-wider ${course.bgAccent}`}>
                  {course.level}
                </span>
              </div>

              <h3 className="text-2xl font-bold text-gray-900 mb-3 group-hover:text-[#C8C1F0]">{course.title}</h3>

              <div className="flex items-center space-x-4 text-gray-400 text-xs font-semibold mb-4">
                <div className="flex items-center">
                  <BookOpen className="w-4 h-4 mr-1" />
                  {loading ? '...' : stats[course.id]?.lessons || 0} Lessons
                </div>
                <div className="flex items-center">
                  <Clock className="w-4 h-4 mr-1" />
                  {loading ? '...' : stats[course.id]?.duration || '0m'}
                </div>
              </div>

              <p className="text-[#9B8DE3] leading-relaxed mb-8 text-sm">
                {course.description}
              </p>
            </div>

            <div className="flex items-center text-gray-900 font-bold transition-colors mt-auto group-hover:text-opacity-80">
              Start Learning <ArrowRight className="w-5 h-5 ml-2 transform group-hover:translate-x-1 transition-transform" />
            </div>
          </Link>
        ))}
      </motion.div>
    </div>
  );
};

export default ComputerArt;