"use client";

import { Star } from "lucide-react";
import Image from "next/image";

const testimonials = [
  {
    id: 1,
    name: "Sarah Ahmed",
    university: "University Student",
    image: "/users/user1.jpg",
    review:
      "StudyPilot completely changed how I prepare for exams. The AI notes save me hours every week.",
  },
  {
    id: 2,
    name: "Rahim Hasan",
    university: "Computer Science Student",
    image: "/users/user2.jpg",
    review:
      "The personalized study recommendations keep me focused and motivated. It feels like having a private tutor.",
  },
  {
    id: 3,
    name: "Zariful Islam",
    university: "Engineering Student",
    image: "/users/user3.jpg",
    review:
      "The AI assistant explains difficult concepts in a simple way. My grades improved significantly.",
  },
];
export default function Testimonials() {
  return (
    <section className="bg-[#FFFDF9] py-28">
      <div className="mx-auto max-w-7xl px-6">

        <div className="text-center">

          <div className="inline-flex rounded-full bg-[#F6EFE4] px-5 py-2">
            <span className="font-semibold text-[#8B6B3F]">
              Testimonials
            </span>
          </div>

          <h2 className="mt-5 text-5xl font-bold text-[#2D2A26]">
            Loved by Students
          </h2>

          <p className="mx-auto mt-6 max-w-2xl text-lg text-[#6F665B]">
            Thousands of students trust StudyPilot to make learning easier,
            faster, and more enjoyable.
          </p>

        </div>

        <div className="mt-20 grid gap-8 lg:grid-cols-3">

          {testimonials.map((item) => (
            <div
              key={item.id}
              className="rounded-[30px] border border-[#ECE3D6] bg-white p-8 shadow-sm transition hover:-translate-y-2 hover:shadow-xl"
            >

              <div className="mb-6 flex">

                {Array.from({ length: 5 }).map((_, i) => (
                  <Star
                    key={i}
                    size={18}
                    className="fill-[#D8A34D] text-[#D8A34D]"
                  />
                ))}

              </div>

              <p className="leading-8 text-[#6F665B]">
                {item.review}
              </p>

              <div className="mt-8 flex items-center gap-4">

                <Image
                  src={item.image}
                  alt={item.name}
                  width={60}
                  height={60}
                  className="rounded-full object-cover"
                />

                <div>

                  <h4 className="font-semibold text-[#2D2A26]">
                    {item.name}
                  </h4>

                  <p className="text-sm text-[#6F665B]">
                    {item.university}
                  </p>

                </div>

              </div>

            </div>
          ))}

        </div>

      </div>
    </section>
  );
}