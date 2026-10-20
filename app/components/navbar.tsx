
export default function Navbar() {
  return (
    <header className="border-b border-white/10 bg-[#0b1120]">
      <div className="mx-auto flex max-w-7xl flex-wrap items-center justify-between gap-4 px-5 py-5">
        <a
          href="/"
          className="text-xl font-extrabold tracking-[0.18em] text-white"
          aria-label="YOUR GUIDE home"
        >
          YOUR <span className="text-blue-400">GUIDE</span>
        </a>

        <nav
          aria-label="Main navigation"
          className="flex flex-wrap items-center gap-5 text-sm text-slate-300"
        >
          <a className="transition hover:text-white" href="/">
            Home
          </a>

          <a className="transition hover:text-white" href="/tools">
            All Tools
          </a>

          <a className="transition hover:text-white" href="/engineering">
            Engineering Predictor
          </a>

          <a className="transition hover:text-white" href="/pharmacy">
            Pharmacy Predictor
          </a>

          <a className="transition hover:text-white" href="/comparison">
            Branch Comparison
          </a>

          <a className="transition hover:text-white" href="/admin">
            Admin
          </a>
        </nav>
      </div>
    </header>
  );
}