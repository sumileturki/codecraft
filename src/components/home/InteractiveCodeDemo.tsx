"use client";

import dynamic from "next/dynamic";
import Link from "next/link";
import { useMemo, useState } from "react";
import { ArrowRight, CheckCircle2, Play, RotateCcw, XCircle } from "lucide-react";
import { quickCheckPython } from "@/lib/feedback";

const STARTER = 'name = ""\nprint(name)';

function StaticEditor({
  code,
  onChange,
}: {
  code: string;
  onChange: (v: string) => void;
}) {
  return (
    <label className="block">
      <span className="sr-only">Edit your Python code</span>
      <textarea
        value={code}
        onChange={(e) => onChange(e.target.value)}
        spellCheck={false}
        rows={6}
        className="console-scroll block w-full resize-y rounded-lg border border-slate-700 bg-slate-950 p-4 font-mono text-sm leading-7 text-slate-100 focus:border-indigo-400 focus:outline-none"
      />
    </label>
  );
}

export function InteractiveCodeDemo() {
  const [code, setCode] = useState(STARTER);
  const [output, setOutput] = useState<string | null>(null);
  const [passed, setPassed] = useState<boolean | null>(null);

  const Editor = useMemo(
    () =>
      dynamic(() => import("@/components/editor/CodeEditor"), {
        ssr: false,
        loading: () => (
          <StaticEditor code={code} onChange={setCode} />
        ),
      }),
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [],
  );

  const run = () => {
    const r = quickCheckPython(code);
    const hasName = /(^|\n)\s*name\s*=/.test(code);
    const hasPrint = /(^|\n)\s*print\s*\(/.test(code);
    const nonEmpty = r.output.trim().length > 0;
    setOutput(
      r.ok
        ? r.output || "(no output — print something!)"
        : `Error: ${r.error}`,
    );
    setPassed(r.ok && hasName && hasPrint && nonEmpty);
  };

  return (
    <section
      aria-labelledby="demo-heading"
      className="bg-slate-950 py-16 text-slate-100 sm:py-20"
    >
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="max-w-2xl">
          <p className="text-sm font-semibold uppercase tracking-wide text-indigo-300">
            Try it right now
          </p>
          <h2
            id="demo-heading"
            className="mt-2 text-2xl font-bold tracking-tight sm:text-3xl"
          >
            A free interactive code editor with live hints
          </h2>
          <p className="mt-3 text-slate-300">
            Create a variable called{" "}
            <code className="rounded bg-slate-800 px-1.5 py-0.5 font-mono text-sm text-indigo-200">
              name
            </code>{" "}
            and print it. Nothing to install — this runs entirely in your
            browser.
          </p>
        </div>

        <div className="mt-8 grid gap-6 lg:grid-cols-[1fr_1fr]">
          <div className="overflow-hidden rounded-xl border border-slate-800 bg-slate-900">
            <div className="flex items-center justify-between border-b border-slate-800 px-4 py-2.5">
              <span className="font-mono text-xs text-slate-400">
                demo.py
              </span>
              <div className="flex gap-2">
                <button
                  type="button"
                  onClick={() => {
                    setCode(STARTER);
                    setOutput(null);
                    setPassed(null);
                  }}
                  className="inline-flex min-h-[44px] items-center gap-1.5 rounded-lg px-3 text-xs font-semibold text-slate-300 hover:bg-slate-800"
                >
                  <RotateCcw className="h-3.5 w-3.5" aria-hidden="true" />
                  Reset
                </button>
                <button
                  type="button"
                  onClick={run}
                  className="inline-flex min-h-[44px] items-center gap-1.5 rounded-lg bg-indigo-600 px-4 text-xs font-semibold text-white hover:bg-indigo-500"
                >
                  <Play className="h-3.5 w-3.5" aria-hidden="true" />
                  Run Code
                </button>
              </div>
            </div>
            <div className="p-3">
              <Editor
                key="demo"
                value={code}
                onChange={(v) => setCode(v ?? STARTER)}
                language="python"
                height={220}
              />
            </div>
          </div>

          <div className="flex flex-col overflow-hidden rounded-xl border border-slate-800 bg-slate-900">
            <p className="border-b border-slate-800 px-4 py-2.5 font-mono text-xs text-slate-400">
              Output &amp; feedback
            </p>
            <div className="flex-1 p-4">
              {output === null ? (
                <p className="text-sm leading-6 text-slate-400">
                  Press <strong className="text-slate-200">Run Code</strong> to
                  execute your program. Tip: put a name between the quotes,
                  e.g.{" "}
                  <code className="font-mono text-indigo-200">
                    name = &quot;Alex&quot;
                  </code>
                  .
                </p>
              ) : (
                <>
                  <pre className="whitespace-pre-wrap rounded-lg bg-slate-950 p-3 font-mono text-sm leading-6 text-green-300">
                    {output}
                  </pre>
                  <div
                    role="status"
                    className={`mt-3 flex items-start gap-2 rounded-lg px-3 py-2.5 text-sm font-medium ${
                      passed
                        ? "bg-green-950/70 text-green-200"
                        : "bg-amber-950/70 text-amber-200"
                    }`}
                  >
                    {passed ? (
                      <>
                        <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0" aria-hidden="true" />
                        Great job! Your solution works. Keep going with the
                        full lesson.
                      </>
                    ) : (
                      <>
                        <XCircle className="mt-0.5 h-4 w-4 shrink-0" aria-hidden="true" />
                        {output.startsWith("Error:")
                          ? "Check the highlighted line — a quote or bracket may be missing."
                          : "You’re close. Make sure `name` holds a non-empty value and you print it."}
                      </>
                    )}
                  </div>
                </>
              )}
            </div>
            <div className="border-t border-slate-800 p-4">
              <Link
                href="/learn/python/intro"
                className="inline-flex min-h-[48px] items-center gap-1.5 rounded-lg bg-white px-5 text-sm font-semibold text-slate-900 hover:bg-slate-200"
              >
                Continue to the full free lesson
                <ArrowRight className="h-4 w-4" aria-hidden="true" />
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
