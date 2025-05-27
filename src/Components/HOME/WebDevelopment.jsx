import { useState } from "react";
import { PlayCircle, BookOpen, Clock, Star, ChevronRight, Check, Zap } from "lucide-react";

const courses = [
  {
    title: "HTML & CSS Mastery",
    level: "Beginner",
    lessons: 24,
    duration: "8 hours",
    description: "Build beautiful, responsive websites with modern HTML5 and CSS3 techniques.",
    category: "Frontend",
    rating: 4.8,
    students: 1250,
    popular: true
  },
  {
    title: "JavaScript Deep Dive",
    level: "Beginner",
    lessons: 36,
    duration: "14 hours",
    description: "Master JavaScript fundamentals, ES6+ features, and DOM manipulation.",
    category: "Frontend",
    rating: 4.9,
    students: 1843,
    popular: true
  },
  {
    title: "React.js Pro",
    level: "Intermediate",
    lessons: 45,
    duration: "18 hours",
    description: "Build interactive UIs with React hooks, context API, and advanced patterns.",
    category: "Frontend",
    rating: 4.7,
    students: 2310
  },
  {
    title: "Node.js & Express",
    level: "Intermediate",
    lessons: 38,
    duration: "16 hours",
    description: "Create robust backend services with Node.js, Express, and REST APIs.",
    category: "Backend",
    rating: 4.6,
    students: 1567
  },
  {
    title: "MongoDB for Developers",
    level: "Intermediate",
    lessons: 30,
    duration: "12 hours",
    description: "Master NoSQL databases with MongoDB, Mongoose, and data modeling.",
    category: "Backend",
    rating: 4.5,
    students: 982
  },
  {
    title: "Full Stack MERN Masterclass",
    level: "Advanced",
    lessons: 52,
    duration: "22 hours",
    description: "End-to-end development with MongoDB, Express, React, and Node.js.",
    category: "Full Stack",
    rating: 4.9,
    students: 2875,
    popular: true
  },
];

