"use client";

import {
  LineChart,
  Line,
  XAxis,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

const data = [
  { day: "Mon", progress: 30 },
  { day: "Tue", progress: 45 },
  { day: "Wed", progress: 58 },
  { day: "Thu", progress: 70 },
  { day: "Fri", progress: 82 },
  { day: "Sat", progress: 90 },
  { day: "Sun", progress: 98 },
];

const stats = [
  {
    number: "12K+",
    label: "AI Notes Generated",
  },
  {
    number: "95%",
    label: "Student Satisfaction",
  },
  {
    number: "4.9",
    label: "Average Rating",
  },
];

export default function StudentAnalytics() {
  return (
    <section className="bg-[#F8F4EC] py-28">
      <div className="mx-auto max-w-7xl px-6">

        <div className="text-center">

          <div className="inline-flex rounded-full bg-[#F6EFE4] px-5 py-2">
            <span className="font-semibold text-[#8B6B3F]">
              Learning Analytics
            </span>
          </div>

          <h2 className="mt-5 text-5xl font-bold text-[#2D2A26]">
            Track Your Learning Journey
          </h2>

          <p className="mx-auto mt-6 max-w-3xl text-lg text-[#6F665B]">
            AI continuously analyzes your study habits and helps you improve
            every day.
          </p>

        </div>

        <div className="mt-20 grid gap-10 lg:grid-cols-[350px_1fr]">

          <div className="space-y-6">

            {stats.map((stat) => (
              <div
                key={stat.label}
                className="rounded-[28px] bg-white p-8 shadow-sm"
              >
                <h3 className="text-5xl font-bold text-[#1F4B43]">
                  {stat.number}
                </h3>

                <p className="mt-3 text-[#6F665B]">
                  {stat.label}
                </p>
              </div>
            ))}

          </div>

          <div className="rounded-[32px] bg-white p-8 shadow-sm">

            <h3 className="mb-8 text-2xl font-semibold text-[#2D2A26]">
              Weekly Study Progress
            </h3>

            <div className="h-[350px]">

              <ResponsiveContainer width="100%" height="100%">

                <LineChart data={data}>

                  <XAxis dataKey="day" />

                  <Tooltip />

                  <Line
                    dataKey="progress"
                    stroke="#1F4B43"
                    strokeWidth={4}
                    dot={{
                      r: 5,
                    }}
                  />

                </LineChart>

              </ResponsiveContainer>

            </div>

          </div>

        </div>

      </div>
    </section>
  );
}