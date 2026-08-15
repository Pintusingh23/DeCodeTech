const HTMLCSSCourse = () => {
  return (
    <div className="min-h-screen bg-gray-50 p-8 mt-20">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-3xl md:text-4xl font-bold text-purple-700 mb-6">HTML & CSS Mastery Course</h1>
        <div className="aspect-w-16 aspect-h-9 bg-black rounded-lg overflow-hidden mb-6">
          <iframe
            src="https://www.youtube.com/embed/pQN-pnXPaVg"
            title="HTML CSS Course Video"
            frameBorder="0"
            allowFullScreen
            className="w-full h-full"
          ></iframe>
        </div>
        <p className="text-gray-700 text-lg">
          Welcome to the full course on HTML & CSS. In this course, you'll learn how to create beautiful and
          responsive websites using modern web development standards.
        </p>
      </div>
    </div>
  );
};

export default HTMLCSSCourse;
