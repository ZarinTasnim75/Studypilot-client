"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import {
  Sparkles,
  Brain,
  Target,
  BookOpen,
  Award,
  Zap,
  ArrowRight,
  CheckCircle2,
} from "lucide-react";

export default function AboutPage() {
  return (
    <div className="relative min-h-screen overflow-hidden bg-[#F8F4EC] text-[#2D2A26]">
      {/* Decorative Background Blur Shapes */}
      <div className="absolute left-[-180px] top-20 h-[500px] w-[500px] rounded-full bg-[#EFE3D0] opacity-30 blur-3xl" />
      <div className="absolute right-[-200px] top-[40%] h-[550px] w-[550px] rounded-full bg-[#F5EBDD] opacity-30 blur-3xl" />

      {/* 1. HERO SECTION */}
      <section className="relative px-4 pt-16 pb-12 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-5xl text-center">
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="inline-flex items-center gap-2 rounded-full bg-white px-5 py-2 text-sm font-semibold text-[#D8A34D] shadow-sm"
          >
            <Sparkles size={16} />
            <span>Our Mission & Story</span>
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.1 }}
            className="mt-6 text-4xl font-extrabold leading-[1.15] text-[#2D2A26] sm:text-5xl md:text-6xl"
          >
            Empowering Students to <br />
            <span className="text-[#1F4B43]">Learn Smarter</span>, Not Harder
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.2 }}
            className="mx-auto mt-6 max-w-2xl text-lg leading-relaxed text-[#6F665B]"
          >
            StudyPilot was built to bridge the gap between complex academic
            materials and effortless retention. We harness AI to transform
            how students generate notes, prepare for exams, and master new subjects.
          </motion.p>
        </div>
      </section>

      {/* 2. STATS OVERVIEW */}
      <section className="px-4 py-8 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-6xl">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
            className="grid grid-cols-2 gap-6 rounded-3xl border border-[#EEE8DE] bg-white/80 p-8 shadow-sm backdrop-blur-md md:grid-cols-4"
          >
            <StatCard number="12K+" label="AI Notes Generated" />
            <StatCard number="120+" label="Subjects Supported" />
            <StatCard number="95%" label="Satisfaction Rate" />
            <StatCard number="24/7" label="Instant AI Companion" />
          </motion.div>
        </div>
      </section>

      {/* 3. OUR STORY / WHY STUDYPILOT */}
      <section className="px-4 py-16 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-6xl">
          <div className="grid grid-cols-1 items-center gap-12 lg:grid-cols-2">
            {/* Left Copy */}
            <motion.div
              initial={{ opacity: 0, x: -40 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
            >
              <span className="text-xs font-bold uppercase tracking-widest text-[#D8A34D]">
                Why StudyPilot Exists
              </span>
              <h2 className="mt-3 text-3xl font-extrabold text-[#2D2A26] sm:text-4xl">
                Built by Students, Powered by Cutting-Edge AI
              </h2>
              <p className="mt-4 text-base leading-relaxed text-[#6F665B]">
                Traditional studying often means spending hours organizing messy lecture 
                slides and textbook chapters before you even begin learning. 
                StudyPilot eliminates that administrative friction.
              </p>
              <p className="mt-4 text-base leading-relaxed text-[#6F665B]">
                Whether you&apos;re reviewing complex concepts or preparing for final exams, 
                our platform delivers structured summaries, interactive study guides, and 
                personalized paths tailored directly to your workflow.
              </p>

              <div className="mt-6 space-y-3">
                {[
                  "Instant structured note generation from any topic",
                  "Smart exam readiness assessments and key summaries",
                  "Distraction-free, warm workspace designed for focus",
                ].map((item, idx) => (
                  <div key={idx} className="flex items-center gap-3">
                    <CheckCircle2 className="h-5 w-5 flex-shrink-0 text-[#1F4B43]" />
                    <span className="text-sm font-semibold text-[#2D2A26]">
                      {item}
                    </span>
                  </div>
                ))}
              </div>
            </motion.div>

            {/* Right Card Illustration/Highlight */}
            <motion.div
              initial={{ opacity: 0, x: 40 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
              className="relative rounded-3xl border border-[#EEE8DE] bg-white p-8 shadow-xl"
            >
              <div className="flex items-center justify-between border-b border-[#EEE8DE] pb-6">
                <div>
                  <h3 className="text-xl font-bold text-[#1F4B43]">
                    The StudyPilot Difference
                  </h3>
                  <p className="text-xs text-[#6F665B]">Active Learning Matrix</p>
                </div>
                <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-[#F8F4EC] text-[#D8A34D]">
                  <Brain size={24} />
                </div>
              </div>

              <div className="mt-6 space-y-4">
                <FeatureRow
                  icon={<Zap size={18} className="text-[#D8A34D]" />}
                  title="10x Faster Preparation"
                  desc="Turn dense materials into actionable flashcards and summaries instantly."
                />
                <FeatureRow
                  icon={<Target size={18} className="text-[#1F4B43]" />}
                  title="Targeted Weak-Spot Assessment"
                  desc="AI identifies what you haven't mastered yet and fills knowledge gaps."
                />
                <FeatureRow
                  icon={<Award size={18} className="text-[#D8A34D]" />}
                  title="Proven Retention Techniques"
                  desc="Leverages spaced repetition and active recall principles."
                />
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* 4. CORE VALUES / PILLARS */}
      <section className="px-4 py-16 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-6xl">
          <div className="text-center">
            <span className="text-xs font-bold uppercase tracking-widest text-[#D8A34D]">
              Our Guiding Principles
            </span>
            <h2 className="mt-2 text-3xl font-extrabold text-[#2D2A26] sm:text-4xl">
              Designed Around Your Success
            </h2>
          </div>

          <div className="mt-12 grid grid-cols-1 gap-8 md:grid-cols-3">
            <ValueCard
              icon={<BookOpen className="h-6 w-6 text-[#1F4B43]" />}
              title="Clarity First"
              desc="We strip away visual clutter and overwhelming jargon so you can focus entirely on understanding core concepts."
            />
            <ValueCard
              icon={<Brain className="h-6 w-6 text-[#D8A34D]" />}
              title="Adaptive Intelligence"
              desc="Our AI models adapt to your personal pace, providing explanations at the exact difficulty level you need."
            />
            <ValueCard
              icon={<Target className="h-6 w-6 text-[#1F4B43]" />}
              title="Outcome Driven"
              desc="Every feature is designed with one objective in mind: helping you succeed in your exams and coursework."
            />
          </div>
        </div>
      </section>

      {/* 5. CALL TO ACTION */}
      <section className="px-4 py-16 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-5xl">
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="relative overflow-hidden rounded-3xl bg-[#1F4B43] px-6 py-16 text-center text-white shadow-2xl sm:px-12"
          >
            {/* Background Glow inside CTA */}
            <div className="absolute right-[-100px] top-[-100px] h-[300px] w-[300px] rounded-full bg-[#D8A34D] opacity-20 blur-3xl" />

            <h2 className="text-3xl font-extrabold sm:text-4xl">
              Ready to Upgrade Your Study Routine?
            </h2>
            <p className="mx-auto mt-4 max-w-xl text-base text-[#EEE8DE]">
              Join thousands of students generating study guides, mastering topics, and acing their exams with StudyPilot.
            </p>

            <div className="mt-8 flex flex-wrap justify-center gap-4">
              <Link
                href="/register"
                className="flex items-center gap-2 rounded-full bg-[#D8A34D] px-8 py-3.5 text-sm font-bold text-[#2D2A26] transition-all hover:bg-[#c7923c] hover:scale-105"
              >
                Get Started Free
                <ArrowRight size={18} />
              </Link>

              <Link
                href="/explore"
                className="rounded-full border border-[#EEE8DE]/30 bg-white/10 px-8 py-3.5 text-sm font-bold text-white backdrop-blur-sm transition-all hover:bg-white/20 hover:scale-105"
              >
                Explore Notes
              </Link>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
}

/* HELPER COMPONENTS */

function StatCard({ number, label }: { number: string; label: string }) {
  return (
    <div className="text-center">
      <h3 className="text-3xl font-extrabold text-[#1F4B43] sm:text-4xl">
        {number}
      </h3>
      <p className="mt-1 text-xs font-semibold text-[#6F665B] sm:text-sm">
        {label}
      </p>
    </div>
  );
}

function FeatureRow({
  icon,
  title,
  desc,
}: {
  icon: React.ReactNode;
  title: string;
  desc: string;
}) {
  return (
    <div className="flex gap-4 rounded-2xl border border-[#EEE8DE] bg-[#F8F4EC]/60 p-4">
      <div className="mt-1 flex h-8 w-8 flex-shrink-0 items-center justify-center rounded-xl bg-white shadow-sm">
        {icon}
      </div>
      <div>
        <h4 className="text-sm font-bold text-[#2D2A26]">{title}</h4>
        <p className="mt-1 text-xs text-[#6F665B]">{desc}</p>
      </div>
    </div>
  );
}

function ValueCard({
  icon,
  title,
  desc,
}: {
  icon: React.ReactNode;
  title: string;
  desc: string;
}) {
  return (
    <motion.div
      whileHover={{ y: -5 }}
      className="rounded-3xl border border-[#EEE8DE] bg-white p-8 shadow-sm transition-all"
    >
      <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-[#F8F4EC]">
        {icon}
      </div>
      <h3 className="mt-6 text-xl font-bold text-[#2D2A26]">{title}</h3>
      <p className="mt-3 text-sm leading-relaxed text-[#6F665B]">{desc}</p>
    </motion.div>
  );
}