import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { CourseCatalog } from "@/components/courses/CourseCatalog";
import { Breadcrumbs } from "@/components/seo/Breadcrumbs";
import { JsonLd } from "@/components/seo/JsonLd";
import { breadcrumbJsonLd, pageMetadata } from "@/lib/seo";

export const metadata: Metadata = pageMetadata({
  title: "Learning Paths — Best Coding Pathway for Non-Tech Backgrounds",
  description:
    "Choose a beginner coding path: Python, JavaScript, or HTML & CSS. Filter by language, difficulty, and goal. Every lesson runs free in your browser — no setup.",
  path: "/courses",
  keywords: [
    "best coding pathway for non tech background",
    "learn python online free",
    "beginner coding paths",
  ],
});

export default function CoursesPage() {
  return (
    <main className="mx-auto max-w-7xl flex-1 px-4 py-10 sm:px-6 lg:px-8">
      <JsonLd
        data={breadcrumbJsonLd([
          { name: "Home", path: "/" },
          { name: "Learning Paths", path: "/courses" },
        ])}
      />
      <Breadcrumbs items={[{ name: "Home", href: "/" }, { name: "Learning Paths" }]} />
      <h1 className="mt-4 text-3xl font-bold tracking-tight text-slate-900 sm:text-4xl">
        Choose a path. Build your skills.
      </h1>
      <p className="mt-3 max-w-3xl text-lg leading-8 text-slate-600">
        The best coding pathway for a non-tech background starts with one
        language, plain-language lessons, and real projects. Pick a path below
        — every lesson is free and runs entirely in your browser.
      </p>
      <div className="mt-8">
        <CourseCatalog />
      </div>
      <aside className="mt-12 rounded-xl border border-slate-200 bg-white p-6 shadow-sm">
        <h2 className="text-lg font-bold text-slate-900">Not sure where to start?</h2>
        <p className="mt-2 text-sm leading-6 text-slate-600">
          Most beginners start with{" "}
          <Link href="/courses/python" className="font-semibold text-indigo-700 hover:underline">
            Python for Complete Beginners
          </Link>
          . If you want to build websites, try{" "}
          <Link href="/courses/html-css" className="font-semibold text-indigo-700 hover:underline">
            HTML &amp; CSS
          </Link>{" "}
          first. Compare options in our guide to the{" "}
          <Link href="/blog/best-programming-language-for-beginners" className="font-semibold text-indigo-700 hover:underline">
            best programming language for beginners
            <ArrowRight className="ml-1 inline h-3.5 w-3.5" aria-hidden="true" />
          </Link>
          .
        </p>
      </aside>
    </main>
  );
}
