import React, { useState } from "react";
import { BrowserRouter as Router, Routes, Route, Navigate, useLocation } from "react-router-dom";
import Navber from "./Components/Navber";
import IntroLoader from "./Components/HOME/IntroLoader";
import Home from "./Components/HOME/Home";
import Project from "./Components/HOME/Project";
import WebDevelopment from "./Components/HOME/WebDevelopment";
import Dsa from "./Components/HOME/Dsa";
// import LeetCode from "./Components/LeetCode";
import Codeforces from "./Components/Codeforces";
import HTMLCSSCourse from "./Components/HOME/HTMLCSSCourse"
import CoursePage from "./Components/HOME/CoursePage";
import Python from "./Components/HOME/Python/Pythons";
import WebCourse from "./Components/HOME/WebDevelopment/WebCourse";
import WebLecture from "./Components/HOME/WebDevelopment/WebLecture";
import WebAssessment from "./Components/HOME/WebDevelopment/WebAssessment";

import DsaLecture from "./Components/HOME/DsaLecture";
import DsaAssessment from "./Components/HOME/DsaAssessment";
import DsaSheet from "./Components/HOME/DsaSheet";
import Dataminings from "./Components/HOME/Datamining/Dataminings"
import Aimls from "./Components/HOME/AIML/Aimls";
import ComputerArt from "./Components/HOME/ComputerArchitectures/computerArt";


import Mysql from "./Components/Mysqls/Mysql";
import MysqlLecture from "./Components/Mysqls/MysqlLecture";
import MysqlAssessment from "./Components/Mysqls/MysqlAssessment";

import PythonLecture from "./Components/HOME/Python/PythonLecture";
import PythonAssessment from "./Components/HOME/Python/PythonAssessment";
import PythonAssignmentsList from "./Components/HOME/Python/PythonAssignmentsList";
import PythonCodingInterface from "./Components/HOME/Python/PythonCodingInterface";

import DataMiningLecture from "./Components/HOME/Datamining/DataMiningLecture";
import DataMiningAssessment from "./Components/HOME/Datamining/DataMiningAssessment";


import AimlLecture from "./Components/HOME/AIML/AimlLecture";
import AimlAssessment from "./Components/HOME/AIML/AimlAssessment";

import ComputerArtLecture from "./Components/HOME/ComputerArchitectures/ComputerArtLecture";
import ComputerArtAssessment from "./Components/HOME/ComputerArchitectures/ComputerArtAssessment";








import Contact from "./Components/HOME/Contact";
import AdminLogin from "./Components/Admin/AdminLogin";
import Dashboard from "./Components/Admin/Dashboard";
import AdminLayout from "./Components/Admin/AdminLayout";
import { AdminProvider, useAdmin } from "./Components/context/AdminContext";
import Webadmin from "./Components/Admin/Webadmin";
import HTMLCSS from "./Components/Admin/HTMLCSS";
import HTMLCSSLab from "./Components/Admin/HTMLCSSLab";
import AdminJavaScriptLecture from "./Components/Admin/AdminJavaScriptLecture";
import AdminJavaScriptLab from "./Components/Admin/AdminJavaScriptLab";
import AdminReactLecture from "./Components/Admin/AdminReactLecture";
import AdminReactLab from "./Components/Admin/AdminReactLab";
import AdminNodeLecture from "./Components/Admin/AdminNodeLecture";
import AdminNodeLab from "./Components/Admin/AdminNodeLab";
import AdminDSALecture from "./Components/Admin/AdminDSALecture";
import AdminDSAAssessment from "./Components/Admin/AdminDSAAssessment";
import AdminPythonLecture from "./Components/Admin/AdminPythonLecture";
import AdminPythonLab from "./Components/Admin/AdminPythonLab";
import AdminDataMiningLecture from "./Components/Admin/AdminDataMiningLecture";
import AdminDataMiningLab from "./Components/Admin/AdminDataMiningLab";
import AdminAIMLLecture from "./Components/Admin/AdminAIMLLecture";
import AdminAIMLLab from "./Components/Admin/AdminAIMLLab";
import AdminComputerArchitectureLecture from "./Components/Admin/AdminComputerArchitectureLecture";
import AdminComputerArchitectureLab from "./Components/Admin/AdminComputerArchitectureLab";
import AdminMySQLLecture from "./Components/Admin/AdminMySQLLecture";
import AdminMySQLLab from "./Components/Admin/AdminMySQLLab";
import AdminCallbackRequests from "./Components/Admin/AdminCallbackRequests";

const ProtectedRoute = ({ children }) => {
  const { isAdminAuthenticated, loading } = useAdmin();
  const location = useLocation();

  if (loading) {
    return <div className="min-h-screen flex items-center justify-center bg-[#0B1220]"><div className="text-white">Loading...</div></div>;
  }

  if (!isAdminAuthenticated) {
    return <Navigate to="/admin" state={{ from: location }} replace />;
  }

  return children;
};

