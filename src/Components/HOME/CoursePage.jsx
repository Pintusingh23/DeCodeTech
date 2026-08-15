import { useParams } from "react-router-dom";
import React from "react";
const courseData = {
    "html-css": {
      title: "HTML & CSS Mastery",
      description: "Learn to build beautiful and responsive websites using HTML5 and CSS3.",
      videos: [
        { title: "Introduction to HTML & CSS", url: "https://www.youtube.com/embed/UB1O30fR-EE", duration: "42m" },
        { title: "HTML Layout and Tags", url: "https://www.youtube.com/embed/mU6anWqZJcc", duration: "35m" },
        { title: "CSS Basics and Flexbox", url: "https://www.youtube.com/embed/1Rs2ND1ryYc", duration: "40m" }
      ]
    },

    //   title: "Python for Beginners",
    //   description: "Learn Python programming fundamentals and build your first projects.",
    //   videos: [
    //     { title: "Python Introduction", url: "https://www.youtube.com/embed/rfscVS0vtbw", duration: "50m" },
    //     { title: "Variables and Data Types", url: "https://www.youtube.com/embed/kqtD5dpn9C8", duration: "40m" },
    //     { title: "Control Flow in Python", url: "https://www.youtube.com/embed/f4KOjWS_KZs", duration: "45m" }
    //   ]
  };
  

const CoursePage = () => {
  const { id } = useParams();
  const course = courseData[id];
  const [selectedVideoIndex, setSelectedVideoIndex] = React.useState(0);

  if (!course) return <div className="p-10 text-center">Course not found</div>;

  const currentVideo = course.videos[selectedVideoIndex];

  return (
    <div className="min-h-screen flex bg-gray-100 mt-32">
      {/* Sidebar - Table of Content */}
      <aside className="w-80 bg-white p-6 border-r">
        <h2 className="text-xl font-semibold text-purple-700 mb-4">Table of Contents</h2>
        <ul className="space-y-4">
          {course.videos.map((video, index) => (
            <li
              key={index}
              className={`cursor-pointer p-3 rounded-lg ${index === selectedVideoIndex ? "bg-purple-100 text-purple-800 font-medium" : "hover:bg-gray-100"}`}
              onClick={() => setSelectedVideoIndex(index)}
            >
              <div>{index + 1}. {video.title}</div>
              <span className="text-sm text-gray-500">{video.duration}</span>
            </li>
          ))}
        </ul>
      </aside>

      {/* Main Video Section */}
      <main className="flex-1 p-8">
        <h1 className="text-3xl font-bold mb-2 text-purple-700">{course.title}</h1>
        <p className="text-gray-600 mb-6">{course.description}</p>

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

        {/* Bottom Action Buttons */}
        <div className="flex gap-4 justify-center mt-6">
          <button className="bg-purple-600 text-white px-5 py-2 rounded hover:bg-purple-700">More Examples</button>
          <button className="bg-purple-600 text-white px-5 py-2 rounded hover:bg-purple-700">More Quizzes</button>
          <button className="bg-purple-600 text-white px-5 py-2 rounded hover:bg-purple-700">More Exercises</button>
        </div>
      </main>
    </div>
  );
};

export default CoursePage;
