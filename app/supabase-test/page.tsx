
"use client";

import { useState } from "react";
import { supabase } from "../lib/supabase";

export default function SupabaseTestPage() {
  const [message, setMessage] = useState("Not tested yet");
  const [loading, setLoading] = useState(false);

  async function testConnection() {
    setLoading(true);
    setMessage("Checking Supabase...");

    try {
      const { error } = await supabase.auth.getSession();

      if (error) {
        setMessage(`Supabase returned an error: ${error.message}`);
      } else {
        setMessage("Connection successful! Supabase Auth responded.");
      }
    } catch {
      setMessage(
        "Could not connect. Check your internet connection and Supabase settings."
      );
    } finally {
      setLoading(false);
    }
  }

  return (
    <main className="min-h-screen bg-slate-950 p-8 text-white">
      <div className="mx-auto max-w-xl rounded-2xl border border-slate-700 bg-slate-900 p-8">
        <h1 className="mb-4 text-2xl font-bold">
          YOUR GUIDE — Supabase Test
        </h1>

        <p className="mb-6 text-slate-300">
          Click below to check whether Supabase Auth responds.
        </p>

        <button
          onClick={testConnection}
          disabled={loading}
          className="rounded-lg bg-blue-600 px-5 py-3 font-semibold hover:bg-blue-500 disabled:opacity-50"
        >
          {loading ? "Testing..." : "Test Supabase Connection"}
        </button>

        <p className="mt-6 break-words text-sm" role="status">
          {message}
        </p>
      </div>
    </main>
  );
}
