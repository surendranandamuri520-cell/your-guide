"use client";

export default function SupabaseTestPage() {
  return (
    <main className="min-h-screen bg-slate-950 p-8 text-white">
      <div className="mx-auto max-w-xl rounded-2xl border border-slate-700 bg-slate-900 p-8">
        <h1 className="mb-4 text-2xl font-bold">
          YOUR GUIDE — Supabase Test
        </h1>

        <p className="text-slate-300">
          Supabase is not configured for this deployment.
          The connection test is unavailable until the
          database settings are added.
        </p>
      </div>
    </main>
  );
}