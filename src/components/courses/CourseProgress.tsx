"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { ArrowRight, CheckCircle2, Circle } from "lucide-react";
import { getCourse } from "@/data/courses";
import { useProgress } from "@/hooks/useProgress";
import { pythonLessonOrder } from "@/data/courses";

export function CourseProgress({ slug }: { slug: string }) {
  const { progress } = useProgress();
  const [mounted, setMounted] = useState(false);
  useEffect(() => setMounted(true), []);
  const course = getCourse(slug);
  if (!course) return null;

  const lessonHrefs = course.modules.flatMap((m) =>
    m.lessons.map((l) => l.href),
  );
  const doneCount = mounted
    ? lessonHrefs.filter((h) =>
        progress.completedLessons.includes(h),
      ).length
    : 0;
  const pct =
    lessonHrefs.length === 0
      ? 0
      : Math.round((doneCount / lessonHrefs.length) * 100);

  return (
    <div className="rounded-xl border border-slate-200 bg-white p-5 shadow-sm">
      <div className="flex items-center justify-between">
        <p className="text-sm font-semibold text-slate-900">Your progress</p>
        <p className="text-sm font-bold text-indigo-700" aria-live="polite">
          {mounted ? `${pct}%` : "0%"}
        </p>
      </div>
      <div
        className="mt-2 h-2.5 overflow-hidden rounded-full bg-slate-100"
        role="progressbar"
        aria-valuenow={mounted ? pct : 0}
        aria-valuemin={0}
        aria-valuemax={100}
        aria-label="Course progress"
      >
        <div
          className="h-full rounded-full bg-indigo-600 transition-all"
          style={{ width: `${mounted ? pct : 0}%` }}
        />
      </div>
      <p className="mt-2 text-xs text-slate-500">
        {mounted
          ? `${doneCount} of ${lessonHrefs.length} items complete — progress saves automatically in this browser.`
          : "Progress saves automatically in this browser."}
      </p>
    </div>
  );
}

export function CurriculumChecklist({ slug }: { slug: string }) {
  const { progress } = useProgress();
  const [mounted, setMounted] = useState(false);
  useEffect(() => setMounted(true), []);
  const course = getCourse(slug);
  if (!course) return null;
  void pythonLessonOrder;

  return (
    <div className="space-y-8">
      {course.modules.map((mod, mi) => (
        <section key={mod.title} aria-labelledby={`module-${mi}`}>
          <h2
            id={`module-${mi}`}
            className="text-lg font-bold text-slate-900"
          >
            {mod.title}
          </h2>
          <ul className="mt-3 divide-y divide-slate-100 overflow-hidden rounded-xl border border-slate-200 bg-white shadow-sm">
            {mod.lessons.map((lesson, li) => {
              const done =
                mounted && progress.completedLessons.includes(lesson.href);
              return (
                <li key={lesson.href}>
                  <Link
                    href={lesson.href}
                    className="flex min-h-[56px] items-center gap-3 px-4 py-3 hover:bg-slate-50 sm:px-5"
                  >
                    {done ? (
                      <CheckCircle2
                        className="h-5 w-5 shrink-0 text-green-600"
                        aria-label="Completed"
                      />
                    ) : (
                      <Circle
                        className="h-5 w-5 shrink-0 text-slate-300"
                        aria-hidden="true"
                      />
                    )}
                    <span className="flex-1">
                      <span className="block text-sm font-medium text-slate-900">
                        Lesson {li + 1}: {lesson.title}
                      </span>
                    </span>
                    <ArrowRight
                      className="h-4 w-4 shrink-0 text-slate-400"
                      aria-hidden="true"
                    />
                  </Link>
                </li>
              );
            })}
          </ul>
        </section>
      ))}
    </div>
  );
}
