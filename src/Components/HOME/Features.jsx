import React from 'react';
import { ArrowRight, MessageSquare, CheckCircle, Users } from 'lucide-react';

const features = [
  {
    id: 'interview',
    title: 'Interview Simulator',
    desc: 'Practice your interviewing skills and get real-time AI-powered feedback on your answers.',
    icon: <MessageSquare className="w-10 h-10 text-orange-400 mb-4" />,
    accentColor: 'bg-orange-950/20',
    hoverBorder: 'hover:border-orange-500/50',
    badge: 'AI Powered',
    badgeColor: 'bg-orange-950/40 text-orange-400',
  },
  {
    id: 'job-readiness',
    title: 'Job-Readiness Checker',
    desc: 'Analyze job postings to identify skill gaps and understand exactly what employers want.',
    icon: <CheckCircle className="w-10 h-10 text-blue-400 mb-4" />,
    accentColor: 'bg-blue-950/20',
    hoverBorder: 'hover:border-blue-500/50',
    badge: 'Smart Analysis',
    badgeColor: 'bg-blue-950/40 text-blue-400',
  },
  {
    id: 'clubs',
    title: 'Clubs',
    desc: 'Connect with peers, join club events, and build a network that helps everyone grow together.',
    icon: <Users className="w-10 h-10 text-green-400 mb-4" />,
    accentColor: 'bg-green-950/20',
    hoverBorder: 'hover:border-green-500/50',
    badge: 'Community',
    badgeColor: 'bg-green-950/40 text-green-400',
  },
];

const Features = () => {
  return (
    <section className="space-y-6">
      {/* Section Header */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-extrabold text-zinc-100 tracking-tight">
            Discover More <span className="text-transparent bg-clip-text bg-gradient-to-r from-orange-400 to-amber-300">Features</span>
          </h2>
          <p className="text-sm text-zinc-400 mt-1">Everything you need to accelerate your career.</p>
        </div>
        <button className="hidden md:inline-flex items-center gap-2 text-sm font-semibold text-orange-500 hover:text-orange-400 transition-colors group">
          View all
          <ArrowRight className="w-4 h-4 group-hover:translate-x-1.5 transition-transform" />
        </button>
      </div>

      {/* Feature Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {features.map((feature) => (
          <div
            key={feature.id}
            className={`
              relative bg-zinc-900/40 backdrop-blur-md rounded-3xl p-6 border border-zinc-800/80
              shadow-xl hover:shadow-orange-500/5
              ${feature.hoverBorder}
              transition-all duration-500 transform hover:-translate-y-1.5
              group cursor-pointer overflow-hidden
            `}
          >
            {/* Corner accent */}
            <div
              className={`absolute top-0 right-0 w-28 h-28 ${feature.accentColor} rounded-bl-full -z-0 transition-transform duration-700 group-hover:scale-175 opacity-60`}
            />

            <div className="relative z-10">
              {/* Badge */}
              <span className={`inline-block text-xs font-semibold px-3 py-1 rounded-full ${feature.badgeColor} mb-4 shadow-sm`}>
                {feature.badge}
              </span>

              {/* Icon */}
              <div className="group-hover:scale-115 transition-transform duration-300">
                {feature.icon}
              </div>

              {/* Title */}
              <h3 className="text-base font-bold text-zinc-100 mb-2 transition-colors duration-300 group-hover:text-orange-400">
                {feature.title}
              </h3>

              {/* Description */}
              <p className="text-sm text-zinc-400 leading-relaxed mb-5">
                {feature.desc}
              </p>

              {/* CTA */}
              <div className="flex items-center gap-1.5 text-sm font-semibold text-zinc-300 group-hover:text-orange-400 transition-colors duration-300">
                Learn more
                <ArrowRight className="w-4 h-4 transform group-hover:translate-x-1.5 transition-transform duration-300" />
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Bottom CTA Banner */}
      <div className="relative overflow-hidden bg-gradient-to-r from-orange-600 to-amber-500 rounded-3xl p-8 flex flex-col md:flex-row items-center justify-between gap-6 shadow-xl border border-white/10">
        <div className="absolute inset-0 bg-[linear-gradient(to_right,rgba(255,255,255,0.06)_1px,transparent_1px),linear-gradient(to_bottom,rgba(255,255,255,0.06)_1px,transparent_1px)] bg-[size:16px_16px] pointer-events-none"></div>
        <div className="relative z-10">
          <h3 className="text-white font-extrabold text-2xl mb-1.5">Ready to level up?</h3>
          <p className="text-orange-100 text-sm font-medium">Join thousands of students already on their journey.</p>
        </div>
        <button className="relative z-10 flex-shrink-0 inline-flex items-center gap-2 bg-white text-orange-600 font-extrabold px-6 py-3.5 rounded-2xl hover:bg-orange-50 transition-all duration-300 shadow-md hover:shadow-xl hover:scale-105 active:scale-95">
          Get Started
          <ArrowRight className="w-4 h-4" />
        </button>
      </div>
    </section>
  );
};

export default Features;