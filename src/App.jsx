import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navber from "./Components/Navber";
import Home from "./Components/HOME/Home";
import Learning from "./Components/HOME/Learning"; 
import Events from "./Components/HOME/Events";
import Project from "./Components/HOME/Project";
import WebDevelopment from "./Components/HOME/WebDevelopment";
import Dsa from "./Components/HOME/Dsa";
import LeetCode from "./Components/LeetCode";
import Codeforces from "./Components/Codeforces";
import HTMLCSSCourse from "./Components/HOME/HTMLCSSCourse";

export default function App() {
  return (
    <Router>
      <Navber />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/Deshboard" element={<Home />} />
        <Route path="/learning" element={<Learning />} />
        <Route path="/events" element={<Events/>} />
        <Route path="/projects" element={<Project />} />
        <Route path="/web-development" element={<WebDevelopment />} />
        <Route path="/Dsa" element={<Dsa />} />
        <Route path="/LeetCode" element={<LeetCode />} />
        <Route path="/Codeforces" element={< Codeforces/>} />
        <Route path="/HTMLCSSCourse" element={<HTMLCSSCourse />} />
        
      </Routes>
    </Router>
  );
}

