import { Calendar, Clock, Trophy } from "lucide-react";

const contests = [
  {
    title: "Codeforces Round 905 (Div. 2)",
    type: "Ongoing",
    date: "March 28, 2025",
    time: "19:30 UTC",
    duration: "2h",
  },
  {
    title: "Educational Codeforces Round 155",
    type: "Upcoming",
    date: "April 5, 2025",
    time: "18:00 UTC",
    duration: "2.5h",
  },
  {
    title: "Codeforces Global Round 20",
    type: "Upcoming",
    date: "April 12, 2025",
    time: "17:00 UTC",
    duration: "3h",
  },
];

export default function Codeforces() {
  return (
    <div className="container mx-auto px-4 py-8 mt-16">
      {/* Hero Section */}
      <section className="text-center py-16">
        <h1 className="text-4xl font-bold">Codeforces Contests</h1>
        <p className="text-gray-600 mt-4 max-w-2xl mx-auto">
          Participate in Codeforces contests and improve your competitive programming skills.
        </p>
      </section>

      {/* Tabs for Contest Status */}
      <div className="flex justify-center space-x-4 mb-8">
        <button className="bg-black text-white px-4 py-2 rounded-md font-semibold">All Contests</button>
        <button className="border border-gray-400 px-4 py-2 rounded-md font-semibold">Ongoing</button>
        <button className="border border-gray-400 px-4 py-2 rounded-md font-semibold">Upcoming</button>
      </div>

      {/* Contest Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {contests.map((contest, index) => (
          <div key={index} className="p-4 shadow-md border border-gray-200 rounded-lg">
            <div className="h-40 bg-gray-100 rounded-lg flex items-center justify-center">
              <Trophy className="w-12 h-12 text-gray-500" />
            </div>
            <p className={`text-sm mt-4 ${contest.type === "Ongoing" ? "text-green-500" : "text-yellow-500"}`}>
              {contest.type}
            </p>
            <h3 className="text-lg font-semibold">{contest.title}</h3>
            <p className="text-gray-600 mt-1 flex items-center gap-1">
              <Calendar className="w-4 h-4" /> {contest.date}
            </p>
            <p className="text-gray-600 mt-1 flex items-center gap-1">
              <Clock className="w-4 h-4" /> {contest.time} | {contest.duration}
            </p>
            <button className="mt-4 w-full bg-black text-white py-2 rounded-md font-semibold">
              Register Now
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}
