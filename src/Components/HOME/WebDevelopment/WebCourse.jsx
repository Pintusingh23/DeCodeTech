import React from "react";
import { Link, useParams } from "react-router-dom";
import { BookOpen, Clock, ArrowRight, Video, Code2 } from "lucide-react";
import { motion } from "framer-motion";
import { useState, useEffect } from 'react';
import { calculateTotalDuration } from '../../../utils/durationCalc';

const topicData = {
  "html-css": {
    title: "HTML & CSS Mastery",
    color: "from-[#7560C7] to-[#9B8DE3]",
    bgAccent: "bg-[#F3F1FB] text-[#7560C7]",
    borderColor: "border-[#7560C7]/10",
    hoverBorder: "hover:border-[#7560C7]/30",
    apiPrefix: "htmlcss",
  },
  "javascript": {
    title: "JavaScript",
    color: "from-yellow-400 to-amber-500",
    bgAccent: "bg-amber-50 text-amber-600",
    borderColor: "border-amber-400/10",
    hoverBorder: "hover:border-amber-400/30",
    apiPrefix: "javascript",
  },
  "reactjs": {
    title: "React.js Pro",
    color: "from-cyan-400 to-blue-500",
    bgAccent: "bg-cyan-50 text-cyan-600",
    borderColor: "border-cyan-400/10",
    hoverBorder: "hover:border-cyan-400/30",
    apiPrefix: "react",
  },
  "nodejs": {
    title: "Node.js & Express",
    color: "from-emerald-400 to-green-500",
    bgAccent: "bg-emerald-50 text-emerald-600",
    borderColor: "border-emerald-400/10",
    hoverBorder: "hover:border-emerald-400/30",
    apiPrefix: "node",
  }
};

const containerVariants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { staggerChildren: 0.15 } }
};

const cardVariants = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0, transition: { type: "spring", stiffness: 90, damping: 14 } },
};

