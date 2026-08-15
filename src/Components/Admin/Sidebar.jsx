import { Link, useLocation, useNavigate } from 'react-router-dom';
import {
  FiHome, FiBarChart2,
  FiFileText, FiTable, FiLogOut, FiChevronRight,
  FiSettings, FiChevronDown, FiMonitor, FiCode,
  FiZap, FiServer, FiCpu, FiDatabase, FiLayers, FiHardDrive, FiPhoneCall
} from 'react-icons/fi';
import { useState, useEffect } from 'react';
import { useAdmin } from '../context/AdminContext';

export default function Sidebar() {
  const location = useLocation();
  const navigate = useNavigate();
  const { admin, logout } = useAdmin(); // Get admin and logout from context

  const [isPythonOpen, setIsPythonOpen] = useState(false);
  const [isHtmlCssOpen, setIsHtmlCssOpen] = useState(false);
  const [isJavaScriptOpen, setIsJavaScriptOpen] = useState(false);
  const [isReactOpen, setIsReactOpen] = useState(false);
  const [isNodeOpen, setIsNodeOpen] = useState(false);
  const [isDSAOpen, setIsDSAOpen] = useState(false);
  const [isDataMiningOpen, setIsDataMiningOpen] = useState(false);
  const [isAIMLOpen, setIsAIMLOpen] = useState(false);
  const [isCAOpen, setIsCAOpen] = useState(false);
  const [isMySQLOpen, setIsMySQLOpen] = useState(false);
  const [isMobile, setIsMobile] = useState(window.innerWidth < 768);
  const [sidebarOpen, setSidebarOpen] = useState(!isMobile);

  useEffect(() => {
    const handleResize = () => {
      const mobile = window.innerWidth < 768;
      setIsMobile(mobile);
      if (!mobile) {
        setSidebarOpen(true);
      } else {
        setSidebarOpen(false);
      }
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const toggleSidebar = () => {
    setSidebarOpen(!sidebarOpen);
  };

  const togglePythonDropdown = () => {
    setIsPythonOpen(!isPythonOpen);
  };

  const toggleHtmlCssDropdown = () => {
    setIsHtmlCssOpen(!isHtmlCssOpen);
  };

  const toggleJavaScriptDropdown = () => {
    setIsJavaScriptOpen(!isJavaScriptOpen);
  };

  const toggleReactDropdown = () => {
    setIsReactOpen(!isReactOpen);
  };

  const toggleNodeDropdown = () => {
    setIsNodeOpen(!isNodeOpen);
  };

  const toggleDSADropdown = () => {
    setIsDSAOpen(!isDSAOpen);
  };

  const toggleDataMiningDropdown = () => {
    setIsDataMiningOpen(!isDataMiningOpen);
  };

  const toggleAIMLDropdown = () => {
    setIsAIMLOpen(!isAIMLOpen);
  };

  const toggleCADropdown = () => {
    setIsCAOpen(!isCAOpen);
  };

  const toggleMySQLDropdown = () => {
    setIsMySQLOpen(!isMySQLOpen);
  };

  const pythonItems = [
    { icon: <FiBarChart2 className="text-base" />, text: "Python Lecture", to: "/admin/adminpythonlecture" },
    { icon: <FiBarChart2 className="text-base" />, text: "Python Lab", to: "/admin/adminpythonlab" },
  ];

  const htmlCssItems = [
    { icon: <FiMonitor className="text-base" />, text: "HTML CSS Lecture", to: "/admin/Webadmin/HTMLCSS/Lecture" },
    { icon: <FiTable className="text-base" />, text: "HTML CSS Lab", to: "/admin/Webadmin/HTMLCSS/Lab" },
  ];

  const javaScriptItems = [
    { icon: <FiCode className="text-base" />, text: "JavaScript Lecture", to: "/admin/Webadmin/JavaScript/Lecture" },
    { icon: <FiCode className="text-base" />, text: "JavaScript Lab", to: "/admin/Webadmin/JavaScript/Lab" },
  ];

  const reactItems = [
    { icon: <FiZap className="text-base" />, text: "React.js Lecture", to: "/admin/adminreactlecture" },
    { icon: <FiZap className="text-base" />, text: "React.js Lab", to: "/admin/adminreactlab" },
  ];

  const nodeItems = [
    { icon: <FiServer className="text-base" />, text: "Node.js Lecture", to: "/admin/adminnodelecture" },
    { icon: <FiServer className="text-base" />, text: "Node.js Lab", to: "/admin/adminnodelab" },
  ];

  const dsaItems = [
    { icon: <FiCpu className="text-base" />, text: "DSA Lecture", to: "/admin/admindsalecture" },
    { icon: <FiCpu className="text-base" />, text: "DSA Assessment", to: "/admin/admindsaassessment" },
  ];

  const dataMiningItems = [
    { icon: <FiDatabase className="text-base" />, text: "Data Mining Lecture", to: "/admin/admindatamininglecture" },
    { icon: <FiDatabase className="text-base" />, text: "Data Mining Lab", to: "/admin/admindatamininglab" },
  ];

  const aimlItems = [
    { icon: <FiLayers className="text-base" />, text: "AI & ML Lecture", to: "/admin/adminaimllecture" },
    { icon: <FiLayers className="text-base" />, text: "AI & ML Lab", to: "/admin/adminaimllab" },
  ];

  const caItems = [
    { icon: <FiHardDrive className="text-base" />, text: "Computer Architecture Lecture", to: "/admin/admincomputerarchitecturelecture" },
    { icon: <FiHardDrive className="text-base" />, text: "Computer Architecture Lab", to: "/admin/admincomputerarchitecturelab" },
  ];

  const mysqlItems = [
    { icon: <FiDatabase className="text-base" />, text: "MySQL Lecture", to: "/admin/adminmysqllecture" },
    { icon: <FiDatabase className="text-base" />, text: "MySQL Lab", to: "/admin/adminmysqllab" },
  ];

  const handleLogout = () => {
    logout(); // Call the logout function from context
    navigate('/admin'); // Navigate to admin login page
  };

  return (
    <>
      {/* Mobile toggle button */}
      {isMobile && (
        <button
          onClick={toggleSidebar}
          className="fixed left-4 top-4 z-30 p-2 rounded-md bg-white shadow-md text-gray-600 md:hidden"
        >
          <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
          </svg>
        </button>
      )}

      {/* Overlay for mobile */}
      {isMobile && sidebarOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 z-20"
          onClick={toggleSidebar}
        ></div>
      )}

      {/* Sidebar */}
      <div
        className={`fixed md:relative z-30 w-72 bg-gradient-to-b from-red-300 to-red-300 border-r min-h-screen flex flex-col transition-all duration-300 ease-in-out ${sidebarOpen ? 'left-0' : '-left-72'
          }`}
      >
        <div className="flex items-center px-6 py-6">
          <div className="w-12 h-12 bg-gradient-to-tr from-yellow-400 to-yellow-600 text-white rounded-xl flex items-center justify-center font-bold text-xl shadow-md">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
            </svg>
          </div>
          <div className="ml-3">
            <h1 className="text-xl font-bold text-gray-800">DeCode</h1>
          </div>
        </div>

        <div className="flex items-center gap-3 px-6 py-4 bg-gray-50 mx-4 rounded-lg border border-gray-100 shadow-sm">
          <div className="relative">
            <img
              src="/mitsu.jpg"
              alt="Pintu Singh"
              className="w-11 h-11 rounded-full object-cover border-2 border-white shadow"
            />
            <div className="absolute bottom-0 right-0 w-3 h-3 bg-yellow-500 rounded-full border-2 border-white"></div>
          </div>
          <div className="flex-1">
            <p className="font-semibold text-gray-800">Pintu Singh</p>
            <p className="text-xs text-gray-500">Admin</p>
          </div>
          <FiChevronRight className="text-gray-400" />
        </div>

        <nav className="px-4 py-6 flex-1 overflow-y-auto">
          <ul className="space-y-1">
            <SidebarItem icon={<FiHome className="text-lg" />} text="Dashboard" to="/admin/dashboard" active={location.pathname === '/admin/dashboard'} />

            {/* Python Dropdown */}
            <li>
              <button
                onClick={togglePythonDropdown}
                className={`w-full flex items-center justify-between px-3 py-3 rounded-lg transition-all ${
                  location.pathname.startsWith('/admin/adminpython')
                    ? 'bg-yellow-50 text-yellow-600 font-semibold'
                    : 'hover:bg-gray-100 hover:text-gray-900 text-gray-600'
                }`}
              >
                <div className="flex items-center">
                  <div className={`mr-3 ${location.pathname.startsWith('/admin/adminpython') ? 'text-yellow-500' : 'text-gray-400'}`}>
                    <FiBarChart2 className="text-lg" />
                  </div>
                  <span className="text-sm">Python</span>
                </div>
                <FiChevronDown className={`transition-transform duration-200 ${isPythonOpen ? 'transform rotate-180' : ''}`} />
              </button>
              <div className={`overflow-hidden transition-all duration-300 ease-in-out ${isPythonOpen ? 'max-h-96' : 'max-h-0'}`}>
                <ul className="pl-8 pt-1 space-y-1">
                  {pythonItems.map((item, index) => (
                    <SidebarItem
                      key={index}
                      icon={item.icon}
                      text={item.text}
                      to={item.to}
                      active={location.pathname === item.to}
                      nested
                    />
                  ))}
                </ul>
              </div>
            </li>

            {/* HTML CSS Dropdown */}
            <li>
              <button
                onClick={toggleHtmlCssDropdown}
                className={`w-full flex items-center justify-between px-3 py-3 rounded-lg transition-all ${
                  location.pathname.startsWith('/admin/Webadmin/HTMLCSS')
                    ? 'bg-yellow-50 text-yellow-600 font-semibold'
                    : 'hover:bg-gray-100 hover:text-gray-900 text-gray-600'
                }`}
              >
                <div className="flex items-center">
                  <div className={`mr-3 ${location.pathname.startsWith('/admin/Webadmin/HTMLCSS') ? 'text-yellow-500' : 'text-gray-400'}`}>
                    <FiMonitor className="text-lg" />
                  </div>
                  <span className="text-sm">HTML CSS</span>
                </div>
                <FiChevronDown className={`transition-transform duration-200 ${isHtmlCssOpen ? 'transform rotate-180' : ''}`} />
              </button>
              <div className={`overflow-hidden transition-all duration-300 ease-in-out ${isHtmlCssOpen ? 'max-h-96' : 'max-h-0'}`}>
                <ul className="pl-8 pt-1 space-y-1">
                  {htmlCssItems.map((item, index) => (
                    <SidebarItem
                      key={index}
                      icon={item.icon}
                      text={item.text}
                      to={item.to}
                      active={location.pathname === item.to}
                      nested
                    />
                  ))}
                </ul>
              </div>
            </li>

            {/* JavaScript Dropdown */}
            <li>
              <button
                onClick={toggleJavaScriptDropdown}
                className={`w-full flex items-center justify-between px-3 py-3 rounded-lg transition-all ${
                  location.pathname.startsWith('/admin/Webadmin/JavaScript')
                    ? 'bg-yellow-50 text-yellow-600 font-semibold'
                    : 'hover:bg-gray-100 hover:text-gray-900 text-gray-600'
                }`}
              >
                <div className="flex items-center">
                  <div className={`mr-3 ${location.pathname.startsWith('/admin/Webadmin/JavaScript') ? 'text-yellow-500' : 'text-gray-400'}`}>
                    <FiCode className="text-lg" />
                  </div>
                  <span className="text-sm">JavaScript</span>
                </div>
                <FiChevronDown className={`transition-transform duration-200 ${isJavaScriptOpen ? 'transform rotate-180' : ''}`} />
              </button>
              <div className={`overflow-hidden transition-all duration-300 ease-in-out ${isJavaScriptOpen ? 'max-h-96' : 'max-h-0'}`}>
                <ul className="pl-8 pt-1 space-y-1">
                  {javaScriptItems.map((item, index) => (
                    <SidebarItem
                      key={index}
                      icon={item.icon}
                      text={item.text}
                      to={item.to}
                      active={location.pathname === item.to}
                      nested
                    />
                  ))}
                </ul>
              </div>
            </li>

            {/* React.js Dropdown */}
            <li>
              <button
                onClick={toggleReactDropdown}
                className={`w-full flex items-center justify-between px-3 py-3 rounded-lg transition-all ${
                  location.pathname.startsWith('/admin/adminreact')
                    ? 'bg-yellow-50 text-yellow-600 font-semibold'
                    : 'hover:bg-gray-100 hover:text-gray-900 text-gray-600'
                }`}
              >
                <div className="flex items-center">
                  <div className={`mr-3 ${location.pathname.startsWith('/admin/adminreact') ? 'text-yellow-500' : 'text-gray-400'}`}>
                    <FiZap className="text-lg" />
                  </div>
                  <span className="text-sm">React.js</span>
                </div>
                <FiChevronDown className={`transition-transform duration-200 ${isReactOpen ? 'transform rotate-180' : ''}`} />
              </button>
              <div className={`overflow-hidden transition-all duration-300 ease-in-out ${isReactOpen ? 'max-h-96' : 'max-h-0'}`}>
                <ul className="pl-8 pt-1 space-y-1">
                  {reactItems.map((item, index) => (
                    <SidebarItem
                      key={index}
                      icon={item.icon}
                      text={item.text}
                      to={item.to}
                      active={location.pathname === item.to}
                      nested
                    />
                  ))}
                </ul>
              </div>
            </li>

            {/* Node.js Dropdown */}
            <li>
              <button
                onClick={toggleNodeDropdown}
                className={`w-full flex items-center justify-between px-3 py-3 rounded-lg transition-all ${
                  location.pathname.startsWith('/admin/adminnode')
                    ? 'bg-yellow-50 text-yellow-600 font-semibold'
                    : 'hover:bg-gray-100 hover:text-gray-900 text-gray-600'
                }`}
              >
                <div className="flex items-center">
                  <div className={`mr-3 ${location.pathname.startsWith('/admin/adminnode') ? 'text-yellow-500' : 'text-gray-400'}`}>
                    <FiServer className="text-lg" />
                  </div>
                  <span className="text-sm">Node.js</span>
                </div>
                <FiChevronDown className={`transition-transform duration-200 ${isNodeOpen ? 'transform rotate-180' : ''}`} />
              </button>
              <div className={`overflow-hidden transition-all duration-300 ease-in-out ${isNodeOpen ? 'max-h-96' : 'max-h-0'}`}>
                <ul className="pl-8 pt-1 space-y-1">
                  {nodeItems.map((item, index) => (
                    <SidebarItem
                      key={index}
                      icon={item.icon}
                      text={item.text}
                      to={item.to}
                      active={location.pathname === item.to}
                      nested
                    />
                  ))}
                </ul>
              </div>
            </li>

            {/* DSA Dropdown */}
            <li>
              <button
                onClick={toggleDSADropdown}
                className={`w-full flex items-center justify-between px-3 py-3 rounded-lg transition-all ${
                  location.pathname.startsWith('/admin/admindsa')
                    ? 'bg-yellow-50 text-yellow-600 font-semibold'
                    : 'hover:bg-gray-100 hover:text-gray-900 text-gray-600'
                }`}
              >
                <div className="flex items-center">
                  <div className={`mr-3 ${location.pathname.startsWith('/admin/admindsa') ? 'text-yellow-500' : 'text-gray-400'}`}>
                    <FiCpu className="text-lg" />
                  </div>
                  <span className="text-sm">DSA</span>
                </div>
                <FiChevronDown className={`transition-transform duration-200 ${isDSAOpen ? 'transform rotate-180' : ''}`} />
              </button>
              <div className={`overflow-hidden transition-all duration-300 ease-in-out ${isDSAOpen ? 'max-h-96' : 'max-h-0'}`}>
                <ul className="pl-8 pt-1 space-y-1">
                  {dsaItems.map((item, index) => (
                    <SidebarItem
                      key={index}
                      icon={item.icon}
                      text={item.text}
                      to={item.to}
                      active={location.pathname === item.to}
                      nested
                    />
                  ))}
                </ul>
              </div>
            </li>

            {/* Data Mining Dropdown */}
            <li>
              <button
                onClick={toggleDataMiningDropdown}
                className={`w-full flex items-center justify-between px-3 py-3 rounded-lg transition-all ${
                  location.pathname.startsWith('/admin/admindatamining')
                    ? 'bg-yellow-50 text-yellow-600 font-semibold'
                    : 'hover:bg-gray-100 hover:text-gray-900 text-gray-600'
                }`}
              >
                <div className="flex items-center">
                  <div className={`mr-3 ${location.pathname.startsWith('/admin/admindatamining') ? 'text-yellow-500' : 'text-gray-400'}`}>
                    <FiDatabase className="text-lg" />
                  </div>
                  <span className="text-sm">Data Mining</span>
                </div>
                <FiChevronDown className={`transition-transform duration-200 ${isDataMiningOpen ? 'transform rotate-180' : ''}`} />
              </button>
              <div className={`overflow-hidden transition-all duration-300 ease-in-out ${isDataMiningOpen ? 'max-h-96' : 'max-h-0'}`}>
                <ul className="pl-8 pt-1 space-y-1">
                  {dataMiningItems.map((item, index) => (
                    <SidebarItem
                      key={index}
                      icon={item.icon}
                      text={item.text}
                      to={item.to}
                      active={location.pathname === item.to}
                      nested
                    />
                  ))}
                </ul>
              </div>
            </li>

            {/* AI & ML Dropdown */}
            <li>
              <button
                onClick={toggleAIMLDropdown}
                className={`w-full flex items-center justify-between px-3 py-3 rounded-lg transition-all ${
                  location.pathname.startsWith('/admin/adminaiml')
                    ? 'bg-yellow-50 text-yellow-600 font-semibold'
                    : 'hover:bg-gray-100 hover:text-gray-900 text-gray-600'
                }`}
              >
                <div className="flex items-center">
                  <div className={`mr-3 ${location.pathname.startsWith('/admin/adminaiml') ? 'text-yellow-500' : 'text-gray-400'}`}>
                    <FiLayers className="text-lg" />
                  </div>
                  <span className="text-sm">AI & ML</span>
                </div>
                <FiChevronDown className={`transition-transform duration-200 ${isAIMLOpen ? 'transform rotate-180' : ''}`} />
              </button>
              <div className={`overflow-hidden transition-all duration-300 ease-in-out ${isAIMLOpen ? 'max-h-96' : 'max-h-0'}`}>
                <ul className="pl-8 pt-1 space-y-1">
                  {aimlItems.map((item, index) => (
                    <SidebarItem
                      key={index}
                      icon={item.icon}
                      text={item.text}
                      to={item.to}
                      active={location.pathname === item.to}
                      nested
                    />
                  ))}
                </ul>
              </div>
            </li>

            {/* Computer Architecture Dropdown */}
            <li>
              <button
                onClick={toggleCADropdown}
                className={`w-full flex items-center justify-between px-3 py-3 rounded-lg transition-all ${
                  location.pathname.startsWith('/admin/admincomputerarchitecture')
                    ? 'bg-yellow-50 text-yellow-600 font-semibold'
                    : 'hover:bg-gray-100 hover:text-gray-900 text-gray-600'
                }`}
              >
                <div className="flex items-center">
                  <div className={`mr-3 ${location.pathname.startsWith('/admin/admincomputerarchitecture') ? 'text-yellow-500' : 'text-gray-400'}`}>
                    <FiHardDrive className="text-lg" />
                  </div>
                  <span className="text-sm">Computer Architecture</span>
                </div>
                <FiChevronDown className={`transition-transform duration-200 ${isCAOpen ? 'transform rotate-180' : ''}`} />
              </button>
              <div className={`overflow-hidden transition-all duration-300 ease-in-out ${isCAOpen ? 'max-h-96' : 'max-h-0'}`}>
                <ul className="pl-8 pt-1 space-y-1">
                  {caItems.map((item, index) => (
                    <SidebarItem
                      key={index}
                      icon={item.icon}
                      text={item.text}
                      to={item.to}
                      active={location.pathname === item.to}
                      nested
                    />
                  ))}
                </ul>
              </div>
            </li>

            {/* MySQL Dropdown */}
            <li>
              <button
                onClick={toggleMySQLDropdown}
                className={`w-full flex items-center justify-between px-3 py-3 rounded-lg transition-all ${
                  location.pathname.startsWith('/admin/adminmysql')
                    ? 'bg-yellow-50 text-yellow-600 font-semibold'
                    : 'hover:bg-gray-100 hover:text-gray-900 text-gray-600'
                }`}
              >
                <div className="flex items-center">
                  <div className={`mr-3 ${location.pathname.startsWith('/admin/adminmysql') ? 'text-yellow-500' : 'text-gray-400'}`}>
                    <FiDatabase className="text-lg" />
                  </div>
                  <span className="text-sm">MySQL</span>
                </div>
                <FiChevronDown className={`transition-transform duration-200 ${isMySQLOpen ? 'transform rotate-180' : ''}`} />
              </button>
              <div className={`overflow-hidden transition-all duration-300 ease-in-out ${isMySQLOpen ? 'max-h-96' : 'max-h-0'}`}>
                <ul className="pl-8 pt-1 space-y-1">
                  {mysqlItems.map((item, index) => (
                    <SidebarItem
                      key={index}
                      icon={item.icon}
                      text={item.text}
                      to={item.to}
                      active={location.pathname === item.to}
                      nested
                    />
                  ))}
                </ul>
              </div>
            </li>

            <div className="border-t border-gray-100 my-2"></div>
            <SidebarItem icon={<FiPhoneCall className="text-lg" />} text="Request a Callback" to="/admin/callbackrequests" active={location.pathname === '/admin/callbackrequests'} />
            <SidebarItem icon={<FiSettings className="text-lg" />} text="Settings" to="/Settings" active={location.pathname === '/Settings'} />
          </ul>
        </nav>

        <div className="p-4 border-t border-gray-100">
          <button
            onClick={handleLogout}
            className="w-full flex items-center justify-between text-gray-500 hover:text-red-500 px-3 py-2 rounded-lg hover:bg-red-50 transition-colors group"
          >
            <div className="flex items-center">
              <FiLogOut className="mr-3 text-lg group-hover:rotate-180 transition-transform" />
              <span className="font-medium">Logout</span>
            </div>
            <span className="text-xs opacity-70 group-hover:opacity-100">⌘L</span>
          </button>
        </div>
      </div>
    </>
  );
}

function SidebarItem({ icon, text, to, active, nested = false }) {
  return (
    <li>
      <Link
        to={to}
        className={`flex items-center px-3 py-3 rounded-lg transition-all ${active
            ? 'bg-yellow-100 text-black font-semibold shadow-inner'
            : 'hover:bg-gray-100 hover:text-gray-900 text-gray-600'
          } ${nested ? 'pl-8 text-sm' : ''}`}
      >
        <div className={`mr-3 ${active ? 'text-yellow-500' : 'text-gray-400'}`}>
          {icon}
        </div>
        <span>{text}</span>
        {active && !nested && (
          <div className="ml-auto w-1 h-6 bg-yellow-500 rounded-full"></div>
        )}
      </Link>
    </li>
  );
}