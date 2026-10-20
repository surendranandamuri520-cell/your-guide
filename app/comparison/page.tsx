"use client";

import { useState } from "react";

const branches = [
  "CSE",
  "IT",
  "AIML",
  "AIDS",
  "CSM",
  "CSD",
  "EEE",
  "ECE",
  "MECH",
  "CIVIL",
  "CAI",
];

const branchData: Record<
  string,
  {
    subjects: string;
    programming: string;
    difficulty: string;
    jobs: string;
    skills: string;
    higherStudies: string;
    core: string;
    future: string;
  }
> = {
  CSE: {
    subjects: "Programming, Data Structures, DBMS, Operating Systems, Computer Networks",
    programming: "High",
    difficulty: "Moderate to High",
    jobs: "Software Developer, Full Stack Developer, Backend Developer, Software Engineer",
    skills: "Programming, DSA, SQL, Git, Web Development",
    higherStudies: "M.Tech, MS, MBA, MCA, specialized AI/Cloud/Data programs",
    core: "Software development, systems, databases, cloud and application engineering",
    future: "Strong relevance across software and technology industries",
  },

  IT: {
    subjects: "Programming, Databases, Web Technologies, Networks, Software Engineering",
    programming: "High",
    difficulty: "Moderate",
    jobs: "Software Developer, Web Developer, Application Developer, IT Analyst",
    skills: "Programming, SQL, Web Development, Git, Networking",
    higherStudies: "M.Tech, MS, MBA, MCA and specialized technology programs",
    core: "Software applications, IT infrastructure and enterprise technology",
    future: "Strong relevance as organizations continue to depend on software systems",
  },

  AIML: {
    subjects: "Programming, Machine Learning, Artificial Intelligence, Mathematics, Data Science",
    programming: "High",
    difficulty: "High",
    jobs: "AI Engineer, ML Engineer, Data Analyst, Software Engineer",
    skills: "Python, DSA, Mathematics, Machine Learning, SQL",
    higherStudies: "M.Tech, MS, AI/ML specialization, Data Science programs",
    core: "Artificial intelligence, machine learning and intelligent applications",
    future: "High relevance in AI-driven software and data applications",
  },

  AIDS: {
    subjects: "Programming, Data Science, Machine Learning, Statistics, Databases",
    programming: "High",
    difficulty: "High",
    jobs: "Data Analyst, Data Engineer, ML Engineer, Software Developer",
    skills: "Python, SQL, Statistics, Data Analysis, Machine Learning",
    higherStudies: "M.Tech, MS, Data Science, AI/ML and analytics programs",
    core: "Data analysis, data engineering, analytics and intelligent systems",
    future: "Strong relevance as organizations increasingly use data for decisions",
  },

  CSM: {
    subjects: "Programming, Machine Learning, Artificial Intelligence, Data Structures, Databases",
    programming: "High",
    difficulty: "High",
    jobs: "AI Engineer, ML Engineer, Software Developer, Data Analyst",
    skills: "Python, DSA, SQL, Machine Learning, AI fundamentals",
    higherStudies: "M.Tech, MS, AI/ML and Data Science programs",
    core: "AI-enabled software, machine learning and data-driven systems",
    future: "Strong relevance in modern software and AI applications",
  },

  CSD: {
    subjects: "Programming, Data Structures, Databases, Data Science, Machine Learning",
    programming: "High",
    difficulty: "High",
    jobs: "Data Analyst, Data Engineer, Software Developer, ML Engineer",
    skills: "Python, SQL, Statistics, Data Analysis, DSA",
    higherStudies: "M.Tech, MS, Data Science, AI/ML and analytics programs",
    core: "Data processing, analytics, software and intelligent systems",
    future: "Strong relevance in data-driven technology industries",
  },

  EEE: {
    subjects: "Electrical Circuits, Power Systems, Control Systems, Electrical Machines, Electronics",
    programming: "Moderate",
    difficulty: "High",
    jobs: "Electrical Engineer, Embedded Engineer, Automation Engineer, Software Engineer",
    skills: "Electrical fundamentals, Programming, Embedded Systems, Control Systems",
    higherStudies: "M.Tech, MS, MBA and specialization in power, automation or embedded systems",
    core: "Power systems, electrical equipment, automation and embedded technology",
    future: "Relevant across energy, automation, EV and embedded technology",
  },

  ECE: {
    subjects: "Digital Electronics, Analog Electronics, Communication Systems, Embedded Systems, Microprocessors",
    programming: "Moderate to High",
    difficulty: "High",
    jobs: "Embedded Engineer, Electronics Engineer, VLSI Engineer, Software Engineer",
    skills: "C/C++, Digital Electronics, Embedded Systems, Communication",
    higherStudies: "M.Tech, MS, VLSI, Embedded Systems and Communication programs",
    core: "Electronics, embedded systems, communication and semiconductor technology",
    future: "Strong relevance in electronics, embedded systems and semiconductor industries",
  },

  MECH: {
    subjects: "Thermodynamics, Manufacturing, Machine Design, Fluid Mechanics, Engineering Mechanics",
    programming: "Low to Moderate",
    difficulty: "High",
    jobs: "Mechanical Engineer, Design Engineer, Manufacturing Engineer, Automation Engineer",
    skills: "CAD, Mechanical Design, Manufacturing, Problem Solving, Basic Programming",
    higherStudies: "M.Tech, MS, MBA and specialization in design, manufacturing or robotics",
    core: "Mechanical design, manufacturing, automobiles, robotics and industrial systems",
    future: "Relevant in manufacturing, automation, EVs, robotics and industrial technology",
  },

  CIVIL: {
    subjects: "Structural Engineering, Construction, Geotechnical Engineering, Transportation, Surveying",
    programming: "Low to Moderate",
    difficulty: "High",
    jobs: "Civil Engineer, Structural Engineer, Site Engineer, Planning Engineer",
    skills: "AutoCAD, Structural Analysis, Construction Management, Project Planning",
    higherStudies: "M.Tech, MS, MBA and specialization in structural or construction fields",
    core: "Construction, infrastructure, structural engineering and transportation",
    future: "Continued relevance through infrastructure and construction development",
  },

  CAI: {
    subjects: "Programming, Artificial Intelligence, Machine Learning, Data Structures, Databases",
    programming: "High",
    difficulty: "High",
    jobs: "AI Engineer, ML Engineer, Software Developer, Data Analyst",
    skills: "Python, DSA, SQL, AI, Machine Learning",
    higherStudies: "M.Tech, MS, AI/ML, Data Science and related programs",
    core: "Artificial intelligence, software development and intelligent applications",
    future: "Strong relevance in AI-powered software and automation",
  },
};

