"use client";

import Link from "next/link";
import { Menu, X } from "lucide-react";
import { useEffect, useState } from "react";

const navItems = [
  { name: "Home", href: "/" },
  { name: "Explore", href: "/explore" },
  { name: "AI Studio", href: "/ai" },
  { name: "About", href: "/about" },
];

export default function Navbar() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);

    window.addEventListener("scroll", onScroll);

    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header
      className={`fixed top-0 left-0 z-50 w-full transition-all duration-300 ${
        scrolled
          ? "bg-[#FFFDF9]/95 backdrop-blur-md shadow-sm"
          : "bg-transparent"
      }`}
    >
      <div className="mx-auto flex h-24 w-full items-center justify-between px-8 lg:px-16 xl:px-24">
        {/* Logo */}

        <Link href="/" className="shrink-0">
          <div>
            <h1 className="text-4xl font-bold leading-none text-[#1F4B43]">
              StudyPilot
            </h1>

            <p className="mt-2 text-xs uppercase tracking-[0.45em] text-[#D8A34D]">
              AI Learning
            </p>
          </div>
        </Link>

        {/* Navigation */}

        <nav className="hidden lg:flex items-center gap-14">
          {navItems.map((item) => (
            <Link
              key={item.name}
              href={item.href}
              className="text-[18px] font-medium text-[#2D2A26] transition hover:text-[#D8A34D]"
            >
              {item.name}
            </Link>
          ))}
        </nav>

        {/* Right Side */}

        <div className="hidden lg:flex items-center gap-8">
          <Link
            href="/login"
            className="text-[18px] font-medium text-[#1F4B43] hover:text-[#D8A34D]"
          >
            Login
          </Link>

          <Link
            href="/register"
            className="rounded-full bg-[#1F4B43] px-9 py-4 text-[17px] font-semibold text-white transition duration-300 hover:bg-[#173932]"
          >
            Start Learning
          </Link>
        </div>

        {/* Mobile */}

        <button
          onClick={() => setMobileOpen(!mobileOpen)}
          className="lg:hidden"
        >
          {mobileOpen ? <X size={30} /> : <Menu size={30} />}
        </button>
      </div>

      {/* Mobile Menu */}

      {mobileOpen && (
        <div className="border-t border-[#E8E1D5] bg-white px-8 py-6 lg:hidden">
          <div className="flex flex-col gap-5">
            {navItems.map((item) => (
              <Link
                key={item.name}
                href={item.href}
                onClick={() => setMobileOpen(false)}
              >
                {item.name}
              </Link>
            ))}

            <Link href="/login">Login</Link>

            <Link
  href="/register"
  className="btn rounded-full bg-[#1F4B43] border-none text-white hover:bg-[#173932]"
>
  Start Learning
</Link>
          </div>
        </div>
      )}
    </header>
  );
}