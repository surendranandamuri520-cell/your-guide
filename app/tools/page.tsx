import Link from "next/link";

const tools = [
  {
    title: "Engineering College Predictor",
    description:
      "Explore estimated AP EAMCET engineering college options using your rank, branch, gender and category.",
    href: "/engineering",
    accent: "blue",
    label: "AP EAMCET Engineering",
  },
  {
    title: "Pharmacy College Predictor",
    description:
      "Explore estimated pharmacy college options using your AP EAMCET rank, gender, course and category.",
    href: "/pharmacy",
    accent: "emerald",
    label: "AP EAMCET Pharmacy",
  },
  {
    title: "Branch Comparison",
    description:
      "Compare engineering branches based on subjects, programming, careers, skills, higher studies and future relevance.",
    href: "/comparison",
    accent: "violet",
    label: "Career Guidance",
  },
];

export default function ToolsPage() {
  return (
    <main className="min-h-screen bg-[#070b14] text-white">
      {/* NAVBAR */}
      <header className="border-b border-white/[0.07] bg-[#070b14]/90 backdrop-blur-xl">
        <div className="mx-auto flex h-[72px] max-w-7xl items-center justify-between px-6 lg:px-8">
          <Link
            href="/"
            className="flex items-center gap-3 transition-opacity hover:opacity-80"
          >
            <div className="flex h-9 w-9 items-center justify-center rounded-lg border border-blue-400/20 bg-blue-500/10">
              <span className="text-sm font-bold text-blue-300">Y</span>
            </div>

            <span className="text-[15px] font-semibold tracking-[-0.02em]">
              YOUR GUIDE
            </span>
          </Link>

          <Link
            href="/"
            className="rounded-xl border border-white/[0.1] bg-white/[0.035] px-4 py-2.5 text-sm font-medium text-slate-300 transition hover:border-blue-400/30 hover:bg-blue-500/10 hover:text-blue-300"
          >
            Home
          </Link>
        </div>
      </header>

      {/* MAIN */}
      <section className="relative overflow-hidden">
        <div className="pointer-events-none absolute left-1/2 top-[-250px] h-[550px] w-[850px] -translate-x-1/2 rounded-full bg-blue-600/[0.07] blur-[150px]" />

        <div className="relative mx-auto max-w-7xl px-6 pb-24 pt-16 lg:px-8 lg:pt-24">
          {/* HEADING */}
          <div className="max-w-3xl">
            <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-blue-400/15 bg-blue-500/[0.07] px-4 py-2 text-xs font-medium text-blue-300">
              <span className="h-1.5 w-1.5 rounded-full bg-blue-400" />
              YOUR GUIDE Tools
            </div>

            <h1 className="text-4xl font-semibold tracking-[-0.045em] text-white sm:text-5xl">
              Tools built for smarter decisions.
            </h1>

            <p className="mt-5 max-w-2xl text-base leading-7 text-slate-400 sm:text-lg">
              Explore the guidance tools available in YOUR GUIDE and choose
              the one that matches what you want to understand.
            </p>
          </div>

          {/* TOOL GRID */}
          <div className="mt-12 grid gap-5 md:grid-cols-3">
            {tools.map((tool) => {
              const accentClasses = {
                blue: {
                  badge:
                    "border-blue-400/15 bg-blue-500/[0.07] text-blue-300",
                  dot: "bg-blue-400",
                  hover: "group-hover:border-blue-400/25",
                  arrow: "text-blue-300",
                },
                emerald: {
                  badge:
                    "border-emerald-400/15 bg-emerald-500/[0.07] text-emerald-300",
                  dot: "bg-emerald-400",
                  hover: "group-hover:border-emerald-400/25",
                  arrow: "text-emerald-300",
                },
                violet: {
                  badge:
                    "border-violet-400/15 bg-violet-500/[0.07] text-violet-300",
                  dot: "bg-violet-400",
                  hover: "group-hover:border-violet-400/25",
                  arrow: "text-violet-300",
                },
              };

              const accent = accentClasses[
                tool.accent as keyof typeof accentClasses
              ];

              return (
                <Link
                  key={tool.href}
                  href={tool.href}
                  className={`group rounded-2xl border border-white/[0.08] bg-[#0d1320]/80 p-6 shadow-[0_20px_60px_rgba(0,0,0,0.18)] backdrop-blur-xl transition-all duration-200 hover:-translate-y-1 hover:bg-[#101827] ${accent.hover}`}
                >
                  <div
                    className={`inline-flex items-center gap-2 rounded-full border px-3 py-1.5 text-xs font-medium ${accent.badge}`}
                  >
                    <span
                      className={`h-1.5 w-1.5 rounded-full ${accent.dot}`}
                    />
                    {tool.label}
                  </div>

                  <h2 className="mt-7 text-xl font-semibold tracking-[-0.025em] text-white">
                    {tool.title}
                  </h2>

                  <p className="mt-3 text-sm leading-6 text-slate-400">
                    {tool.description}
                  </p>

                  <div
                    className={`mt-7 flex items-center gap-2 text-sm font-medium ${accent.arrow}`}
                  >
                    Open tool
                    <span className="transition-transform duration-200 group-hover:translate-x-1">
                      →
                    </span>
                  </div>
                </Link>
              );
            })}
          </div>

          {/* NOTE */}
          <div className="mt-10 rounded-2xl border border-white/[0.07] bg-white/[0.02] p-6">
            <p className="text-sm font-semibold text-slate-200">
              More guidance, less confusion
            </p>

            <p className="mt-2 max-w-3xl text-sm leading-6 text-slate-500">
              YOUR GUIDE is designed to help students understand their options
              before making important education and career decisions.
            </p>
          </div>

          {/* DISCLAIMER */}
          <div className="mt-6 rounded-2xl border border-white/[0.07] bg-[#0d1320]/70 p-6">
            <p className="text-sm font-semibold text-slate-200">
              Disclaimer
            </p>

            <p className="mt-2 text-sm leading-6 text-slate-500">
              Predictor results are estimates for guidance only. Always verify
              the latest official counselling information, eligibility,
              available seats and applicable cutoff data before making a
              decision.
            </p>
          </div>
        </div>
      </section>
    </main>
  );
}