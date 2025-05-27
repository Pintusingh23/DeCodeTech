import React from 'react';
import { FaCalendarAlt, FaMapMarkerAlt, FaUserFriends, FaArrowRight,FaFolderOpen ,FaCode } from 'react-icons/fa';
import { Link } from 'react-router-dom';

const Events = () => {
  const upcomingEvents = [
    {
      id: 1,
      title: "Data Science Workshop",
      date: "Oct 15, 2023",
      time: "10:00 AM - 12:00 PM",
      location: "Virtual",
      description: "Hands-on session with real-world datasets and analysis techniques.",
      category: "Workshop",
      seats: "12/25 seats left"
    },
    {
      id: 2,
      title: "Web Dev Community Meetup",
      date: "Oct 18, 2023",
      time: "6:00 PM - 8:00 PM",
      location: "Bangalore",
      description: "Network with fellow developers and share project ideas.",
      category: "Meetup",
      seats: "8/20 seats left"
    },
    {
      id: 3,
      title: "Tech Interview Prep Session",
      date: "Oct 22, 2023",
      time: "3:00 PM - 5:00 PM",
      location: "Virtual",
      description: "Mock interviews and problem-solving strategies with industry experts.",
      category: "Workshop",
      seats: "5/15 seats left"
    }
  ];

  const recommendedEvents = [
    {
      id: 4,
      title: "Python for Beginners",
      date: "Nov 5, 2023",
      time: "11:00 AM - 1:00 PM",
      location: "Delhi",
      description: "Learn Python fundamentals with interactive coding exercises.",
      category: "Workshop",
      seats: "18/30 seats left"
    },
    {
      id: 5,
      title: "AI & ML Panel Discussion",
      date: "Nov 12, 2023",
      time: "4:00 PM - 6:00 PM",
      location: "Virtual",
      description: "Industry leaders discuss the future of artificial intelligence.",
      category: "Conference",
      seats: "22/50 seats left"
    },
    {
      id: 6,
      title: "Hackathon Kickoff",
      date: "Nov 20, 2023",
      time: "10:00 AM",
      location: "Mumbai",
      description: "48-hour coding competition with exciting prizes.",
      category: "Competition",
      seats: "15/30 teams left"
    }
  ];

  return (
    <div className="flex min-h-screen bg-gradient-to-br from-[#fff9f5] to-[#fff0e6] mt-24">
      {/* Sidebar - Same as Home page */}
      <aside className="w-64 bg-white/50 p-6 space-y-6 sticky top-0 h-screen backdrop-blur-sm border-r border-orange-100">
        <h2 className="text-xl font-bold flex items-center space-x-3 text-[#5a2d0c]">
          <FaCalendarAlt className="text-orange-500" /> 
          <span>Events</span>
        </h2>
        <nav className="space-y-3 text-sm text-gray-700">
          <Link 
            to="/learning" 
            className="block hover:font-medium cursor-pointer hover:text-orange-600 transition-all duration-200 flex items-center gap-3 p-2 rounded-lg hover:bg-orange-50"
          >
            <div className="w-6 h-6 rounded-full bg-orange-100 flex items-center justify-center">
              <div className="w-2 h-2 rounded-full bg-orange-500"></div>
            </div>
            My learning
          </Link>
          <Link 
            to="/events" 
            className="hover:font-medium cursor-pointer flex items-center gap-3 p-2 rounded-lg bg-orange-50 text-orange-600 transition-all duration-200"
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
      <main className="flex-1 p-8 space-y-8">
        {/* Hero Section */}
        <div className="bg-gradient-to-r from-blue-500 to-indigo-600 rounded-2xl p-8 text-white shadow-lg">
          <h1 className="text-3xl font-bold mb-3">Your Upcoming Events</h1>
          <p className="text-lg mb-6 opacity-90">
            Find your community by joining an event. When we learn together, we learn more.
          </p>
          <button className="px-6 py-3 bg-white text-blue-600 rounded-xl text-lg font-semibold hover:bg-blue-50 transition flex items-center gap-2">
            Sign up for an event
            <FaArrowRight />
          </button>
        </div>

        {/* Upcoming Events */}
        <div className="space-y-5">
          <h2 className="text-2xl font-bold text-[#5a2d0c]">Your Upcoming Events</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
            {upcomingEvents.map((event) => (
              <div
                key={event.id}
                className="bg-white rounded-2xl shadow-md p-5 hover:shadow-lg transition-shadow duration-300 border border-white group"
              >
                <div className="flex justify-between items-start mb-3">
                  <span className="px-3 py-1 bg-blue-100 text-blue-600 rounded-full text-xs font-medium">
                    {event.category}
                  </span>
                  <span className="text-xs text-gray-500">{event.seats}</span>
                </div>
                <h3 className="text-xl font-semibold text-[#5a2d0c] mb-2">{event.title}</h3>
                <div className="flex items-center gap-2 text-gray-600 mb-1">
                  <FaCalendarAlt className="text-gray-400" />
                  <span>{event.date} · {event.time}</span>
                </div>
                <div className="flex items-center gap-2 text-gray-600 mb-3">
                  <FaMapMarkerAlt className="text-gray-400" />
                  <span>{event.location}</span>
                </div>
                <p className="text-gray-600 text-sm mb-4">{event.description}</p>
                <button className="w-full py-2 rounded-lg border border-blue-200 text-blue-600 font-medium hover:bg-blue-50 transition-colors duration-200 flex items-center justify-center gap-2">
                  View details
                  <FaArrowRight className="text-xs" />
                </button>
              </div>
            ))}
          </div>
        </div>

        {/* Recommended Community Events */}
        <div className="space-y-5">
          <div className="flex justify-between items-center">
            <h2 className="text-2xl font-bold text-[#5a2d0c]">Recommended Community Events</h2>
            <button className="text-orange-600 font-medium hover:underline flex items-center gap-1">
              View all
              <FaArrowRight className="text-xs" />
            </button>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
            {recommendedEvents.map((event) => (
              <div
                key={event.id}
                className="bg-white rounded-2xl shadow-md p-5 hover:shadow-lg transition-shadow duration-300 border border-white group"
              >
                <div className="flex justify-between items-start mb-3">
                  <span className="px-3 py-1 bg-purple-100 text-purple-600 rounded-full text-xs font-medium">
                    {event.category}
                  </span>
                  <span className="text-xs text-gray-500">{event.seats}</span>
                </div>
                <h3 className="text-xl font-semibold text-[#5a2d0c] mb-2">{event.title}</h3>
                <div className="flex items-center gap-2 text-gray-600 mb-1">
                  <FaCalendarAlt className="text-gray-400" />
                  <span>{event.date} · {event.time}</span>
                </div>
                <div className="flex items-center gap-2 text-gray-600 mb-3">
                  <FaMapMarkerAlt className="text-gray-400" />
                  <span>{event.location}</span>
                </div>
                <p className="text-gray-600 text-sm mb-4">{event.description}</p>
                <div className="flex gap-2">
                  <button className="flex-1 py-2 rounded-lg border border-orange-200 text-orange-600 font-medium hover:bg-orange-50 transition-colors duration-200">
                    Learn more
                  </button>
                  <button className="flex-1 py-2 rounded-lg bg-orange-600 text-white font-medium hover:bg-orange-700 transition-colors duration-200 flex items-center justify-center gap-1">
                    <FaUserFriends /> Join
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* CTA Section */}
        <div className="bg-gradient-to-r from-orange-50 to-amber-50 rounded-2xl p-8 text-center border border-orange-100">
          <h3 className="text-2xl font-bold text-[#5a2d0c] mb-3">Can't find what you're looking for?</h3>
          <p className="text-gray-600 mb-5 max-w-2xl mx-auto">
            Suggest an event topic or join our community forum to connect with other learners.
          </p>
          <div className="flex gap-3 justify-center">
            <button className="px-6 py-2 border border-orange-300 text-orange-600 rounded-xl font-medium hover:bg-white transition">
              Suggest an event
            </button>
            <button className="px-6 py-2 bg-orange-600 text-white rounded-xl font-medium hover:bg-orange-700 transition">
              Visit community
            </button>
          </div>
        </div>
      </main>
    </div>
  );
};

export default Events;