import React, { useState } from "react";
import { Link } from "react-router-dom";
import { ChevronDown, ChevronRight, Youtube, FileText, Code, Star, CheckCircle2, Circle, ChevronLeft, Search, Check } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

const dsaSheetData = [
  {
    id: "step-1",
    title: "Learn the basics",
    total: 3,
    completed: 0,
    subCategories: [
      {
        id: "step-1-1",
        title: "Things to Know in C++/Java/Python or any language",
        total: 3,
        completed: 0,
        problems: [
          { id: "p1", title: "User Input / Output", article: "#", youtube: "#", practice: "https://leetcode.com/problems/two-sum/", difficulty: "Easy", solved: false },
          { id: "p2", title: "Data Types", article: "#", youtube: "#", practice: "https://leetcode.com/problems/palindrome-number/", difficulty: "Easy", solved: false },
          { id: "p3", title: "If Else statements", article: "#", youtube: "#", practice: "https://leetcode.com/problems/roman-to-integer/", difficulty: "Easy", solved: false },
        ]
      }
    ]
  },
  {
    id: "step-2",
    title: "Build-up Logical Thinking",
    total: 2,
    completed: 0,
    subCategories: [
      {
        id: "step-2-1",
        title: "Patterns",
        total: 2,
        completed: 0,
        problems: [
          { id: "p4", title: "Pattern 1: Rectangular Star Pattern", article: "#", youtube: "#", practice: "https://leetcode.com/problems/spiral-matrix/", difficulty: "Easy", solved: false },
          { id: "p5", title: "Pattern 2: Right-Angled Triangle Pattern", article: "#", youtube: "#", practice: "https://leetcode.com/problems/pascals-triangle/", difficulty: "Easy", solved: false },
        ]
      }
    ]
  },
  {
    id: "step-3",
    title: "Solve Problems on Arrays [Easy -> Medium -> Hard]",
    total: 3,
    completed: 0,
    subCategories: [
      {
        id: "step-3-1",
        title: "Easy",
        total: 3,
        completed: 0,
        problems: [
          { id: "p6", title: "Largest Element in an Array", article: "#", youtube: "#", practice: "https://leetcode.com/problems/kth-largest-element-in-an-array/", difficulty: "Easy", solved: false },
          { id: "p7", title: "Second Largest Element in an Array", article: "#", youtube: "#", practice: "https://leetcode.com/problems/third-maximum-number/", difficulty: "Medium", solved: false },
          { id: "p8", title: "Check if the array is sorted", article: "#", youtube: "#", practice: "https://leetcode.com/problems/check-if-array-is-sorted-and-rotated/", difficulty: "Easy", solved: false },
        ]
      }
    ]
  }
];

