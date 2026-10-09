import type { Metadata } from "next";
import type { BlogPost, Course } from "@/types";
import { SITE_URL, canonical } from "./site";

export const DEFAULT_OG_IMAGE = `${SITE_URL}/og-cover.png`;

interface PageMeta {
  title: string;
  description: string;
  path: string;
  keywords?: string[];
  noindex?: boolean;
}

export function pageMetadata({
  title,
  description,
  path,
  keywords,
  noindex,
}: PageMeta): Metadata {
  return {
    title,
    description,
    keywords,
    alternates: { canonical: canonical(path) },
    openGraph: {
      title,
      description,
      url: canonical(path),
      siteName: "CodeCraft",
      type: "website",
      images: [{ url: DEFAULT_OG_IMAGE, width: 1200, height: 630 }],
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: [DEFAULT_OG_IMAGE],
    },
    ...(noindex ? { robots: { index: false, follow: false } } : {}),
  };
}

export function articleMetadata(post: BlogPost, path: string): Metadata {
  const base = pageMetadata({
    title: post.seoTitle,
    description: post.description,
    path,
    keywords: post.tags,
  });
  return {
    ...base,
    openGraph: { ...base.openGraph, type: "article" },
    authors: [{ name: post.author }],
  };
}

export function jsonLd(data: Record<string, unknown> | Array<Record<string, unknown>>) {
  return {
    __html: JSON.stringify(
      Array.isArray(data)
        ? { "@context": "https://schema.org", "@graph": data }
        : { "@context": "https://schema.org", ...data },
    ),
  };
}

export function organizationJsonLd() {
  return {
    "@type": "Organization",
    "@id": `${SITE_URL}/#organization`,
    name: "CodeCraft",
    url: SITE_URL,
    slogan: "Learn to code by building.",
    sameAs: [
      "https://github.com/codecraft",
      "https://www.linkedin.com/company/codecraft",
      "https://www.youtube.com/@codecraft",
    ],
  };
}

export function websiteJsonLd() {
  return {
    "@type": "WebSite",
    "@id": `${SITE_URL}/#website`,
    url: SITE_URL,
    name: "CodeCraft",
    publisher: { "@id": `${SITE_URL}/#organization` },
    potentialAction: {
      "@type": "SearchAction",
      target: {
        "@type": "EntryPoint",
        urlTemplate: `${SITE_URL}/search?q={search_term_string}`,
      },
      "query-input": "required name=search_term_string",
    },
  };
}

export function breadcrumbJsonLd(items: { name: string; path: string }[]) {
  return {
    "@type": "BreadcrumbList",
    itemListElement: items.map((item, i) => ({
      "@type": "ListItem",
      position: i + 1,
      name: item.name,
      item: canonical(item.path),
    })),
  };
}

export function courseJsonLd(course: Course) {
  return {
    "@type": "Course",
    name: course.title,
    description: course.description,
    url: canonical(`/courses/${course.slug}`),
    provider: {
      "@type": "Organization",
      name: "CodeCraft",
      sameAs: SITE_URL,
    },
  };
}

export function articleJsonLd(post: BlogPost, path: string) {
  return {
    "@type": "Article",
    headline: post.title,
    description: post.description,
    url: canonical(path),
    image: [DEFAULT_OG_IMAGE],
    author: { "@type": "Person", name: post.author },
    publisher: { "@id": `${SITE_URL}/#organization` },
    datePublished: post.datePublished,
    dateModified: post.dateModified,
  };
}

export function faqJsonLd(faqs: { question: string; answer: string }[]) {
  return {
    "@type": "FAQPage",
    mainEntity: faqs.map((f) => ({
      "@type": "Question",
      name: f.question,
      acceptedAnswer: { "@type": "Answer", text: f.answer },
    })),
  };
}
