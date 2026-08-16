import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { 
  BookOpen, Code, Database, Monitor, Server, Cpu, Layers, HardDrive, 
  Terminal, RefreshCw, MessageSquare, PlusCircle, AlertCircle
} from "lucide-react";

const API_BASE = "http://localhost:5001/api";

const COURSE_CONFIG = [
  { id: "htmlcss", title: "HTML & CSS", icon: <Monitor size={24} className="text-orange-500" />, path: "/admin/Webadmin/HTMLCSS/Lecture", apiPrefix: "/htmlcss" },
  { id: "javascript", title: "JavaScript", icon: <Code size={24} className="text-yellow-500" />, path: "/admin/Webadmin/JavaScript/Lecture", apiPrefix: "/javascript" },
  { id: "react", title: "React.js", icon: <Terminal size={24} className="text-cyan-500" />, path: "/admin/adminreactlecture", apiPrefix: "/react" },
  { id: "node", title: "Node.js", icon: <Server size={24} className="text-green-500" />, path: "/admin/adminnodelecture", apiPrefix: "/node" },
  { id: "dsa", title: "DSA", icon: <Cpu size={24} className="text-purple-500" />, path: "/admin/admindsalecture", apiPrefix: "/dsa" },
  { id: "python", title: "Python", icon: <Code size={24} className="text-blue-500" />, path: "/admin/adminpythonlecture", apiPrefix: "/python" },
  { id: "datamining", title: "Data Mining", icon: <Database size={24} className="text-indigo-500" />, path: "/admin/admindatamininglecture", apiPrefix: "/datamining" },
  { id: "aiml", title: "AI & ML", icon: <Layers size={24} className="text-red-500" />, path: "/admin/adminaimllecture", apiPrefix: "/aiml" },
  { id: "ca", title: "Computer Architecture", icon: <HardDrive size={24} className="text-gray-600" />, path: "/admin/admincomputerarchitecturelecture", apiPrefix: "/computerarchitecture" },
  { id: "mysql", title: "MySQL", icon: <Database size={24} className="text-sky-600" />, path: "/admin/adminmysqllecture", apiPrefix: "/mysql" }
];

