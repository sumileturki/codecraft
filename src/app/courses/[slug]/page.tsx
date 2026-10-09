import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowRight, Clock, Layers } from "lucide-react";
import { getCourse, courses } from "@/data/courses";
import { Breadcrumbs } from "@/components/seo/Breadcrumbs";
import { JsonLd } from "@/components/seo/JsonLd";
import {
  breadcrumbJsonLd,
  courseJsonLd,
  pageMetadata,
} from "@/lib/seo";
import {
  CourseProgress,
  CurriculumChecklist,
} from "@/components/courses/CourseProgress";

export function generateStaticParams() {
  return courses.map((c) => ({ slug: c.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const course = getCourse(slug);
  if (!course) return {};
  return pageMetadata({
    title: `${course.title} — Free Interactive Course`,
    description: course.description,
    path: `/courses/${course.slug}`,
    keywords: [
      `${course.shortTitle} for beginners`,
      `learn ${course.shortTitle.toLowerCase()} online free`,
      "interactive coding lessons",
    ],
  });
}

export default async function CourseDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const course = getCourse(slug);
  if (!course) notFound();

  const firstLesson =
    course.modules[0]?.lessons[0]?.href ?? "/courses";

  return (
    <main className="mx-auto max-w-7xl flex-1 px-4 py-10 sm:px-6 lg:px-8">
      <JsonLd
        data={[
          breadcrumbJsonLd([
            { name: "Home", path: "/" },
            { name: "Learning Paths", path: "/courses" },
            { name: course.shortTitle, path: `/courses/${course.slug}` },
          ]),
          courseJsonLd(course),
        ]}
      />
      <Breadcrumbs
        items={[
          { name: "Home", href: "/" },
          { name: "Learning Paths", href: "/courses" },
          { name: course.shortTitle },
        ]}
      />

      <div className="mt-4 grid gap-8 lg:grid-cols-[2fr_1fr]">
        <div>
          <div className="flex flex-wrap items-center gap-2 text-xs font-semibold">
            <span className="rounded-full bg-indigo-50 px-2.5 py-1 text-indigo-700">
              {course.language}
            </span>
            <span className="rounded-full bg-green-50 px-2.5 py-1 text-green-700">
              {course.difficulty}
            </span>
          </div>
          <h1 className="mt-3 text-3xl font-bold tracking-tight text-slate-900 sm:text-4xl">
            {course.title}
          </h1>
          <p className="mt-3 max-w-3xl text-lg leading-8 text-slate-600">
            {course.description}
          </p>
          <dl className="mt-5 flex flex-wrap gap-x-6 gap-y-2 text-sm text-slate-600">
            <div className="flex items-center gap-2">
              <Layers className="h-4 w-4 text-slate-400" aria-hidden="true" />
              <dt className="sr-only">Lessons</dt>
              <dd>{course.lessonCount} lessons</dd>
            </div>
            <div className="flex items-center gap-2">
              <Clock className="h-4 w-4 text-slate-400" aria-hidden="true" />
              <dt className="sr-only">Estimated time</dt>
              <dd>≈ {course.estimatedHours} hours</dd>
            </div>
            <div className="flex items-center gap-2">
              <dt className="font-medium text-slate-700">Goals:</dt>
              <dd>{course.goals.join(" · ")}</dd>
            </div>
          </dl>
          <div className="mt-6 flex flex-col gap-3 sm:flex-row">
            <Link
              href={firstLesson}
              className="inline-flex min-h-[52px] items-center justify-center gap-1.5 rounded-lg bg-indigo-600 px-7 text-base font-semibold text-white shadow-sm hover:bg-indigo-700"
            >
              Start Coding Free
              <ArrowRight className="h-4 w-4" aria-hidden="true" />
            </Link>
            <Link
              href="/tools/visualizer"
              className="inline-flex min-h-[52px] items-center justify-center rounded-lg border border-slate-300 bg-white px-7 text-base font-semibold text-slate-800 hover:bg-slate-50"
            >
              Try the code visualizer
            </Link>
          </div>
        </div>
        <CourseProgress slug={course.slug} />
      </div>

      <div className="mt-12">
        <h2 className="text-2xl font-bold tracking-tight text-slate-900">
          Course curriculum
        </h2>
        <p className="mt-2 text-slate-600">
          {course.projectCount} guided projects included. Lessons marked with a
          check are saved as complete in this browser.
        </p>
        <div className="mt-6">
          <CurriculumChecklist slug={course.slug} />
        </div>
      </div>

      <aside className="mt-12 rounded-xl border border-slate-200 bg-white p-6 shadow-sm">
        <h2 className="text-lg font-bold text-slate-900">
          What you&apos;ll build
        </h2>
        <p className="mt-2 text-sm leading-6 text-slate-600">
          This path ends with real portfolio projects. See{" "}
          <Link href="/projects" className="font-semibold text-indigo-700 hover:underline">
            beginner Python project ideas with guided steps
          </Link>{" "}
          or jump straight to the{" "}
          <Link
            href="/projects/python-weather-dashboard"
            className="font-semibold text-indigo-700 hover:underline"
          >
            weather dashboard project
          </Link>
          .
        </p>
      </aside>
    </main>
  );
}