export default function WebCourse() {
  const { topicId } = useParams();
  const topic = topicData[topicId] || topicData["html-css"];

  const courseCards = [
    {
      id: "lecture",
      title: `${topic.title} Lectures`,
      level: "Theory",
      description: "Master the theoretical concepts with comprehensive lecture materials.",
      icon: Video,
      path: `/web-development/${topicId}/lecture`,
      color: topic.color,
      bgAccent: topic.bgAccent,
      borderColor: topic.borderColor,
      hoverBorder: topic.hoverBorder,
    },
    {
      id: "assessment",
      title: "Assessment Lab",
      level: "Practice",
      description: "Apply your knowledge with hands-on tasks, practical assessments, and coding exercises.",
      icon: Code2,
      path: `/web-development/${topicId}/assessment`,
      color: topic.color,
      bgAccent: topic.bgAccent,
      borderColor: topic.borderColor,
      hoverBorder: topic.hoverBorder,
    },
  ];

  const [stats, setStats] = useState({
    lecture: { lessons: 0, duration: "0 min" },
    assessment: { lessons: 0, duration: "0 min" }
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchTopicStats = async () => {
      try {
        setLoading(true);
        const [lectureRes, labRes] = await Promise.allSettled([
          fetch(`https://de-code-tech-backend.vercel.app/api/${topic.apiPrefix}/lecture`).then(res => res.json()),
          fetch(`https://de-code-tech-backend.vercel.app/api/${topic.apiPrefix}/lab`).then(res => res.json())
        ]);

        const lectureData = lectureRes.status === 'fulfilled' && lectureRes.value.data ? lectureRes.value.data : [];
        const labData = labRes.status === 'fulfilled' && labRes.value.data ? labRes.value.data : [];

        setStats({
          lecture: { lessons: lectureData.length, duration: calculateTotalDuration(lectureData) },
          assessment: { lessons: labData.length, duration: calculateTotalDuration(labData) }
        });
      } catch (error) {
        console.error("Error fetching topic stats:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchTopicStats();
  }, [topic.apiPrefix]);

  return (
    <div className="min-h-screen bg-[#FAFAFA] font-['Space_Grotesk'] flex flex-col items-center justify-center p-6 mt-16 relative overflow-hidden text-slate-900">
      {/* Background Decor */}
      <div className="absolute inset-0 pointer-events-none" style={{ backgroundImage: "radial-gradient(#E2E8F0 1px, transparent 1px)", backgroundSize: "32px 32px" }} />

      <motion.div className="text-center z-10 mb-14 max-w-3xl" initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, ease: "easeOut" }}>
        <span className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full text-xs font-bold uppercase tracking-widest text-[#7560C7] bg-[#7560C7]/10 border border-[#7560C7]/20 mb-6">
          <span className="w-1.5 h-1.5 rounded-full bg-[#7560C7] animate-pulse" />
          Course Path
        </span>
        <h1 className="text-4xl md:text-5xl lg:text-6xl font-extrabold tracking-tight mb-6">
          Master <span className={`text-transparent bg-clip-text bg-gradient-to-r ${topic.color}`}>{topic.title}</span>
        </h1>
        <p className="text-slate-600 text-lg md:text-xl leading-relaxed">
          Choose between theoretical lectures and practical assessment labs to begin your learning journey.
        </p>
      </motion.div>

      <motion.div className="w-full max-w-5xl grid grid-cols-1 md:grid-cols-2 gap-8 z-10" variants={containerVariants} initial="hidden" animate="visible">
        {courseCards.map((course) => (
          <motion.div key={course.id} variants={cardVariants}>
            <Link to={course.path} className="group block h-full outline-none">
              <div className={`relative flex flex-col h-full bg-white rounded-2xl border ${course.borderColor} ${course.hoverBorder} p-8 shadow-[0_4px_20px_rgba(0,0,0,0.03)] hover:shadow-[0_12px_40px_rgba(0,0,0,0.08)] transition-all duration-300 hover:-translate-y-1.5`}>
                
                <div className="flex justify-between items-start mb-8">
                  <div className={`w-14 h-14 rounded-2xl bg-gradient-to-br ${course.color} flex items-center justify-center shadow-md group-hover:scale-105 transition-transform duration-300`}>
                    <course.icon className="w-7 h-7 text-white" />
                  </div>
                  <span className={`text-xs font-bold px-4 py-1.5 rounded-full uppercase tracking-wider ${course.bgAccent}`}>{course.level}</span>
                </div>

                <h3 className="text-2xl font-bold text-slate-900 mb-3">{course.title}</h3>
                
                <p className="text-slate-500 text-base leading-relaxed mb-8 flex-1">
                  {course.description}
                </p>

                <div className="flex flex-row gap-6 mb-8 bg-slate-50 p-4 rounded-xl border border-slate-100">
                  <div className="flex items-center text-slate-600 text-sm font-semibold">
                    <BookOpen className="w-5 h-5 mr-2 text-slate-400" />
                    {loading ? <span className="w-10 h-4 bg-slate-200 rounded animate-pulse" /> : `${stats[course.id]?.lessons || 0} Lessons`}
                  </div>
                  <div className="flex items-center text-slate-600 text-sm font-semibold">
                    <Clock className="w-5 h-5 mr-2 text-slate-400" />
                    {loading ? <span className="w-16 h-4 bg-slate-200 rounded animate-pulse" /> : stats[course.id]?.duration || '0 min'}
                  </div>
                </div>

                <div className="flex items-center justify-between text-slate-800 font-bold text-base mt-auto">
                  <span>Start Module</span>
                  <div className="w-10 h-10 rounded-full bg-slate-50 border border-slate-100 flex items-center justify-center group-hover:bg-slate-900 group-hover:border-slate-900 group-hover:text-white transition-all duration-300">
                    <ArrowRight className="w-5 h-5 transition-transform duration-300 group-hover:translate-x-0.5" />
                  </div>
                </div>
              </div>
            </Link>
          </motion.div>
        ))}
      </motion.div>
    </div>
  );
}
