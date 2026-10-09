import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowRight, Clock } from "lucide-react";
import { blogPosts, getPost } from "@/data/blog";
import { BlogBlocks } from "@/components/blog/BlogBlocks";
import { Breadcrumbs } from "@/components/seo/Breadcrumbs";
import { JsonLd } from "@/components/seo/JsonLd";
import {
  articleJsonLd,
  articleMetadata,
  breadcrumbJsonLd,
  faqJsonLd,
} from "@/lib/seo";

export function generateStaticParams() {
  return blogPosts.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const post = getPost(slug);
  if (!post) return {};
  return articleMetadata(post, `/blog/${post.slug}`);
}

function formatDate(iso: string): string {
  return new Date(`${iso}T00:00:00`).toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });
}

export default async function BlogPostPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const post = getPost(slug);
  if (!post) notFound();

  const toc = post.blocks.filter(
    (b): b is { type: "heading"; level: 2 | 3; text: string; id: string } =>
      b.type === "heading",
  );

  return (
    <main className="mx-auto max-w-4xl flex-1 px-4 py-10 sm:px-6 lg:px-8">
      <JsonLd
        data={[
          breadcrumbJsonLd([
            { name: "Home", path: "/" },
            { name: "Blog", path: "/blog" },
            { name: post.title, path: `/blog/${post.slug}` },
          ]),
          articleJsonLd(post, `/blog/${post.slug}`),
          faqJsonLd(post.faqs),
        ]}
      />
      <Breadcrumbs
        items={[
          { name: "Home", href: "/" },
          { name: "Blog", href: "/blog" },
          { name: post.title },
        ]}
      />
      <article className="mt-4">
        <header>
          <div className="flex flex-wrap gap-1.5">
            {post.tags.map((t) => (
              <span
                key={t}
                className="rounded bg-indigo-50 px-2.5 py-1 text-xs font-semibold text-indigo-700"
              >
                {t}
              </span>
            ))}
          </div>
          <h1 className="mt-4 text-3xl font-bold leading-tight tracking-tight text-slate-900 sm:text-4xl">
            {post.title}
          </h1>
          <p className="mt-4 text-lg leading-8 text-slate-600">
            {post.description}
          </p>
          <p className="mt-4 flex flex-wrap items-center gap-x-4 gap-y-1 text-sm text-slate-500">
            <span>
              By <strong className="text-slate-700">{post.author}</strong>
            </span>
            <span>Published {formatDate(post.datePublished)}</span>
            <span>Updated {formatDate(post.dateModified)}</span>
            <span className="flex items-center gap-1">
              <Clock className="h-3.5 w-3.5" aria-hidden="true" />
              {post.readingMinutes} min read
            </span>
          </p>
        </header>

        <nav
          aria-label="Table of contents"
          className="mt-8 rounded-xl border border-slate-200 bg-white p-5 shadow-sm"
        >
          <h2 className="text-sm font-bold uppercase tracking-wide text-slate-700">
            In this guide
          </h2>
          <ol className="mt-3 space-y-1.5">
            {toc.map((h) => (
              <li key={h.id} className={h.level === 3 ? "ml-4" : ""}>
                <a
                  href={`#${h.id}`}
                  className="text-sm font-medium text-indigo-700 hover:underline"
                >
                  {h.text}
                </a>
              </li>
            ))}
          </ol>
        </nav>

        <div className="article-body mt-8">
          <BlogBlocks blocks={post.blocks} />
        </div>

        <section
          aria-labelledby="practice-heading"
          className="mt-10 rounded-xl border border-indigo-200 bg-indigo-50 p-6"
        >
          <h2 id="practice-heading" className="text-lg font-bold text-slate-900">
            Practice this right now — free
          </h2>
          <p className="mt-2 text-sm leading-6 text-slate-700">
            Reading helps; coding teaches. Try the interactive lesson or trace
            the examples visually:
          </p>
          <div className="mt-3 flex flex-wrap gap-2">
            <Link
              href="/learn/python/intro"
              className="inline-flex min-h-[48px] items-center rounded-lg bg-indigo-600 px-5 text-sm font-semibold text-white hover:bg-indigo-700"
            >
              Start coding free
            </Link>
            <Link
              href="/tools/visualizer"
              className="inline-flex min-h-[48px] items-center rounded-lg border border-indigo-300 bg-white px-5 text-sm font-semibold text-indigo-800 hover:bg-indigo-100"
            >
              Open the visualizer
            </Link>
          </div>
        </section>

        <section aria-labelledby="faq-heading" className="mt-10">
          <h2 id="faq-heading" className="text-2xl font-bold text-slate-900">
            Frequently asked questions
          </h2>
          <dl className="mt-4 space-y-4">
            {post.faqs.map((f) => (
              <div
                key={f.question}
                className="rounded-xl border border-slate-200 bg-white p-5 shadow-sm"
              >
                <dt className="font-bold text-slate-900">{f.question}</dt>
                <dd className="mt-2 text-sm leading-6 text-slate-600">
                  {f.answer}
                </dd>
              </div>
            ))}
          </dl>
        </section>

        <nav aria-label="Related articles" className="mt-10">
          <h2 className="text-2xl font-bold text-slate-900">
            Keep learning
          </h2>
          <ul className="mt-4 grid gap-4 sm:grid-cols-3">
            {post.related.map((r) => (
              <li
                key={r.href}
                className="rounded-xl border border-slate-200 bg-white p-4 shadow-sm"
              >
                <Link
                  href={r.href}
                  className="flex min-h-[44px] items-center gap-1 text-sm font-semibold text-indigo-700 hover:underline"
                >
                  {r.title}
                  <ArrowRight className="h-3.5 w-3.5 shrink-0" aria-hidden="true" />
                </Link>
              </li>
            ))}
          </ul>
        </nav>
      </article>
    </main>
  );
}
