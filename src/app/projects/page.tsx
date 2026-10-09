import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight, Clock } from "lucide-react";
import { projects } from "@/data/content";
import { Breadcrumbs } from "@/components/seo/Breadcrumbs";
import { JsonLd } from "@/components/seo/JsonLd";
import { breadcrumbJsonLd, pageMetadata } from "@/lib/seo";

export const metadata: Metadata = pageMetadata({
  title: "Beginner Python Project Ideas with Guided Steps | CodeCraft",
  description:
    "Turn lessons into portfolio projects: calculator, weather dashboard, todo app, quiz game, and expense tracker. Guided, semi-guided, and unguided difficulty with milestones and hints.",
  path: "/projects",
  keywords: [
    "beginner python project ideas with guided steps",
    "python projects for beginners",
    "coding portfolio projects",
  ],
});

const LEVEL_COLORS: Record<string, string> = {
  Guided: "bg-green-50 text-green-700",
  "Semi-Guided": "bg-amber-50 text-amber-700",
  Unguided: "bg-red-50 text-red-700",
};

export default function ProjectsPage() {
  return (
    <main className="mx-auto max-w-7xl flex-1 px-4 py-10 sm:px-6 lg:px-8">
      <JsonLd
        data={breadcrumbJsonLd([
          { name: "Home", path: "/" },
          { name: "Projects", path: "/projects" },
        ])}
      />
      <Breadcrumbs items={[{ name: "Home", href: "/" }, { name: "Projects" }]} />
      <h1 className="mt-4 text-3xl font-bold tracking-tight text-slate-900 sm:text-4xl">
        Beginner Python project ideas with guided steps
      </h1>
      <p className="mt-3 max-w-3xl text-lg leading-8 text-slate-600">
        Tutorials teach syntax — projects teach programming. Each project has
        milestones, hints, starter code, and a final challenge, at three
        support levels: <strong>Guided</strong>, <strong>Semi-Guided</strong>,
        and <strong>Unguided</strong>.
      </p>

      <ul className="mt-8 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {projects.map((project) => (
          <li
            key={project.slug}
            className="flex flex-col rounded-xl border border-slate-200 bg-white p-6 shadow-sm hover:shadow-md"
          >
            <span
              className={`inline-flex w-fit rounded-full px-2.5 py-1 text-xs font-semibold ${LEVEL_COLORS[project.difficulty]}`}
            >
              {project.difficulty}
            </span>
            <h2 className="mt-3 text-lg font-bold text-slate-900">
              <Link
                href={`/projects/${project.slug}`}
                className="hover:text-indigo-700 hover:underline"
              >
                {project.title}
              </Link>
            </h2>
            <p className="mt-2 flex-1 text-sm leading-6 text-slate-600">
              {project.description}
            </p>
            <div className="mt-3 flex flex-wrap gap-1.5">
              {project.skills.slice(0, 3).map((s) => (
                <span
                  key={s}
                  className="rounded bg-slate-100 px-2 py-0.5 text-xs font-medium text-slate-600"
                >
                  {s}
                </span>
              ))}
            </div>
            <p className="mt-3 flex items-center gap-1.5 text-sm text-slate-500">
              <Clock className="h-4 w-4" aria-hidden="true" />
              ≈ {project.estimatedHours} hours · {project.milestones.length} milestones
            </p>
            <Link
              href={`/projects/${project.slug}`}
              className="mt-4 inline-flex min-h-[48px] items-center justify-center gap-1.5 rounded-lg bg-indigo-600 px-4 text-sm font-semibold text-white hover:bg-indigo-700"
            >
              Start project
              <ArrowRight className="h-4 w-4" aria-hidden="true" />
            </Link>
          </li>
        ))}
      </ul>
    </main>
  );
}
