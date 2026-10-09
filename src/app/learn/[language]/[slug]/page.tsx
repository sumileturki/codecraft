import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowRight } from "lucide-react";
import { getLesson, lessons } from "@/data/courses";
import { LessonWorkspace } from "@/components/lessons/LessonWorkspace";
import { Breadcrumbs } from "@/components/seo/Breadcrumbs";
import { JsonLd } from "@/components/seo/JsonLd";
import { breadcrumbJsonLd } from "@/lib/seo";


export function generateStaticParams() {
  return Object.keys(lessons).map((key) => {
    const [language, slug] = key.split("/");
    return { language, slug };
  });
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ language: string; slug: string }>;
}): Promise<Metadata> {
  const { language, slug } = await params;
  const lesson = getLesson(language, slug);
  if (!lesson) return {};
  return {
    title: lesson.seoTitle,
    description: lesson.description,
    alternates: { canonical: `/learn/${language}/${slug}` },
    openGraph: {
      title: lesson.seoTitle,
      description: lesson.description,
      url: `/learn/${language}/${slug}`,
      siteName: "CodeCraft",
      type: "article",
    },
    twitter: {
      card: "summary",
      title: lesson.seoTitle,
      description: lesson.description,
    },
  };
}

export default async function LessonPage({
  params,
}: {
  params: Promise<{ language: string; slug: string }>;
}) {
  const { language, slug } = await params;
  const lesson = getLesson(language, slug);
  if (!lesson) notFound();

  return (
    <div className="flex flex-1 flex-col">
      <JsonLd
        data={breadcrumbJsonLd([
          { name: "Home", path: "/" },
          { name: "Learning Paths", path: "/courses" },
          {
            name: lesson.courseSlug === "python" ? "Python" : "JavaScript",
            path: `/courses/${lesson.courseSlug}`,
          },
          { name: lesson.title, path: `/learn/${language}/${slug}` },
        ])}
      />
      <div className="border-b border-slate-800 bg-slate-900 px-4 pt-3 sm:px-6">
        <div className="mx-auto max-w-[1600px] pb-1 text-slate-400">
          <Breadcrumbs
            items={[
              { name: "Home", href: "/" },
              { name: "Learning Paths", href: "/courses" },
              {
                name: lesson.title,
              },
            ]}
          />
        </div>
      </div>
      <LessonWorkspace lesson={lesson} />
      <footer className="border-t border-slate-800 bg-slate-950 px-4 py-6 text-sm text-slate-400 sm:px-6">
        <div className="mx-auto flex max-w-[1600px] flex-wrap items-center gap-x-6 gap-y-2">
          <span>Estimated time: {lesson.estimatedMinutes} minutes</span>
          {lesson.relatedLessons.map((r) => (
            <Link
              key={r.href}
              href={r.href}
              className="inline-flex items-center gap-1 text-indigo-300 hover:underline"
            >
              Related: {r.title}
              <ArrowRight className="h-3.5 w-3.5" aria-hidden="true" />
            </Link>
          ))}
        </div>
      </footer>
    </div>
  );
}
