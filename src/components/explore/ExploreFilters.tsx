"use client";
import { resources } from "@/data/resources";

const subjects = [
    "All",
    ...new Set(resources.map((item) => item.subject)),
];
interface Props {
    search: string;
    setSearch: (value: string) => void;

    subject: string;
    setSubject: (value: string) => void;

    difficulty: string;
    setDifficulty: (value: string) => void;

    sortBy: string;
    setSortBy: (value: string) => void;
}

export default function ExploreFilters({
    search,
    setSearch,
    subject,
    setSubject,
    difficulty,
    setDifficulty,
    sortBy,
    setSortBy,
}: Props) {
    return (
        <div className="mb-10 rounded-[28px] bg-white p-6 shadow-sm">

            <div className="grid gap-5 md:grid-cols-2 lg:grid-cols-4">

                <input
                    type="text"
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                    placeholder="Search resources..."
                    className="input input-bordered w-full"
                />

                <select
                    value={subject}
                    onChange={(e) => setSubject(e.target.value)}
                    className="select select-bordered"
                >
                    {subjects.map((item) => (
                        <option key={item} value={item}>
                            {item}
                        </option>
                    ))}
                </select>

                <select
                    value={difficulty}
                    onChange={(e) => setDifficulty(e.target.value)}
                    className="select select-bordered"
                >
                    <option>All</option>
                    <option>Beginner</option>
                    <option>Intermediate</option>
                    <option>Advanced</option>
                </select>

                <select
                    value={sortBy}
                    onChange={(e) => setSortBy(e.target.value)}
                    className="select select-bordered"
                >
                    <option>Newest</option>
                    <option>Highest Rating</option>
                    <option>Most Popular</option>
                </select>

            </div>

        </div>
    );
}