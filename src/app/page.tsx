import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight, Eye, FolderKanban } from "lucide-react";
import { Hero } from "@/components/home/Hero";
import { SocialProof } from "@/components/home/SocialProof";
import { LearningPaths } from "@/components/home/LearningPaths";
import { WhyCodeCraft } from "@/components/home/WhyCodeCraft";
import { InteractiveCodeDemo } from "@/components/home/InteractiveCodeDemo";
import { CTAButton } from "@/components/ui/CTAButton";
import { JsonLd } from "@/components/seo/JsonLd";
import { organizationJsonLd, pageMetadata, websiteJsonLd } from "@/lib/seo";

export const metadata: Metadata = pageMetadata({
  title: "CodeCraft — Learn to Code. Build Real Things. No Setup Required.",
  description:
    "Master programming through interactive browser lessons, instant feedback, visual execution tracing, and guided projects built for beginners. Start coding free — no installation.",
  path: "/",
  keywords: [
    "free interactive code editor with live hints",
    "learn to code online",
    "python for beginners",
    "coding for non-tech background",
  ],
});

const AUDIENCES = [
  "Career switchers",
  "University students",
  "Complete beginners",
  "Aspiring founders",
  "Self-taught developers",
];

export default function HomePage() {
  return (
    <main>
      <JsonLd data={[organizationJsonLd(), websiteJsonLd()]} />
      <Hero />
      <SocialProof />
      <LearningPaths />
      <WhyCodeCraft />
      <InteractiveCodeDemo />

      <section
        aria-labelledby="audience-heading"
        className="border-b border-slate-200 bg-white py-16"
      >
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid gap-10 lg:grid-cols-2">
            <div>
              <h2
                id="audience-heading"
                className="text-2xl font-bold tracking-tight text-slate-900 sm:text-3xl"
              >
                Made for the best coding pathway for a non-tech background
              </h2>
              <p className="mt-4 leading-7 text-slate-600">
                If you have never written code, struggled with setting up a
                development environment, or watched tutorials without
                understanding what the code actually does — CodeCraft was
                designed for you. Every concept is explained in plain language,
                every lesson runs in your browser, and every project builds
                toward something real.
              </p>
              <div className="mt-6 flex flex-col gap-3 sm:flex-row">
                <CTAButton href="/courses" size="lg">
                  Explore Learning Paths
                  <ArrowRight className="h-4 w-4" aria-hidden="true" />
                </CTAButton>
                <CTAButton href="/blog" variant="secondary" size="lg">
                  Read the beginner guides
                </CTAButton>
              </div>
            </div>
            <div>
              <h3 className="text-sm font-semibold uppercase tracking-wide text-slate-500">
                Who CodeCraft is for
              </h3>
              <ul className="mt-4 space-y-3">
                {AUDIENCES.map((a) => (
                  <li
                    key={a}
                    className="flex items-center gap-3 rounded-lg border border-slate-200 bg-slate-50 px-4 py-3 text-sm font-medium text-slate-800"
                  >
                    <span
                      aria-hidden="true"
                      className="h-2 w-2 rounded-full bg-indigo-600"
                    />
                    {a}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </section>

      <section aria-labelledby="next-heading" className="bg-slate-50 py-16">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <h2
            id="next-heading"
            className="text-2xl font-bold tracking-tight text-slate-900"
          >
            Keep exploring
          </h2>
          <ul className="mt-6 grid gap-6 md:grid-cols-2">
            <li className="rounded-xl border border-slate-200 bg-white p-6 shadow-sm">
              <Eye className="h-6 w-6 text-indigo-600" aria-hidden="true" />
              <h3 className="mt-3 text-lg font-bold text-slate-900">
                Visualize how loops work in Python, line by line
              </h3>
              <p className="mt-2 text-sm leading-6 text-slate-600">
                Watch variables change as each line executes with the free code
                visualizer.
              </p>
              <Link
                href="/tools/visualizer"
                className="mt-4 inline-flex min-h-[44px] items-center gap-1.5 text-sm font-semibold text-indigo-700 hover:underline"
              >
                Open the code visualizer
                <ArrowRight className="h-4 w-4" aria-hidden="true" />
              </Link>
            </li>
            <li className="rounded-xl border border-slate-200 bg-white p-6 shadow-sm">
              <FolderKanban className="h-6 w-6 text-indigo-600" aria-hidden="true" />
              <h3 className="mt-3 text-lg font-bold text-slate-900">
                Beginner Python project ideas with guided steps
              </h3>
              <p className="mt-2 text-sm leading-6 text-slate-600">
                Turn lessons into portfolio pieces with step-by-step project
                guides.
              </p>
              <Link
                href="/projects"
                className="mt-4 inline-flex min-h-[44px] items-center gap-1.5 text-sm font-semibold text-indigo-700 hover:underline"
              >
                Browse beginner projects
                <ArrowRight className="h-4 w-4" aria-hidden="true" />
              </Link>
            </li>
          </ul>
        </div>
      </section>
    </main>
  );
}
