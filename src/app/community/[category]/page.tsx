import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { CheckCircle2, MessageSquare } from "lucide-react";
import { communityCategories, communityThreads } from "@/data/content";
import { Breadcrumbs } from "@/components/seo/Breadcrumbs";
import { pageMetadata } from "@/lib/seo";

export function generateStaticParams() {
  const slugs = new Set<string>();
  for (const t of communityThreads)
    slugs.add(t.category.toLowerCase().replace(/ /g, "-"));
  for (const c of communityCategories)
    slugs.add(c.toLowerCase().replace(/ /g, "-"));
  slugs.add("errors");
  return [...slugs].map((category) => ({ category }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ category: string }>;
}): Promise<Metadata> {
  const { category } = await params;
  const label = category
    .split("-")
    .map((w) => w[0]?.toUpperCase() + w.slice(1))
    .join(" ");
  return pageMetadata({
    title: `${label} Discussions — Beginner Help | CodeCraft Community`,
    description: `Browse ${label.toLowerCase()} questions from beginners: solved threads, debugging help, and project advice.`,
    path: `/community/${category}`,
  });
}

const ERROR_GUIDE = [
  {
    error: "NameError: name 'x' is not defined",
    meaning: "You used a variable before creating it.",
    fix: "Create the variable first (e.g. x = 5) and check the spelling matches everywhere.",
  },
  {
    error: "IndentationError: expected an indented block",
    meaning: "The line after if, for, while, or def must be indented.",
    fix: "Add 4 spaces at the start of the block. Every line in the block needs the same indentation.",
  },
  {
    error: "SyntaxError: EOL while scanning string literal",
    meaning: "A string is missing its closing quote.",
    fix: "Every opening quote needs a matching closing quote on the same line.",
  },
  {
    error: "TypeError: can only concatenate str (not 'int')",
    meaning: "You tried to combine text and a number with +.",
    fix: "Convert the number first: \"Age: \" + str(age), or use an f-string.",
  },
  {
    error: "ZeroDivisionError: division by zero",
    meaning: "You divided by zero.",
    fix: "Check the value after / — guard with if number != 0: before dividing.",
  },
  {
    error: "Infinite loop (program never finishes)",
    meaning: "A while loop whose condition never becomes False.",
    fix: "Make sure something inside the loop changes the condition, or add a break.",
  },
];

export default async function CommunityCategoryPage({
  params,
}: {
  params: Promise<{ category: string }>;
}) {
  const { category } = await params;
  const threads = communityThreads.filter(
    (t) => t.category.toLowerCase().replace(/ /g, "-") === category,
  );
  const label = category
    .split("-")
    .map((w) => w[0]?.toUpperCase() + w.slice(1))
    .join(" ");
  if (threads.length === 0 && category !== "errors") notFound();

  return (
    <main className="mx-auto max-w-7xl flex-1 px-4 py-10 sm:px-6 lg:px-8">
      <Breadcrumbs
        items={[
          { name: "Home", href: "/" },
          { name: "Community", href: "/community" },
          { name: label },
        ]}
      />
      <h1 className="mt-4 text-3xl font-bold tracking-tight text-slate-900 sm:text-4xl">
        {category === "errors" ? "Common beginner errors, explained" : `${label} discussions`}
      </h1>
      <p className="mt-3 max-w-3xl text-lg leading-8 text-slate-600">
        {category === "errors"
          ? "Every error below is explained in plain language: what it means and how to fix it. (Prototype content — illustrative mock data.)"
          : `Questions from beginners about ${label.toLowerCase()}. (Prototype: illustrative mock data — posting arrives with the backend.)`}
      </p>

      {category === "errors" ? (
        <ul className="mt-8 space-y-4">
          {ERROR_GUIDE.map((e) => (
            <li
              key={e.error}
              className="rounded-xl border border-slate-200 bg-white p-5 shadow-sm sm:p-6"
            >
              <h2 className="font-mono text-sm font-bold text-red-700 sm:text-base">
                {e.error}
              </h2>
              <p className="mt-2 text-sm leading-6 text-slate-600">
                <strong className="text-slate-900">What it means:</strong> {e.meaning}
              </p>
              <p className="mt-1 text-sm leading-6 text-slate-600">
                <strong className="text-slate-900">How to fix it:</strong> {e.fix}
              </p>
              <p className="mt-2 text-sm">
                <Link href="/learn/python/intro" className="font-semibold text-indigo-700 hover:underline">
                  Practice in a lesson →
                </Link>
              </p>
            </li>
          ))}
        </ul>
      ) : (
        <ul className="mt-8 divide-y divide-slate-100 overflow-hidden rounded-xl border border-slate-200 bg-white shadow-sm">
          {threads.map((t) => (
            <li key={t.slug} className="flex gap-4 px-4 py-4 sm:px-6">
              <MessageSquare className="mt-1 h-5 w-5 shrink-0 text-slate-400" aria-hidden="true" />
              <div className="flex-1">
                <p className="flex flex-wrap items-center gap-2 font-semibold text-slate-900">
                  {t.title}
                  {t.solved && (
                    <span className="inline-flex items-center gap-1 rounded-full bg-green-50 px-2 py-0.5 text-xs font-semibold text-green-700">
                      <CheckCircle2 className="h-3 w-3" aria-hidden="true" />
                      Solved
                    </span>
                  )}
                </p>
                <p className="mt-1 text-sm leading-6 text-slate-600">{t.excerpt}</p>
                <p className="mt-2 text-xs text-slate-500">
                  by {t.author} · {t.replies} replies · {t.views.toLocaleString()} views · {t.lastActivity}
                </p>
              </div>
            </li>
          ))}
        </ul>
      )}

      <p className="mt-8 text-sm">
        <Link href="/community" className="font-semibold text-indigo-700 hover:underline">
          ← Back to all discussions
        </Link>
      </p>
    </main>
  );
}
