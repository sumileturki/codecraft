import Link from "next/link";
import { ArrowRight, Braces, FileCode2, Globe } from "lucide-react";
import { courses } from "@/data/courses";

const ICONS = [FileCode2, Braces, Globe];

export function LearningPaths() {
  return (
    <section aria-labelledby="paths-heading" className="bg-white py-16 sm:py-20">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex flex-wrap items-end justify-between gap-4">
          <div>
            <h2
              id="paths-heading"
              className="text-2xl font-bold tracking-tight text-slate-900 sm:text-3xl"
            >
              Choose your learning path
            </h2>
            <p className="mt-3 max-w-2xl text-slate-600">
              Structured paths that take you from your first line of code to
              real portfolio projects — all in your browser.
            </p>
          </div>
          <Link
            href="/courses"
            className="inline-flex min-h-[44px] items-center gap-1.5 text-sm font-semibold text-indigo-700 hover:text-indigo-800 hover:underline"
          >
            View all paths
            <ArrowRight className="h-4 w-4" aria-hidden="true" />
          </Link>
        </div>
        <ul className="mt-10 grid gap-6 md:grid-cols-3">
          {courses.map((course, i) => {
            const Icon = ICONS[i % ICONS.length]!;
            return (
              <li
                key={course.slug}
                className="flex flex-col rounded-xl border border-slate-200 bg-white p-6 shadow-sm transition-shadow hover:shadow-md"
              >
                <span className="inline-flex h-11 w-11 items-center justify-center rounded-lg bg-indigo-50 text-indigo-700">
                  <Icon className="h-5 w-5" aria-hidden="true" />
                </span>
                <h3 className="mt-4 text-lg font-bold text-slate-900">
                  {course.shortTitle}
                </h3>
                <p className="mt-2 flex-1 text-sm leading-6 text-slate-600">
                  {course.description.split(".")[0]}.
                </p>
                <dl className="mt-4 flex flex-wrap gap-x-4 gap-y-1 text-sm">
                  <div className="flex gap-1.5">
                    <dt className="text-slate-500">Level:</dt>
                    <dd className="font-medium text-slate-800">{course.difficulty}</dd>
                  </div>
                  <div className="flex gap-1.5">
                    <dt className="text-slate-500">Lessons:</dt>
                    <dd className="font-medium text-slate-800">{course.lessonCount}</dd>
                  </div>
                  <div className="flex gap-1.5">
                    <dt className="text-slate-500">Projects:</dt>
                    <dd className="font-medium text-slate-800">{course.projectCount}</dd>
                  </div>
                </dl>
                <Link
                  href={`/courses/${course.slug}`}
                  className="mt-5 inline-flex min-h-[48px] items-center justify-center gap-1.5 rounded-lg border border-slate-300 px-4 text-sm font-semibold text-slate-800 hover:border-indigo-400 hover:bg-indigo-50 hover:text-indigo-800"
                >
                  Start Path
                  <ArrowRight className="h-4 w-4" aria-hidden="true" />
                </Link>
              </li>
            );
          })}
        </ul>
      </div>
    </section>
  );
}
