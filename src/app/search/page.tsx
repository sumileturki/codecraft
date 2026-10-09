import type { Metadata } from "next";
import { SearchClient } from "@/components/search/SearchClient";
import { Breadcrumbs } from "@/components/seo/Breadcrumbs";
import { pageMetadata } from "@/lib/seo";

export const metadata: Metadata = pageMetadata({
  title: "Search Lessons, Projects & Articles | CodeCraft",
  description:
    "Search CodeCraft: Python and JavaScript lessons, beginner projects, community discussions, and beginner-friendly coding guides.",
  path: "/search",
});

export default async function SearchPage({
  searchParams,
}: {
  searchParams: Promise<{ q?: string }>;
}) {
  const { q } = await searchParams;
  return (
    <main className="mx-auto max-w-4xl flex-1 px-4 py-10 sm:px-6 lg:px-8">
      <Breadcrumbs items={[{ name: "Home", href: "/" }, { name: "Search" }]} />
      <h1 className="mt-4 text-3xl font-bold tracking-tight text-slate-900">
        Search CodeCraft
      </h1>
      <p className="mt-2 text-slate-600">
        Search across courses, lessons, projects, articles, and discussions.
      </p>
      <div className="mt-6">
        <SearchClient initialQuery={q ?? ""} />
      </div>
    </main>
  );
}