const AppContent = () => {
  const [isLoading, setIsLoading] = useState(true);
  const location = useLocation();
  const isAdminRoute = location.pathname.startsWith("/admin") || location.pathname.startsWith("/Python/");
  // Hide navbar on coding interface
  const isCodingInterface = /^\/python\/assignments\/[^/]+/.test(location.pathname);
  const isHomeRoute = location.pathname === "/" || location.pathname === "/Deshboard";
  // Hide navbar on learning/player pages (lecture or assessment)
  const isLearningRoute = location.pathname.toLowerCase().includes("/lecture") || location.pathname.toLowerCase().includes("/assessment");

  return (
    <>
      {isHomeRoute && <IntroLoader onComplete={() => setIsLoading(false)} />}
      {!isAdminRoute && !isCodingInterface && !isLearningRoute && (!isHomeRoute || !isLoading) && <Navber />}
      <Routes>
        <Route path="/" element={<Home isLoading={isLoading} />} />
        <Route path="/Deshboard" element={<Home isLoading={isLoading} />} />
        <Route path="/projects" element={<Project />} />
        <Route path="/web-development" element={<WebDevelopment />} />
        <Route path="/web-development/:topicId" element={<WebCourse />} />
        <Route path="/web-development/:topicId/lecture" element={<WebLecture />} />
        <Route path="/web-development/:topicId/assessment" element={<WebAssessment />} />

        <Route path="/Dsa" element={<Dsa />} />
        <Route path="/dsa/lecture" element={<DsaLecture />} />
        <Route path="/dsa/assessment" element={<DsaAssessment />} />
        <Route path="/dsa/sheet" element={<DsaSheet />} />
        {/* <Route path="/LeetCode" element={<LeetCode />} />
        <Route path="/leetcode/:id" element={<ProblemDetail />} /> */}
        <Route path="/Codeforces" element={<Codeforces />} />
        <Route path="/html-css-course" element={<HTMLCSSCourse />} />
        {/* Public HTML CSS routes — no login required */}
        <Route path="/HTMLCSS/HTMLCSSLecture" element={<HTMLCSS />} />
        <Route path="/HTMLCSS/HTMLCSSLab" element={<HTMLCSSLab />} />
        {/* Public JavaScript routes — no login required */}
        <Route path="/JavaScript/JavaScriptLecture" element={<AdminJavaScriptLecture />} />
        <Route path="/JavaScript/JavaScriptLab" element={<AdminJavaScriptLab />} />
        <Route path="/course/:id" element={<CoursePage />} />
        <Route path="/python" element={<Python />} />
        <Route path="/python/lecture" element={<PythonLecture />} />
        <Route path="/python/assessment" element={<PythonAssessment />} />
        <Route path="/python/assignments" element={<PythonAssignmentsList />} />
        <Route path="/python/assignments/:problemId" element={<PythonCodingInterface />} />
        <Route path="/Datamining" element={<Dataminings />} />
        <Route path="/AIML" element={<Aimls />} />
        <Route path="/computerarchitecture" element={<ComputerArt />} />
        <Route path="/mysql" element={<Mysql />} />
        <Route path="/mysql/lecture" element={<MysqlLecture />} />
        <Route path="/mysql/assessment" element={<MysqlAssessment />} />



        <Route path="/Contact" element={<Contact />} />

        <Route path="/datamining/lecture" element={<DataMiningLecture />} />
        <Route path="/datamining/assessment" element={<DataMiningAssessment />} />

        <Route path="/aiml/lecture" element={<AimlLecture />} />
        <Route path="/aiml/assessment" element={<AimlAssessment />} />

        <Route path="/computer/lecture" element={<ComputerArtLecture />} />
        <Route path="/computer/assessment" element={<ComputerArtAssessment />} />











        <Route path="/admin" element={<AdminLogin />} />
        <Route
          path="/admin/dashboard"
          element={
            <ProtectedRoute>
              <AdminLayout>
                <Dashboard />
              </AdminLayout>
            </ProtectedRoute>
          }
        />
        <Route
          path="/admin/Webadmin"
          element={
            <ProtectedRoute>
              <AdminLayout>
                <Webadmin />
              </AdminLayout>
            </ProtectedRoute>
          }
        />
        {/* Admin HTML CSS management routes — login required */}
        <Route
          path="/admin/Webadmin/HTMLCSS/Lecture"
          element={
            <ProtectedRoute>
              <AdminLayout>
                <HTMLCSS />
              </AdminLayout>
            </ProtectedRoute>
          }
        />
        <Route
          path="/admin/Webadmin/HTMLCSS/Lab"
          element={
            <ProtectedRoute>
              <AdminLayout>
                <HTMLCSSLab />
              </AdminLayout>
            </ProtectedRoute>
          }
        />
        {/* Admin JavaScript management routes — login required */}
        <Route
          path="/admin/Webadmin/JavaScript/Lecture"
          element={
            <ProtectedRoute>
              <AdminLayout>
                <AdminJavaScriptLecture />
              </AdminLayout>
            </ProtectedRoute>
          }
        />
        <Route
          path="/admin/Webadmin/JavaScript/Lab"
          element={
            <ProtectedRoute>
              <AdminLayout>
                <AdminJavaScriptLab />
              </AdminLayout>
            </ProtectedRoute>
          }
        />
        {/* Admin React.js management routes — login required */}
        <Route
          path="/admin/adminreactlecture"
          element={
            <ProtectedRoute>
              <AdminLayout>
                <AdminReactLecture />
              </AdminLayout>
            </ProtectedRoute>
          }
        />
        <Route
          path="/admin/adminreactlab"
          element={
            <ProtectedRoute>
              <AdminLayout>
                <AdminReactLab />
              </AdminLayout>
            </ProtectedRoute>
          }
        />
        {/* Admin Node.js management routes — login required */}
        <Route
          path="/admin/adminnodelecture"
          element={
            <ProtectedRoute>
              <AdminLayout>
                <AdminNodeLecture />
              </AdminLayout>
            </ProtectedRoute>
          }
        />
        <Route
          path="/admin/adminnodelab"
          element={
            <ProtectedRoute>
              <AdminLayout>
                <AdminNodeLab />
              </AdminLayout>
            </ProtectedRoute>
          }
        />
        {/* Admin DSA management routes — login required */}
        <Route
          path="/admin/admindsalecture"
          element={
            <ProtectedRoute>
              <AdminLayout>
                <AdminDSALecture />
              </AdminLayout>
            </ProtectedRoute>
          }
        />
        <Route
          path="/admin/admindsaassessment"
          element={
            <ProtectedRoute>
              <AdminLayout>
                <AdminDSAAssessment />
              </AdminLayout>
            </ProtectedRoute>
          }
        />
        {/* Admin Python management routes — login required */}
        <Route
          path="/admin/adminpythonlecture"
          element={
            <ProtectedRoute>
              <AdminLayout>
                <AdminPythonLecture />
              </AdminLayout>
            </ProtectedRoute>
          }
        />
        <Route
          path="/admin/adminpythonlab"
          element={
            <ProtectedRoute>
              <AdminLayout>
                <AdminPythonLab />
              </AdminLayout>
            </ProtectedRoute>
          }
        />
        {/* Admin Data Mining management routes — login required */}
        <Route
          path="/admin/admindatamininglecture"
          element={
            <ProtectedRoute>
              <AdminLayout>
                <AdminDataMiningLecture />
              </AdminLayout>
            </ProtectedRoute>
          }
        />
        <Route
          path="/admin/admindatamininglab"
          element={
            <ProtectedRoute>
              <AdminLayout>
                <AdminDataMiningLab />
              </AdminLayout>
            </ProtectedRoute>
          }
        />
        {/* Admin AI & ML management routes — login required */}
        <Route
          path="/admin/adminaimllecture"
          element={
            <ProtectedRoute>
              <AdminLayout>
                <AdminAIMLLecture />
              </AdminLayout>
            </ProtectedRoute>
          }
        />
        <Route
          path="/admin/adminaimllab"
          element={
            <ProtectedRoute>
              <AdminLayout>
                <AdminAIMLLab />
              </AdminLayout>
            </ProtectedRoute>
          }
        />
        {/* Admin Computer Architecture management routes — login required */}
        <Route
          path="/admin/admincomputerarchitecturelecture"
          element={
            <ProtectedRoute>
              <AdminLayout>
                <AdminComputerArchitectureLecture />
              </AdminLayout>
            </ProtectedRoute>
          }
        />
        <Route
          path="/admin/admincomputerarchitecturelab"
          element={
            <ProtectedRoute>
              <AdminLayout>
                <AdminComputerArchitectureLab />
              </AdminLayout>
            </ProtectedRoute>
          }
        />
        {/* Admin MySQL management routes — login required */}
        <Route
          path="/admin/adminmysqllecture"
          element={
            <ProtectedRoute>
              <AdminLayout>
                <AdminMySQLLecture />
              </AdminLayout>
            </ProtectedRoute>
          }
        />
        <Route
          path="/admin/adminmysqllab"
          element={
            <ProtectedRoute>
              <AdminLayout>
                <AdminMySQLLab />
              </AdminLayout>
            </ProtectedRoute>
          }
        />
        {/* Admin Callback Requests — login required */}
        <Route
          path="/admin/callbackrequests"
          element={
            <ProtectedRoute>
              <AdminLayout>
                <AdminCallbackRequests />
              </AdminLayout>
            </ProtectedRoute>
          }
        />

      </Routes>
    </>
  );
};

export default function App() {
  return (
    <Router>
      <AdminProvider>
        <AppContent />
      </AdminProvider>
    </Router>
  );
}