const Dashboard = () => {
  const navigate = useNavigate();
  
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);
  const [error, setError] = useState(null);
  
  const [courseStats, setCourseStats] = useState({});
  const [contacts, setContacts] = useState([]);
  const [recentContent, setRecentContent] = useState([]);

  const fetchData = async () => {
    setLoading(true);
    setError(null);
    try {
      const token = localStorage.getItem('adminToken');
      const fetchOpts = { headers: { "Authorization": `Bearer ${token}` } };
      // 1. Fetch Contact Requests
      const contactRes = await fetch(`${API_BASE}/contact`, fetchOpts).catch(() => null);
      let fetchedContacts = [];
      if (contactRes && contactRes.ok) {
        const cData = await contactRes.json();
        fetchedContacts = cData.data || [];
        setContacts(fetchedContacts);
      }

      // 2. Fetch all Course Data
      const allPromises = COURSE_CONFIG.flatMap(course => [
        fetch(`${API_BASE}${course.apiPrefix}/lecture`, fetchOpts).then(res => res.json()).then(data => ({ courseId: course.id, type: 'lecture', data: data.data || [] })),
        fetch(`${API_BASE}${course.apiPrefix}/lab`, fetchOpts).then(res => res.json()).then(data => ({ courseId: course.id, type: 'lab', data: data.data || [] }))
      ]);

      const results = await Promise.allSettled(allPromises);
      
      const newStats = {};
      COURSE_CONFIG.forEach(c => newStats[c.id] = { lectures: 0, labs: 0 });
      let allContent = [];

      results.forEach(result => {
        if (result.status === 'fulfilled' && result.value.data) {
          const { courseId, type, data } = result.value;
          
          if (type === 'lecture') {
            newStats[courseId].lectures = data.length;
            // Map items for recent content
            data.forEach(item => {
              allContent.push({
                ...item,
                _contentType: 'Lecture',
                _courseTitle: COURSE_CONFIG.find(c => c.id === courseId)?.title
              });
            });
          } else if (type === 'lab') {
            newStats[courseId].labs = data.length;
            data.forEach(item => {
              allContent.push({
                ...item,
                _contentType: 'Lab',
                _courseTitle: COURSE_CONFIG.find(c => c.id === courseId)?.title
              });
            });
          }
        }
      });

      setCourseStats(newStats);

      // Sort all content by createdAt
      allContent.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
      setRecentContent(allContent.slice(0, 5));

    } catch (err) {
      setError("An unexpected error occurred while fetching dashboard data.");
      console.error(err);
    } finally {
      setLoading(false);
      setRefreshing(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const handleRefresh = () => {
    setRefreshing(true);
    fetchData();
  };

  const totalLectures = Object.values(courseStats).reduce((sum, stat) => sum + stat.lectures, 0);
  const totalLabs = Object.values(courseStats).reduce((sum, stat) => sum + stat.labs, 0);

  return (
    <div className="p-6 md:p-10 bg-gray-50 min-h-screen">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-8 gap-4">
        <div>
          <h1 className="text-3xl font-bold text-gray-800">Admin Dashboard</h1>
          <p className="text-gray-500 mt-1">Manage all your courses and contact requests in one place.</p>
        </div>
        <button 
          onClick={handleRefresh}
          disabled={loading || refreshing}
          className="flex items-center gap-2 bg-white border border-gray-200 text-gray-700 px-4 py-2 rounded-lg shadow-sm hover:bg-gray-50 transition-colors disabled:opacity-50"
        >
          <RefreshCw size={18} className={`${refreshing ? 'animate-spin' : ''}`} />
          Refresh
        </button>
      </div>

      {error && (
        <div className="mb-6 p-4 bg-red-50 border-l-4 border-red-500 text-red-700 rounded-r-xl flex items-center gap-3 shadow-sm">
          <AlertCircle size={20} />
          <span>{error}</span>
        </div>
      )}

      {/* Stats Summary */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5 mb-10">
        <StatCard 
          title="Total Courses" 
          value={COURSE_CONFIG.length} 
          icon={<BookOpen size={24} className="text-indigo-600" />} 
          bgColor="bg-indigo-100" 
          loading={loading} 
        />
        <StatCard 
          title="Total Lectures" 
          value={totalLectures} 
          icon={<Server size={24} className="text-emerald-600" />} 
          bgColor="bg-emerald-100" 
          loading={loading} 
        />
        <StatCard 
          title="Total Labs" 
          value={totalLabs} 
          icon={<Code size={24} className="text-amber-600" />} 
          bgColor="bg-amber-100" 
          loading={loading} 
        />
        <StatCard 
          title="Contact Requests" 
          value={contacts.length} 
          icon={<MessageSquare size={24} className="text-rose-600" />} 
          bgColor="bg-rose-100" 
          loading={loading} 
        />
      </div>

      {/* Course Overview */}
      <div className="mb-10">
        <h2 className="text-xl font-bold text-gray-800 mb-5">Course Overview</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5">
          {COURSE_CONFIG.map((course) => (
            <CourseCard 
              key={course.id}
              title={course.title}
              icon={course.icon}
              lectures={courseStats[course.id]?.lectures || 0}
              labs={courseStats[course.id]?.labs || 0}
              onClick={() => navigate(course.path)}
              loading={loading}
            />
          ))}
        </div>
      </div>

      {/* Bottom Section */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        
        {/* Recent Contacts */}
        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6 flex flex-col h-full">
          <div className="flex justify-between items-center mb-5">
            <h2 className="text-lg font-bold text-gray-800 flex items-center gap-2">
              <MessageSquare size={20} className="text-blue-500" /> Recent Contact Requests
            </h2>
            <Link to="/admin/callbackrequests" className="text-sm font-semibold text-blue-600 hover:text-blue-700">
              View All
            </Link>
          </div>
          
          <div className="flex-1">
            {loading ? (
              <div className="animate-pulse space-y-4">
                {[...Array(3)].map((_, i) => <div key={i} className="h-16 bg-gray-100 rounded-lg w-full"></div>)}
              </div>
            ) : contacts.length === 0 ? (
              <div className="flex flex-col items-center justify-center h-full text-gray-400 py-10">
                <MessageSquare size={40} className="mb-2 opacity-50" />
                <p>No recent requests</p>
              </div>
            ) : (
              <div className="space-y-4">
                {contacts.slice().reverse().slice(0, 5).map(req => (
                  <div key={req._id} className="p-4 bg-gray-50 rounded-xl border border-gray-100">
                    <div className="flex justify-between items-start mb-1">
                      <h4 className="font-semibold text-gray-800">{req.Name}</h4>
                      <span className="text-xs text-gray-500">{new Date(req.createdAt).toLocaleDateString()}</span>
                    </div>
                    <p className="text-sm font-medium text-gray-700 mb-1">{req.Subject}</p>
                    <p className="text-xs text-gray-500 line-clamp-1">{req.Message}</p>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>

        {/* Recently Added Content */}
        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6 flex flex-col h-full">
          <div className="flex justify-between items-center mb-5">
            <h2 className="text-lg font-bold text-gray-800 flex items-center gap-2">
              <PlusCircle size={20} className="text-emerald-500" /> Recently Added Content
            </h2>
          </div>
          
          <div className="flex-1">
            {loading ? (
              <div className="animate-pulse space-y-4">
                {[...Array(3)].map((_, i) => <div key={i} className="h-16 bg-gray-100 rounded-lg w-full"></div>)}
              </div>
            ) : recentContent.length === 0 ? (
              <div className="flex flex-col items-center justify-center h-full text-gray-400 py-10">
                <Server size={40} className="mb-2 opacity-50" />
                <p>No content added yet</p>
              </div>
            ) : (
              <div className="space-y-4">
                {recentContent.map(content => (
                  <div key={content._id} className="p-4 bg-gray-50 rounded-xl border border-gray-100 flex items-center gap-4">
                    <div className={`p-2 rounded-lg ${content._contentType === 'Lecture' ? 'bg-indigo-100 text-indigo-600' : 'bg-amber-100 text-amber-600'}`}>
                      {content._contentType === 'Lecture' ? <Server size={18} /> : <Code size={18} />}
                    </div>
                    <div className="flex-1 overflow-hidden">
                      <h4 className="font-semibold text-gray-800 truncate">{content.Title}</h4>
                      <div className="flex items-center gap-2 text-xs text-gray-500">
                        <span className="font-medium text-gray-700">{content._courseTitle}</span>
                        <span>•</span>
                        <span>{content._contentType}</span>
                      </div>
                    </div>
                    <span className="text-xs text-gray-400 whitespace-nowrap">
                      {new Date(content.createdAt).toLocaleDateString()}
                    </span>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>

      </div>
    </div>
  );
};

const StatCard = ({ title, value, icon, bgColor, loading }) => (
  <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 flex items-center gap-5">
    <div className={`p-4 rounded-xl ${bgColor}`}>
      {icon}
    </div>
    <div>
      <p className="text-sm font-medium text-gray-500 mb-1">{title}</p>
      {loading ? (
        <div className="h-8 w-16 bg-gray-200 rounded animate-pulse"></div>
      ) : (
        <h3 className="text-3xl font-bold text-gray-800">{value}</h3>
      )}
    </div>
  </div>
);

const CourseCard = ({ title, icon, lectures, labs, onClick, loading }) => (
  <div 
    onClick={onClick}
    className="bg-white p-5 rounded-2xl shadow-sm border border-gray-100 hover:shadow-md hover:border-blue-200 transition-all cursor-pointer group"
  >
    <div className="flex items-center gap-3 mb-4">
      <div className="p-2 bg-gray-50 rounded-lg group-hover:scale-110 transition-transform">
        {icon}
      </div>
      <h3 className="font-bold text-gray-800">{title}</h3>
    </div>
    
    {loading ? (
      <div className="flex justify-between mt-2 animate-pulse">
        <div className="h-10 w-[45%] bg-gray-100 rounded-lg"></div>
        <div className="h-10 w-[45%] bg-gray-100 rounded-lg"></div>
      </div>
    ) : (
      <div className="grid grid-cols-2 gap-3">
        <div className="bg-slate-50 p-3 rounded-xl border border-slate-100 text-center">
          <p className="text-xs text-slate-500 mb-1">Lectures</p>
          <p className="font-bold text-slate-800">{lectures}</p>
        </div>
        <div className="bg-slate-50 p-3 rounded-xl border border-slate-100 text-center">
          <p className="text-xs text-slate-500 mb-1">Labs</p>
          <p className="font-bold text-slate-800">{labs}</p>
        </div>
      </div>
    )}
  </div>
);

export default Dashboard;