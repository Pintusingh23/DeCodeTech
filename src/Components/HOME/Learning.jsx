import React from 'react';
import { FaBook, FaLock, FaEdit, FaChevronRight, FaChartLine,FaCalendarAlt,FaFolderOpen,FaCode} from 'react-icons/fa';
import { Link } from 'react-router-dom';

const Learning = () => {
  return (
    <div className="flex min-h-screen bg-gradient-to-br from-[#fff9f5] to-[#fff0e6] mt-24">
      {/* Sidebar - Consistent with other pages */}
      <aside className="w-64 bg-white/50 p-6 space-y-6 sticky top-0 h-screen backdrop-blur-sm border-r border-orange-100">
        <h2 className="text-xl font-bold flex items-center space-x-3 text-[#5a2d0c]">
          <FaBook className="text-orange-500" /> 
          <span>Learning</span>
        </h2>
        <nav className="space-y-3 text-sm text-gray-700">
          <Link 
            to="/learning" 
            className="block hover:font-medium cursor-pointer bg-orange-50 text-orange-600 transition-all duration-200 flex items-center gap-3 p-2 rounded-lg"
          >
            <div className="w-6 h-6 rounded-full bg-orange-100 flex items-center justify-center">
              <div className="w-2 h-2 rounded-full bg-orange-500"></div>
            </div>
            My learning
          </Link>
          <Link 
            to="/events" 
            className="hover:font-medium cursor-pointer flex items-center gap-3 p-2 rounded-lg hover:bg-orange-50 hover:text-orange-600 transition-all duration-200"
          >
            <div className="w-6 h-6 rounded-full bg-blue-100 flex items-center justify-center text-blue-500">
              <FaCalendarAlt size={14} />
            </div>
            Events
          </Link>
          <Link 
            to="/projects" 
            className="hover:font-medium cursor-pointer flex items-center justify-between p-2 rounded-lg hover:bg-orange-50 hover:text-orange-600 transition-all duration-200"
          >
            <span className="flex items-center gap-3">
              <div className="w-6 h-6 rounded-full bg-purple-100 flex items-center justify-center text-purple-500">
                <FaFolderOpen size={14} />
              </div>
              Projects
            </span>
            <span className="bg-orange-100 text-orange-700 text-xs px-2 py-0.5 rounded-full">Upgrade</span>
          </Link>
          <div className="hover:font-medium cursor-pointer flex items-center gap-3 p-2 rounded-lg hover:bg-orange-50 hover:text-orange-600 transition-all duration-200">
            <div className="w-6 h-6 rounded-full bg-green-100 flex items-center justify-center text-green-500">
              <FaCode size={14} />
            </div>
            Workspaces
          </div>
        </nav>
        <div className="bg-gradient-to-r from-orange-50 to-amber-50 p-4 border border-orange-100 rounded-xl space-y-3 shadow-sm">
          <h3 className="font-bold text-[#5a2d0c]">Upgrade your plan</h3>
          <p className="text-xs text-gray-600">Go deeper and learn job-ready skills.</p>
          <button className="bg-gradient-to-r from-orange-600 to-amber-600 text-white py-2 px-4 rounded-lg w-full font-medium shadow-md hover:shadow-lg transition-all duration-300 hover:opacity-90">
            Upgrade plan
          </button>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 p-8 space-y-6">
        {/* Header */}
        <div className="flex justify-between items-center">
          <h1 className="text-3xl font-bold text-[#5a2d0c]">My Learning</h1>
          <button className="text-orange-600 hover:text-orange-700 transition-colors duration-200 flex items-center gap-1">
            <FaEdit size={14} /> Edit
          </button>
        </div>

        {/* Tabs */}
        <div className="flex border-b border-gray-200">
          <button className="border-b-2 border-orange-600 text-orange-600 font-medium px-4 py-2">
            In progress
          </button>
          <button className="text-gray-600 px-4 py-2 hover:text-orange-600 transition-colors duration-200">
            Completed
          </button>
          <button className="text-gray-600 px-4 py-2 hover:text-orange-600 transition-colors duration-200">
            Saved
          </button>
        </div>

        {/* Self-enrolled Section */}
        <div className="bg-white rounded-2xl shadow-md p-6">
          <h2 className="text-sm uppercase text-gray-500 mb-4 tracking-wider">Self-enrolled</h2>

          {/* Course Card */}
          <div className="border border-orange-100 rounded-xl p-5 mb-4 hover:shadow-lg transition-shadow duration-300">
            <div className="flex justify-between items-start mb-3">
              <div>
                <h3 className="text-xl font-semibold text-[#5a2d0c]">Learn HTML</h3>
                <p className="text-sm text-gray-500">Web Development Path</p>
              </div>
              <div className="flex items-center gap-2">
                <span className="text-sm font-medium">0%</span>
                <div className="w-24 bg-gray-200 rounded-full h-2">
                  <div className="bg-orange-500 h-2 rounded-full" style={{ width: '0%' }}></div>
                </div>
              </div>
            </div>

            <div className="mb-5">
              <h4 className="font-semibold text-sm mb-2 flex items-center gap-2">
                <FaChartLine className="text-orange-500" />
                Current Module: Elements and Structure
              </h4>
              <ul className="space-y-2 pl-2">
                <li className="flex items-center gap-2 text-sm">
                  <span className="text-green-500">✓</span>
                  <span>Lesson: Introduction to HTML</span>
                </li>
                <li className="flex items-center gap-2 text-sm text-gray-500">
                  <FaLock size={10} />
                  <span>Quiz: Introduction to HTML</span>
                </li>
                <li className="flex items-center gap-2 text-sm">
                  <span className="text-green-500">✓</span>
                  <span>Lesson: HTML Document Standards</span>
                </li>
                <li className="flex items-center gap-2 text-sm text-gray-500">
                  <FaLock size={10} />
                  <span>Quiz: HTML Document Standards</span>
                </li>
                <li className="flex items-center gap-2 text-sm text-gray-500">
                  <FaLock size={10} />
                  <span>Project: Fashion Blog</span>
                </li>
              </ul>
            </div>

            <div className="flex justify-between items-center">
              <button className="border border-orange-500 text-orange-600 px-4 py-2 rounded-lg hover:bg-orange-50 transition-colors duration-200">
                Module Practice
              </button>
              <div className="flex items-center space-x-3">
                <button className="text-orange-600 text-sm hover:underline flex items-center gap-1">
                  Syllabus <FaChevronRight size={10} />
                </button>
                <button className="bg-orange-600 text-white px-4 py-2 rounded-lg hover:bg-orange-700 transition-colors duration-200">
                  Continue
                </button>
              </div>
            </div>
          </div>

          {/* Another Course Card */}
          <div className="border border-orange-100 rounded-xl p-5 hover:shadow-lg transition-shadow duration-300">
            <div className="flex justify-between items-start">
              <div>
                <h3 className="text-xl font-semibold text-[#5a2d0c]">Learn SQL</h3>
                <p className="text-sm text-gray-500">Data Science Path</p>
              </div>
              <div className="flex items-center gap-2">
                <span className="text-sm font-medium">0%</span>
                <div className="w-24 bg-gray-200 rounded-full h-2">
                  <div className="bg-orange-500 h-2 rounded-full" style={{ width: '0%' }}></div>
                </div>
              </div>
            </div>
            <button className="mt-4 w-full py-2 bg-orange-600 text-white rounded-lg hover:bg-orange-700 transition-colors duration-200">
              Start Learning
            </button>
          </div>
        </div>

        {/* Recommended Paths */}
        <div className="bg-white rounded-2xl shadow-md p-6">
          <h2 className="text-lg font-bold text-[#5a2d0c] mb-4">Continue Your Learning Path</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {[
              {
                title: "Frontend Developer Path",
                progress: 15,
                description: "Master HTML, CSS, and JavaScript to build interactive websites",
                courses: "12 courses remaining"
              },
              {
                title: "Data Analyst Path",
                progress: 5,
                description: "Learn SQL, Python, and data visualization tools",
                courses: "18 courses remaining"
              }
            ].map((path, index) => (
              <div key={index} className="border border-orange-100 rounded-xl p-4 hover:shadow-md transition-shadow duration-300">
                <h3 className="font-semibold text-[#5a2d0c] mb-1">{path.title}</h3>
                <p className="text-sm text-gray-600 mb-2">{path.description}</p>
                <div className="flex items-center justify-between">
                  <span className="text-xs text-gray-500">{path.courses}</span>
                  <span className="text-xs font-medium">{path.progress}%</span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2 mt-1">
                  <div 
                    className="bg-orange-500 h-2 rounded-full" 
                    style={{ width: `${path.progress}%` }}
                  ></div>
                </div>
                <button className="mt-3 w-full py-2 border border-orange-500 text-orange-600 rounded-lg hover:bg-orange-50 transition-colors duration-200">
                  Continue Path
                </button>
              </div>
            ))}
          </div>
        </div>

        {/* Recent Activity */}
        <div className="bg-white rounded-2xl shadow-md p-6">
          <h2 className="text-lg font-bold text-[#5a2d0c] mb-4">Recent Activity</h2>
          <div className="space-y-4">
            {[
              {
                action: "Started",
                course: "Learn HTML",
                module: "Elements and Structure",
                time: "2 hours ago"
              },
              {
                action: "Completed",
                course: "Learn HTML",
                module: "Introduction to HTML",
                time: "Yesterday"
              }
            ].map((activity, index) => (
              <div key={index} className="flex items-start gap-3 border-b border-gray-100 pb-3">
                <div className="w-8 h-8 rounded-full bg-orange-100 flex items-center justify-center text-orange-600 mt-1">
                  <FaBook size={14} />
                </div>
                <div>
                  <p className="text-sm">
                    <span className="font-medium">{activity.action}</span> {activity.module} in {activity.course}
                  </p>
                  <p className="text-xs text-gray-500">{activity.time}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </main>
    </div>
  );
};

export default Learning;