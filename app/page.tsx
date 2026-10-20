const tools = [
  {
    number: "01",
    title: "Engineering Predictor",
    description:
      "Explore estimated AP EAMCET engineering college options using your rank, branch, category and gender.",
    href: "/engineering",
    button:
      "border-blue-400/20 bg-blue-500/10 text-blue-300 hover:border-blue-400/40 hover:bg-blue-500/15",
    glow: "bg-blue-500/10",
  },
  {
    number: "02",
    title: "Pharmacy Predictor",
    description:
      "Find estimated pharmacy college options based on your AP EAMCET rank and counselling preferences.",
    href: "/pharmacy",
    button:
      "border-emerald-400/20 bg-emerald-500/10 text-emerald-300 hover:border-emerald-400/40 hover:bg-emerald-500/15",
    glow: "bg-emerald-500/10",
  },
  {
    number: "03",
    title: "Branch Comparison",
    description:
      "Compare engineering branches across subjects, programming, careers, skills and future opportunities.",
    href: "/comparison",
    button:
      "border-violet-400/20 bg-violet-500/10 text-violet-300 hover:border-violet-400/40 hover:bg-violet-500/15",
    glow: "bg-violet-500/10",
  },
];

export default function Home() {
  return (
    <main className="min-h-screen overflow-hidden bg-[#070b14] text-white">
      {/* Background */}
      <div className="pointer-events-none fixed inset-0 -z-0 overflow-hidden">
        <div className="absolute left-1/2 top-[-320px] h-[700px] w-[1000px] -translate-x-1/2 rounded-full bg-blue-600/[0.08] blur-[160px]" />

        <div className="absolute right-[-300px] top-[30%] h-[600px] w-[600px] rounded-full bg-violet-600/[0.04] blur-[160px]" />

        <div className="absolute bottom-[-300px] left-[-250px] h-[600px] w-[600px] rounded-full bg-emerald-600/[0.03] blur-[160px]" />
      </div>

      {/* Navbar */}
      <header className="relative z-20 border-b border-white/[0.07] bg-[#070b14]/80 backdrop-blur-xl">
        <div className="mx-auto flex h-[72px] max-w-7xl items-center justify-between px-6 lg:px-8">
          {/* Logo */}
          <a href="/" className="group flex items-center gap-3">
            <div className="flex h-9 w-9 items-center justify-center rounded-lg border border-blue-400/20 bg-blue-500/10 transition-colors group-hover:bg-blue-500/15">
              <span className="text-sm font-bold text-blue-300">Y</span>
            </div>

            <span className="text-[15px] font-semibold tracking-[-0.02em] text-white">
              YOUR GUIDE
            </span>
          </a>

          {/* Desktop Navigation */}
          <nav className="hidden items-center gap-8 text-sm md:flex">
            <a
              href="/"
              className="font-medium text-white transition-colors hover:text-blue-300"
            >
              Home
            </a>

            <a
              href="/tools"
              className="font-medium text-slate-400 transition-colors hover:text-white"
            >
              All Tools
            </a>

            <a
              href="/quick-links"
              className="font-medium text-slate-400 transition-colors hover:text-white"
            >
              Quick Links
            </a>

            <a
              href="/admin"
              className="font-medium text-slate-400 transition-colors hover:text-white"
            >
              Admin
            </a>
          </nav>

          {/* Navbar Button */}
          <a
            href="/tools"
            className="rounded-xl border border-blue-400/20 bg-blue-500/10 px-5 py-2.5 text-sm font-semibold text-blue-300 transition-all duration-200 hover:border-blue-400/40 hover:bg-blue-500/15 hover:text-blue-200"
          >
            Explore Tools
          </a>
        </div>
      </header>

      {/* Hero */}
      <section className="relative z-10">
        <div className="mx-auto max-w-7xl px-6 pb-28 pt-24 lg:px-8 lg:pb-36 lg:pt-32">
          <div className="max-w-4xl">
            {/* Badge */}
            <div className="mb-8 inline-flex items-center gap-2 rounded-full border border-white/[0.09] bg-white/[0.035] px-4 py-2 text-xs font-medium text-slate-300 backdrop-blur-xl">
              <span className="h-1.5 w-1.5 rounded-full bg-blue-400 shadow-[0_0_12px_rgba(96,165,250,0.8)]" />

              Student guidance platform
            </div>

            {/* Heading */}
            <h1 className="text-5xl font-semibold leading-[1.04] tracking-[-0.055em] text-white sm:text-6xl lg:text-[76px]">
              Make smarter decisions

              <span className="mt-2 block bg-gradient-to-r from-blue-200 via-blue-400 to-indigo-400 bg-clip-text text-transparent">
                about your future.
              </span>
            </h1>

            {/* Description */}
            <p className="mt-8 max-w-2xl text-base leading-7 text-slate-400 sm:text-lg">
              YOUR GUIDE helps students understand college options,
              compare engineering branches, and make informed academic
              decisions with clarity.
            </p>

            {/* Hero Buttons */}
            <div className="mt-10 flex flex-col gap-3 sm:flex-row">
              <a
                href="/tools"
                className="rounded-xl bg-blue-500 px-6 py-3.5 text-center text-sm font-semibold text-white shadow-[0_0_35px_rgba(59,130,246,0.14)] transition-all duration-200 hover:bg-blue-400 hover:shadow-[0_0_45px_rgba(59,130,246,0.2)]"
              >
                Explore tools
              </a>

<a
  href="#how-it-works"
  className="text-sm text-slate-400 transition hover:text-white"
>
  Quick Links
</a>
            </div>
          </div>
        </div>
      </section>

      {/* Tools Section */}
      <section className="relative z-10 border-t border-white/[0.06]">
        <div className="mx-auto max-w-7xl px-6 py-24 lg:px-8">
          {/* Section Heading */}
          <div className="max-w-2xl">
            <p className="text-xs font-semibold uppercase tracking-[0.2em] text-blue-400">
              Your tools
            </p>

            <h2 className="mt-4 text-3xl font-semibold tracking-[-0.035em] text-white sm:text-4xl">
              Everything you need to make a better choice
            </h2>

            <p className="mt-5 text-base leading-7 text-slate-400">
              Focused tools designed to make important academic
              decisions easier to understand.
            </p>
          </div>

          {/* Tool Cards */}
          <div className="mt-14 grid gap-5 md:grid-cols-2 lg:grid-cols-3">
            {tools.map((tool) => (
              <div
                key={tool.number}
                className="group relative overflow-hidden rounded-2xl border border-white/[0.08] bg-[#0d1320]/80 p-7 backdrop-blur-xl transition-all duration-300 ease-out hover:-translate-y-1 hover:border-white/[0.14] hover:bg-[#101827] hover:shadow-[0_24px_70px_rgba(0,0,0,0.3)]"
              >
                {/* Top Highlight */}
                <div className="absolute inset-x-8 top-0 h-px bg-gradient-to-r from-transparent via-white/10 to-transparent" />

                {/* Hover Glow */}
                <div
                  className={`absolute -right-24 -top-24 h-48 w-48 rounded-full opacity-0 blur-[80px] transition-opacity duration-500 group-hover:opacity-100 ${tool.glow}`}
                />

                <div className="relative">
                  {/* Card Header */}
                  <div className="flex items-center justify-between">
                    <div className="flex h-10 w-10 items-center justify-center rounded-xl border border-white/[0.06] bg-white/[0.04]">
                      <span className="text-xs font-bold text-slate-300">
                        {tool.number}
                      </span>
                    </div>

                    <span className="text-lg text-slate-600 transition-all duration-300 group-hover:translate-x-1 group-hover:text-white">
                      →
                    </span>
                  </div>

                  {/* Title */}
                  <h3 className="mt-9 text-xl font-semibold tracking-[-0.025em] text-white">
                    {tool.title}
                  </h3>

                  {/* Description */}
                  <p className="mt-3 min-h-[72px] text-sm leading-6 text-slate-400">
                    {tool.description}
                  </p>

                  {/* Actual Tool Button */}
                  <a
                    href={tool.href}
                    className={`mt-8 flex w-full items-center justify-center gap-2 rounded-xl border px-5 py-3 text-sm font-semibold transition-all duration-300 hover:shadow-lg ${tool.button}`}
                  >
                    Open {tool.title}

                    <span className="transition-transform duration-300 group-hover:translate-x-1">
                      →
                    </span>
                  </a>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section
        id="how-it-works"
        className="relative z-10 border-y border-white/[0.06] bg-white/[0.015]"
      >
        <div className="mx-auto max-w-7xl px-6 py-24 lg:px-8">
          <div className="max-w-2xl">
            <p className="text-xs font-semibold uppercase tracking-[0.2em] text-blue-400">
              How it works
            </p>

            <h2 className="mt-4 text-3xl font-semibold tracking-[-0.035em] text-white sm:text-4xl">
              Simple from start to finish
            </h2>

            <p className="mt-5 text-base leading-7 text-slate-400">
              A simple workflow designed to keep important decisions
              clear and easy to understand.
            </p>
          </div>

          <div className="mt-14 grid gap-6 md:grid-cols-3">
            {/* Step 1 */}
            <div className="rounded-2xl border border-white/[0.07] bg-white/[0.02] p-7 transition-all duration-300 hover:border-blue-400/20 hover:bg-blue-500/[0.025]">
              <span className="text-xs font-semibold tracking-[0.15em] text-blue-400">
                01
              </span>

              <h3 className="mt-5 text-lg font-semibold text-white">
                Enter your details
              </h3>

              <p className="mt-3 text-sm leading-6 text-slate-400">
                Provide your rank and select the preferences required
                by the tool.
              </p>
            </div>

            {/* Step 2 */}
            <div className="rounded-2xl border border-white/[0.07] bg-white/[0.02] p-7 transition-all duration-300 hover:border-emerald-400/20 hover:bg-emerald-500/[0.025]">
              <span className="text-xs font-semibold tracking-[0.15em] text-emerald-400">
                02
              </span>

              <h3 className="mt-5 text-lg font-semibold text-white">
                Review your options
              </h3>

              <p className="mt-3 text-sm leading-6 text-slate-400">
                Understand your estimated options through clear and
                structured results.
              </p>
            </div>

            {/* Step 3 */}
            <div className="rounded-2xl border border-white/[0.07] bg-white/[0.02] p-7 transition-all duration-300 hover:border-violet-400/20 hover:bg-violet-500/[0.025]">
              <span className="text-xs font-semibold tracking-[0.15em] text-violet-400">
                03
              </span>

              <h3 className="mt-5 text-lg font-semibold text-white">
                Make an informed choice
              </h3>

              <p className="mt-3 text-sm leading-6 text-slate-400">
                Use the information as guidance while making your
                final academic decision.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Disclaimer */}
      <section className="relative z-10 mx-auto max-w-7xl px-6 py-16 lg:px-8">
        <div className="rounded-2xl border border-white/[0.08] bg-[#0d1320]/70 p-7 backdrop-blur-xl">
          <div className="flex flex-col gap-3 sm:flex-row sm:items-start sm:gap-5">
            <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg border border-amber-400/10 bg-amber-400/5">
              <span className="text-sm text-amber-300">!</span>
            </div>

            <div>
              <p className="text-sm font-semibold text-slate-200">
                Important information
              </p>

              <p className="mt-2 max-w-4xl text-sm leading-6 text-slate-500">
                Results provided by YOUR GUIDE are estimates based on
                available cutoff data. Final admission depends on
                official counselling rules, eligibility, seat
                availability, and the latest information released by
                the relevant authority.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="relative z-10 border-t border-white/[0.06]">
        <div className="mx-auto flex max-w-7xl flex-col gap-3 px-6 py-9 text-sm text-slate-500 sm:flex-row sm:items-center sm:justify-between lg:px-8">
          <p>© 2026 YOUR GUIDE</p>

          <p>Helping students make informed decisions.</p>
        </div>
      </footer>
    </main>
  );
}