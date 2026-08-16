import React, { useState, useEffect } from "react";
import { Link, useSearchParams } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { PlayCircle, Clock, ChevronLeft, CheckCircle2 } from "lucide-react";

export default function PythonAssessment() {
  const [assessmentVideos, setAssessmentVideos] = useState([]);
  const [searchParams, setSearchParams] = useSearchParams();
  const lessonId = searchParams.get("lesson");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    fetchAssessments();
  }, []);

  const fetchAssessments = async () => {
    try {
      setLoading(true);
      const response = await fetch("https://de-code-tech-backend.vercel.app/api/python/lab");
      const result = await response.json();

      if (result.success) {
        const fetchedData = result.data || [];
        setAssessmentVideos(fetchedData);

        if (fetchedData.length > 0 && !searchParams.get("lesson")) {
          setSearchParams({ lesson: fetchedData[0]._id || fetchedData[0].id }, { replace: true });
        }
      } else {
        setError(result.message || "Failed to load labs");
      }
    } catch (err) {
      setError("Unable to load Python lab content. Please try again.");
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

  const selectedIndex = lessonId && assessmentVideos.length > 0
    ? assessmentVideos.findIndex((l) => (l._id || l.id) === lessonId)
    : 0;
  const selected = selectedIndex >= 0 ? selectedIndex : 0;
  const currentVideo = assessmentVideos[selected];

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
                to="/python"
                className="inline-flex items-center text-sm font-medium text-[#B8B2CC] hover:text-[#9B8DE3] transition-colors "
              >
                <ChevronLeft className="w-4 h-4 mr-1" />
                Back to Courses
              </Link>
            </div>
            <div className="flex items-center justify-between w-full">
              <h1 className="text-3xl font-extrabold text-[#F8F7FF] tracking-tight">
                Python Assessment Lab
              </h1>
            </div>
            <div className="hidden sm:block">
              <span className="bg-[rgba(255,255,255,0.06)] text-[#C8C1F0] text-xs font-semibold px-3 py-1 rounded-full border border-[#C8C1F0]/20">
                {assessmentVideos.length > 0 ? `${selected + 1} / ${assessmentVideos.length} Tasks` : "0 Tasks"}
              </span>
            </div>
          </div>
        </motion.div>

        {loading ? (
          <div className="flex-1 text-center py-20 text-[#B8B2CC] font-medium">
            Loading Python Labs...
          </div>
        ) : error ? (
          <div className="flex-1 text-center py-20 text-[#9B8DE3] font-medium">
            {error}
          </div>
        ) : assessmentVideos.length === 0 ? (
          <div className="flex-1 text-center py-20 text-[#B8B2CC] font-medium">
            No Python lab content available yet.
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
              <div className="bg-[rgba(255,255,255,0.06)] backdrop-blur-xl rounded-2xl shadow-[0_8px_30px_rgba(0,0,0,0.3)] overflow-hidden border border-[#C8C1F0]/20">
                {/* Video Container with Animation */}
                <div className="aspect-video bg-[#110f1a] relative">
                  <AnimatePresence mode="wait">
                    <motion.iframe
                      key={currentVideo._id}
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      exit={{ opacity: 0 }}
                      transition={{ duration: 0.4 }}
                      className="absolute inset-0 w-full h-full border-0"
                      src={getEmbedUrl(currentVideo.URL)}
                      title={currentVideo.Title}
                      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                      allowFullScreen
                    />
                  </AnimatePresence>
                </div>

                {/* Video Info */}
                <div className="p-6 sm:p-8">
                  <AnimatePresence mode="wait">
                    <motion.div
                      key={`info-${currentVideo._id}`}
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -10 }}
                      transition={{ duration: 0.3 }}
                    >
                      <div className="flex items-center space-x-4 mb-4 text-sm text-[#B8B2CC] font-medium">
                        <span className="flex items-center">
                          <PlayCircle className="w-4 h-4 mr-1.5 text-[#9B8DE3]" />
                          Assessment {selected + 1}
                        </span>
                        <span className="flex items-center">
                          <Clock className="w-4 h-4 mr-1.5 text-[#9B8DE3]" />
                          {currentVideo.Duration}
                        </span>
                      </div>
                      <h2 className="text-2xl font-bold text-[#F8F7FF] mb-3">
                        {currentVideo.Title}
                      </h2>
                      <p className="text-[#B8B2CC] leading-relaxed mb-4">
                        {currentVideo.Description}
                      </p>
                      <div className="bg-[rgba(117,96,199,0.15)] border-l-4 border-[#9B8DE3] p-4 rounded-r-lg">
                        <p className="text-sm text-[#C8C1F0] font-medium">
                          Task: Watch the video above carefully and then complete the associated assignment.
                        </p>
                      </div>
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
              <div className="bg-[rgba(255,255,255,0.06)] backdrop-blur-xl rounded-2xl shadow-lg border border-[#C8C1F0]/20 overflow-hidden sticky top-24">
                <div className="p-5 border-b border-[#C8C1F0]/10 bg-[rgba(255,255,255,0.04)]">
                  <h3 className="text-lg font-bold text-[#F8F7FF]">Assessment Tasks</h3>
                </div>

                <ul className="max-h-[600px] overflow-y-auto custom-scrollbar">
                  {assessmentVideos.map((item, idx) => {
                    const isActive = idx === selected;
                    return (
                      <li key={item._id}>
                        <button
                          onClick={() => setSearchParams({ lesson: item._id || item.id })}
                          className={`w-full text-left p-4 flex gap-4 items-start transition-all duration-200 border-l-4 ${isActive
                              ? "bg-[rgba(117,96,199,0.15)] border-[#9B8DE3]"
                              : "bg-[rgba(255,255,255,0.06)] backdrop-blur-xl border-transparent hover:bg-[#211D31]"
                            }`}
                        >
                          <div className="flex-shrink-0 mt-1">
                            {isActive ? (
                              <PlayCircle className="w-5 h-5 text-[#9B8DE3] fill-[#9B8DE3]/20" />
                            ) : (
                              <CheckCircle2 className="w-5 h-5 text-slate-300" />
                            )}
                          </div>
                          <div>
                            <h4 className={`text-sm font-semibold mb-1 ${isActive ? "text-[#F8F7FF]" : "text-[#F8F7FF]"
                              }`}>
                              {idx + 1}. {item.Title}
                            </h4>
                            <span className="text-xs text-[#B8B2CC] flex items-center font-medium">
                              <Clock className="w-3 h-3 mr-1" />
                              {item.Duration}
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

      {/* Add a tiny bit of CSS for the custom scrollbar */}
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
        }
        .custom-scrollbar::-webkit-scrollbar-thumb:hover {
          background-color: rgba(200, 193, 240, 0.4);
          border-radius: 20px;
        }
      `}} />
    </div>
  );
}
