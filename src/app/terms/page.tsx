import type { Metadata } from "next";
import { Breadcrumbs } from "@/components/seo/Breadcrumbs";
import { pageMetadata } from "@/lib/seo";

export const metadata: Metadata = pageMetadata({
  title: "Terms of Service",
  description: "The terms for using CodeCraft's free interactive coding lessons and projects.",
  path: "/terms",
});

export default function TermsPage() {
  return (
    <main className="mx-auto max-w-3xl flex-1 px-4 py-10 sm:px-6 lg:px-8">
      <Breadcrumbs items={[{ name: "Home", href: "/" }, { name: "Terms" }]} />
      <h1 className="mt-4 text-3xl font-bold tracking-tight text-slate-900">
        Terms of Service
      </h1>
      <p className="mt-2 text-sm text-slate-500">Last updated: October 2026</p>
      <div className="article-body mt-6">
        <h2>Educational prototype</h2>
        <p>
          CodeCraft is a free educational prototype built as a college project.
          Lessons, feedback, community threads, and progress tracking are
          provided as-is for learning purposes.
        </p>
        <h2>Acceptable use</h2>
        <p>
          Code execution happens in your own browser sandbox. Do not attempt to
          use the platform to harm, mislead, or infringe on others. Community
          features in this prototype are illustrative mock data; real posting
          will carry its own content guidelines.
        </p>
        <h2>Content</h2>
        <p>
          All lessons, guides, and project materials are original content
          created for this project. You may use what you learn — and what you
          build — freely in your own portfolio.
        </p>
        <h2>No warranties</h2>
        <p>
          The platform is provided without warranties of any kind. Features
          marked prototype, mock, or coming soon are not production services.
        </p>
      </div>
    </main>
  );
}
