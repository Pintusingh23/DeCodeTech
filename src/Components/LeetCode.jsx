import { PlayCircle, Clock, List } from "lucide-react";
import { useNavigate } from "react-router-dom";

const leetCodeProblems = [
  {
    id: "two-sum",
    title: "Two Sum",
    difficulty: "Easy",
    attempts: 1500,
    time: "5 min",
  },
  {
    id: "longest-substring",
    title: "Longest Substring Without Repeating Characters",
    difficulty: "Medium",
    attempts: 1200,
    time: "10 min",
  },
  {
    id: "merge-k-lists",
    title: "Merge K Sorted Lists",
    difficulty: "Hard",
    attempts: 800,
    time: "25 min",
  },
  {
    id: "zigzag-tree",
    title: "Binary Tree Zigzag Level Order Traversal",
    difficulty: "Medium",
    attempts: 900,
    time: "12 min",
  },
  {
    id: "lru-cache",
    title: "LRU Cache",
    difficulty: "Hard",
    attempts: 600,
    time: "20 min",
  },
  {
    id: "median-stream",
    title: "Find Median from Data Stream",
    difficulty: "Hard",
    attempts: 700,
    time: "22 min",
  },
];

export default function LeetCode() {
  const navigate = useNavigate();

  return (
    <div className="container mx-auto px-4 py-8 mt-16">
      {/* Hero Section */}
      <section className="text-center py-16">
        <h1 className="text-4xl font-bold">LeetCode Practice</h1>
        <p className="text-gray-600 mt-4 max-w-2xl mx-auto">
          Solve coding problems and enhance your problem-solving skills.
        </p>
      </section>

      {/* Tabs */}
      <div className="flex justify-center space-x-4 mb-8">
        <button className="bg-black text-white px-4 py-2 rounded-md font-semibold">All Problems</button>
        <button className="border border-gray-400 px-4 py-2 rounded-md font-semibold">Easy</button>
        <button className="border border-gray-400 px-4 py-2 rounded-md font-semibold">Medium</button>
        <button className="border border-gray-400 px-4 py-2 rounded-md font-semibold">Hard</button>
      </div>

      {/* Problems Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {leetCodeProblems.map((problem) => (
          <div
            key={problem.id}
            onClick={() => navigate(`/leetcode/${problem.id}`)}
            className="p-4 shadow-md border border-gray-200 rounded-lg cursor-pointer hover:shadow-lg transition"
          >
            <div className="h-40 bg-gray-100 rounded-lg flex items-center justify-center">
              <PlayCircle className="w-12 h-12 text-gray-500" />
            </div>
            <p
              className={`text-sm mt-4 ${
                problem.difficulty === "Easy"
                  ? "text-green-500"
                  : problem.difficulty === "Medium"
                  ? "text-yellow-500"
                  : "text-red-500"
              }`}
            >
              {problem.difficulty}
            </p>
            <h3 className="text-lg font-semibold">{problem.title}</h3>
            <p className="text-gray-600 mt-1">
              Solve the {problem.title.toLowerCase()} problem using optimized algorithms.
            </p>
            <div className="flex justify-between text-sm text-gray-500 mt-4">
              <span className="flex items-center gap-1">
                <List className="w-4 h-4" /> {problem.attempts} attempts
              </span>
              <span className="flex items-center gap-1">
                <Clock className="w-4 h-4" /> {problem.time}
              </span>
            </div>
            <button className="mt-4 w-full bg-black text-white py-2 rounded-md font-semibold">
              Solve Now
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}
