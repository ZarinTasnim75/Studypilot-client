import { Upload, BrainCircuit, GraduationCap } from "lucide-react";

const steps = [
  {
    id: "01",
    icon: Upload,
    title: "Upload Your Materials",
    description:
      "Upload lecture notes, PDFs, or class materials to begin your learning journey.",
  },
  {
    id: "02",
    icon: BrainCircuit,
    title: "AI Understands Everything",
    description:
      "Our AI analyzes the content, extracts key concepts, and generates intelligent study resources.",
  },
  {
    id: "03",
    icon: GraduationCap,
    title: "Learn Smarter",
    description:
      "Receive personalized notes, quizzes, and recommendations tailored to your learning progress.",
  },
];

export default function HowItWorks() {
  return (
    <section className="bg-[#F8F4EC] py-5">
      <div className="mx-auto max-w-7xl px-6">

        <div className="text-center">

          <div className="inline-flex items-center rounded-full border border-[#D8A34D]/30 bg-[#fad59a] px-5 py-2">
            <span className="text-sm font-semibold tracking-wide text-[#624104] uppercase">
              How It Works
            </span>
          </div>

          <h2 className="text-5xl font-bold text-[#2D2A26] mt-5">
            Three Simple Steps
          </h2>

          <p className="mx-auto mt-5 max-w-2xl text-lg text-[#6F665B]">
            StudyPilot AI transforms your learning materials into organized,
            personalized study resources in just a few clicks.
          </p>

        </div>

        <div className="mt-20 grid gap-10 lg:grid-cols-3">

          {steps.map((step) => (
            <div
              key={step.id}
              className="relative rounded-[32px] bg-white p-10 shadow-md transition hover:-translate-y-2 hover:shadow-xl"
            >
              <div className="absolute -top-5 left-8 flex h-12 w-12 items-center justify-center rounded-full bg-[#1F4B43] text-lg font-bold text-white">
                {step.id}
              </div>

              <div className="mt-6 flex h-20 w-20 items-center justify-center rounded-3xl bg-[#F3E8D7]">
                <step.icon
                  size={40}
                  className="text-[#1F4B43]"
                />
              </div>

              <h3 className="mt-8 text-3xl font-semibold text-[#2D2A26]">
                {step.title}
              </h3>

              <p className="mt-5 leading-8 text-[#6F665B]">
                {step.description}
              </p>
            </div>
          ))}

        </div>

      </div>
    </section>
  );
}