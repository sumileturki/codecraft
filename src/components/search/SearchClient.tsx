"use client";

import Link from "next/link";
import { useMemo, useState } from "react";
import { Search } from "lucide-react";
import { courses, lessons } from "@/data/courses";
import { getProject, projects, communityThreads } from "@/data/content";
import { blogPosts } from "@/data/blog";
import { cn } from "@/lib/utils";

interface Result {
  type: string;
  title: string;
  href: string;
  snippet: string;
}

const ALL: Result[] = [
  ...courses.map((c) => ({
    type: "Course",
    title: c.title,
    href: `/courses/${c.slug}`,
    snippet: c.description,
  })),
  ...Object.keys(lessons).map((key) => {
    const l = lessons[key]!;
    return {
      type: "Lesson",
      title: `${l.title} (${l.language})`,
      href: `/learn/${l.language}/${l.slug}`,
      snippet: l.description,
    };
  }),
  ...projects.map((p) => ({
    type: "Project",
    title: p.title,
    href: `/projects/${p.slug}`,
    snippet: p.description,
  })),
  ...blogPosts.map((b) => ({
    type: "Article",
    title: b.title,
    href: `/blog/${b.slug}`,
    snippet: b.description,
  })),
  ...communityThreads.map((t) => ({
    type: "Discussion",
    title: t.title,
    href: `/community/${t.category.toLowerCase().replace(/ /g, "-")}`,
    snippet: t.excerpt,
  })),
];

const TYPE_FILTERS = ["All", "Course", "Lesson", "Project", "Article", "Discussion"] as const;

export function SearchClient({ initialQuery }: { initialQuery: string }) {
  const [query, setQuery] = useState(initialQuery);
  const [type, setType] = useState<(typeof TYPE_FILTERS)[number]>("All");

  const results = useMemo(() => {
    const q = query.trim().toLowerCase();
    return ALL.filter(
      (r) =>
        (type === "All" || r.type === type) &&
        (q === "" ||
          r.title.toLowerCase().includes(q) ||
          r.snippet.toLowerCase().includes(q)),
    );
  }, [query, type]);

  void getProject;

  return (
    <div>
      <form role="search" onSubmit={(e) => e.preventDefault()} className="relative max-w-xl">
        <label htmlFor="search-input" className="sr-only">
          Search CodeCraft
        </label>
        <Search
          aria-hidden="true"
          className="pointer-events-none absolute left-4 top-1/2 h-5 w-5 -translate-y-1/2 text-slate-400"
        />
        <input
          id="search-input"
          type="search"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Search lessons, projects, articles…"
          autoComplete="off"
          className="min-h-[56px] w-full rounded-xl border border-slate-300 bg-white pl-12 pr-4 text-base shadow-sm focus:border-indigo-500 focus:outline-none"
        />
      </form>

      <div className="mt-4 flex flex-wrap gap-2" role="group" aria-label="Filter by content type">
        {TYPE_FILTERS.map((t) => (
          <button
            key={t}
            type="button"
            onClick={() => setType(t)}
            aria-pressed={type === t}
            className={cn(
              "min-h-[44px] rounded-lg border px-4 text-sm font-medium",
              type === t
                ? "border-indigo-600 bg-indigo-600 text-white"
                : "border-slate-300 bg-white text-slate-700 hover:border-slate-400",
            )}
          >
            {t === "All" ? "All" : `${t}s`}
          </button>
        ))}
      </div>

      <p className="mt-6 text-sm text-slate-600" role="status">
        {results.length} result{results.length === 1 ? "" : "s"}
        {query.trim() && (
          <>
            {" "}for <strong>“{query.trim()}”</strong>
          </>
        )}
      </p>

      {results.length === 0 ? (
        <div className="mt-4 rounded-xl border border-slate-200 bg-white p-10 text-center">
          <p className="font-semibold text-slate-900">No results found</p>
          <p className="mt-2 text-sm text-slate-600">
            Try “python”, “loops”, “projects”, or browse the{" "}
            <Link href="/courses" className="font-semibold text-indigo-700 hover:underline">
              learning paths
            </Link>
            .
          </p>
        </div>
      ) : (
        <ul className="mt-4 space-y-3">
          {results.map((r) => (
            <li
              key={r.type + r.href}
              className="rounded-xl border border-slate-200 bg-white p-5 shadow-sm hover:shadow-md"
            >
              <span className="inline-block rounded-full bg-slate-100 px-2.5 py-0.5 text-xs font-semibold text-slate-600">
                {r.type}
              </span>
              <h2 className="mt-2 font-bold text-slate-900">
                <Link href={r.href} className="hover:text-indigo-700 hover:underline">
                  {r.title}
                </Link>
              </h2>
              <p className="mt-1 text-sm leading-6 text-slate-600">{r.snippet}</p>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
