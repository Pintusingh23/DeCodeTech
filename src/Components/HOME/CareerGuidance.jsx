import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Link } from 'react-router-dom';
import {
  BookOpen, Terminal, Brain, FileText, Linkedin, Briefcase,
  Users, Target, ChevronDown, ArrowRight, MessageSquare,
  CheckCircle2, Code2, Search, Edit3
} from 'lucide-react';

// --- Data Constants ---
const roadmapSteps = [
  { id: '01', title: 'LEARN THE SKILLS', desc: 'Master core languages and frameworks.', icon: BookOpen },
  { id: '02', title: 'BUILD REAL PROJECTS', desc: 'Apply knowledge to build full-stack apps.', icon: Terminal },
  { id: '03', title: 'MASTER DSA & INTERVIEWS', desc: 'Solve complex algorithmic problems.', icon: Brain },
  { id: '04', title: 'BUILD YOUR RESUME', desc: 'Craft a ATS-friendly developer resume.', icon: FileText },
  { id: '05', title: 'OPTIMIZE LINKEDIN', desc: 'Create a professional online presence.', icon: Linkedin },
  { id: '06', title: 'APPLY FOR JOBS', desc: 'Strategically target the right roles.', icon: Briefcase },
  { id: '07', title: 'PREPARE FOR INTERVIEWS', desc: 'Excel in HR and technical rounds.', icon: Users },
];

const interviewChallenges = [
  {
    id: 1,
    topic: 'Data Structures & Algorithms',
    question: 'You are given an array of integers. How would you find the first duplicate element efficiently?',
    approach: 'We can use a Hash Set to store elements as we iterate through the array. For each element, we check if it already exists in the set. If it does, we found our first duplicate (O(N) time and O(N) space).',
    difficulty: 'Medium'
  },
  {
    id: 2,
    topic: 'JavaScript',
    question: 'What is the event loop and how does it handle asynchronous operations in Node.js?',
    approach: 'The event loop continuously checks the call stack and callback queue. When the stack is empty, it pushes the first callback from the queue to the stack. This allows Node.js to perform non-blocking I/O operations despite being single-threaded.',
    difficulty: 'Medium'
  },
  {
    id: 3,
    topic: 'React',
    question: 'How do you optimize performance in a React application with a large list of items?',
    approach: 'You should use windowing or virtualization libraries like react-window. Also, ensure components use React.memo to prevent unnecessary re-renders, and use the useMemo hook for expensive calculations.',
    difficulty: 'Hard'
  }
];

const careerFaqs = [
  "How do I crack a technical interview?",
  "How do I build a good developer resume?",
  "How do I get my first internship?",
  "How do I find jobs on LinkedIn?",
  "How do I apply for a job on LinkedIn?",
  "What should I write in my LinkedIn profile?",
  "Which projects should I put on my resume?",
  "How much DSA should I prepare for interviews?",
  "How should I prepare for a coding round?",
  "What should I do if I have no experience?",
  "How should I prepare for HR interviews?",
  "When should I start applying for internships and jobs?"
];