export default function DsaSheet() {
  const [expandedSteps, setExpandedSteps] = useState(["step-1"]);
  const [expandedSubSteps, setExpandedSubSteps] = useState(["step-1-1"]);
  const [solvedProblems, setSolvedProblems] = useState([]);

  const toggleStep = (id) => {
    setExpandedSteps(prev => 
      prev.includes(id) ? prev.filter(stepId => stepId !== id) : [...prev, id]
    );
  };

  const toggleSubStep = (id) => {
    setExpandedSubSteps(prev => 
      prev.includes(id) ? prev.filter(subId => subId !== id) : [...prev, id]
    );
  };

  const toggleSolved = (id) => {
    setSolvedProblems(prev => 
      prev.includes(id) ? prev.filter(pId => pId !== id) : [...prev, id]
    );
  };

  return (
    <div className="min-h-screen bg-[#fafafa] pt-24 pb-12 font-sans relative overflow-hidden">
      {/* Decorative background elements matching DSA page */}
      <div className="absolute top-[-10%] left-[-10%] w-96 h-96 bg-red-100 rounded-full mix-blend-multiply filter blur-3xl opacity-30 animate-blob"></div>
      <div className="absolute top-[20%] right-[-10%] w-96 h-96 bg-blue-100 rounded-full mix-blend-multiply filter blur-3xl opacity-30 animate-blob animation-delay-2000"></div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Header Section */}
        <div className="mb-8">
          <Link
            to="/dsa"
            className="inline-flex items-center text-sm font-medium text-gray-500 hover:text-red-600 transition-colors mb-4"
          >
            <ChevronLeft className="w-4 h-4 mr-1" />
            Back to DSA Home
          </Link>
          
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
            <div>
              <h1 className="text-3xl font-extrabold text-gray-900 tracking-tight">
                A2Z DSA Sheet
              </h1>
              <p className="text-gray-500 mt-1">Learn DSA from A to Z for free in a well-organized manner.</p>
            </div>
            
            <div className="flex items-center gap-4 bg-white p-3 rounded-xl shadow-sm border border-gray-200">
              <div className="w-12 h-12 rounded-full border-4 border-red-100 flex items-center justify-center">
                <span className="text-red-600 font-bold text-sm">0%</span>
              </div>
              <div>
                <p className="text-sm font-bold text-gray-800">Overall Progress</p>
                <p className="text-xs text-gray-500">{solvedProblems.length} / 454</p>
              </div>
              <div className="flex gap-3 ml-4 text-xs font-semibold">
                <span className="text-green-600 flex items-center"><Circle className="w-2 h-2 fill-green-600 mr-1" /> Easy</span>
                <span className="text-yellow-600 flex items-center"><Circle className="w-2 h-2 fill-yellow-600 mr-1" /> Med</span>
                <span className="text-red-600 flex items-center"><Circle className="w-2 h-2 fill-red-600 mr-1" /> Hard</span>
              </div>
            </div>
          </div>
        </div>

        {/* Filters Bar */}
        <div className="flex items-center justify-between bg-white p-2 rounded-lg shadow-sm border border-gray-200 mb-6">
          <div className="flex gap-2">
            <button className="px-4 py-2 bg-gray-900 text-white rounded-md text-sm font-medium">All Problems</button>
            <button className="px-4 py-2 text-gray-600 hover:bg-gray-100 rounded-md text-sm font-medium transition-colors">Revision</button>
          </div>
          <div className="flex items-center gap-3">
            <div className="relative">
              <Search className="w-4 h-4 absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
              <input type="text" placeholder="Search problems..." className="pl-9 pr-4 py-2 border border-gray-200 rounded-md text-sm outline-none focus:border-red-500 transition-colors w-64" />
            </div>
          </div>
        </div>

        {/* Accordion List */}
        <div className="bg-white rounded-xl shadow-[0_4px_20px_-4px_rgba(0,0,0,0.05)] border border-gray-200 overflow-hidden">
          {dsaSheetData.map((step) => {
            const isStepExpanded = expandedSteps.includes(step.id);
            return (
              <div key={step.id} className="border-b border-gray-100 last:border-0">
                
                {/* Step Header */}
                <div 
                  className="flex items-center justify-between p-4 cursor-pointer hover:bg-gray-50 transition-colors bg-white"
                  onClick={() => toggleStep(step.id)}
                >
                  <div className="flex items-center gap-3">
                    <div className="p-1 rounded-md bg-gray-100">
                      {isStepExpanded ? <ChevronDown className="w-5 h-5 text-gray-600" /> : <ChevronRight className="w-5 h-5 text-gray-600" />}
                    </div>
                    <h2 className="text-lg font-bold text-gray-800">{step.title}</h2>
                  </div>
                  <div className="text-sm font-semibold text-gray-500 bg-gray-100 px-3 py-1 rounded-full">
                    {step.completed} / {step.total}
                  </div>
                </div>
                
                <AnimatePresence>
                  {isStepExpanded && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      className="overflow-hidden bg-[#fafafa]"
                    >
                      {step.subCategories.map((sub) => {
                        const isSubExpanded = expandedSubSteps.includes(sub.id);
                        return (
                          <div key={sub.id} className="border-t border-gray-200/60">
                            
                            {/* Subcategory Header */}
                            <div 
                              className="flex items-center justify-between py-3 px-8 cursor-pointer hover:bg-gray-100 transition-colors"
                              onClick={() => toggleSubStep(sub.id)}
                            >
                              <div className="flex items-center gap-3">
                                {isSubExpanded ? <ChevronDown className="w-4 h-4 text-gray-500" /> : <ChevronRight className="w-4 h-4 text-gray-500" />}
                                <h3 className="text-sm font-semibold text-gray-700">{sub.title}</h3>
                              </div>
                              <div className="text-xs font-medium text-gray-400">
                                {sub.completed} / {sub.total}
                              </div>
                            </div>
                            
                            <AnimatePresence>
                              {isSubExpanded && (
                                <motion.div
                                  initial={{ height: 0, opacity: 0 }}
                                  animate={{ height: "auto", opacity: 1 }}
                                  exit={{ height: 0, opacity: 0 }}
                                  className="overflow-hidden"
                                >
                                  <div className="overflow-x-auto pb-4">
                                    <div className="min-w-[800px]">
                                      {/* Table Header */}
                                      <div className="grid grid-cols-12 gap-4 py-3 px-8 bg-white border-y border-gray-200 text-xs font-bold text-gray-500 uppercase tracking-wider text-center shadow-sm">
                                         <div className="col-span-1">Status</div>
                                         <div className="col-span-4 text-left">Problem</div>
                                         <div className="col-span-1">Article</div>
                                         <div className="col-span-1">Resource</div>
                                         <div className="col-span-2">Practice</div>
                                         <div className="col-span-1">Note</div>
                                         <div className="col-span-1">Revision</div>
                                         <div className="col-span-1">Difficulty</div>
                                      </div>
                                      
                                      {/* Table Body */}
                                      <div className="bg-white">
                                        {sub.problems.map((prob) => {
                                          const isSolved = solvedProblems.includes(prob.id);
                                          return (
                                          <div key={prob.id} className="grid grid-cols-12 gap-4 py-4 px-8 border-b border-gray-100 hover:bg-red-50/30 transition-colors text-sm items-center text-center">
                                            
                                            <div className="col-span-1 flex justify-center">
                                              <button onClick={() => toggleSolved(prob.id)} className="focus:outline-none transform transition-transform hover:scale-110">
                                                {isSolved ? (
                                                  <CheckCircle2 className="w-6 h-6 text-green-500" />
                                                ) : (
                                                  <div className="w-5 h-5 rounded border-2 border-gray-300 hover:border-red-500 transition-colors bg-white"></div>
                                                )}
                                              </button>
                                            </div>
                                            
                                            <div className="col-span-4 text-left font-semibold text-gray-800">
                                              {prob.title}
                                            </div>
                                            
                                            <div className="col-span-1 flex justify-center">
                                              <a href={prob.article} target="_blank" rel="noopener noreferrer" className="p-2 rounded-md hover:bg-orange-50 text-[#ff8c00] transition-colors">
                                                <FileText className="w-5 h-5" />
                                              </a>
                                            </div>
                                            
                                            <div className="col-span-1 flex justify-center">
                                              <a href={prob.youtube} target="_blank" rel="noopener noreferrer" className="p-2 rounded-md hover:bg-red-50 text-red-600 transition-colors">
                                                <Youtube className="w-5 h-5" />
                                              </a>
                                            </div>
                                            
                                            <div className="col-span-2 flex justify-center">
                                              <a href={prob.practice} target="_blank" rel="noopener noreferrer" className="flex items-center gap-1 px-3 py-1.5 rounded-md bg-gray-50 text-gray-700 hover:bg-gray-100 border border-gray-200 transition-colors text-xs font-semibold shadow-sm">
                                                <Code className="w-4 h-4 text-blue-600" /> Solve
                                              </a>
                                            </div>
                                            
                                            <div className="col-span-1 flex justify-center">
                                              <button className="w-8 h-8 rounded-full bg-gray-50 flex items-center justify-center border border-gray-200 hover:bg-gray-100 transition-colors">
                                                 <span className="text-gray-500 font-bold">+</span>
                                              </button>
                                            </div>
                                            
                                            <div className="col-span-1 flex justify-center">
                                              <button className="p-2 rounded-full hover:bg-yellow-50 transition-colors group">
                                                <Star className="w-5 h-5 text-gray-300 group-hover:text-yellow-400" />
                                              </button>
                                            </div>
                                            
                                            <div className="col-span-1 flex justify-center">
                                              <span className={`px-2 py-1 rounded text-xs font-bold w-16 text-center shadow-sm border ${
                                                prob.difficulty === 'Easy' ? 'bg-green-50 text-green-700 border-green-200' : 
                                                prob.difficulty === 'Medium' ? 'bg-yellow-50 text-yellow-700 border-yellow-200' : 
                                                'bg-red-50 text-red-700 border-red-200'
                                              }`}>
                                                {prob.difficulty}
                                              </span>
                                            </div>
                                            
                                          </div>
                                        )})}
                                      </div>
                                    </div>
                                  </div>
                                </motion.div>
                              )}
                            </AnimatePresence>
                          </div>
                        );
                      })}
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            );
          })}
        </div>

      </div>
    </div>
  );
}
