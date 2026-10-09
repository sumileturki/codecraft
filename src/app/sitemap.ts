import type { MetadataRoute } from "next";
import { SITE_URL } from "@/lib/site";
import { courses, lessons } from "@/data/courses";
import { projects } from "@/data/content";
import { blogPosts } from "@/data/blog";

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date();
  const staticPages = [
    "/",
    "/courses",
    "/projects",
    "/tools/visualizer",
    "/community",
    "/about",
    "/blog",
    "/search",
  ];
  const communityCategories = [
    "python",
    "javascript",
    "beginner-questions",
    "debugging",
    "projects",
    "errors",
  ];

  return [
    ...staticPages.map((p) => ({
      url: `${SITE_URL}${p}`,
      lastModified: now,
      changeFrequency: "weekly" as const,
      priority: p === "/" ? 1 : 0.8,
    })),
    ...courses.map((c) => ({
      url: `${SITE_URL}/courses/${c.slug}`,
      lastModified: now,
      changeFrequency: "weekly" as const,
      priority: 0.9,
    })),
    ...Object.keys(lessons).map((key) => {
      const [language, slug] = key.split("/");
      return {
        url: `${SITE_URL}/learn/${language}/${slug}`,
        lastModified: now,
        changeFrequency: "weekly" as const,
        priority: 0.9,
      };
    }),
    ...projects.map((p) => ({
      url: `${SITE_URL}/projects/${p.slug}`,
      lastModified: now,
      changeFrequency: "monthly" as const,
      priority: 0.8,
    })),
    ...blogPosts.map((b) => ({
      url: `${SITE_URL}/blog/${b.slug}`,
      lastModified: new Date(b.dateModified),
      changeFrequency: "monthly" as const,
      priority: 0.7,
    })),
    ...communityCategories.map((c) => ({
      url: `${SITE_URL}/community/${c}`,
      lastModified: now,
      changeFrequency: "weekly" as const,
      priority: 0.5,
    })),
  ];
}
