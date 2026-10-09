import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight, Clock } from "lucide-react";
import { blogPosts } from "@/data/blog";
import { Breadcrumbs } from "@/components/seo/Breadcrumbs";
import { JsonLd } from "@/components/seo/JsonLd";
import { breadcrumbJsonLd, pageMetadata } from "@/lib/seo";

export const metadata: Metadata = pageMetadata({
  title: "Blog — Beginner Coding Guides | CodeCraft",
  description:
    "Original beginner-friendly guides: Python basics, how to learn coding without installing anything, the best first language, project ideas, and loops explained.",
  path: "/blog",
});

function formatDate(iso: string): string {
  return new Date(`${iso}T00:00:00`).toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });
}

export default function BlogPage() {
  return (
    <main className="mx-auto max-w-7xl flex-1 px-4 py-10 sm:px-6 lg:px-8">
      <JsonLd
        data={breadcrumbJsonLd([
          { name: "Home", path: "/" },
          { name: "Blog", path: "/blog" },
        ])}
      />
      <Breadcrumbs items={[{ name: "Home", href: "/" }, { name: "Blog" }]} />
      <h1 className="mt-4 text-3xl font-bold tracking-tight text-slate-900 sm:text-4xl">
        Beginner coding guides
      </h1>
      <p className="mt-3 max-w-3xl text-lg leading-8 text-slate-600">
        Original, plain-language articles on learning Python, choosing your
        first language, and building projects — each linked to interactive
        lessons so you can practice immediately.
      </p>
      <ul className="mt-8 grid gap-6 md:grid-cols-2">
        {blogPosts.map((post) => (
          <li
            key={post.slug}
            className="flex flex-col rounded-xl border border-slate-200 bg-white p-6 shadow-sm hover:shadow-md"
          >
            <div className="flex flex-wrap gap-1.5">
              {post.tags.slice(0, 3).map((t) => (
                <span
                  key={t}
                  className="rounded bg-slate-100 px-2 py-0.5 text-xs font-medium text-slate-600"
                >
                  {t}
                </span>
              ))}
            </div>
            <h2 className="mt-3 text-xl font-bold leading-snug text-slate-900">
              <Link
                href={`/blog/${post.slug}`}
                className="hover:text-indigo-700 hover:underline"
              >
                {post.title}
              </Link>
            </h2>
            <p className="mt-2 flex-1 text-sm leading-6 text-slate-600">
              {post.description}
            </p>
            <p className="mt-3 flex items-center gap-1.5 text-xs text-slate-500">
              <Clock className="h-3.5 w-3.5" aria-hidden="true" />
              {post.readingMinutes} min read · {formatDate(post.datePublished)}
            </p>
            <Link
              href={`/blog/${post.slug}`}
              className="mt-4 inline-flex min-h-[44px] items-center gap-1.5 text-sm font-semibold text-indigo-700 hover:underline"
            >
              Read guide
              <ArrowRight className="h-4 w-4" aria-hidden="true" />
            </Link>
          </li>
        ))}
      </ul>
    </main>
  );
}
