import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowRight, Clock, GraduationCap } from "lucide-react";
import { getProject, projects } from "@/data/content";
import { Breadcrumbs } from "@/components/seo/Breadcrumbs";
import { JsonLd } from "@/components/seo/JsonLd";
import { ProjectChecklist } from "@/components/projects/ProjectChecklist";
import { breadcrumbJsonLd, pageMetadata } from "@/lib/seo";

export function generateStaticParams() {
  return projects.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const project = getProject(slug);
  if (!project) return {};
  return pageMetadata({
    title: `${project.title} — Guided Beginner Project`,
    description: project.description,
    path: `/projects/${project.slug}`,
  });
}

export default async function ProjectDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const project = getProject(slug);
  if (!project) notFound();

  return (
    <main className="mx-auto max-w-7xl flex-1 px-4 py-10 sm:px-6 lg:px-8">
      <JsonLd
        data={breadcrumbJsonLd([
          { name: "Home", path: "/" },
          { name: "Projects", path: "/projects" },
          { name: project.title, path: `/projects/${project.slug}` },
        ])}
      />
      <Breadcrumbs
        items={[
          { name: "Home", href: "/" },
          { name: "Projects", href: "/projects" },
          { name: project.title },
        ]}
      />

      <div className="mt-4 grid gap-10 lg:grid-cols-[2fr_1fr]">
        <div>
          <span className="inline-flex w-fit rounded-full bg-green-50 px-3 py-1 text-xs font-semibold text-green-700">
            {project.difficulty}
          </span>
          <h1 className="mt-3 text-3xl font-bold tracking-tight text-slate-900 sm:text-4xl">
            {project.title}
          </h1>
          <p className="mt-3 max-w-3xl text-lg leading-8 text-slate-600">
            {project.description}
          </p>
          <div className="mt-4 flex flex-wrap gap-x-6 gap-y-2 text-sm text-slate-600">
            <span className="flex items-center gap-1.5">
              <Clock className="h-4 w-4" aria-hidden="true" />≈{" "}
              {project.estimatedHours} hours
            </span>
            <span className="flex items-center gap-1.5">
              <GraduationCap className="h-4 w-4" aria-hidden="true" />
              Skills: {project.skills.join(", ")}
            </span>
          </div>

          <section aria-labelledby="overview-heading" className="mt-8">
            <h2 id="overview-heading" className="text-xl font-bold text-slate-900">
              Overview — what you&apos;ll build
            </h2>
            {project.overview.map((p) => (
              <p key={p.slice(0, 24)} className="mt-3 leading-7 text-slate-600">
                {p}
              </p>
            ))}
          </section>

          <section aria-labelledby="starter-heading" className="mt-8">
            <h2 id="starter-heading" className="text-xl font-bold text-slate-900">
              Starter code
            </h2>
            <pre className="mt-3 overflow-x-auto rounded-xl bg-slate-950 p-4 font-mono text-sm leading-7 text-slate-100">
              {project.starterCode}
            </pre>
            <p className="mt-2 text-sm text-slate-500">
              Copy this into a{" "}
              <Link href="/learn/python/intro" className="font-semibold text-indigo-700 hover:underline">
                Python lesson workspace
              </Link>{" "}
              to experiment with it live.
            </p>
          </section>

          <section aria-labelledby="milestones-heading" className="mt-8">
            <h2 id="milestones-heading" className="text-xl font-bold text-slate-900">
              Step-by-step milestones
            </h2>
            <div className="mt-4">
              <ProjectChecklist project={project} />
            </div>
          </section>

          <section
            aria-labelledby="challenge-heading"
            className="mt-8 rounded-xl border border-indigo-200 bg-indigo-50 p-6"
          >
            <h2 id="challenge-heading" className="text-xl font-bold text-slate-900">
              Final challenge
            </h2>
            <p className="mt-2 leading-7 text-slate-700">
              {project.finalChallenge}
            </p>
          </section>
        </div>

        <aside className="space-y-6 lg:sticky lg:top-24 lg:self-start">
          <div className="rounded-xl border border-slate-200 bg-white p-5 shadow-sm">
            <h2 className="font-bold text-slate-900">Prerequisite lessons</h2>
            <ul className="mt-3 space-y-2">
              {project.lessons.map((l) => (
                <li key={l.href}>
                  <Link
                    href={l.href}
                    className="flex min-h-[44px] items-center gap-1.5 rounded-lg px-2 text-sm font-medium text-indigo-700 hover:bg-indigo-50 hover:underline"
                  >
                    {l.title}
                    <ArrowRight className="h-3.5 w-3.5" aria-hidden="true" />
                  </Link>
                </li>
              ))}
            </ul>
          </div>
          <div className="rounded-xl border border-slate-200 bg-white p-5 shadow-sm">
            <h2 className="font-bold text-slate-900">More projects</h2>
            <ul className="mt-3 space-y-2">
              {projects
                .filter((p) => p.slug !== project.slug)
                .slice(0, 3)
                .map((p) => (
                  <li key={p.slug}>
                    <Link
                      href={`/projects/${p.slug}`}
                      className="flex min-h-[44px] items-center text-sm font-medium text-slate-700 hover:text-indigo-700 hover:underline"
                    >
                      {p.title}
                    </Link>
                  </li>
                ))}
            </ul>
          </div>
        </aside>
      </div>
    </main>
  );
}
