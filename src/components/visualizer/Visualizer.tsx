"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import Link from "next/link";
import {
  ArrowRight,
  ChevronLeft,
  ChevronRight,
  Pause,
  Play,
  RotateCcw,
} from "lucide-react";
import { traceExamples } from "@/data/traces";
import { cn } from "@/lib/utils";

export function Visualizer() {
  const [exampleId, setExampleId] = useState(traceExamples[0]!.id);
  const example = traceExamples.find((e) => e.id === exampleId)!;
  const [stepIdx, setStepIdx] = useState(0);
  const [playing, setPlaying] = useState(false);
  const timer = useRef<ReturnType<typeof setInterval> | null>(null);

  const step = example.steps[stepIdx]!;
  const lines = example.code.split("\n");

  const stop = useCallback(() => {
    setPlaying(false);
    if (timer.current) clearInterval(timer.current);
    timer.current = null;
  }, []);

  useEffect(() => {
    setStepIdx(0);
    stop();
  }, [exampleId, stop]);

  useEffect(() => stop, [stop]);

  const play = useCallback(() => {
    if (stepIdx >= example.steps.length - 1) setStepIdx(0);
    setPlaying(true);
    if (timer.current) clearInterval(timer.current);
    timer.current = setInterval(() => {
      setStepIdx((i) => {
        if (i >= example.steps.length - 1) {
          if (timer.current) clearInterval(timer.current);
          timer.current = null;
          setPlaying(false);
          return i;
        }
        return i + 1;
      });
    }, 1200);
  }, [example.steps.length, stepIdx]);

  return (
    <div>
      <div className="flex flex-wrap gap-2" role="group" aria-label="Choose an example program">
        {traceExamples.map((e) => (
          <button
            key={e.id}
            type="button"
            onClick={() => setExampleId(e.id)}
            aria-pressed={exampleId === e.id}
            className={cn(
              "min-h-[44px] rounded-lg border px-4 text-sm font-medium",
              exampleId === e.id
                ? "border-indigo-600 bg-indigo-600 text-white"
                : "border-slate-300 bg-white text-slate-700 hover:border-slate-400",
            )}
          >
            {e.title}
          </button>
        ))}
      </div>

      <div className="mt-6 grid gap-6 lg:grid-cols-2">
        <section
          aria-label="Python code"
          className="overflow-hidden rounded-xl border border-slate-800 bg-slate-950"
        >
          <p className="border-b border-slate-800 px-4 py-2.5 font-mono text-xs text-slate-400">
            example.py
          </p>
          <ol className="p-4 font-mono text-sm leading-8">
            {lines.map((line, i) => (
              <li
                key={i}
                className={cn(
                  "trace-step flex gap-3 rounded px-2",
                  step.line === i + 1
                    ? "bg-indigo-600/25 outline outline-1 outline-indigo-400"
                    : "text-slate-300",
                )}
                aria-current={step.line === i + 1 ? "step" : undefined}
              >
                <span className="w-6 shrink-0 select-none text-right text-slate-500">
                  {i + 1}
                </span>
                <code className="whitespace-pre">{line || " "}</code>
              </li>
            ))}
          </ol>
        </section>

        <section
          aria-label="Execution state"
          aria-live="polite"
          className="rounded-xl border border-slate-200 bg-white p-5 shadow-sm"
        >
          <div className="flex items-center justify-between">
            <h2 className="font-bold text-slate-900">
              Step {step.step} of {example.steps.length}
            </h2>
            <span className="rounded-full bg-indigo-50 px-3 py-1 text-xs font-semibold text-indigo-700">
              Line {step.line}: {step.label}
            </span>
          </div>

          <div
            className="mt-3 h-2 overflow-hidden rounded-full bg-slate-100"
            role="progressbar"
            aria-valuenow={step.step}
            aria-valuemin={1}
            aria-valuemax={example.steps.length}
            aria-label="Execution progress"
          >
            <div
              className="h-full rounded-full bg-indigo-600"
              style={{
                width: `${(step.step / example.steps.length) * 100}%`,
              }}
            />
          </div>

          <h3 className="mt-5 text-sm font-semibold uppercase tracking-wide text-slate-500">
            Variables
          </h3>
          {Object.keys(step.variables).length === 0 ? (
            <p className="mt-2 text-sm text-slate-500">
              No variables yet — press Next to run the first line.
            </p>
          ) : (
            <dl className="mt-2 overflow-hidden rounded-lg border border-slate-200">
              {Object.entries(step.variables).map(([k, v]) => (
                <div
                  key={k}
                  className="flex items-center justify-between gap-4 border-b border-slate-100 px-4 py-2.5 font-mono text-sm last:border-0"
                >
                  <dt className="text-indigo-700">{k}</dt>
                  <dd className="text-slate-900">{v}</dd>
                </div>
              ))}
            </dl>
          )}

          <h3 className="mt-5 text-sm font-semibold uppercase tracking-wide text-slate-500">
            Program output so far
          </h3>
          <pre className="mt-2 min-h-16 whitespace-pre-wrap rounded-lg bg-slate-950 p-3 font-mono text-sm text-green-300">
            {step.output || "(nothing printed yet)"}
          </pre>

          <div className="mt-5 flex flex-wrap gap-2" role="toolbar" aria-label="Playback controls">
            <button
              type="button"
              onClick={() => setStepIdx((i) => Math.max(0, i - 1))}
              disabled={stepIdx === 0}
              className="inline-flex min-h-[48px] items-center gap-1.5 rounded-lg border border-slate-300 px-4 text-sm font-semibold text-slate-800 hover:bg-slate-50 disabled:opacity-40"
            >
              <ChevronLeft className="h-4 w-4" aria-hidden="true" />
              Previous
            </button>
            {playing ? (
              <button
                type="button"
                onClick={stop}
                className="inline-flex min-h-[48px] items-center gap-1.5 rounded-lg border border-slate-300 px-4 text-sm font-semibold text-slate-800 hover:bg-slate-50"
              >
                <Pause className="h-4 w-4" aria-hidden="true" />
                Pause
              </button>
            ) : (
              <button
                type="button"
                onClick={play}
                className="inline-flex min-h-[48px] items-center gap-1.5 rounded-lg bg-indigo-600 px-5 text-sm font-semibold text-white hover:bg-indigo-700"
              >
                <Play className="h-4 w-4" aria-hidden="true" />
                Play
              </button>
            )}
            <button
              type="button"
              onClick={() =>
                setStepIdx((i) =>
                  Math.min(example.steps.length - 1, i + 1),
                )
              }
              disabled={stepIdx >= example.steps.length - 1}
              className="inline-flex min-h-[48px] items-center gap-1.5 rounded-lg border border-slate-300 px-4 text-sm font-semibold text-slate-800 hover:bg-slate-50 disabled:opacity-40"
            >
              Next
              <ChevronRight className="h-4 w-4" aria-hidden="true" />
            </button>
            <button
              type="button"
              onClick={() => {
                stop();
                setStepIdx(0);
              }}
              className="inline-flex min-h-[48px] items-center gap-1.5 rounded-lg border border-slate-300 px-4 text-sm font-semibold text-slate-800 hover:bg-slate-50"
            >
              <RotateCcw className="h-4 w-4" aria-hidden="true" />
              Reset
            </button>
          </div>
        </section>
      </div>

      <section aria-label="Execution timeline" className="mt-6">
        <h2 className="text-sm font-semibold uppercase tracking-wide text-slate-500">
          Timeline
        </h2>
        <ol className="mt-3 flex flex-wrap gap-2">
          {example.steps.map((s, i) => (
            <li key={s.step}>
              <button
                type="button"
                onClick={() => {
                  stop();
                  setStepIdx(i);
                }}
                aria-label={`Go to step ${s.step}: ${s.label}`}
                aria-current={i === stepIdx ? "step" : undefined}
                className={cn(
                  "flex min-h-[48px] min-w-[48px] items-center justify-center rounded-lg border px-3 font-mono text-sm font-bold",
                  i === stepIdx
                    ? "border-indigo-600 bg-indigo-600 text-white"
                    : i < stepIdx
                      ? "border-green-300 bg-green-50 text-green-800"
                      : "border-slate-300 bg-white text-slate-600 hover:border-slate-400",
                )}
              >
                {s.step}
              </button>
            </li>
          ))}
        </ol>
      </section>

      <aside className="mt-8 rounded-xl border border-slate-200 bg-white p-6 shadow-sm">
        <h2 className="text-lg font-bold text-slate-900">
          Practice this for real
        </h2>
        <p className="mt-2 text-sm leading-6 text-slate-600">
          The visualizer traces a fixed set of beginner examples. Ready to run
          code yourself?{" "}
          <Link href="/learn/python/loops" className="font-semibold text-indigo-700 hover:underline">
            Learn for loops interactively
            <ArrowRight className="ml-1 inline h-3.5 w-3.5" aria-hidden="true" />
          </Link>
          , or{" "}
          <Link href="/projects/quiz-game" className="font-semibold text-indigo-700 hover:underline">
            build the quiz game project
          </Link>
          .
        </p>
      </aside>
    </div>
  );
}
