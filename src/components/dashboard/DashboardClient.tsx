"use client";

import Link from "next/link";
import { useEffect, useMemo, useState } from "react";
import {
  ArrowRight,
  Award,
  BookOpen,
  Flame,
  FolderKanban,
  Target,
} from "lucide-react";
import {
  Bar,
  BarChart,
  CartesianGrid,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";
import { courses } from "@/data/courses";
import { useProgress } from "@/hooks/useProgress";

export function DashboardClient() {
  const { progress } = useProgress();
  const [mounted, setMounted] = useState(false);
  useEffect(() => setMounted(true), []);

  const currentCourse =
    courses.find((c) => c.slug === progress.currentCourse) ?? courses[0]!;

  const chartData = useMemo(() => {
    const history = mounted ? progress.visitHistory.slice(-7) : [];
    return history.map((day) => ({
      day: day.slice(5),
      visits: 1,
      lessons: 0,
    }));
  }, [mounted, progress.visitHistory]);

  const skillData = useMemo(() => {
    const completed = mounted ? progress.completedLessons : [];
    return [
      { skill: "Python basics", value: completed.filter((l) => l.includes("python")).length },
      { skill: "Logic", value: completed.filter((l) => /conditions|comparisons|loops/.test(l)).length },
      { skill: "Functions", value: completed.filter((l) => /function|parameter/.test(l)).length },
      { skill: "Projects", value: Object.keys(mounted ? progress.projectMilestones : {}).length },
    ];
  }, [mounted, progress.completedLessons, progress.projectMilestones]);

  const completedCount = mounted ? progress.completedLessons.length : 0;
  const projectCount = mounted
    ? Object.values(progress.projectMilestones).flat().length
    : 0;

  const nextLessonHref =
    currentCourse.slug === "python"
      ? "/learn/python/variables"
      : currentCourse.slug === "javascript"
        ? "/learn/javascript/intro"
        : "/learn/python/intro";

  return (
    <div>
      <h1 className="mt-4 text-3xl font-bold tracking-tight text-slate-900">
        Welcome back{completedCount > 0 ? ", keep it going" : " — let's start"}!
      </h1>
      <p className="mt-2 text-slate-600">
        Your progress saves automatically in this browser. No account needed for
        this prototype.
      </p>

      <dl className="mt-8 grid grid-cols-2 gap-4 lg:grid-cols-4">
        {[
          {
            icon: Flame,
            label: "Learning streak",
            value: mounted ? `${progress.streakDays} day${progress.streakDays === 1 ? "" : "s"}` : "—",
          },
          {
            icon: BookOpen,
            label: "Completed lessons",
            value: mounted ? String(completedCount) : "—",
          },
          {
            icon: FolderKanban,
            label: "Project milestones",
            value: mounted ? String(projectCount) : "—",
          },
          {
            icon: Award,
            label: "Current path",
            value: currentCourse.shortTitle,
          },
        ].map((s) => (
          <div
            key={s.label}
            className="rounded-xl border border-slate-200 bg-white p-5 shadow-sm"
          >
            <dt className="flex items-center gap-2 text-sm text-slate-500">
              <s.icon className="h-4 w-4 text-indigo-600" aria-hidden="true" />
              {s.label}
            </dt>
            <dd className="mt-1 text-2xl font-bold text-slate-900">{s.value}</dd>
          </div>
        ))}
      </dl>

      <div className="mt-6 grid gap-6 lg:grid-cols-2">
        <section
          aria-labelledby="next-lesson"
          className="rounded-xl border border-indigo-200 bg-indigo-50 p-6"
        >
          <h2 id="next-lesson" className="flex items-center gap-2 font-bold text-slate-900">
            <Target className="h-5 w-5 text-indigo-600" aria-hidden="true" />
            Recommended next lesson
          </h2>
          <p className="mt-2 text-sm leading-6 text-slate-700">
            Continue your <strong>{currentCourse.title}</strong> path where you
            left off.
          </p>
          <Link
            href={nextLessonHref}
            className="mt-4 inline-flex min-h-[48px] items-center gap-1.5 rounded-lg bg-indigo-600 px-5 text-sm font-semibold text-white hover:bg-indigo-700"
          >
            Continue learning
            <ArrowRight className="h-4 w-4" aria-hidden="true" />
          </Link>
        </section>

        <section
          aria-labelledby="activity"
          className="rounded-xl border border-slate-200 bg-white p-6 shadow-sm"
        >
          <h2 id="activity" className="font-bold text-slate-900">
            Recent activity
          </h2>
          {chartData.length === 0 ? (
            <p className="mt-3 text-sm text-slate-500">
              Visit daily to build your streak — your last 7 active days will
              appear here.
            </p>
          ) : (
            <div className="mt-3 h-44">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={chartData}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" />
                  <XAxis dataKey="day" fontSize={12} />
                  <YAxis fontSize={12} allowDecimals={false} />
                  <Tooltip />
                  <Bar dataKey="visits" fill="#4f46e5" radius={[4, 4, 0, 0]} name="Active day" />
                </BarChart>
              </ResponsiveContainer>
            </div>
          )}
        </section>
      </div>

      <section
        aria-labelledby="skills"
        className="mt-6 rounded-xl border border-slate-200 bg-white p-6 shadow-sm"
      >
        <h2 id="skills" className="font-bold text-slate-900">
          Skills progress
        </h2>
        {completedCount === 0 ? (
          <p className="mt-3 text-sm text-slate-500">
            Complete lessons to grow your skills chart.{" "}
            <Link href="/learn/python/intro" className="font-semibold text-indigo-700 hover:underline">
              Start your first lesson →
            </Link>
          </p>
        ) : (
          <div className="mt-3 h-56">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={skillData} layout="vertical">
                <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" />
                <XAxis type="number" fontSize={12} allowDecimals={false} />
                <YAxis dataKey="skill" type="category" fontSize={12} width={110} />
                <Tooltip />
                <Bar dataKey="value" fill="#16a34a" radius={[0, 4, 4, 0]} name="Completed" />
              </BarChart>
            </ResponsiveContainer>
          </div>
        )}
      </section>
    </div>
  );
}
