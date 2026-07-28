"use client";

import Link from "next/link";
import { Menu, X, User, LogOut } from "lucide-react";
import { useEffect, useState } from "react";
import { useUserSession } from "@/hooks/use-user-session";
import { authClient } from "../../../lib/auth-client"; 

const guestNavItems = [
  { name: "Home", href: "/" },
  { name: "Explore", href: "/explore" },
  { name: "AI Studio", href: "/ai" },
  { name: "About", href: "/about" },
];

const userNavItems = [
  { name: "Home", href: "/" },
  { name: "Explore", href: "/explore" },
  { name: "AI Studio", href: "/ai" },
  { name: "Saved Notes", href: "/saved" },
  { name: "Dashboard", href: "/dashboard" },
  { name: "About", href: "/about" },
];

export default function Navbar() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  const { data: session, isLoading } = useUserSession();
  const currentNavItems = session?.user ? userNavItems : guestNavItems;

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const handleSignOut = async () => {
    await authClient.signOut({
      fetchOptions: {
        onSuccess: () => {
          window.location.href = "/"; 
        },
      },
    });
  };

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

        {/* Desktop Navigation */}
        <nav className="hidden lg:flex items-center gap-14">
          {currentNavItems.map((item) => (
            <Link
              key={item.name}
              href={item.href}
              className="text-[18px] font-medium text-[#2D2A26] transition hover:text-[#D8A34D]"
            >
              {item.name}
            </Link>
          ))}
        </nav>

        {/* Right Side Actions */}
        <div className="hidden lg:flex items-center gap-6">
          {isLoading ? (
            <div className="h-12 w-36 animate-pulse rounded-full bg-[#E8E1D5]/50" />
          ) : session?.user ? (
            <div className="flex items-center gap-4">
              <div className="flex items-center gap-3 rounded-full border border-[#EEE8DE] bg-white/80 px-4 py-2 shadow-xs">
                <div className="flex h-8 w-8 items-center justify-center rounded-full bg-[#1F4B43] text-sm font-bold text-white">
                  {session.user.name?.[0]?.toUpperCase() || <User size={16} />}
                </div>
                <span className="text-sm font-semibold text-[#2D2A26]">
                  {session.user.name}
                </span>
              </div>

              <button
                onClick={handleSignOut}
                className="flex items-center gap-2 rounded-full border border-[#EEE8DE] px-5 py-3 text-sm font-semibold text-[#6F665B] transition hover:bg-red-50 hover:text-red-600"
                title="Sign Out"
              >
                <LogOut size={16} />
                <span>Logout</span>
              </button>
            </div>
          ) : (
            /* Guest / Unauthenticated State */
            <>
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
            </>
          )}
        </div>

        {/* Mobile Toggle Button */}
        <button
          onClick={() => setMobileOpen(!mobileOpen)}
          className="lg:hidden text-[#1F4B43]"
          aria-label="Toggle navigation menu"
        >
          {mobileOpen ? <X size={30} /> : <Menu size={30} />}
        </button>
      </div>

      {/* Mobile Menu */}
      {mobileOpen && (
        <div className="border-t border-[#E8E1D5] bg-[#FFFDF9] px-8 py-6 shadow-lg lg:hidden">
          <div className="flex flex-col gap-5">
            {currentNavItems.map((item) => (
              <Link
                key={item.name}
                href={item.href}
                className="text-lg font-medium text-[#2D2A26] hover:text-[#D8A34D]"
                onClick={() => setMobileOpen(false)}
              >
                {item.name}
              </Link>
            ))}

            <hr className="my-1 border-[#E8E1D5]" />

            {session?.user ? (
              <div className="flex flex-col gap-4">
                <div className="flex items-center gap-3">
                  <div className="flex h-9 w-9 items-center justify-center rounded-full bg-[#1F4B43] font-bold text-white">
                    {session.user.name?.[0]?.toUpperCase() || <User size={18} />}
                  </div>
                  <div>
                    <p className="text-sm font-bold text-[#2D2A26]">{session.user.name}</p>
                    <p className="text-xs text-[#6F665B]">{session.user.email}</p>
                  </div>
                </div>

                <button
                  onClick={() => {
                    setMobileOpen(false);
                    handleSignOut();
                  }}
                  className="flex items-center justify-center gap-2 rounded-full border border-red-200 bg-red-50 py-3 font-semibold text-red-600"
                >
                  <LogOut size={18} />
                  <span>Sign Out</span>
                </button>
              </div>
            ) : (
              <div className="flex flex-col gap-3">
                <Link
                  href="/login"
                  onClick={() => setMobileOpen(false)}
                  className="text-center font-semibold text-[#1F4B43]"
                >
                  Login
                </Link>

                <Link
                  href="/register"
                  onClick={() => setMobileOpen(false)}
                  className="rounded-full bg-[#1F4B43] py-3 text-center font-semibold text-white hover:bg-[#173932]"
                >
                  Start Learning
                </Link>
              </div>
            )}
          </div>
        </div>
      )}
    </header>
  );
}