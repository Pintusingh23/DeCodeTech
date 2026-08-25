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

export default function CareerGuidance() {
  return (
    <div className="bg-[#FFFBF0] font-['Space_Grotesk'] text-slate-900 overflow-hidden">
      {/* 1. HERO SECTION */}
      <section className="relative py-20 px-4 sm:px-8 lg:px-12 border-t border-slate-200">
        <div className="max-w-7xl mx-auto text-center relative z-10 space-y-6">
          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}>
            <span className="text-orange-500 font-bold tracking-widest uppercase text-sm mb-4 block">
              // Career Roadmap
            </span>
            <h2 className="text-4xl md:text-5xl lg:text-6xl font-black uppercase tracking-tight text-slate-900 leading-[1.1]">
              Learn. Build. <br className="hidden md:block" />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-orange-500 to-yellow-500">
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
      <section className="py-16 px-4 sm:px-8 lg:px-12 relative">
        <div className="max-w-7xl mx-auto">
          {/* Desktop Horizontal */}
          <div className="hidden lg:flex flex-row justify-between items-start relative mt-10">
            {/* Connecting Line */}
            <div className="absolute top-[28px] left-[5%] right-[5%] h-[3px] bg-gradient-to-r from-orange-100 via-orange-300 to-yellow-200 z-0 rounded-full" />

            {roadmapSteps.map((step, idx) => (
              <motion.div
                key={step.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: idx * 0.1 }}
                viewport={{ once: true }}
                className="relative z-10 flex flex-col items-center flex-1 px-2 group"
              >
                <div className="w-14 h-14 rounded-full bg-white border-4 border-orange-100 shadow-[0_4px_20px_rgba(249,115,22,0.15)] flex items-center justify-center text-orange-500 group-hover:border-orange-400 group-hover:bg-orange-50 transition-all duration-300 mb-6 group-hover:-translate-y-1">
                  <step.icon className="w-6 h-6" />
                </div>
                <div className="text-center">
                  <div className="text-[10px] font-black text-orange-300 mb-1 tracking-wider bg-orange-50 inline-block px-2 py-0.5 rounded-full">{step.id}</div>
                  <h4 className="text-sm font-bold text-slate-900 mb-2 leading-tight uppercase tracking-tight">{step.title}</h4>
                  <p className="text-[11px] text-slate-500 font-medium leading-relaxed max-w-[120px] mx-auto">{step.desc}</p>
                </div>
              </motion.div>
            ))}
          </div>

          {/* Mobile/Tablet Vertical */}
          <div className="lg:hidden flex flex-col space-y-10 relative">
            {/* Connecting Line */}
            <div className="absolute top-[10px] bottom-[10px] left-[27px] w-[3px] bg-gradient-to-b from-orange-100 via-orange-300 to-yellow-200 z-0 rounded-full" />

            {roadmapSteps.map((step, idx) => (
              <motion.div
                key={step.id}
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ delay: idx * 0.1 }}
                viewport={{ once: true }}
                className="relative z-10 flex items-center gap-6 group"
              >
                <div className="w-14 h-14 shrink-0 rounded-full bg-white border-4 border-orange-100 shadow-[0_4px_20px_rgba(249,115,22,0.15)] flex items-center justify-center text-orange-500 group-hover:border-orange-400 group-hover:bg-orange-50 transition-all duration-300 group-hover:-translate-y-1">
                  <step.icon className="w-6 h-6" />
                </div>
                <div>
                  <div className="text-[10px] font-black text-orange-300 mb-1 tracking-wider bg-orange-50 inline-block px-2 py-0.5 rounded-full">{step.id}</div>
                  <h4 className="text-sm md:text-base font-bold text-slate-900 mb-1 uppercase tracking-tight">{step.title}</h4>
                  <p className="text-xs md:text-sm text-slate-500 font-medium leading-relaxed">{step.desc}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* 3. TRUST MESSAGE */}
      <section className="py-24 px-4 sm:px-8 lg:px-12 text-center relative">
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          className="max-w-5xl mx-auto bg-white rounded-[2.5rem] p-10 md:p-16 shadow-[0_20px_60px_rgba(0,0,0,0.06)] border border-slate-100 relative overflow-hidden"
        >
          <div className="absolute top-0 right-0 w-64 h-64 bg-orange-100/50 blur-[80px] rounded-full pointer-events-none" />
          <div className="absolute bottom-0 left-0 w-64 h-64 bg-purple-100/50 blur-[80px] rounded-full pointer-events-none" />

          <Target className="w-14 h-14 text-orange-500 mx-auto mb-8 drop-shadow-sm" />

          <h3 className="text-2xl md:text-4xl font-black text-slate-900 uppercase tracking-tight leading-snug mb-10">
            Your goal is not just to finish a course.<br className="hidden md:block" />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-orange-500 to-purple-500">
              Your goal is to become ready for the real world.
            </span>
          </h3>

          <div className="flex flex-col md:flex-row justify-center items-center gap-4 md:gap-6 flex-wrap">
            {['Learn the concepts', 'Build the projects', 'Practice the problems', 'Prepare for interviews', 'Apply with confidence'].map((text, i) => (
              <div key={i} className="flex items-center gap-3 bg-slate-50 border border-slate-100 px-5 py-3 rounded-full shadow-sm hover:shadow-md transition-shadow hover:border-orange-200 group">
                <CheckCircle2 className="w-5 h-5 text-purple-500 group-hover:text-orange-500 transition-colors" />
                <span className="text-sm font-bold text-slate-700">{text}</span>
              </div>
            ))}
          </div>
        </motion.div>
      </section>

      {/* 4. CONTACT CTA */}
      <section className="py-24 px-4 sm:px-8 lg:px-12 relative overflow-hidden text-center border-t border-slate-200">
        <div className="absolute top-0 right-0 w-96 h-96 bg-purple-100/50 rounded-full blur-[100px] pointer-events-none -z-10" />
        <div className="absolute bottom-0 left-0 w-96 h-96 bg-orange-100/50 rounded-full blur-[100px] pointer-events-none -z-10" />
        
        <div className="max-w-4xl mx-auto space-y-10">
          <h2 className="text-4xl md:text-5xl font-black uppercase tracking-tight text-slate-900">
            STUCK ON YOUR <span className="text-purple-600">NEXT STEP?</span>
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
            className="inline-flex items-center gap-3 px-10 py-5 bg-purple-600 hover:bg-purple-700 text-white font-bold uppercase tracking-widest text-sm rounded-full shadow-[0_8px_20px_rgba(147,51,234,0.3)] hover:shadow-[0_12px_25px_rgba(147,51,234,0.4)] transition-all transform hover:-translate-y-1"
          >
            <MessageSquare className="w-5 h-5" />
            ASK YOUR QUESTION →
          </Link>
        </div>
      </section>
    </div>
  );
}