const comparisonRows = [
  ["Main Subjects", "subjects"],
  ["Programming Requirement", "programming"],
  ["Difficulty", "difficulty"],
  ["Typical Jobs", "jobs"],
  ["Required Skills", "skills"],
  ["Higher Study Options", "higherStudies"],
  ["Core Opportunities", "core"],
  ["Future Relevance", "future"],
] as const;

export default function BranchComparison() {
  const [branchA, setBranchA] = useState("CSE");
  const [branchB, setBranchB] = useState("ECE");

  const dataA = branchData[branchA];
  const dataB = branchData[branchB];

  return (
    <main className="min-h-screen bg-[#070b14] text-white">
      {/* NAVBAR */}
      <header className="border-b border-white/[0.07] bg-[#070b14]/90 backdrop-blur-xl">
        <div className="mx-auto flex h-[72px] max-w-7xl items-center justify-between px-6 lg:px-8">
          <a
            href="/"
            className="flex items-center gap-3 transition-opacity hover:opacity-80"
          >
            <div className="flex h-9 w-9 items-center justify-center rounded-lg border border-violet-400/20 bg-violet-500/10">
              <span className="text-sm font-bold text-violet-300">Y</span>
            </div>

            <span className="text-[15px] font-semibold tracking-[-0.02em]">
              YOUR GUIDE
            </span>
          </a>

          <a
            href="/"
            className="rounded-xl border border-white/[0.1] bg-white/[0.035] px-4 py-2.5 text-sm font-medium text-slate-300 transition hover:border-violet-400/30 hover:bg-violet-500/10 hover:text-violet-300"
          >
            Home
          </a>
        </div>
      </header>

      {/* MAIN */}
      <section className="relative overflow-hidden">
        <div className="pointer-events-none absolute left-1/2 top-[-250px] h-[550px] w-[850px] -translate-x-1/2 rounded-full bg-violet-600/[0.07] blur-[150px]" />

        <div className="relative mx-auto max-w-6xl px-6 pb-24 pt-16 lg:px-8 lg:pt-24">
          {/* HEADING */}
          <div className="max-w-3xl">
            <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-violet-400/15 bg-violet-500/[0.07] px-4 py-2 text-xs font-medium text-violet-300">
              <span className="h-1.5 w-1.5 rounded-full bg-violet-400" />
              Career & Branch Guidance
            </div>

            <h1 className="text-4xl font-semibold tracking-[-0.045em] text-white sm:text-5xl">
              Compare Engineering Branches
            </h1>

            <p className="mt-5 max-w-2xl text-base leading-7 text-slate-400 sm:text-lg">
              Compare two branches side by side to understand their subjects,
              programming requirements, career opportunities and future
              relevance.
            </p>
          </div>

          {/* SELECTORS */}
          <div className="mt-12 rounded-2xl border border-white/[0.08] bg-[#0d1320]/85 p-6 shadow-[0_25px_80px_rgba(0,0,0,0.25)] backdrop-blur-xl sm:p-8">
            <div className="mb-8">
              <p className="text-xs font-semibold uppercase tracking-[0.18em] text-violet-400">
                Choose branches
              </p>

              <h2 className="mt-3 text-2xl font-semibold tracking-[-0.03em]">
                Select two branches to compare
              </h2>

              <p className="mt-2 text-sm leading-6 text-slate-500">
                The comparison is designed to help you understand the
                differences, not to declare one branch universally better.
              </p>
            </div>

            <div className="grid gap-6 md:grid-cols-2">
              {/* BRANCH A */}
              <div>
                <label
                  htmlFor="branchA"
                  className="mb-2 block text-sm font-medium text-slate-200"
                >
                  Branch A
                </label>

                <select
                  id="branchA"
                  value={branchA}
                  onChange={(e) => setBranchA(e.target.value)}
                  className="w-full rounded-xl border border-white/[0.1] bg-[#111827] px-4 py-3.5 text-sm text-white outline-none transition focus:border-violet-400/50 focus:ring-2 focus:ring-violet-500/10"
                >
                  {branches.map((branch) => (
                    <option key={branch} value={branch}>
                      {branch}
                    </option>
                  ))}
                </select>
              </div>

              {/* BRANCH B */}
              <div>
                <label
                  htmlFor="branchB"
                  className="mb-2 block text-sm font-medium text-slate-200"
                >
                  Branch B
                </label>

                <select
                  id="branchB"
                  value={branchB}
                  onChange={(e) => setBranchB(e.target.value)}
                  className="w-full rounded-xl border border-white/[0.1] bg-[#111827] px-4 py-3.5 text-sm text-white outline-none transition focus:border-violet-400/50 focus:ring-2 focus:ring-violet-500/10"
                >
                  {branches.map((branch) => (
                    <option key={branch} value={branch}>
                      {branch}
                    </option>
                  ))}
                </select>
              </div>
            </div>
          </div>

          {/* COMPARISON */}
          <div className="mt-8 overflow-hidden rounded-2xl border border-white/[0.08] bg-[#0d1320]/80 shadow-[0_25px_80px_rgba(0,0,0,0.2)]">
            {/* HEADER */}
            <div className="grid grid-cols-[1fr_1fr_1fr] border-b border-white/[0.08]">
              <div className="bg-white/[0.02] p-5">
                <p className="text-xs font-semibold uppercase tracking-[0.16em] text-slate-500">
                  Comparison
                </p>
              </div>

              <div className="border-l border-white/[0.07] bg-violet-500/[0.04] p-5">
                <p className="text-xs font-semibold uppercase tracking-[0.16em] text-violet-400">
                  Branch A
                </p>

                <h2 className="mt-2 text-xl font-semibold text-white">
                  {branchA}
                </h2>
              </div>

              <div className="border-l border-white/[0.07] bg-blue-500/[0.04] p-5">
                <p className="text-xs font-semibold uppercase tracking-[0.16em] text-blue-400">
                  Branch B
                </p>

                <h2 className="mt-2 text-xl font-semibold text-white">
                  {branchB}
                </h2>
              </div>
            </div>

            {/* ROWS */}
            {comparisonRows.map(([label, key]) => (
              <div
                key={label}
                className="grid grid-cols-[1fr_1fr_1fr] border-b border-white/[0.06] last:border-b-0"
              >
                <div className="bg-white/[0.015] p-5">
                  <p className="text-sm font-medium text-slate-300">
                    {label}
                  </p>
                </div>

                <div className="border-l border-white/[0.06] p-5">
                  <p className="text-sm leading-6 text-slate-400">
                    {dataA[key]}
                  </p>
                </div>

                <div className="border-l border-white/[0.06] p-5">
                  <p className="text-sm leading-6 text-slate-400">
                    {dataB[key]}
                  </p>
                </div>
              </div>
            ))}
          </div>

          {/* IMPORTANT NOTE */}
          <div className="mt-8 rounded-2xl border border-violet-400/10 bg-violet-500/[0.04] p-6">
            <p className="text-sm font-semibold text-violet-200">
              Important
            </p>

            <p className="mt-2 text-sm leading-6 text-slate-400">
              There is no universally best engineering branch. Your choice
              should depend on your interests, strengths, preferred type of
              work, learning goals and career plans.
            </p>
          </div>

          {/* DISCLAIMER */}
          <div className="mt-6 rounded-2xl border border-white/[0.07] bg-[#0d1320]/70 p-6">
            <p className="text-sm font-semibold text-slate-200">
              Guidance note
            </p>

            <p className="mt-2 text-sm leading-6 text-slate-500">
              This comparison is intended for educational guidance. Actual
              subjects, job opportunities and career paths can vary by college,
              specialization, industry and individual skills.
            </p>
          </div>
        </div>
      </section>
    </main>
  );
}