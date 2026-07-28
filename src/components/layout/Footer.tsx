import Link from "next/link";
import {
  FaFacebookF,
  FaGithub,
  FaInstagram,
  FaLinkedinIn,
} from "react-icons/fa";

export default function Footer() {
  return (
    <footer className="bg-[#1F4B43] text-white">

      <div className="mx-auto max-w-7xl px-6 py-20">

        <div className="grid gap-12 md:grid-cols-2 lg:grid-cols-4">

          {/* Logo */}

          <div>

            <h2 className="text-3xl font-bold">
              StudyPilot
            </h2>

            <p className="mt-5 leading-8 text-white/70">
              Learn smarter with AI-generated notes, personalized study plans,
              intelligent recommendations, and an AI study assistant.
            </p>

            <div className="mt-8 flex gap-4">

              <a
                href="#"
                className="rounded-full bg-white/10 p-3 transition hover:bg-[#D8A34D]"
              >
                <FaFacebookF size={18} />
              </a>

              <a
                href="#"
                className="rounded-full bg-white/10 p-3 transition hover:bg-[#D8A34D]"
              >
                <FaGithub size={18} />
              </a>

              <a
                href="#"
                className="rounded-full bg-white/10 p-3 transition hover:bg-[#D8A34D]"
              >
                <FaLinkedinIn size={18} />
              </a>

              <a
                href="#"
                className="rounded-full bg-white/10 p-3 transition hover:bg-[#D8A34D]"
              >
                <FaInstagram size={18} />
              </a>

            </div>

          </div>

          {/* Quick Links */}

          <div>

            <h3 className="mb-6 text-xl font-semibold">
              Quick Links
            </h3>

            <ul className="space-y-4 text-white/70">

              <li><Link href="/">Home</Link></li>

              <li><Link href="/explore">Explore</Link></li>

              <li><Link href="/about">About</Link></li>

              <li><Link href="/contact">Contact</Link></li>

            </ul>

          </div>

          {/* AI Features */}

          <div>

            <h3 className="mb-6 text-xl font-semibold">
              AI Features
            </h3>

            <ul className="space-y-4 text-white/70">

              <li>AI Notes Generator</li>

              <li>Study Planner</li>

              <li>AI Chat Assistant</li>

              <li>Learning Analytics</li>

            </ul>

          </div>

          {/* Contact */}

          <div>

            <h3 className="mb-6 text-xl font-semibold">
              Contact
            </h3>

            <ul className="space-y-4 text-white/70">

              <li>support@studypilot.ai</li>

              <li>+880 1700-000000</li>

              <li>Dhaka, Bangladesh</li>

            </ul>

          </div>

        </div>

        <div className="mt-16 border-t border-white/10 pt-8 text-center text-white/60">

          © {new Date().getFullYear()} StudyPilot. All rights reserved.

        </div>

      </div>

    </footer>
  );
}