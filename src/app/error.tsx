"use client";

import { useEffect } from "react";
import Link from "next/link";
import { AlertTriangle, RefreshCw, Home } from "lucide-react";

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error("Application Runtime Error:", error);
  }, [error]);

  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-[#F8F4EC] px-4 py-16 text-[#2D2A26]">
      {/* Decorative Glow */}
      <div className="absolute left-1/2 top-1/3 -z-10 h-[350px] w-[350px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-red-100/50 opacity-50 blur-3xl" />

      <div className="w-full max-w-md text-center">
        {/* Error Icon Badge */}
        <div className="mx-auto mb-6 flex h-20 w-20 items-center justify-center rounded-3xl border border-red-100 bg-red-50 shadow-sm">
          <AlertTriangle className="h-10 w-10 text-red-500" />
        </div>

        <span className="text-xs font-extrabold uppercase tracking-widest text-red-500">
          Unexpected Turbulence
        </span>
        <h1 className="mt-2 text-3xl font-extrabold text-[#2D2A26] sm:text-4xl">
          Something went wrong
        </h1>

        <p className="mt-4 text-sm leading-relaxed text-[#6F665B]">
          We encountered an unexpected error while loading this page. Don&apos;t worry, your progress is safe.
        </p>

        {/* Optional Error Message Box */}
        {error.message && (
          <div className="mt-4 rounded-xl border border-red-100 bg-white/80 p-3 text-left">
            <p className="font-mono text-xs text-red-600 break-words">
              {error.message}
            </p>
          </div>
        )}

        {/* Actions */}
        <div className="mt-8 flex flex-col items-center justify-center gap-3 sm:flex-row">
          <button
            onClick={() => reset()}
            className="flex w-full items-center justify-center gap-2 rounded-full bg-[#1F4B43] px-6 py-3.5 text-sm font-bold text-white transition-all hover:bg-[#173B35] hover:scale-105 sm:w-auto"
          >
            <RefreshCw size={18} />
            Try Again
          </button>

          <Link
            href="/"
            className="flex w-full items-center justify-center gap-2 rounded-full border border-[#EEE8DE] bg-white px-6 py-3.5 text-sm font-bold text-[#2D2A26] transition-all hover:bg-[#F8F4EC] hover:scale-105 sm:w-auto"
          >
            <Home size={18} />
            Return Home
          </Link>
        </div>
      </div>
    </div>
  );
}