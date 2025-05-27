import React from 'react';

const RecommendedCourses = () => {
  const courses = [
    {
      title: "Analyze Data with SQL",
      desc: "Learn to analyze data with SQL and prepare for technical interviews.",
      hours: "17 hours",
      courses: "9 Courses",
      icon: "📊",
      color: "bg-blue-100 text-blue-600"
    },
    {
      title: "Design Databases With PostgreSQL",
      desc: "Learn how to query SQL databases and design relational databases.",
      hours: "13 hours",
      courses: "5 Courses",
      icon: "🗃️",
      color: "bg-purple-100 text-purple-600"
    },
    {
      title: "Data Engineer",
      desc: "A data engineer builds the pipelines to connect data input to analysis.",
      hours: "90 hours",
      courses: "17 Courses",
      icon: "⚙️",
      color: "bg-green-100 text-green-600"
    }
  ];

  return (
    <div className="space-y-5">
      <h2 className="text-2xl font-bold text-[#5a2d0c]">Recommended for you</h2>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
        {courses.map((rec, idx) => (
          <div 
            key={idx} 
            className="bg-white p-5 shadow-md rounded-2xl space-y-3 hover:shadow-lg transition-shadow duration-300 border border-white group"
          >
            <div className={`w-12 h-12 rounded-xl ${rec.color} flex items-center justify-center text-xl mb-3`}>
              {rec.icon}
            </div>
            <h3 className="font-semibold text-lg text-[#5a2d0c]">{rec.title}</h3>
            <p className="text-sm text-gray-600">{rec.desc}</p>
            <div className="flex justify-between items-center pt-2">
              <p className="text-xs text-gray-500">{rec.courses} • With Certificate</p>
              <p className="text-xs text-gray-500">⏱ {rec.hours}</p>
            </div>
            <button className="mt-3 w-full py-2 rounded-lg border border-orange-200 text-orange-600 font-medium hover:bg-orange-50 transition-colors duration-200">
              Explore
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default RecommendedCourses;