export default function CareerGuidance() {
  const [activeChallenge, setActiveChallenge] = useState(0);
  const [revealApproach, setRevealApproach] = useState(false);
  const [openFaq, setOpenFaq] = useState(null);

  const toggleFaq = (idx) => {
    setOpenFaq(openFaq === idx ? null : idx);
  };

  const handleNextChallenge = () => {
    setRevealApproach(false);
    setActiveChallenge((prev) => (prev + 1) % interviewChallenges.length);
  };

  return (
    <div className="bg-white font-['Space_Grotesk'] text-slate-900 overflow-hidden">
      {/* 1. HERO SECTION */}
      <section className="relative py-20 px-6 sm:px-12 border-t border-slate-100">
        <div className="absolute inset-0 bg-[linear-gradient(to_right,rgba(0,0,0,0.02)_1px,transparent_1px),linear-gradient(to_bottom,rgba(0,0,0,0.02)_1px,transparent_1px)] bg-[size:32px_32px] pointer-events-none z-0" />

        <div className="max-w-7xl mx-auto text-center relative z-10 space-y-6">
          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}>
            <span className="text-blue-600 font-bold tracking-widest uppercase text-sm mb-4 block">
              // Career Roadmap
            </span>
            <h2 className="text-4xl md:text-5xl lg:text-6xl font-black uppercase tracking-tight text-slate-900 leading-[1.1]">
              Learn. Build. <br className="hidden md:block" />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-indigo-500">
                Get Job-Ready.
              </span>
            </h2>
            <p className="mt-6 text-slate-500 text-base md:text-lg max-w-3xl mx-auto font-medium leading-relaxed">
              Build the skills, projects and confidence you need to prepare for real technical opportunities.
            </p>
            <p className="mt-3 text-slate-400 text-sm max-w-2xl mx-auto">
              From learning the fundamentals to preparing for interviews, resumes, LinkedIn and job applications — DeCode helps you understand what to do next.
            </p>
          </motion.div>
        </div>
      </section>

      {/* 2. ROADMAP TIMELINE */}
      <section className="py-16 px-6 sm:px-12 bg-slate-50 relative border-y border-slate-100">
        <div className="max-w-7xl mx-auto">
          {/* Desktop Horizontal */}
          <div className="hidden lg:flex flex-row justify-between items-start relative mt-10">
            {/* Connecting Line */}
            <div className="absolute top-[28px] left-[5%] right-[5%] h-0.5 bg-gradient-to-r from-blue-100 via-blue-300 to-indigo-200 z-0" />

            {roadmapSteps.map((step, idx) => (
              <motion.div
                key={step.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: idx * 0.1 }}
                viewport={{ once: true }}
                className="relative z-10 flex flex-col items-center flex-1 px-2 group"
              >
                <div className="w-14 h-14 rounded-full bg-white border-2 border-blue-100 shadow-md flex items-center justify-center text-blue-500 group-hover:border-blue-500 group-hover:bg-blue-50 transition-all duration-300 mb-6">
                  <step.icon className="w-6 h-6" />
                </div>
                <div className="text-center">
                  <div className="text-[10px] font-black text-slate-400 mb-1 tracking-wider">{step.id}</div>
                  <h4 className="text-sm font-bold text-slate-900 mb-2 leading-tight uppercase tracking-tight">{step.title}</h4>
                  <p className="text-[11px] text-slate-500 font-medium leading-relaxed max-w-[120px] mx-auto">{step.desc}</p>
                </div>
              </motion.div>
            ))}
          </div>

          {/* Mobile/Tablet Vertical */}
          <div className="lg:hidden flex flex-col space-y-8 relative">
            {/* Connecting Line */}
            <div className="absolute top-[10px] bottom-[10px] left-[27px] w-0.5 bg-gradient-to-b from-blue-100 via-blue-300 to-indigo-200 z-0" />

            {roadmapSteps.map((step, idx) => (
              <motion.div
                key={step.id}
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ delay: idx * 0.1 }}
                viewport={{ once: true }}
                className="relative z-10 flex items-center gap-6 group"
              >
                <div className="w-14 h-14 shrink-0 rounded-full bg-white border-2 border-blue-100 shadow-md flex items-center justify-center text-blue-500 group-hover:border-blue-500 group-hover:bg-blue-50 transition-all duration-300">
                  <step.icon className="w-6 h-6" />
                </div>
                <div>
                  <div className="text-xs font-black text-slate-400 mb-1 tracking-wider">{step.id}</div>
                  <h4 className="text-sm md:text-base font-bold text-slate-900 mb-1 uppercase tracking-tight">{step.title}</h4>
                  <p className="text-xs md:text-sm text-slate-500 font-medium leading-relaxed">{step.desc}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* 3. TRUST MESSAGE */}
      <section className="py-24 px-6 sm:px-12 bg-white text-center">
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          className="max-w-4xl mx-auto bg-slate-900 rounded-3xl p-10 md:p-16 shadow-2xl relative overflow-hidden"
        >
          <div className="absolute top-0 right-0 w-64 h-64 bg-blue-500/20 blur-[80px] rounded-full pointer-events-none" />
          <div className="absolute bottom-0 left-0 w-64 h-64 bg-indigo-500/20 blur-[80px] rounded-full pointer-events-none" />

          <Target className="w-12 h-12 text-blue-400 mx-auto mb-8 opacity-80" />

          <h3 className="text-xl md:text-3xl font-black text-white uppercase tracking-wider leading-relaxed mb-10">
            Your goal is not just to finish a course.<br className="hidden md:block" />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-cyan-300">
              Your goal is to become ready for the real world.
            </span>
          </h3>

          <div className="flex flex-col md:flex-row justify-center items-center gap-4 md:gap-8 text-sm md:text-base text-slate-300 font-medium flex-wrap">
            <span className="flex items-center gap-2"><CheckCircle2 className="w-4 h-4 text-blue-400" /> Learn the concepts</span>
            <span className="flex items-center gap-2"><CheckCircle2 className="w-4 h-4 text-blue-400" /> Build the projects</span>
            <span className="flex items-center gap-2"><CheckCircle2 className="w-4 h-4 text-blue-400" /> Practice the problems</span>
            <span className="flex items-center gap-2"><CheckCircle2 className="w-4 h-4 text-blue-400" /> Prepare for interviews</span>
            <span className="flex items-center gap-2"><CheckCircle2 className="w-4 h-4 text-blue-400" /> Apply with confidence</span>
          </div>
        </motion.div>
      </section>



      {/* 7. CONTACT CTA */}
      <section className="py-24 px-6 sm:px-12 bg-white relative overflow-hidden text-center border-t border-slate-100">
        <div className="absolute top-0 right-0 w-96 h-96 bg-blue-50 rounded-full blur-[100px] pointer-events-none -z-10" />
        <div className="max-w-4xl mx-auto space-y-10">
          <h2 className="text-4xl md:text-5xl font-black uppercase tracking-tight text-slate-900">
            STUCK ON YOUR <span className="text-blue-600">NEXT STEP?</span>
          </h2>

          <div className="flex flex-wrap justify-center gap-x-6 gap-y-3 text-sm md:text-base text-slate-500 font-bold uppercase tracking-wider max-w-2xl mx-auto">
            <span>• Coding</span>
            <span>• Projects</span>
            <span>• Resume</span>
            <span>• LinkedIn</span>
            <span>• Internships</span>
            <span>• Job Applications</span>
            <span>• Technical Interviews</span>
            <span>• Career Preparation</span>
          </div>

          <p className="text-slate-900 font-bold text-xl">Ask us.</p>

          <Link
            to="/Contact"
            className="inline-flex items-center gap-3 px-8 py-4 bg-blue-600 hover:bg-blue-700 text-white font-bold uppercase tracking-widest text-sm rounded-xl shadow-lg shadow-blue-500/30 transition-all transform hover:-translate-y-1"
          >
            <MessageSquare className="w-5 h-5" />
            ASK YOUR QUESTION →
          </Link>
        </div>
      </section>
    </div>
  );
}
