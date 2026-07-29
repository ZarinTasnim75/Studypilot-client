"use client";

import {
    Bot,
    BrainCircuit,
    FileText,
    Sparkles,
    ArrowRight,
} from "lucide-react";
import Link from "next/link";

const tools = [
    {
        icon: FileText,
        title: "AI Notes Generator",
        description:
            "Convert your lecture materials into organized study notes in seconds.",
        color: "bg-[#F3E8D7]",
    },
    {
        icon: BrainCircuit,
        title: "Smart Study Planner",
        description:
            "Receive a personalized study roadmap based on your goals and progress.",
        color: "bg-[#E8F5F2]",
    },
    {
        icon: Bot,
        title: "AI Study Assistant",
        description:
            "Ask questions, solve problems, and receive instant explanations.",
        color: "bg-[#F8F1D8]",
    },
];

export default function AIStudyStudio() {
    return (
        <section className="bg-[#FFFDF9] py-28">

            <div className="mx-auto max-w-7xl px-6">

                <div className="text-center">

                    <div className="inline-flex items-center rounded-full border border-[#D8A34D]/30 bg-[#fad59a] px-5 py-2">
                        <span className="text-sm font-semibold tracking-wide text-[#624104] uppercase">
                            AI Study Studio
                        </span>
                    </div>

                    <h2 className="mt-5 text-5xl font-bold text-[#2D2A26]">
                        Experience Agentic AI Learning
                    </h2>

                    <p className="mx-auto mt-6 max-w-3xl text-lg leading-8 text-[#6F665B]">
                        Our intelligent AI agents do not just answer questions—they analyze
                        your learning materials, remember your progress, and guide your
                        study journey with personalized recommendations.
                    </p>

                </div>

                <div className="mt-20 grid gap-8 lg:grid-cols-3">

                    {tools.map((tool) => (
                        <div
                            key={tool.title}
                            className="rounded-[30px] border border-[#ECE3D6] bg-white p-8 shadow-sm transition-all duration-300 hover:-translate-y-2 hover:shadow-xl"
                        >
                            <div
                                className={`mb-8 flex h-16 w-16 items-center justify-center rounded-2xl ${tool.color}`}
                            >
                                <tool.icon
                                    className="text-[#1F4B43]"
                                    size={34}
                                />
                            </div>

                            <h3 className="text-2xl font-semibold text-[#2D2A26]">
                                {tool.title}
                            </h3>

                            <p className="mt-4 leading-8 text-[#6F665B]">
                                {tool.description}
                            </p>

                            <Link
                                href="/ai-studio"
                                className="mt-8 inline-flex items-center gap-2 font-semibold text-[#1F4B43] transition hover:gap-3"
                            >
                                Try Demo
                                <ArrowRight size={18} />
                            </Link>

                        </div>
                    ))}

                </div>
                <div className="mt-24 rounded-[40px] bg-[#1F4B43] p-10 lg:p-14">

                    <div className="grid items-center gap-12 lg:grid-cols-2">

                        <div>

                            <Link
                                href="/ai-studio"
                                className="btn mt-8 inline-flex items-center justify-center rounded-full border-none bg-[#D8A34D] px-6 py-3 font-bold text-black hover:bg-[#c9963f]"
                            >
                                <Sparkles size={18} />
                                Live AI Preview
                            </Link>

                            <h3 className="mt-6 text-4xl font-bold text-white">
                                Ask Your AI Study Assistant
                            </h3>

                            <p className="mt-5 leading-8 text-white/80">
                                Upload notes, ask questions, generate summaries,
                                and receive intelligent recommendations powered
                                by Agentic AI.
                            </p>

                            <button className="btn mt-8 rounded-full border-none bg-[#D8A34D] text-black hover:bg-[#c9963f]">
                                Launch AI Workspace
                            </button>

                        </div>

                        <div className="rounded-3xl bg-white p-6">

                            <div className="chat chat-start">

                                <div className="chat-bubble">
                                    Explain Binary Search in simple words.
                                </div>

                            </div>

                            <div className="chat chat-end mt-5">

                                <div className="chat-bubble bg-[#1F4B43] text-white">
                                    Binary Search repeatedly divides a sorted list into
                                    halves until it finds the target value.
                                </div>

                            </div>

                        </div>

                    </div>

                </div>

            </div>

        </section>
    );
}