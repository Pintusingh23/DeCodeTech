import { PlayCircle, Clock, BookOpen } from "lucide-react";

const dsaCourses = [
  {
    title: "Data Structures Fundamentals",
    level: "Beginner",
    lessons: 42,
    duration: "12 hours",
  },
  {
    title: "Algorithms Masterclass",
    level: "Intermediate",
    lessons: 38,
    duration: "15 hours",
  },
  {
    title: "Advanced Graph Algorithms",
    level: "Advanced",
    lessons: 50,
    duration: "20 hours",
  },
  {
    title: "Dynamic Programming Techniques",
    level: "Intermediate",
    lessons: 40,
    duration: "18 hours",
  },
  {
    title: "Competitive Programming",
    level: "Advanced",
    lessons: 55,
    duration: "24 hours",
  },
  {
    title: "System Design Basics",
    level: "Advanced",
    lessons: 48,
    duration: "22 hours",
  },
];

export default function Dsa() {
  return (
    <div className="container mx-auto px-4 py-8 mt-16">
      {/* Hero Section */}
      <section className="text-center py-16">
        <h1 className="text-4xl font-bold">Data Structures & Algorithms</h1>
        <p className="text-gray-600 mt-4 max-w-2xl mx-auto">
          Master the core concepts of Data Structures and Algorithms to become a problem-solving expert.
        </p>
      </section>

      {/* Course Categories Tabs */}
      <div className="flex justify-center space-x-4 mb-8">
        <button className="bg-black text-white px-4 py-2 rounded-md font-semibold">All Courses</button>
        <button className="border border-gray-400 px-4 py-2 rounded-md font-semibold">Beginner</button>
        <button className="border border-gray-400 px-4 py-2 rounded-md font-semibold">Intermediate</button>
        <button className="border border-gray-400 px-4 py-2 rounded-md font-semibold">Advanced</button>
      </div>

      {/* DSA Courses Section */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {dsaCourses.map((course, index) => (
          <div key={index} className="p-4 shadow-md border border-gray-200 rounded-lg">
            <div className="h-40 bg-gray-100 rounded-lg flex items-center justify-center">
              <PlayCircle className="w-12 h-12 text-gray-500" />
            </div>
            <p className="text-sm text-gray-500 mt-4">{course.level}</p>
            <h3 className="text-lg font-semibold">{course.title}</h3>
            <p className="text-gray-600 mt-1">
              Learn the core concepts of {course.title.toLowerCase()}.
            </p>
            <div className="flex justify-between text-sm text-gray-500 mt-4">
              <span className="flex items-center gap-1">
                <BookOpen className="w-4 h-4" /> {course.lessons} lessons
              </span>
              <span className="flex items-center gap-1">
                <Clock className="w-4 h-4" /> {course.duration}
              </span>
            </div>
            <button className="mt-4 w-full bg-black text-white py-2 rounded-md font-semibold">
              Enroll Now
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}
