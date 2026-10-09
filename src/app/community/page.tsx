import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight, CheckCircle2, MessageSquare, MessagesSquare } from "lucide-react";
import { communityCategories, communityThreads } from "@/data/content";
import { Breadcrumbs } from "@/components/seo/Breadcrumbs";
import { JsonLd } from "@/components/seo/JsonLd";
import { breadcrumbJsonLd, pageMetadata } from "@/lib/seo";

export const metadata: Metadata = pageMetadata({
  title: "Community — Ask Questions, Share Projects | CodeCraft",
  description:
    "Get help from fellow beginners: Python, JavaScript, debugging, and project discussions. Browse solved threads or ask your own question.",
  path: "/community",
});

export default function CommunityPage() {
  return (
    <main className="mx-auto max-w-7xl flex-1 px-4 py-10 sm:px-6 lg:px-8">
      <JsonLd
        data={breadcrumbJsonLd([
          { name: "Home", path: "/" },
          { name: "Community", path: "/community" },
        ])}
      />
      <Breadcrumbs
        items={[{ name: "Home", href: "/" }, { name: "Community" }]}
      />
      <div className="mt-4 flex flex-wrap items-end justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold tracking-tight text-slate-900 sm:text-4xl">
            Learn together
          </h1>
          <p className="mt-3 max-w-3xl text-lg leading-8 text-slate-600">
            Stuck on a lesson? Browse solved threads or ask the community.
            (Prototype: threads are illustrative mock data — posting arrives
            with the backend.)
          </p>
        </div>
        <span className="inline-flex items-center gap-2 rounded-lg bg-indigo-600 px-5 py-3 text-sm font-semibold text-white opacity-80">
          <MessagesSquare className="h-4 w-4" aria-hidden="true" />
          New discussion (coming soon)
        </span>
      </div>

      <div className="mt-8 flex flex-wrap gap-2" role="group" aria-label="Browse by category">
        {communityCategories.map((c) => (
          <Link
            key={c}
            href={`/community/${c.toLowerCase().replace(/ /g, "-")}`}
            className="inline-flex min-h-[44px] items-center rounded-lg border border-slate-300 bg-white px-4 text-sm font-medium text-slate-700 hover:border-indigo-400 hover:text-indigo-700"
          >
            {c}
          </Link>
        ))}
        <Link
          href="/community/errors"
          className="inline-flex min-h-[44px] items-center rounded-lg border border-slate-300 bg-white px-4 text-sm font-medium text-slate-700 hover:border-indigo-400 hover:text-indigo-700"
        >
          Common Errors
        </Link>
      </div>

      <ul className="mt-6 divide-y divide-slate-100 overflow-hidden rounded-xl border border-slate-200 bg-white shadow-sm">
        {communityThreads.map((t) => (
          <li key={t.slug}>
            <Link
              href={`/community/${t.category.toLowerCase().replace(/ /g, "-")}`}
              className="flex gap-4 px-4 py-4 hover:bg-slate-50 sm:px-6"
              aria-label={`${t.title} — ${t.replies} replies, ${t.views} views`}
            >
              <span className="mt-1 hidden sm:block">
                <MessageSquare className="h-5 w-5 text-slate-400" aria-hidden="true" />
              </span>
              <span className="flex-1">
                <span className="flex flex-wrap items-center gap-2">
                  <span className="font-semibold text-slate-900 hover:text-indigo-700 hover:underline">
                    {t.title}
                  </span>
                  {t.solved && (
                    <span className="inline-flex items-center gap-1 rounded-full bg-green-50 px-2 py-0.5 text-xs font-semibold text-green-700">
                      <CheckCircle2 className="h-3 w-3" aria-hidden="true" />
                      Solved
                    </span>
                  )}
                </span>
                <span className="mt-1 block text-sm leading-6 text-slate-600">
                  {t.excerpt}
                </span>
                <span className="mt-2 block text-xs text-slate-500">
                  {t.category} · by {t.author} · {t.replies} replies ·{" "}
                  {t.views.toLocaleString()} views · {t.lastActivity}
                </span>
              </span>
            </Link>
          </li>
        ))}
      </ul>

      <aside className="mt-8 rounded-xl border border-slate-200 bg-white p-6 shadow-sm">
        <h2 className="text-lg font-bold text-slate-900">
          Debugging help, structured
        </h2>
        <p className="mt-2 text-sm leading-6 text-slate-600">
          If a lesson gives you an error you don&apos;t understand, the{" "}
          <Link href="/community/errors" className="font-semibold text-indigo-700 hover:underline">
            common errors guide
            <ArrowRight className="ml-1 inline h-3.5 w-3.5" aria-hidden="true" />
          </Link>{" "}
          explains the frequent beginner errors in plain language.
        </p>
      </aside>
    </main>
  );
}
