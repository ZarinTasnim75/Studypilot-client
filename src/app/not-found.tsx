import Link from "next/link";
import { Compass, Home, Search, Sparkles } from "lucide-react";

export default function NotFound() {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-[#F8F4EC] px-4 py-16 text-[#2D2A26]">
      {/* Decorative Background Glows */}
      <div className="absolute left-1/2 top-1/3 -z-10 h-[350px] w-[350px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-[#EFE3D0] opacity-40 blur-3xl" />

      <div className="w-full max-w-md text-center">
        {/* Floating Badge */}
        <div className="mx-auto mb-6 flex h-20 w-20 items-center justify-center rounded-3xl border border-[#EEE8DE] bg-white shadow-sm">
          <Compass className="h-10 w-10 animate-pulse text-[#D8A34D]" />
        </div>

        {/* 404 Heading */}
        <span className="text-xs font-extrabold uppercase tracking-widest text-[#D8A34D]">
          Error 404
        </span>
        <h1 className="mt-2 text-4xl font-extrabold text-[#2D2A26] sm:text-5xl">
          Page Off Course
        </h1>

        <p className="mt-4 text-base leading-relaxed text-[#6F665B]">
          The study module or page you&apos;re looking for couldn&apos;t be found. It might have been moved or doesn&apos;t exist.
        </p>

        {/* Action Buttons */}
        <div className="mt-8 flex flex-col items-center justify-center gap-3 sm:flex-row">
          <Link
            href="/"
            className="flex w-full items-center justify-center gap-2 rounded-full bg-[#1F4B43] px-6 py-3.5 text-sm font-bold text-white transition-all hover:bg-[#173B35] hover:scale-105 sm:w-auto"
          >
            <Home size={18} />
            Back to Home
          </Link>

          <Link
            href="/explore"
            className="flex w-full items-center justify-center gap-2 rounded-full border border-[#EEE8DE] bg-white px-6 py-3.5 text-sm font-bold text-[#2D2A26] transition-all hover:bg-[#F8F4EC] hover:scale-105 sm:w-auto"
          >
            <Search size={18} />
            Explore Notes
          </Link>
        </div>

        {/* Quick Help Card */}
        <div className="mt-12 rounded-2xl border border-[#EEE8DE] bg-white/70 p-5 backdrop-blur-sm">
          <div className="flex items-center justify-center gap-2 text-xs font-bold text-[#1F4B43]">
            <Sparkles size={14} />
            Need Study Assistance?
          </div>
          <p className="mt-1 text-xs text-[#6F665B]">
            Head over to Explore to search through hundreds of AI-generated notes.
          </p>
        </div>
      </div>
    </div>
  );
}