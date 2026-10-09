import Link from "next/link";
import {
  ArrowRight,
  BookOpenCheck,
  CheckCircle2,
  Play,
  Terminal,
} from "lucide-react";
import { CTAButton } from "@/components/ui/CTAButton";

export function Hero() {
  return (
    <section className="border-b border-slate-200 bg-white">
      <div className="mx-auto max-w-7xl px-4 pb-16 pt-12 sm:px-6 sm:pt-16 lg:px-8 lg:pb-20">
        <div className="grid items-center gap-12 lg:grid-cols-2">
          <div>
            <p className="inline-flex items-center gap-2 rounded-full border border-indigo-200 bg-indigo-50 px-3.5 py-1.5 text-sm font-medium text-indigo-700">
              <BookOpenCheck className="h-4 w-4" aria-hidden="true" />
              Learn by coding, not just watching
            </p>
            <h1 className="mt-6 text-4xl font-bold leading-[1.1] tracking-tight text-slate-900 sm:text-5xl">
              Learn to Code. Build Real Things. No Setup Required.
            </h1>
            <p className="mt-5 max-w-xl text-lg leading-8 text-slate-600">
              Master programming through interactive browser lessons, instant
              feedback, visual execution tracing, and guided projects built for
              beginners.
            </p>
            <div className="mt-8 flex flex-col gap-3 sm:flex-row">
              <CTAButton href="/learn/python/intro" size="lg">
                Start Coding Free
                <ArrowRight className="h-4 w-4" aria-hidden="true" />
              </CTAButton>
              <CTAButton href="/courses" variant="secondary" size="lg">
                Explore Learning Paths
              </CTAButton>
            </div>
            <dl className="mt-8 flex flex-wrap gap-x-8 gap-y-3 text-sm text-slate-600">
              <div className="flex items-center gap-2">
                <CheckCircle2 className="h-4 w-4 text-green-600" aria-hidden="true" />
                <span>
                  <strong className="font-semibold text-slate-900">Free</strong> hands-on practice
                </span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle2 className="h-4 w-4 text-green-600" aria-hidden="true" />
                <span>
                  <strong className="font-semibold text-slate-900">Zero</strong> installation
                </span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle2 className="h-4 w-4 text-green-600" aria-hidden="true" />
                <span>
                  <strong className="font-semibold text-slate-900">Beginner</strong> friendly
                </span>
              </div>
            </dl>
          </div>

          <div
            className="overflow-hidden rounded-xl border border-slate-800 bg-slate-950 shadow-xl"
            role="img"
            aria-label="Preview of a CodeCraft lesson: instructions, a Python code editor showing a greeting program, and output reading Hello, Alex!"
          >
            <div className="flex items-center gap-1.5 border-b border-slate-800 px-4 py-3">
              <span aria-hidden="true" className="h-3 w-3 rounded-full bg-slate-700" />
              <span aria-hidden="true" className="h-3 w-3 rounded-full bg-slate-700" />
              <span aria-hidden="true" className="h-3 w-3 rounded-full bg-slate-700" />
              <span className="ml-2 font-mono text-xs text-slate-400">
                lesson-01 · your-first-program.py
              </span>
            </div>
            <div className="grid sm:grid-cols-[1fr_1.4fr]">
              <div className="border-b border-slate-800 p-4 sm:border-b-0 sm:border-r">
                <p className="flex items-center gap-1.5 text-xs font-semibold uppercase tracking-wide text-indigo-300">
                  <Terminal className="h-3.5 w-3.5" aria-hidden="true" />
                  Instructions
                </p>
                <p className="mt-2 text-sm leading-6 text-slate-300">
                  Create a variable called{" "}
                  <code className="rounded bg-slate-800 px-1 font-mono text-indigo-200">
                    name
                  </code>{" "}
                  and print a greeting.
                </p>
                <div className="mt-3 flex items-center gap-1.5 rounded-lg bg-green-950/60 px-2.5 py-2 text-xs font-medium text-green-300">
                  <CheckCircle2 className="h-4 w-4 shrink-0" aria-hidden="true" />
                  Tests passed · 2/2
                </div>
                <Link
                  href="/learn/python/intro"
                  className="mt-3 inline-flex min-h-[44px] items-center gap-1.5 rounded-lg bg-indigo-600 px-3.5 text-sm font-semibold text-white hover:bg-indigo-500"
                >
                  <Play className="h-3.5 w-3.5" aria-hidden="true" />
                  Try this lesson
                </Link>
              </div>
              <div className="p-4">
                <p className="text-xs font-semibold uppercase tracking-wide text-slate-500">
                  Editor
                </p>
                <pre className="mt-2 overflow-x-auto rounded-lg bg-slate-900 p-3 font-mono text-[13px] leading-6">
                  <code>
                    <span className="text-slate-500">1  </span>
                    <span className="text-slate-200">name </span>
                    <span className="text-indigo-300">= </span>
                    <span className="text-green-300">&quot;Alex&quot;</span>
                    {"\n"}
                    <span className="text-slate-500">2  </span>
                    <span className="text-amber-200">print</span>
                    <span className="text-slate-200">(</span>
                    <span className="text-indigo-200">f&quot;Hello, {"{name}"}!&quot;</span>
                    <span className="text-slate-200">)</span>
                  </code>
                </pre>
                <p className="mt-3 text-xs font-semibold uppercase tracking-wide text-slate-500">
                  Output
                </p>
                <p className="mt-1.5 rounded-lg bg-slate-900 px-3 py-2.5 font-mono text-[13px] text-green-300">
                  Hello, Alex!
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
