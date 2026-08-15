import React, { useState, useEffect } from "react";
import { Link, useSearchParams } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { PlayCircle, Clock, ChevronLeft, CheckCircle2 } from "lucide-react";

export default function MysqlLecture() {
  const [mysqlLectures, setMysqlLectures] = useState([]);
  const [searchParams, setSearchParams] = useSearchParams();
  const lessonId = searchParams.get("lesson");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    fetchLectures();
  }, []);

  const fetchLectures = async () => {
    try {
      setLoading(true);
      const response = await fetch("http://localhost:5001/api/mysql/");
      const result = await response.json();

      if (result.success) {
        const fetchedData = result.data || [];
        setMysqlLectures(fetchedData);
        
        if (fetchedData.length > 0 && !searchParams.get("lesson")) {
          setSearchParams({ lesson: fetchedData[0]._id || fetchedData[0].id }, { replace: true });
        }
      } else {
        setError(result.message || "Failed to load lectures");
      }
    } catch (err) {
      setError("Unable to load MySQL lectures. Please try again later.");
    } finally {
      setLoading(false);
    }
  };

  const getEmbedUrl = (url) => {
    if (!url) return "";
    let videoId = "";
    if (url.includes("youtube.com/watch?v=")) {
      videoId = url.split("v=")[1];
      const ampersandPosition = videoId.indexOf("&");
      if (ampersandPosition !== -1) {
        videoId = videoId.substring(0, ampersandPosition);
      }
    } else if (url.includes("youtu.be/")) {
      videoId = url.split("youtu.be/")[1];
      const questionPosition = videoId.indexOf("?");
      if (questionPosition !== -1) {
        videoId = videoId.substring(0, questionPosition);
      }
    }
    if (videoId) {
      return `https://www.youtube.com/embed/${videoId}`;
    }
    return url;
  };

  const selectedIndex = lessonId && mysqlLectures.length > 0
    ? mysqlLectures.findIndex((l) => (l._id || l.id) === lessonId)
    : 0;
  const selected = selectedIndex >= 0 ? selectedIndex : 0;
  const current = mysqlLectures[selected];

  return (
    <div className="min-h-screen bg-[#211D31] pt-32 pb-12 px-4 sm:px-6 lg:px-8 font-sans">
      <div className="max-w-7xl mx-auto">

        {/* Header Section */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-8 flex flex-col gap-5"
        >
          <div className="w-full">
            <div className="mb-4">
              <Link
              to="/mysql"
              className="inline-flex items-center text-sm font-medium text-[#B8B2CC] hover:text-[#9B8DE3] transition-colors "
            >
              <ChevronLeft className="w-4 h-4 mr-1" />
              Back to Courses
            </Link>
                        </div>
            <div className="flex items-center justify-between w-full">
              <h1 className="text-3xl font-extrabold text-[#F8F7FF] tracking-tight">
              MySQL Masterclass
            </h1>
          </div>
          <div className="hidden sm:block">
            <span className="bg-[rgba(255,255,255,0.06)] text-[#C8C1F0] text-xs font-semibold px-3 py-1 rounded-full border border-[#C8C1F0]/20">
              {mysqlLectures.length > 0 ? `${selected + 1} / ${mysqlLectures.length} Lessons` : "0 Lessons"}
            </span>
          </div>
                  </div>
        </motion.div>

        {loading ? (
          <div className="flex-1 text-center py-20 text-[#B8B2CC] font-medium">
            Loading MySQL Lectures...
          </div>
        ) : error ? (
          <div className="flex-1 text-center py-20 text-red-400 font-medium">
            {error}
          </div>
        ) : mysqlLectures.length === 0 ? (
          <div className="flex-1 text-center py-20 text-[#B8B2CC] font-medium">
            No MySQL lectures available yet.
          </div>
        ) : (
          <div className="flex flex-col lg:flex-row gap-8">
            {/* Main Content - Video Player */}
            <motion.main
              className="flex-1 order-1"
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5 }}
            >
              <div className="bg-[rgba(255,255,255,0.04)] rounded-2xl shadow-[0_8px_30px_rgba(0,0,0,0.3)] overflow-hidden border border-[#C8C1F0]/20 backdrop-blur-xl">
                {/* Video Container with Animation */}
                <div className="aspect-video bg-[#110f1a] relative">
                  <AnimatePresence mode="wait">
                    <motion.iframe
                      key={current._id}
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      exit={{ opacity: 0 }}
                      transition={{ duration: 0.4 }}
                      className="absolute inset-0 w-full h-full border-0"
                      src={getEmbedUrl(current.URL)}
                      title={current.Title}
                      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                      allowFullScreen
                    />
                  </AnimatePresence>
                </div>

                {/* Video Info */}
                <div className="p-6 sm:p-8">
                  <AnimatePresence mode="wait">
                    <motion.div
                      key={`info-${current._id}`}
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -10 }}
                      transition={{ duration: 0.3 }}
                    >
                      <div className="flex items-center space-x-4 mb-4 text-sm text-[#B8B2CC] font-medium">
                        <span className="flex items-center">
                          <PlayCircle className="w-4 h-4 mr-1.5 text-[#9B8DE3]" />
                          Lesson {selected + 1}
                        </span>
                        <span className="flex items-center">
                          <Clock className="w-4 h-4 mr-1.5 text-[#9B8DE3]" />
                          {current.Duration}
                        </span>
                      </div>
                      <h2 className="text-2xl font-bold text-[#F8F7FF] mb-3">
                        {current.Title}
                      </h2>
                      <p className="text-[#B8B2CC] leading-relaxed">
                        {current.Description}
                      </p>
                    </motion.div>
                  </AnimatePresence>
                </div>
              </div>
            </motion.main>

            {/* Sidebar - Playlist */}
            <motion.aside
              className="w-full lg:w-96 order-2 lg:order-2"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
            >
              <div className="bg-[#211D31] rounded-2xl shadow-lg border border-[#C8C1F0]/20 overflow-hidden sticky top-24 backdrop-blur-md">
                <div className="p-5 border-b border-[#C8C1F0]/10 bg-[rgba(0,0,0,0.2)]">
                  <h3 className="text-lg font-bold text-[#F8F7FF]">Course Content</h3>
                </div>

                <ul className="max-h-[600px] overflow-y-auto custom-scrollbar">
                  {mysqlLectures.map((lec, idx) => {
                    const isActive = idx === selected;
                    return (
                      <li key={lec._id}>
                        <button
                          onClick={() => setSearchParams({ lesson: lec._id || lec.id })}
                          className={`w-full text-left p-4 flex gap-4 items-start transition-all duration-200 border-l-4 ${isActive
                            ? "bg-[rgba(117,96,199,0.25)] border-[#9B8DE3]"
                            : "bg-transparent border-transparent hover:bg-[rgba(255,255,255,0.02)]"
                            }`}
                        >
                          <div className="flex-shrink-0 mt-1">
                            {isActive ? (
                              <PlayCircle className="w-5 h-5 text-[#9B8DE3] fill-[#9B8DE3]/20" />
                            ) : (
                              <CheckCircle2 className="w-5 h-5 text-[#B8B2CC]/50" />
                            )}
                          </div>
                          <div>
                            <h4 className={`text-sm font-semibold mb-1 ${isActive ? "text-[#F8F7FF]" : "text-[#B8B2CC]"
                              }`}>
                              {idx + 1}. {lec.Title}
                            </h4>
                            <span className="text-xs text-[#B8B2CC]/70 flex items-center font-medium">
                              <Clock className="w-3 h-3 mr-1" />
                              {lec.Duration}
                            </span>
                          </div>
                        </button>
                      </li>
                    );
                  })}
                </ul>
              </div>
            </motion.aside>

          </div>
        )}
      </div>

      {/* Custom scrollbar css */}
      <style dangerouslySetInnerHTML={{
        __html: `
        .custom-scrollbar::-webkit-scrollbar {
          width: 6px;
        }
        .custom-scrollbar::-webkit-scrollbar-track {
          background: transparent;
        }
        .custom-scrollbar::-webkit-scrollbar-thumb {
          background-color: rgba(200, 193, 240, 0.2);
          border-radius: 20px;
        }
        .custom-scrollbar::-webkit-scrollbar-thumb:hover {
          background-color: rgba(200, 193, 240, 0.4);
        }
      `}} />
    </div>
  );
}
