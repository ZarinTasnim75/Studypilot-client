"use client";

import { useMemo, useState } from "react";
import { resources } from "@/data/resources";
import SubjectCard from "./SubjectCard";
import ExploreFilters from "./ExploreFilters";

export default function SubjectGrid() {
  const [search, setSearch] = useState("");
  const [subject, setSubject] = useState("All");
  const [difficulty, setDifficulty] = useState("All");
  const [sortBy, setSortBy] = useState("Newest");

  const filteredResources = useMemo(() => {
    let data = [...resources];

    // Search
    if (search) {
      data = data.filter((item) =>
        item.title.toLowerCase().includes(search.toLowerCase())
      );
    }

    // Subject
    if (subject !== "All") {
      data = data.filter((item) => item.subject === subject);
    }

    // Difficulty
    if (difficulty !== "All") {
      data = data.filter((item) => item.difficulty === difficulty);
    }

    // Sort
    if (sortBy === "Highest Rating") {
      data.sort((a, b) => b.rating - a.rating);
    }

    if (sortBy === "Most Popular") {
      data.sort((a, b) => b.students - a.students);
    }

    return data;
  }, [search, subject, difficulty, sortBy]);

  return (
    <>
      <ExploreFilters
        search={search}
        setSearch={setSearch}
        subject={subject}
        setSubject={setSubject}
        difficulty={difficulty}
        setDifficulty={setDifficulty}
        sortBy={sortBy}
        setSortBy={setSortBy}
      />

      <div className="grid gap-8 sm:grid-cols-2 xl:grid-cols-4">
        {filteredResources.map((resource) => (
          <SubjectCard
            key={resource.id}
            resource={resource}
          />
        ))}
      </div>
    </>
  );
}