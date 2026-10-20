import Link from "next/link";

export default function AdminPage() {
  return (
    <main className="min-h-screen bg-[#070b14] text-white">
      {/* NAVBAR */}
      <header className="border-b border-white/[0.07] bg-[#070b14]/90 backdrop-blur-xl">
        <div className="mx-auto flex h-[72px] max-w-7xl items-center justify-between px-6 lg:px-8">
          <Link
            href="/"
            className="flex items-center gap-3 transition-opacity hover:opacity-80"
          >
            <div className="flex h-9 w-9 items-center justify-center rounded-lg border border-slate-400/20 bg-white/[0.04]">
              <span className="text-sm font-bold text-slate-300">Y</span>
            </div>

            <span className="text-[15px] font-semibold tracking-[-0.02em]">
              YOUR GUIDE
            </span>
          </Link>

          <Link
            href="/"
            className="rounded-xl border border-white/[0.1] bg-white/[0.035] px-4 py-2.5 text-sm font-medium text-slate-300 transition hover:bg-white/[0.06] hover:text-white"
          >
            Home
          </Link>
        </div>
      </header>

      {/* MAIN */}
      <section className="relative overflow-hidden">
        <div className="pointer-events-none absolute left-1/2 top-[-250px] h-[500px] w-[800px] -translate-x-1/2 rounded-full bg-slate-500/[0.06] blur-[150px]" />

        <div className="relative mx-auto max-w-5xl px-6 pb-24 pt-16 lg:px-8 lg:pt-24">
          {/* HEADING */}
          <div className="max-w-3xl">
            <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-white/[0.1] bg-white/[0.035] px-4 py-2 text-xs font-medium text-slate-300">
              <span className="h-1.5 w-1.5 rounded-full bg-slate-400" />
              Administration
            </div>

            <h1 className="text-4xl font-semibold tracking-[-0.045em] text-white sm:text-5xl">
              Manage YOUR GUIDE data.
            </h1>

            <p className="mt-5 max-w-2xl text-base leading-7 text-slate-400 sm:text-lg">
              This area will be used to manage cutoff datasets and other
              application data.
            </p>
          </div>

          {/* DATA MANAGEMENT CARD */}
          <div className="mt-12 rounded-2xl border border-white/[0.08] bg-[#0d1320]/85 p-6 shadow-[0_25px_80px_rgba(0,0,0,0.25)] backdrop-blur-xl sm:p-8">
            <div className="flex flex-col gap-6 sm:flex-row sm:items-start sm:justify-between">
              <div>
                <p className="text-xs font-semibold uppercase tracking-[0.18em] text-slate-500">
                  Cutoff data
                </p>

                <h2 className="mt-3 text-2xl font-semibold tracking-[-0.03em] text-white">
                  Dataset management
                </h2>

                <p className="mt-3 max-w-2xl text-sm leading-6 text-slate-400">
                  Upload and manage the real AP EAMCET engineering and
                  pharmacy cutoff datasets used by the predictors.
                </p>
              </div>

              <span className="shrink-0 rounded-lg border border-amber-400/15 bg-amber-400/[0.06] px-3 py-1.5 text-xs font-medium text-amber-300">
                Coming next
              </span>
            </div>

            <div className="mt-8 grid gap-4 md:grid-cols-2">
              {/* ENGINEERING */}
              <div className="rounded-xl border border-white/[0.07] bg-white/[0.02] p-5">
                <p className="text-sm font-semibold text-white">
                  Engineering Cutoffs
                </p>

                <p className="mt-2 text-sm leading-6 text-slate-500">
                  Dataset for engineering college prediction, including
                  branch, category, gender and closing-rank information.
                </p>

                <div className="mt-5 rounded-lg border border-dashed border-white/[0.1] px-4 py-3 text-center text-xs text-slate-600">
                  Dataset upload will be added later
                </div>
              </div>

              {/* PHARMACY */}
              <div className="rounded-xl border border-white/[0.07] bg-white/[0.02] p-5">
                <p className="text-sm font-semibold text-white">
                  Pharmacy Cutoffs
                </p>

                <p className="mt-2 text-sm leading-6 text-slate-500">
                  Dataset for pharmacy college prediction, including course,
                  category, gender and closing-rank information.
                </p>

                <div className="mt-5 rounded-lg border border-dashed border-white/[0.1] px-4 py-3 text-center text-xs text-slate-600">
                  Dataset upload will be added later
                </div>
              </div>
            </div>
          </div>

          {/* IMPORTANT */}
          <div className="mt-6 rounded-2xl border border-white/[0.07] bg-white/[0.02] p-6">
            <p className="text-sm font-semibold text-slate-200">
              Important
            </p>

            <p className="mt-2 text-sm leading-6 text-slate-500">
              YOUR GUIDE will use only the cutoff data provided by the
              administrator. No fictional college or cutoff information will
              be added to the predictor.
            </p>
          </div>
        </div>
      </section>
    </main>
  );
}