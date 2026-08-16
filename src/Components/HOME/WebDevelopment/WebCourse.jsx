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
    bgAccent: "bg-[rgba(117,96,199,0.15)] text-[#9B8DE3]",
    apiPrefix: "htmlcss",
  },
  "javascript": {
    title: "JavaScript",
    color: "from-yellow-400 to-amber-500",
    bgAccent: "bg-[rgba(117,96,199,0.15)] text-[#9B8DE3]",
    apiPrefix: "javascript",
  },
  "reactjs": {
    title: "React.js Pro",
    color: "from-cyan-400 to-blue-500",
    bgAccent: "bg-[rgba(117,96,199,0.15)] text-[#9B8DE3]",
    apiPrefix: "react",
  },
  "nodejs": {
    title: "Node.js & Express",
    color: "from-[#7560C7] to-[#9B8DE3]",
    bgAccent: "bg-[rgba(117,96,199,0.15)] text-[#9B8DE3]",
    apiPrefix: "node",
  }
};

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.2 }
  }
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
        console.error("Error fetching topic stats:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchTopicStats();
  }, [topic.apiPrefix]);

  return (
    <div className="min-h-screen bg-[#211D31] flex flex-col items-center justify-center p-6 mt-16 relative overflow-hidden">
      <motion.div
        className="text-center z-10 mb-16"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
      >
        <h1 className="text-4xl md:text-5xl font-extrabold text-[#F8F7FF] mb-4 tracking-tight">
          Master <span className={`text-transparent bg-clip-text bg-gradient-to-r ${topic.color}`}>{topic.title}</span>
        </h1>
        <p className="text-[#B8B2CC] max-w-2xl mx-auto text-lg">
          Choose between theoretical lectures and practical assessment labs.
        </p>
      </motion.div>

      <motion.div
        className="w-full max-w-5xl grid grid-cols-1 md:grid-cols-2 gap-10 z-10"
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        {courseCards.map((course) => (
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
                  {loading ? '...' : stats[course.id]?.duration || '0 min'}
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
}
