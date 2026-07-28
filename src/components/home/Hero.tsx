"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import Container from "../ui/Container";
import Button from "../ui/Button";
import { ChevronDown } from "lucide-react";
import { useUserSession } from "@/hooks/use-user-session";
import Link from "next/link";

export default function Hero() {
    const { data: session, isLoading } = useUserSession();
    return (
        <section className="relative overflow-hidden bg-[#F8F4EC]">
            {/* Background Shapes */}

            <div className="pointer-events-none absolute left-[-180px] top-20 -z-10 h-[500px] w-[500px] rounded-full bg-[#EFE3D0] opacity-20 blur-3xl" />

            <div className="pointer-events-none absolute right-[-200px] bottom-0 -z-10 h-[550px] w-[550px] rounded-full bg-[#F5EBDD] opacity-20 blur-3xl" />

            <Container>
                <div className="grid min-h-[62vh] lg:min-h-[65vh] grid-cols-1 items-center gap-8 py-10 lg:grid-cols-[1fr_1.1fr]">
                    {/* LEFT */}

                    <motion.div
                        initial={{ opacity: 0, x: -40 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: .8 }}
                        className="relative z-10 max-w-xl"
                    >
                        <div className="inline-flex rounded-full bg-white px-5 py-2 shadow mt-10">
                            <span className="font-semibold text-[#D8A34D]">
                                AI Powered Education
                            </span>
                        </div>

                        <h1 className="mt-6 text-5xl font-extrabold leading-[1.1] text-[#2D2A26] md:text-6xl xl:text-7xl">
                            Learn
                            <span className="text-[#1F4B43]"> Smarter </span>
                            <br />
                            With AI
                        </h1>

                        <p className="mt-6 text-lg leading-8 text-[#6F665B]">
                            Generate AI-powered study notes, receive personalized
                            recommendations, and prepare for exams with confidence.
                        </p>

                        <div className="mt-8 flex min-h-[48px] flex-wrap items-center gap-4">
                            {isLoading ? (
                                /* Loading Skeleton */
                                <div className="flex gap-4">
                                    <div className="h-12 w-36 animate-pulse rounded-full bg-[#EFE3D0]" />
                                    <div className="h-12 w-32 animate-pulse rounded-full bg-[#EFE3D0]" />
                                </div>
                            ) : session?.user ? (
                                /* LOGGED IN: Redirect to Explore or Dashboard */
                                <>
                                    <Link href="/explore">
                                        <Button className="transition duration-300 hover:scale-105">
                                            Explore Notes
                                        </Button>
                                    </Link>

                                    <Link href="/dashboard">
                                        <Button
                                            variant="secondary"
                                            className="transition duration-300 hover:scale-105"
                                        >
                                            Dashboard
                                        </Button>
                                    </Link>
                                </>
                            ) : (
                                /* LOGGED OUT: Redirect to Register / Login */
                                <>
                                    <Link href="/register">
                                        <Button className="transition duration-300 hover:scale-105">
                                            Start Learning
                                        </Button>
                                    </Link>

                                    <Link href="/explore">
                                        <Button
                                            variant="secondary"
                                            className="transition duration-300 hover:scale-105"
                                        >
                                            Explore Notes
                                        </Button>
                                    </Link>
                                </>
                            )}
                        </div>


                        <div className="mt-10 flex flex-wrap gap-12">

                            <Stat number="12K+" label="Notes Generated" />

                            <Stat number="120+" label="Subjects" />

                            <Stat number="95%" label="Student Satisfaction" />

                        </div>
                    </motion.div>

                    {/* RIGHT */}

                    <motion.div
                        initial={{ opacity: 0, x: 50 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: .9 }}
                        className="relative mx-auto mt-10 lg:mt-12 w-full max-w-[420px] md:max-w-[480px] lg:max-w-[540px]"
                    >
                        <Image
                            src="/illustrations/hero-ai.svg"
                            alt="Hero Illustration"
                            width={650}
                            height={650}
                            priority
                            className="relative mx-auto w-full max-w-[460px] lg:max-w-[520px] xl:max-w-[560px]"
                        />

                        {/* Card 1 */}

                        <FloatingCard
                            className="left-0 top-[18%]"
                            title="AI Notes"
                            text="Generated in seconds"
                        />

                        {/* Card 2 */}

                        <FloatingCard
                            dark
                            className="right-0 bottom-[10%]"
                            title="Progress"
                            text="82%"
                        />
                    </motion.div>

                </div>
            </Container>

            <motion.button
                onClick={() =>
                    document.getElementById("features")?.scrollIntoView({
                        behavior: "smooth",
                    })
                }
                animate={{ y: [0, 10, 0] }}
                transition={{
                    duration: 1.6,
                    repeat: Infinity,
                }}
                className="absolute bottom-6 left-1/2 -translate-x-1/2 rounded-full bg-white p-3 shadow-lg"
            >
                <ChevronDown className="text-[#1F4B43]" size={28} />
            </motion.button>
        </section>
    );
}

function Stat({
    number,
    label,
}: {
    number: string;
    label: string;
}) {
    return (
        <div>
            <h3 className="text-4xl font-bold text-[#1F4B43]">
                {number}
            </h3>

            <p className="mt-2 text-[#6F665B]">
                {label}
            </p>
        </div>
    );
}

function FloatingCard({
    title,
    text,
    className,
    dark,
}: {
    title: string;
    text: string;
    className: string;
    dark?: boolean;
}) {
    return (
        <motion.div
            animate={{
                y: [-10, 10, -10],
            }}
            transition={{
                repeat: Infinity,
                duration: 5,
            }}
            className={`absolute rounded-3xl p-5 shadow-2xl ${dark
                ? "bg-[#1F4B43] text-white"
                : "bg-white"
                } ${className}`}
        >
            <h4 className="font-bold">
                {title}
            </h4>

            <p className="mt-2 text-sm">
                {text}
            </p>
        </motion.div>
    );
}