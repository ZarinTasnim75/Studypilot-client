import { Brain, BookOpen, Sparkles, TrendingUp } from "lucide-react";
import Section from "../ui/Section";
import SectionHeading from "../ui/SectionHeading";

const features = [
  {
    icon: Brain,
    title: "AI Study Assistant",
    description:
      "Ask questions and receive contextual answers while studying.",
  },
  {
    icon: BookOpen,
    title: "Smart Notes",
    description:
      "Generate concise notes from your learning materials.",
  },
  {
    icon: TrendingUp,
    title: "Progress Tracking",
    description:
      "Visualize your learning journey with AI insights.",
  },
  {
    icon: Sparkles,
    title: "Personalized Plans",
    description:
      "Receive customized study recommendations based on your goals.",
  },
];

export default function Features() {
  return (
    <div id="features">
      <Section className="bg-white">
        <SectionHeading
          badge="Why Choose StudyPilot"
          title="Everything You Need to Learn Better"
          description="AI-powered tools designed to help students stay organized, focused, and productive."
        />

        <div className="grid gap-8 md:grid-cols-2 xl:grid-cols-4">
          {features.map((feature) => (
            <div
              key={feature.title}
              className="group rounded-3xl border border-[#E8E1D5] bg-[#FFFDF9] p-8 transition-all duration-300 hover:-translate-y-2 hover:shadow-xl"
            >
              <div className="mb-6 flex h-14 w-14 items-center justify-center rounded-2xl bg-[#F3E8D7]">
                <feature.icon className="h-7 w-7 text-[#1F4B43]" />
              </div>

              <h3 className="mb-3 text-2xl font-semibold text-[#2D2A26]">
                {feature.title}
              </h3>

              <p className="leading-7 text-[#6F665B]">
                {feature.description}
              </p>
            </div>
          ))}
        </div>
      </Section>
    </div>
  );
}