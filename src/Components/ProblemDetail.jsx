import { useParams } from "react-router-dom";
import React from "react";

const leetCodeProblems = [
    {
      id: "two-sum",
      title: "Two Sum",
      difficulty: "Easy",
      attempts: 1500,
      time: "5 min",
      videos: [
        { title: "Two Sum Explanation", url: "https://www.youtube.com/embed/KLlXCFG5TnA", duration: "8m" },
        { title: "Two Sum Code Walkthrough", url: "https://www.youtube.com/embed/ih7hmvyxoI4", duration: "10m" },
      ],
    },
    {
      id: "longest-substring",
      title: "Longest Substring Without Repeating Characters",
      difficulty: "Medium",
      attempts: 1200,
      time: "10 min",
      videos: [
        { title: "Longest Substring Explanation", url: "https://www.youtube.com/embed/KLlXCFG5TnA", duration: "12m" },
      ],
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

const difficultyColors = {
    Easy: "text-green-500",
    Medium: "text-yellow-500",
    Hard: "text-red-500",
  };
  
  const ProblemDetail = () => {
    const { id } = useParams();
    const [selectedProblem, setSelectedProblem] = React.useState(null);
    const [selectedVideoIndex, setSelectedVideoIndex] = React.useState(0);
  
    React.useEffect(() => {
      const problem = leetCodeProblems.find((p) => p.id === id);
      setSelectedProblem(problem);
      setSelectedVideoIndex(0); // reset video index on problem change
    }, [id]);
  
    if (!selectedProblem) return <div className="p-10 text-center">Problem not found</div>;
  
    const currentVideo = selectedProblem.videos?.[selectedVideoIndex];
  
    return (
      <div className="min-h-screen flex bg-gray-100 mt-32">
        {/* Sidebar - Problems List */}
        <aside className="w-80 bg-white p-6 border-r overflow-auto">
          <h2 className="text-xl font-semibold text-purple-700 mb-4">Problems List</h2>
          <ul className="space-y-3">
            {leetCodeProblems.map((problem) => (
              <li
                key={problem.id}
                className={`cursor-pointer p-3 rounded-lg ${
                  problem.id === id
                    ? "bg-purple-100 text-purple-800 font-medium"
                    : "hover:bg-gray-100"
                }`}
                onClick={() => setSelectedProblem(problem)}
              >
                <div>{problem.title}</div>
                <span className={`text-sm ${difficultyColors[problem.difficulty]}`}>
                  {problem.difficulty}
                </span>
              </li>
            ))}
          </ul>
        </aside>
  
        {/* Main Problem Detail */}
        <main className="flex-1 p-8 overflow-auto">
          <h1 className="text-3xl font-bold mb-2 text-purple-700">{selectedProblem.title}</h1>
          <p className={`text-lg font-semibold mb-2 ${difficultyColors[selectedProblem.difficulty]}`}>
            Difficulty: {selectedProblem.difficulty}
          </p>
          <p className="text-gray-600 mb-6">
            Attempts: {selectedProblem.attempts} | Estimated time: {selectedProblem.time}
          </p>
  
          <div className="p-6 bg-white rounded-lg shadow mb-6">
            <h2 className="text-xl font-semibold mb-4">Problem Description</h2>
            <p>
              Solve the <strong>{selectedProblem.title}</strong> problem using optimized algorithms and data structures. Try to solve it efficiently within the estimated time.
            </p>
          </div>
  
          {/* Videos Section */}
          {selectedProblem.videos && selectedProblem.videos.length > 0 && (
            <>
              <h2 className="text-xl font-semibold mb-4">Videos</h2>
  
              {/* Video Player */}
              <div className="aspect-video mb-6">
                <iframe
                  width="100%"
                  height="100%"
                  src={currentVideo.url}
                  title={currentVideo.title}
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                  className="rounded-lg shadow border"
                ></iframe>
              </div>
  
              {/* Video List */}
              <ul className="flex gap-4 overflow-x-auto pb-4">
                {selectedProblem.videos.map((video, index) => (
                  <li
                    key={index}
                    className={`cursor-pointer p-3 rounded-lg border ${
                      index === selectedVideoIndex
                        ? "bg-purple-100 border-purple-600 text-purple-700 font-semibold"
                        : "hover:bg-gray-100"
                    }`}
                    onClick={() => setSelectedVideoIndex(index)}
                  >
                    <div>{video.title}</div>
                    <span className="text-sm text-gray-500">{video.duration}</span>
                  </li>
                ))}
              </ul>
            </>
          )}
  
          {/* Action Buttons */}
          <div className="flex gap-4 justify-center mt-6">
            <button className="bg-purple-600 text-white px-5 py-2 rounded hover:bg-purple-700">
              Start Solving
            </button>
            <button className="bg-purple-600 text-white px-5 py-2 rounded hover:bg-purple-700">
              View Solutions
            </button>
            <button className="bg-purple-600 text-white px-5 py-2 rounded hover:bg-purple-700">
              Discuss
            </button>
          </div>
        </main>
      </div>
    );
  };
  
  export default ProblemDetail;