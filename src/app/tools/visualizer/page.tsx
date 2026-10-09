import type { Metadata } from "next";
import { Breadcrumbs } from "@/components/seo/Breadcrumbs";
import { JsonLd } from "@/components/seo/JsonLd";
import { Visualizer } from "@/components/visualizer/Visualizer";
import { breadcrumbJsonLd, pageMetadata } from "@/lib/seo";

export const metadata: Metadata = pageMetadata({
  title: "Code Visualizer — Visualize How Loops Work in Python Line by Line",
  description:
    "Watch Python execute line by line: variables, loops, conditions, and functions traced step by step. Free visual code execution for beginners — no setup.",
  path: "/tools/visualizer",
  keywords: [
    "visualize how loops work in python line by line",
    "python visualizer",
    "see code execution step by step",
  ],
});

export default function VisualizerPage() {
  return (
    <main className="mx-auto max-w-7xl flex-1 px-4 py-10 sm:px-6 lg:px-8">
      <JsonLd
        data={breadcrumbJsonLd([
          { name: "Home", path: "/" },
          { name: "Tools", path: "/tools/visualizer" },
          { name: "Code Visualizer", path: "/tools/visualizer" },
        ])}
      />
      <Breadcrumbs
        items={[{ name: "Home", href: "/" }, { name: "Code Visualizer" }]}
      />
      <h1 className="mt-4 text-3xl font-bold tracking-tight text-slate-900 sm:text-4xl">
        Visualize how Python code executes, line by line
      </h1>
      <p className="mt-3 max-w-3xl text-lg leading-8 text-slate-600">
        Select an example, then step through it. The current line is
        highlighted, variables update live, and the timeline shows the full
        execution history — including how loops work in Python, one iteration
        at a time.
      </p>
      <div className="mt-8">
        <Visualizer />
      </div>
    </main>
  );
}