const WebDevelopment = () => {
  const [activeTab, setActiveTab] = useState("All Web Courses");

  const filteredCourses = activeTab === "All Web Courses" 
    ? courses 
    : courses.filter(course => course.category === activeTab);

  return (
    <div className="bg-gradient-to-b from-gray-50 to-white min-h-screen">
      <div className="container mx-auto px-4 py-12 md:py-16">
        <div className="text-center mb-16">
          <span className="inline-block bg-purple-100 text-purple-800 px-4 py-1 rounded-full text-sm font-medium mb-4">
            Start Your Coding Journey
          </span>
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
            Master <span className="text-purple-600">Web Development</span>
          </h1>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Learn modern web technologies with our project-based courses and build real-world applications.
          </p>
        </div>
        <div className="flex flex-wrap justify-center gap-2 mb-12">
          {["All Web Courses", "Frontend", "Backend", "Full Stack"].map((tab) => (
            <button
              key={tab}
              className={`px-6 py-3 rounded-full font-semibold transition-all duration-300 ${
                activeTab === tab 
                  ? "bg-purple-600 text-white shadow-lg shadow-purple-100" 
                  : "bg-white text-gray-700 hover:bg-gray-100 border border-gray-200"
              }`}
              onClick={() => setActiveTab(tab)}
            >
              {tab}
            </button>
          ))}
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
  {filteredCourses.map((course, index) => (
    <div 
      key={index} 
      className={`bg-white rounded-xl overflow-hidden shadow-lg hover:shadow-xl transition-shadow duration-300 border border-gray-100 ${
        course.popular ? "ring-2 ring-purple-500" : ""
      }`}
      onClick={() => course.title === "HTML & CSS Mastery" && navigate('/HTMLCSSCourse')}
      style={{ cursor: 'pointer' }}
    >
              <div className="relative">
                <div className="h-48 bg-gradient-to-r from-purple-500 to-indigo-600 flex items-center justify-center">
                  <PlayCircle className="w-16 h-16 text-white opacity-90" />
                </div>
                {course.popular && (
                  <div className="absolute top-4 left-4 bg-yellow-400 text-yellow-900 px-3 py-1 rounded-full text-xs font-bold flex items-center">
                    <Zap className="w-3 h-3 mr-1" /> Popular
                  </div>
                )}
              </div>
              
              <div className="p-6">
                <div className="flex justify-between items-start mb-2">
                  <span className="text-sm font-medium px-3 py-1 bg-purple-100 text-purple-800 rounded-full">
                    {course.level}
                  </span>
                  <div className="flex items-center text-yellow-500">
                    <Star className="w-4 h-4 fill-current" />
                    <span className="ml-1 text-gray-700 font-medium">{course.rating}</span>
                  </div>
                </div>
                
                <h3 className="text-xl font-bold text-gray-900 mb-2">{course.title}</h3>
                <p className="text-gray-600 mb-4">{course.description}</p>
                
                <div className="flex justify-between text-sm text-gray-500 mb-6">
                  <span className="flex items-center gap-1">
                    <BookOpen className="w-4 h-4" /> {course.lessons} lessons
                  </span>
                  <span className="flex items-center gap-1">
                    <Clock className="w-4 h-4" /> {course.duration}
                  </span>
                </div>
                
                <div className="flex justify-between items-center">
                  <span className="text-sm text-gray-500">{course.students.toLocaleString()} students</span>
                  <button className="bg-purple-600 hover:bg-purple-700 text-white px-5 py-2 rounded-lg font-medium flex items-center transition-colors duration-300">
                    Enroll <ChevronRight className="w-4 h-4 ml-1" />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
        <div className="mt-20 bg-gradient-to-r from-purple-600 to-indigo-600 rounded-2xl overflow-hidden shadow-2xl">
          <div className="p-8 md:p-12 lg:flex">
            <div className="lg:w-2/3">
              <h2 className="text-2xl md:text-3xl font-bold text-white mb-2">Complete 2024 Web Developer Bootcamp</h2>
              <p className="text-purple-100 mb-6 max-w-2xl">
                The only course you need to go from beginner to full-stack developer. Includes 50+ projects, 300+ hours of content, and career guidance.
              </p>
              
              <div className="grid grid-cols-2 gap-4 mb-8">
                <div className="flex items-center text-purple-100">
                  <Check className="w-5 h-5 mr-2" /> HTML5 & CSS3
                </div>
                <div className="flex items-center text-purple-100">
                  <Check className="w-5 h-5 mr-2" /> JavaScript ES6+
                </div>
                <div className="flex items-center text-purple-100">
                  <Check className="w-5 h-5 mr-2" /> React 18
                </div>
                <div className="flex items-center text-purple-100">
                  <Check className="w-5 h-5 mr-2" /> Node.js & Express
                </div>
                <div className="flex items-center text-purple-100">
                  <Check className="w-5 h-5 mr-2" /> MongoDB & Mongoose
                </div>
                <div className="flex items-center text-purple-100">
                  <Check className="w-5 h-5 mr-2" /> Deployment & DevOps
                </div>
              </div>
              
              <div className="flex flex-wrap gap-4">
                <button className="bg-white text-purple-600 hover:bg-gray-100 px-6 py-3 rounded-lg font-bold flex items-center transition-colors duration-300">
                  Start Learning <ChevronRight className="w-5 h-5 ml-1" />
                </button>
                <button className="bg-transparent border-2 border-white text-white hover:bg-white hover:bg-opacity-10 px-6 py-3 rounded-lg font-bold">
                  View Curriculum
                </button>
              </div>
            </div>
            
            <div className="hidden lg:block lg:w-1/3 relative">
              <div className="absolute -right-10 -top-10 w-64 h-64 bg-purple-500 rounded-full opacity-20"></div>
              <div className="absolute -right-5 -bottom-5 w-48 h-48 bg-indigo-400 rounded-full opacity-20"></div>
              <div className="relative z-10 h-full flex items-center justify-center">
                <div className="bg-white bg-opacity-10 backdrop-blur-sm p-6 rounded-xl border border-white border-opacity-20">
                  <div className="text-center">
                    <div className="text-4xl font-bold text-white mb-2">85% OFF</div>
                    <div className="text-purple-200 mb-4">Limited time offer</div>
                    <div className="text-white font-medium">
                      <span className="line-through opacity-70">$299.99</span>
                      <span className="text-2xl ml-2">$49.99</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="mt-20 grid grid-cols-2 md:grid-cols-4 gap-6 text-center">
          <div className="bg-white p-6 rounded-xl shadow-sm">
            <div className="text-3xl font-bold text-purple-600 mb-2">10,000+</div>
            <div className="text-gray-600">Happy Students</div>
          </div>
          <div className="bg-white p-6 rounded-xl shadow-sm">
            <div className="text-3xl font-bold text-purple-600 mb-2">150+</div>
            <div className="text-gray-600">Hours of Content</div>
          </div>
          <div className="bg-white p-6 rounded-xl shadow-sm">
            <div className="text-3xl font-bold text-purple-600 mb-2">4.9</div>
            <div className="text-gray-600">Average Rating</div>
          </div>
          <div className="bg-white p-6 rounded-xl shadow-sm">
            <div className="text-3xl font-bold text-purple-600 mb-2">24/7</div>
            <div className="text-gray-600">Support</div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default WebDevelopment;