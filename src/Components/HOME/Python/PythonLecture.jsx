import React, { useState, useEffect } from "react";
import { Link, useSearchParams } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { PlayCircle, Clock, ChevronLeft, CheckCircle2, AlertCircle } from "lucide-react";

const accent = { color: "from-blue-500 to-yellow-500", bgActive: "bg-blue-50", textActive: "text-blue-600" };

export default function PythonLecture() {
  const [pythonLectures, setPythonLectures] = useState([]);
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
      const response = await fetch("https://de-code-tech-backend.vercel.app/api/python/lecture");
      const result = await response.json();

      if (result.success) {
        const fetchedData = result.data || [];
        setPythonLectures(fetchedData);

        if (fetchedData.length > 0 && !searchParams.get("lesson")) {
          setSearchParams({ lesson: fetchedData[0]._id || fetchedData[0].id }, { replace: true });
        }
      } else {
        setError(result.message || "Failed to load lectures");
      }
    } catch (err) {
      setError("Unable to load Python lectures. Please try again.");
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
      if (ampersandPosition !== -1) videoId = videoId.substring(0, ampersandPosition);
    } else if (url.includes("youtu.be/")) {
      videoId = url.split("youtu.be/")[1];
      const questionPosition = videoId.indexOf("?");
      if (questionPosition !== -1) videoId = videoId.substring(0, questionPosition);
    }
    return videoId ? `https://www.youtube.com/embed/${videoId}` : url;
  };

  const selectedIndex = lessonId && pythonLectures.length > 0
    ? pythonLectures.findIndex((l) => (l._id || l.id) === lessonId) : 0;
  const selected = selectedIndex >= 0 ? selectedIndex : 0;
  const current = pythonLectures[selected];

  return (
    <div className="min-h-screen bg-[#FAFAFA] pt-6 lg:pt-10 pb-12 px-4 sm:px-6 lg:px-8 font-['Space_Grotesk'] text-slate-900">
      <div className="absolute inset-0 pointer-events-none" style={{ backgroundImage: "radial-gradient(#E2E8F0 1px, transparent 1px)", backgroundSize: "32px 32px" }} />

      <div className="max-w-7xl mx-auto relative z-10">
        <motion.div initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }} className="mb-8 flex flex-col gap-5">
          <div className="w-full">
            <div className="mb-6">
              <Link to="/Python" className="inline-flex items-center text-sm font-semibold text-slate-500 hover:text-slate-900 transition-colors group bg-white px-4 py-2 rounded-full border border-slate-200 shadow-sm hover:shadow-md">
                <ChevronLeft className="w-4 h-4 mr-1 group-hover:-translate-x-1 transition-transform" />
                Back to Python Courses
              </Link>
            </div>
            <h1 className="text-4xl md:text-5xl font-extrabold tracking-tight text-slate-900">
              Python <span className={`text-transparent bg-clip-text bg-gradient-to-r ${accent.color}`}>Masterclass</span>
            </h1>
            <div className="hidden sm:block mt-4">
              <span className="inline-flex items-center gap-2 bg-white text-slate-600 text-xs font-bold px-4 py-1.5 rounded-full border border-slate-200 shadow-sm">
                <span className="w-2 h-2 rounded-full bg-slate-300" />
                {loading ? "..." : pythonLectures.length} Lessons Available
              </span>
            </div>
          </div>
        </motion.div>

        {loading ? (
          <div className="flex flex-col items-center justify-center py-24 bg-white rounded-2xl border border-slate-200 shadow-sm">
            <div className="w-12 h-12 border-4 border-slate-100 border-t-blue-400 rounded-full animate-spin" />
            <p className="mt-6 text-slate-500 font-medium text-lg">Loading lectures...</p>
          </div>
        ) : error ? (
          <div className="p-10 bg-red-50 rounded-2xl border border-red-100 text-center shadow-sm">
            <AlertCircle className="w-14 h-14 text-red-400 mx-auto mb-4" />
            <h3 className="text-xl font-bold text-red-900 mb-2">Oops! Something went wrong</h3>
            <p className="text-red-700">{error}</p>
          </div>
        ) : pythonLectures.length === 0 ? (
          <div className="p-16 bg-white rounded-2xl border border-slate-200 text-center shadow-sm">
            <div className="w-20 h-20 bg-slate-50 rounded-full flex items-center justify-center mx-auto mb-6"><PlayCircle className="w-10 h-10 text-slate-300" /></div>
            <h3 className="text-2xl font-bold text-slate-900 mb-3">No lectures available yet.</h3>
            <p className="text-slate-500 text-lg">Check back later for new content!</p>
          </div>
        ) : (
          <div className="flex flex-col lg:flex-row gap-8">
            <motion.main className="flex-1 order-1" initial={{ opacity: 0, scale: 0.98 }} animate={{ opacity: 1, scale: 1 }} transition={{ duration: 0.5 }}>
              <div className="bg-white rounded-2xl border border-slate-200 shadow-[0_8px_30px_rgb(0,0,0,0.04)] overflow-hidden">
                <div className="aspect-video bg-slate-900 relative">
                  <AnimatePresence mode="wait">
                    <motion.iframe key={current._id || selected} initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} transition={{ duration: 0.4 }}
                      className="absolute inset-0 w-full h-full border-0" src={getEmbedUrl(current.URL)} title={current.Title}
                      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowFullScreen />
                  </AnimatePresence>
                </div>
                <div className="p-8 sm:p-10">
                  <AnimatePresence mode="wait">
                    <motion.div key={`info-${current._id || selected}`} initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -10 }} transition={{ duration: 0.3 }}>
                      <div className="flex items-center space-x-6 mb-5 text-sm text-slate-600 font-semibold bg-slate-50 inline-flex px-4 py-2 rounded-lg border border-slate-100">
                        <span className="flex items-center"><PlayCircle className="w-4 h-4 mr-2 text-slate-400" /> Lesson {selected + 1}</span>
                        <div className="w-1 h-1 rounded-full bg-slate-300" />
                        <span className="flex items-center"><Clock className="w-4 h-4 mr-2 text-slate-400" /> {current.Duration}</span>
                      </div>
                      <h2 className="text-3xl font-extrabold text-slate-900 mb-4">{current.Title}</h2>
                      <p className="text-slate-600 leading-relaxed whitespace-pre-wrap text-base">{current.Description}</p>
                    </motion.div>
                  </AnimatePresence>
                </div>
              </div>
            </motion.main>

            <motion.aside className="w-full lg:w-[400px] order-2" initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.5, delay: 0.2 }}>
              <div className="bg-white rounded-2xl border border-slate-200 shadow-[0_8px_30px_rgb(0,0,0,0.04)] overflow-hidden sticky top-24">
                <div className="p-6 border-b border-slate-100 bg-slate-50/50">
                  <h3 className="text-lg font-bold text-slate-900">Course Content</h3>
                  <p className="text-sm text-slate-500 mt-1 font-medium">{pythonLectures.length} lessons available</p>
                </div>
                <ul className="max-h-[650px] overflow-y-auto premium-scrollbar p-3 space-y-2">
                  {pythonLectures.map((lec, idx) => {
                    const isActive = idx === selected;
                    return (
                      <li key={lec._id || idx}>
                        <button onClick={() => setSearchParams({ lesson: lec._id || lec.id })}
                          className={`w-full text-left p-4 flex gap-4 items-start rounded-xl transition-all duration-200 border ${isActive ? `${accent.bgActive} border-transparent shadow-sm` : "bg-white border-transparent hover:bg-slate-50 hover:border-slate-100"}`}>
                          <div className="flex-shrink-0 mt-0.5">
                            {isActive ? <PlayCircle className={`w-5 h-5 ${accent.textActive}`} /> : <CheckCircle2 className="w-5 h-5 text-slate-300" />}
                          </div>
                          <div className="flex-1 min-w-0">
                            <h4 className={`text-sm font-bold mb-1.5 leading-snug ${isActive ? "text-slate-900" : "text-slate-700"}`}>{idx + 1}. {lec.Title}</h4>
                            <span className={`text-xs flex items-center font-semibold ${isActive ? accent.textActive : "text-slate-400"}`}><Clock className="w-3 h-3 mr-1.5" /> {lec.Duration}</span>
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

      <style dangerouslySetInnerHTML={{ __html: `.premium-scrollbar::-webkit-scrollbar{width:6px}.premium-scrollbar::-webkit-scrollbar-track{background:transparent;margin:8px 0}.premium-scrollbar::-webkit-scrollbar-thumb{background-color:#E2E8F0;border-radius:20px}.premium-scrollbar::-webkit-scrollbar-thumb:hover{background-color:#CBD5E1}@media(prefers-reduced-motion:reduce){*,*::before,*::after{animation-duration:.01ms!important;transition-duration:.01ms!important}}` }} />
    </div>
  );
}
