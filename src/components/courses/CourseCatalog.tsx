"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import { ArrowRight, Clock, Layers } from "lucide-react";
import { courses } from "@/data/courses";
import { cn } from "@/lib/utils";

const LANGUAGE_FILTERS = ["All", "Python", "JavaScript", "HTML/CSS"] as const;
const DIFFICULTY_FILTERS = ["Beginner", "Intermediate"] as const;
const GOAL_FILTERS = [
  "Web Development",
  "Data Analysis",
  "Programming Fundamentals",
] as const;

export function CourseCatalog() {
  const [language, setLanguage] =
    useState<(typeof LANGUAGE_FILTERS)[number]>("All");
  const [difficulty, setDifficulty] =
    useState<(typeof DIFFICULTY_FILTERS)[number]>("Beginner");
  const [goal, setGoal] = useState<string | null>(null);

  const filtered = useMemo(
    () =>
      courses.filter(
        (c) =>
          (language === "All" || c.language === language) &&
          c.difficulty === difficulty &&
          (!goal || c.goals.includes(goal)),
      ),
    [language, difficulty, goal],
  );

  return (
    <div>
      <div className="grid gap-6 rounded-xl border border-slate-200 bg-white p-5 shadow-sm md:grid-cols-3">
        <fieldset>
          <legend className="text-sm font-semibold text-slate-900">
            Language
          </legend>
          <div className="mt-2 flex flex-wrap gap-2" role="group" aria-label="Filter by language">
            {LANGUAGE_FILTERS.map((l) => (
              <button
                key={l}
                type="button"
                onClick={() => setLanguage(l)}
                aria-pressed={language === l}
                className={cn(
                  "min-h-[44px] rounded-lg border px-3.5 text-sm font-medium",
                  language === l
                    ? "border-indigo-600 bg-indigo-600 text-white"
                    : "border-slate-300 bg-white text-slate-700 hover:border-slate-400",
                )}
              >
                {l}
              </button>
            ))}
          </div>
        </fieldset>
        <fieldset>
          <legend className="text-sm font-semibold text-slate-900">
            Difficulty
          </legend>
          <div className="mt-2 flex flex-wrap gap-2" role="group" aria-label="Filter by difficulty">
            {DIFFICULTY_FILTERS.map((d) => (
              <button
                key={d}
                type="button"
                onClick={() => setDifficulty(d)}
                aria-pressed={difficulty === d}
                className={cn(
                  "min-h-[44px] rounded-lg border px-3.5 text-sm font-medium",
                  difficulty === d
                    ? "border-indigo-600 bg-indigo-600 text-white"
                    : "border-slate-300 bg-white text-slate-700 hover:border-slate-400",
                )}
              >
                {d}
              </button>
            ))}
          </div>
        </fieldset>
        <fieldset>
          <legend className="text-sm font-semibold text-slate-900">Goal</legend>
          <div className="mt-2 flex flex-wrap gap-2" role="group" aria-label="Filter by goal">
            {GOAL_FILTERS.map((g) => (
              <button
                key={g}
                type="button"
                onClick={() => setGoal((cur) => (cur === g ? null : g))}
                aria-pressed={goal === g}
                className={cn(
                  "min-h-[44px] rounded-lg border px-3.5 text-sm font-medium",
                  goal === g
                    ? "border-indigo-600 bg-indigo-600 text-white"
                    : "border-slate-300 bg-white text-slate-700 hover:border-slate-400",
                )}
              >
                {g}
              </button>
            ))}
          </div>
        </fieldset>
      </div>

      <p className="mt-6 text-sm text-slate-600" role="status">
        Showing {filtered.length} of {courses.length} learning paths
      </p>

      {filtered.length === 0 ? (
        <div className="mt-4 rounded-xl border border-slate-200 bg-white p-10 text-center">
          <p className="font-semibold text-slate-900">No paths match those filters</p>
          <p className="mt-2 text-sm text-slate-600">
            Try a different combination — every path is beginner-friendly.
          </p>
          <button
            type="button"
            onClick={() => {
              setLanguage("All");
              setDifficulty("Beginner");
              setGoal(null);
            }}
            className="mt-4 inline-flex min-h-[48px] items-center rounded-lg border border-slate-300 px-5 text-sm font-semibold text-slate-800 hover:bg-slate-50"
          >
            Clear filters
          </button>
        </div>
      ) : (
        <ul className="mt-4 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {filtered.map((course) => (
            <li
              key={course.slug}
              className="flex flex-col rounded-xl border border-slate-200 bg-white p-6 shadow-sm hover:shadow-md"
            >
              <div className="flex items-center gap-2 text-xs font-semibold">
                <span className="rounded-full bg-indigo-50 px-2.5 py-1 text-indigo-700">
                  {course.language}
                </span>
                <span className="rounded-full bg-green-50 px-2.5 py-1 text-green-700">
                  {course.difficulty}
                </span>
              </div>
              <h2 className="mt-3 text-lg font-bold text-slate-900">
                <Link
                  href={`/courses/${course.slug}`}
                  className="hover:text-indigo-700 hover:underline"
                >
                  {course.title}
                </Link>
              </h2>
              <p className="mt-2 flex-1 text-sm leading-6 text-slate-600">
                {course.description}
              </p>
              <dl className="mt-4 space-y-1.5 border-t border-slate-100 pt-4 text-sm text-slate-600">
                <div className="flex items-center gap-2">
                  <Layers className="h-4 w-4 text-slate-400" aria-hidden="true" />
                  <dt className="sr-only">Lessons and projects</dt>
                  <dd>
                    {course.lessonCount} lessons · {course.projectCount} projects
                  </dd>
                </div>
                <div className="flex items-center gap-2">
                  <Clock className="h-4 w-4 text-slate-400" aria-hidden="true" />
                  <dt className="sr-only">Estimated time</dt>
                  <dd>≈ {course.estimatedHours} hours</dd>
                </div>
              </dl>
              <Link
                href={`/courses/${course.slug}`}
                className="mt-4 inline-flex min-h-[48px] items-center justify-center gap-1.5 rounded-lg bg-indigo-600 px-4 text-sm font-semibold text-white hover:bg-indigo-700"
              >
                View path
                <ArrowRight className="h-4 w-4" aria-hidden="true" />
              </Link>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
