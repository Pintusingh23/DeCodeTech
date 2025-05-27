import { useState } from 'react';
import { PlayCircle, Check, ArrowLeft, Clock, BookOpen, Star, Zap } from "lucide-react";
import { useNavigate } from "react-router-dom";

const HTMLCSSCourse = () => {
  const navigate = useNavigate();
  const [currentLesson, setCurrentLesson] = useState(null);
  
  const [lessons, setLessons] = useState([
    { id: 1, title: "Introduction to HTML", duration: "15 min", completed: true },
    { id: 2, title: "HTML Document Structure", duration: "22 min", completed: true },
    { id: 3, title: "HTML Elements and Tags", duration: "18 min", completed: true },
    { id: 4, title: "Forms and Input Elements", duration: "25 min", completed: false },
    { id: 5, title: "Semantic HTML", duration: "20 min", completed: false },
    { id: 6, title: "CSS Introduction", duration: "12 min", completed: false },
    { id: 7, title: "CSS Selectors", duration: "18 min", completed: false },
    { id: 8, title: "Box Model", duration: "24 min", completed: false },
    { id: 9, title: "Flexbox", duration: "30 min", completed: false },
    { id: 10, title: "CSS Grid", duration: "28 min", completed: false },
    { id: 11, title: "Responsive Design", duration: "35 min", completed: false },
    { id: 12, title: "CSS Animations", duration: "22 min", completed: false },
    // ... additional lessons up to 24
  ]);

  const completedCount = lessons.filter(lesson => lesson.completed).length;
  const progressPercentage = Math.round((completedCount / lessons.length) * 100);

  const handleMarkComplete = (lessonId) => {
    setLessons(lessons.map(lesson => 
      lesson.id === lessonId ? { ...lesson, completed: true } : lesson
    ));
    setCurrentLesson(null);
  };

  return (
    <div className="bg-gray-50 min-h-screen">
      <div className="container mx-auto px-4 py-8">
        <button 
          onClick={() => navigate(-1)}
          className="flex items-center text-purple-600 hover:text-purple-800 mb-6"
        >
          <ArrowLeft className="w-5 h-5 mr-2" /> Back to Courses
        </button>

        <div className="bg-white rounded-xl shadow-md overflow-hidden">
          <div className="md:flex">
            {/* Course Sidebar */}
            <div className="md:w-1/3 bg-gradient-to-br from-purple-500 to-indigo-600 p-8 text-white">
              <div className="flex items-center mb-2">
                <span className="bg-white bg-opacity-20 px-3 py-1 rounded-full text-sm font-medium">
                  Beginner
                </span>
                <div className="ml-auto flex items-center">
                  <Star className="w-4 h-4 fill-current text-yellow-300" />
                  <span className="ml-1 font-medium">4.8</span>
                </div>
              </div>
              
              <h1 className="text-2xl font-bold mb-4">HTML & CSS Mastery</h1>
              <p className="text-purple-100 mb-6">Build beautiful, responsive websites with modern HTML5 and CSS3 techniques.</p>
              
              <div className="flex items-center text-sm text-purple-100 mb-4">
                <BookOpen className="w-4 h-4 mr-2" />
                <span>{lessons.length} lessons</span>
              </div>
              
              <div className="flex items-center text-sm text-purple-100 mb-6">
                <Clock className="w-4 h-4 mr-2" />
                <span>8 hours total</span>
              </div>
              
              <div className="bg-white bg-opacity-10 p-4 rounded-lg">
                <h3 className="font-medium mb-2">Course Progress</h3>
                <div className="w-full bg-white bg-opacity-20 rounded-full h-2 mb-2">
                  <div 
                    className="bg-yellow-400 h-2 rounded-full" 
                    style={{ width: `${progressPercentage}%` }}
                  ></div>
                </div>
                <p className="text-xs">{completedCount} of {lessons.length} lessons completed</p>
              </div>

              <div className="mt-6">
                <button className="w-full bg-purple-700 hover:bg-purple-800 text-white py-2 px-4 rounded-lg flex items-center justify-center">
                  <Zap className="w-4 h-4 mr-2" />
                  Continue Learning
                </button>
              </div>
            </div>
            
            {/* Lessons List */}
            <div className="md:w-2/3 p-8">
              <div className="flex justify-between items-center mb-6">
                <h2 className="text-xl font-bold text-gray-800">Course Content</h2>
                <div className="text-sm text-gray-500">
                  {completedCount}/{lessons.length} completed
                </div>
              </div>
              
              <div className="space-y-4">
                {lessons.map((lesson) => (
                  <div 
                    key={lesson.id}
                    className={`border border-gray-200 rounded-lg p-4 hover:bg-purple-50 transition-colors duration-200 ${
                      currentLesson?.id === lesson.id ? "ring-2 ring-purple-500" : ""
                    }`}
                    onClick={() => setCurrentLesson(lesson)}
                    style={{ cursor: 'pointer' }}
                  >
                    <div className="flex items-center">
                      <div className={`w-8 h-8 rounded-full flex items-center justify-center mr-4 ${
                        lesson.completed ? "bg-green-100 text-green-600" : "bg-gray-100 text-gray-400"
                      }`}>
                        {lesson.completed ? (
                          <Check className="w-4 h-4" />
                        ) : (
                          <PlayCircle className="w-4 h-4" />
                        )}
                      </div>
                      
                      <div className="flex-grow">
                        <h3 className="font-medium text-gray-800">{lesson.title}</h3>
                        <p className="text-sm text-gray-500">{lesson.duration}</p>
                      </div>
                      
                      <button className="text-purple-600 hover:text-purple-800">
                        {lesson.completed ? "Review" : "Start"}
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Video Lesson Modal */}
      {currentLesson && (
        <div className="fixed inset-0 bg-black bg-opacity-75 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-lg w-full max-w-4xl">
            <div className="p-4 flex justify-between items-center border-b">
              <h3 className="text-lg font-medium">{currentLesson.title}</h3>
              <button 
                onClick={() => setCurrentLesson(null)}
                className="text-gray-500 hover:text-gray-700"
              >
                ✕
              </button>
            </div>
            <div className="aspect-w-16 aspect-h-9">
              {/* Video Player Placeholder */}
              <div className="w-full h-96 bg-gray-800 flex items-center justify-center text-white">
                <div className="text-center">
                  <PlayCircle className="w-16 h-16 mx-auto mb-4" />
                  <p className="text-xl">Lesson: {currentLesson.title}</p>
                  <p className="text-gray-300 mt-2">{currentLesson.duration}</p>
                </div>
              </div>
            </div>
            <div className="p-4 border-t flex justify-between items-center">
              <button 
                onClick={() => {
                  const prevLesson = lessons.find(l => l.id === currentLesson.id - 1);
                  if (prevLesson) setCurrentLesson(prevLesson);
                }}
                disabled={currentLesson.id === 1}
                className={`px-4 py-2 rounded ${
                  currentLesson.id === 1 
                    ? "text-gray-400 cursor-not-allowed" 
                    : "text-purple-600 hover:bg-purple-50"
                }`}
              >
                Previous
              </button>
              
              <button 
                onClick={() => handleMarkComplete(currentLesson.id)}
                className="bg-purple-600 text-white px-4 py-2 rounded hover:bg-purple-700"
              >
                {currentLesson.completed ? "Completed ✓" : "Mark as Complete"}
              </button>
              
              <button 
                onClick={() => {
                  const nextLesson = lessons.find(l => l.id === currentLesson.id + 1);
                  if (nextLesson) setCurrentLesson(nextLesson);
                }}
                disabled={currentLesson.id === lessons.length}
                className={`px-4 py-2 rounded ${
                  currentLesson.id === lessons.length 
                    ? "text-gray-400 cursor-not-allowed" 
                    : "text-purple-600 hover:bg-purple-50"
                }`}
              >
                Next
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default HTMLCSSCourse;