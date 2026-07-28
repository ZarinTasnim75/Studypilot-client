"use client";

import Section from "../ui/Section";
import SectionHeading from "../ui/SectionHeading";

const faqs = [
  {
    question: "How does StudyPilot generate study notes?",
    answer:
      "StudyPilot uses advanced AI to analyze your uploaded notes, PDFs, and study materials, then creates organized summaries, key points, and revision notes tailored to your content.",
  },
  {
    question: "Can I chat with the AI Study Assistant?",
    answer:
      "Yes. You can ask follow-up questions, request explanations, generate quizzes, and receive personalized study guidance based on your uploaded materials.",
  },
  {
    question: "Does StudyPilot support different subjects?",
    answer:
      "Absolutely. StudyPilot is designed to help students across Computer Science, Mathematics, Business, Engineering, Biology, Literature, and many more subjects.",
  },
  {
    question: "Can I track my learning progress?",
    answer:
      "Yes. Your dashboard displays AI-generated insights, study streaks, completed sessions, and personalized recommendations to help you improve consistently.",
  },
  {
    question: "Is my uploaded data secure?",
    answer:
      "Yes. Your documents are securely processed and only used to generate AI-powered learning resources for your account.",
  },
];

export default function FAQ() {
  return (
    <Section className="bg-[#FFFDF9]">

      <SectionHeading
        badge="Frequently Asked Questions"
        title="Everything You Need to Know"
        description="Find answers to the most common questions about StudyPilot and our AI-powered learning platform."
      />

      <div className="mx-auto mt-14 max-w-4xl space-y-5">

        {faqs.map((faq, index) => (
          <div
            key={index}
            className="collapse collapse-plus rounded-3xl border border-[#E8E1D5] bg-white"
          >

            <input
              type="radio"
              name="faq"
              defaultChecked={index === 0}
            />

            <div className="collapse-title text-xl font-semibold text-[#2D2A26]">
              {faq.question}
            </div>

            <div className="collapse-content text-[#6F665B] leading-8">
              {faq.answer}
            </div>

          </div>
        ))}

      </div>

    </Section>
  );
}