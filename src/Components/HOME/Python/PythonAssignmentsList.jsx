import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Bookmark, ChevronLeft, CheckCircle2 } from 'lucide-react';

export default function PythonAssignmentsList() {
  const navigate = useNavigate();

  const assignments = [
    {
      id: "substring",
      title: "Substring",
      difficulty: "easy",
      multiplier: "2x",
      score: "20/20",
      tags: ["String", "Python String"],
      solves: 1597,
      solvePercentage: "88%"
    },
    {
      id: "make-strings-equal",
      title: "Make Strings Equal (Contest)",
      difficulty: "easy",
      multiplier: "2x",
      score: "20/20",
      tags: ["String", "Python String", "General Maths"],
      solves: 615,
      solvePercentage: "85%"
    }
  ];

  return (
    <div className="min-h-screen bg-white">
      {/* Header */}
      <div className="bg-white border-b border-gray-100 px-8 py-10 mt-16">
        <div className="max-w-6xl mx-auto">
          <button 
            onClick={() => navigate('/python')}
            className="flex items-center text-sm font-medium text-gray-500 hover:text-gray-900 mb-6 transition-colors"
          >
            <ChevronLeft className="w-5 h-5 mr-1" />
            Back to Python
          </button>
          
          <h1 className="text-3xl font-bold text-gray-900 mb-2">FOP Revision Assignment</h1>
          <p className="text-gray-500 text-sm">Release - 15 Dec 2023 • Deadline - 23 Dec 2023 6:00 PM</p>
        </div>
      </div>

      {/* List */}
      <div className="max-w-6xl mx-auto px-8 py-8">
        <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
          {assignments.map((assignment, index) => (
            <div 
              key={assignment.id}
              onClick={() => navigate(`/python/assignments/${assignment.id}`)}
              className={`flex items-center justify-between p-5 hover:bg-gray-50 cursor-pointer transition-colors ${
                index !== assignments.length - 1 ? 'border-b border-gray-100' : ''
              }`}
            >
              <div className="flex items-center gap-4 flex-1">
                <CheckCircle2 className="w-5 h-5 text-emerald-500 flex-shrink-0" />
                <span className="font-medium text-gray-900 hover:text-blue-600 transition-colors">
                  {assignment.title}
                </span>
              </div>
              
              <div className="flex items-center gap-6 justify-end flex-1">
                <span className="px-2 py-1 bg-emerald-100 text-emerald-700 text-xs font-bold rounded uppercase tracking-wider">
                  {assignment.difficulty}
                </span>
                
                <div className="flex items-center gap-2">
                  <span className="px-2 py-1 bg-orange-100 text-orange-700 text-xs font-bold rounded">
                    {assignment.multiplier}
                  </span>
                  <span className="flex items-center text-sm font-bold text-gray-700">
                    <span className="w-4 h-4 bg-yellow-400 rounded-full flex items-center justify-center text-[10px] text-white mr-1 shadow-sm">P</span>
                    {assignment.score}
                  </span>
                </div>
                
                <div className="flex gap-2">
                  {assignment.tags.map(tag => (
                    <span key={tag} className="px-2 py-1 bg-gray-100 text-gray-600 text-xs rounded">
                      {tag}
                    </span>
                  ))}
                </div>
                
                <div className="text-sm text-gray-500 w-24 text-right">
                  <span className="font-medium text-gray-900">{assignment.solves}</span> ({assignment.solvePercentage})
                </div>
                
                <button className="text-gray-400 hover:text-gray-600">
                  <Bookmark className="w-5 h-5" />
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
