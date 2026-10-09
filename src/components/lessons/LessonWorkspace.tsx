"use client";

import dynamic from "next/dynamic";
import Link from "next/link";
import { useCallback, useEffect, useMemo, useState } from "react";
import {
  ArrowLeft,
  ArrowRight,
  CheckCircle2,
  ChevronLeft,
  ChevronRight,
  Eye,
  Lightbulb,
  Loader2,
  MessageCircleQuestion,
  Play,
  RotateCcw,
  Send,
  XCircle,
} from "lucide-react";
import type { ExecutionResult, Lesson } from "@/types";
import { useCodeRunner } from "@/hooks/useCodeRunner";
import { useProgress } from "@/hooks/useProgress";
import { gradeLesson } from "@/lib/feedback";
import { formatMs } from "@/lib/utils";
import { lessonNav } from "@/data/courses";

const CodeEditor = dynamic(
  () => import("@/components/editor/CodeEditor"),
  {
    ssr: false,
    loading: () => (
      <div className="flex h-[380px] items-center justify-center rounded-lg border border-slate-700 bg-[#1e1e1e] text-sm text-slate-400">
        Loading editor…
      </div>
    ),
  },
);

type Tab = "instructions" | "editor" | "console";
type Feedback =
  | { state: "idle" }
  | { state: "running" }
  | {
      state: "result";
      passed: boolean;
      message: string;
      result: ExecutionResult;
    };

export function LessonWorkspace({ lesson }: { lesson: Lesson }) {
  const [code, setCode] = useState(lesson.starterCode);
  const [tab, setTab] = useState<Tab>("instructions");
  const [feedback, setFeedback] = useState<Feedback>({ state: "idle" });
  const [hintIndex, setHintIndex] = useState(0);
  const [showHint, setShowHint] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const { run, reset: resetRunner, status, runtimeNote } = useCodeRunner(
    lesson.language,
  );
  const { progress, completeLesson, recordAttempt } = useProgress();
  const [mounted, setMounted] = useState(false);
  useEffect(() => setMounted(true), []);

  const lessonId = `/learn/${lesson.language}/${lesson.slug}`;
  const attempts = mounted ? (progress.attempts[lessonId] ?? 0) : 0;
  const isComplete =
    mounted && progress.completedLessons.includes(lessonId);
  const nav = useMemo(
    () => lessonNav(lesson.language, lesson.slug),
    [lesson.language, lesson.slug],
  );

  useEffect(() => {
    setCode(lesson.starterCode);
    setFeedback({ state: "idle" });
    setHintIndex(0);
    setShowHint(false);
    setSubmitted(false);
    resetRunner();
  }, [lesson.slug, lesson.starterCode, resetRunner]);

  const handleRun = useCallback(async () => {
    setFeedback({ state: "running" });
    recordAttempt(lessonId);
    const result = await run(code);
    const check = gradeLesson(lesson, code, result);
    setFeedback({
      state: "result",
      passed: check.passed,
      message: check.message,
      result,
    });
    setTab("console");
  }, [code, lesson, lessonId, recordAttempt, run]);

  const handleSubmit = useCallback(async () => {
    setSubmitted(true);
    let fb = feedback;
    if (fb.state !== "result") {
      setFeedback({ state: "running" });
      recordAttempt(lessonId);
      const result = await run(code);
      const check = gradeLesson(lesson, code, result);
      fb = {
        state: "result",
        passed: check.passed,
        message: check.message,
        result,
      };
      setFeedback(fb);
    }
    if (fb.state === "result" && fb.passed) {
      completeLesson(lessonId, lesson.courseSlug);
    }
    setTab("console");
  }, [code, completeLesson, feedback, lesson, lessonId, recordAttempt, run]);

  const handleReset = useCallback(() => {
    setCode(lesson.starterCode);
    setFeedback({ state: "idle" });
    setShowHint(false);
    resetRunner();
  }, [lesson.starterCode, resetRunner]);

  const tabs: { id: Tab; label: string }[] = [
    { id: "instructions", label: "Instructions" },
    { id: "editor", label: "Editor" },
    { id: "console", label: "Console" },
  ];

  return (
    <div className="flex flex-1 flex-col bg-slate-950 text-slate-100">
      <div className="border-b border-slate-800 bg-slate-900">
        <div className="mx-auto flex max-w-[1600px] flex-wrap items-center gap-3 px-4 py-3 sm:px-6">
          <Link
            href={`/courses/${lesson.courseSlug}`}
            className="inline-flex min-h-[44px] items-center gap-1.5 rounded-lg px-2 text-sm font-medium text-slate-300 hover:bg-slate-800 hover:text-white"
          >
            <ArrowLeft className="h-4 w-4" aria-hidden="true" />
            <span className="hidden sm:inline">Back to path</span>
            <span className="sm:hidden">Back</span>
          </Link>
          <div className="flex items-center gap-2 text-sm">
            <span className="rounded bg-indigo-600 px-2 py-0.5 font-mono text-xs font-bold uppercase">
              {lesson.language}
            </span>
            <span className="text-slate-400">
              Lesson {lesson.index} of {lesson.totalInPath}
            </span>
          </div>
          <h1 className="w-full text-base font-bold text-white sm:w-auto sm:flex-1 sm:truncate sm:text-lg">
            {lesson.title}
          </h1>
          <div className="flex items-center gap-2 text-xs text-slate-400">
            <span>Attempts: {attempts}</span>
            {isComplete && (
              <span className="inline-flex items-center gap-1 rounded-full bg-green-900/60 px-2.5 py-1 font-semibold text-green-300">
                <CheckCircle2 className="h-3.5 w-3.5" aria-hidden="true" />
                Completed
              </span>
            )}
          </div>
        </div>
        <div className="mx-auto max-w-[1600px] px-4 sm:px-6 lg:hidden" role="tablist" aria-label="Workspace panels">
          <div className="grid grid-cols-3 gap-1 pb-3">
            {tabs.map((t) => (
              <button
                key={t.id}
                role="tab"
                aria-selected={tab === t.id}
                onClick={() => setTab(t.id)}
                className={`min-h-[48px] rounded-lg text-sm font-semibold ${
                  tab === t.id
                    ? "bg-indigo-600 text-white"
                    : "bg-slate-800 text-slate-300 hover:bg-slate-700"
                }`}
              >
                {t.label}
              </button>
            ))}
          </div>
        </div>
      </div>

      <div className="mx-auto grid w-full max-w-[1600px] flex-1 gap-0 lg:grid-cols-[340px_1fr] xl:grid-cols-[380px_1fr]">
        <aside
          aria-label="Lesson instructions"
          className={`${tab === "instructions" ? "block" : "hidden"} overflow-y-auto border-slate-800 bg-slate-900 p-5 lg:block lg:border-r`}
        >
          <h2 className="text-sm font-semibold uppercase tracking-wide text-indigo-300">
            What you&apos;ll learn
          </h2>
          <ul className="mt-3 space-y-2">
            {lesson.objectives.map((o) => (
              <li key={o} className="flex gap-2 text-sm leading-6 text-slate-300">
                <CheckCircle2 className="mt-1 h-4 w-4 shrink-0 text-green-400" aria-hidden="true" />
                {o}
              </li>
            ))}
          </ul>
          <ol className="mt-6 space-y-4">
            {lesson.steps.map((step, i) => (
              <li key={step.title} className="rounded-lg bg-slate-800/70 p-4">
                <h3 className="text-sm font-bold text-white">
                  <span className="mr-2 font-mono text-indigo-300">{i + 1}.</span>
                  {step.title.replace(/^Step \d+ — /, "")}
                </h3>
                <p className="mt-1.5 text-sm leading-6 text-slate-300">{step.body}</p>
              </li>
            ))}
          </ol>
          <div className="mt-5 rounded-lg border border-slate-700 bg-slate-800/50 p-4">
            <h3 className="flex items-center gap-1.5 text-sm font-bold text-white">
              <Lightbulb className="h-4 w-4 text-amber-300" aria-hidden="true" />
              Need a hint?
            </h3>
            {showHint ? (
              <p className="mt-2 text-sm leading-6 text-slate-300">
                {lesson.hints[Math.min(hintIndex, lesson.hints.length - 1)]}
              </p>
            ) : (
              <p className="mt-2 text-sm text-slate-400">
                Hints guide you without giving away the answer.
              </p>
            )}
            <button
              type="button"
              onClick={() => {
                setShowHint(true);
                setHintIndex((v) => Math.min(v + 1, lesson.hints.length - 1));
              }}
              className="mt-3 inline-flex min-h-[44px] items-center rounded-lg border border-slate-600 px-4 text-sm font-semibold text-slate-200 hover:bg-slate-700"
            >
              {showHint ? "Show another hint" : "Show a hint"}
            </button>
          </div>
          <div className="mt-5">
            <h3 className="text-sm font-semibold uppercase tracking-wide text-slate-400">
              Go deeper
            </h3>
            <ul className="mt-2 space-y-1.5 text-sm">
              <li>
                <Link href="/tools/visualizer" className="inline-flex min-h-[44px] items-center gap-1.5 text-indigo-300 hover:text-indigo-200 hover:underline">
                  <Eye className="h-4 w-4" aria-hidden="true" />
                  Watch execution in the visualizer
                </Link>
              </li>
              {lesson.relatedProjects.map((p) => (
                <li key={p.href}>
                  <Link href={p.href} className="inline-flex min-h-[44px] items-center text-indigo-300 hover:text-indigo-200 hover:underline">
                    Apply it: {p.title}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </aside>

        <div className="flex min-w-0 flex-col">
          <div
            className={`${tab === "editor" ? "block" : "hidden"} border-b border-slate-800 bg-slate-950 p-4 sm:p-5 lg:block`}
          >
            <div className="mb-3 flex flex-wrap items-center gap-2" role="toolbar" aria-label="Editor actions">
              <button
                type="button"
                onClick={handleRun}
                disabled={status === "running" || status === "loading-runtime"}
                className="inline-flex min-h-[48px] items-center gap-2 rounded-lg bg-green-600 px-5 text-sm font-bold text-white hover:bg-green-500 disabled:opacity-60"
              >
                {status === "running" || status === "loading-runtime" ? (
                  <Loader2 className="h-4 w-4 animate-spin" aria-hidden="true" />
                ) : (
                  <Play className="h-4 w-4" aria-hidden="true" />
                )}
                {status === "loading-runtime" ? "Loading Python…" : "Run Code"}
              </button>
              <button
                type="button"
                onClick={handleReset}
                className="inline-flex min-h-[48px] items-center gap-2 rounded-lg border border-slate-700 px-4 text-sm font-semibold text-slate-200 hover:bg-slate-800"
              >
                <RotateCcw className="h-4 w-4" aria-hidden="true" />
                Reset
              </button>
              <button
                type="button"
                onClick={() => {
                  setTab("instructions");
                  setShowHint(true);
                }}
                className="inline-flex min-h-[48px] items-center gap-2 rounded-lg border border-slate-700 px-4 text-sm font-semibold text-slate-200 hover:bg-slate-800"
              >
                <Lightbulb className="h-4 w-4" aria-hidden="true" />
                Hint
              </button>
              <button
                type="button"
                onClick={handleSubmit}
                className="inline-flex min-h-[48px] items-center gap-2 rounded-lg bg-indigo-600 px-5 text-sm font-bold text-white hover:bg-indigo-500"
              >
                <Send className="h-4 w-4" aria-hidden="true" />
                Submit
              </button>
            </div>
            <CodeEditor
              value={code}
              onChange={(v) => setCode(v ?? "")}
              language={lesson.language}
              height={380}
            />
            <p className="mt-2 font-mono text-xs text-slate-500">
              {lesson.language === "python"
                ? "Python runs in your browser via a Web Worker — infinite loops are stopped automatically."
                : "JavaScript runs instantly in your browser sandbox."}
            </p>
          </div>

          <section
            aria-label="Console and feedback"
            aria-live="polite"
            className={`${tab === "console" ? "block" : "hidden"} flex-1 bg-slate-900 p-4 sm:p-5 lg:block`}
          >
            <h2 className="font-mono text-xs font-semibold uppercase tracking-wide text-slate-400">
              Output / Feedback
            </h2>
            <div className="console-scroll mt-3 max-h-72 min-h-32 overflow-y-auto rounded-lg bg-slate-950 p-4 font-mono text-sm leading-6">
              {feedback.state === "idle" && (
                <p className="text-slate-500">
                  Press <span className="text-slate-200">Run Code</span> to see
                  your program&apos;s output here.
                </p>
              )}
              {feedback.state === "running" && (
                <p className="flex items-center gap-2 text-slate-300">
                  <Loader2 className="h-4 w-4 animate-spin" aria-hidden="true" />
                  Running your code…
                </p>
              )}
              {feedback.state === "result" && (
                <>
                  {feedback.result.output ? (
                    <pre className="whitespace-pre-wrap text-slate-100">
                      {feedback.result.output}
                    </pre>
                  ) : (
                    <p className="text-slate-500">(no output)</p>
                  )}
                  {feedback.result.error && (
                    <pre className="mt-2 whitespace-pre-wrap text-red-300">
                      {feedback.result.error}
                    </pre>
                  )}
                  <p className="mt-3 border-t border-slate-800 pt-2 text-xs text-slate-500">
                    Executed in {formatMs(feedback.result.executionMs)}
                    {runtimeNote ? ` · ${runtimeNote}` : ""}
                  </p>
                </>
              )}
            </div>

            {feedback.state === "result" && (
              <div
                role="status"
                className={`mt-3 flex items-start gap-2.5 rounded-lg border p-4 text-sm font-medium leading-6 ${
                  feedback.passed
                    ? "border-green-700 bg-green-950/50 text-green-200"
                    : "border-amber-700 bg-amber-950/50 text-amber-200"
                }`}
              >
                {feedback.passed ? (
                  <CheckCircle2 className="mt-0.5 h-5 w-5 shrink-0" aria-hidden="true" />
                ) : (
                  <XCircle className="mt-0.5 h-5 w-5 shrink-0" aria-hidden="true" />
                )}
                <div>
                  <p>
                    {feedback.passed
                      ? submitted || isComplete
                        ? "Nice work! Your code produced the expected result."
                        : "Nice work! Your code produced the expected result. Press Submit to save your progress."
                      : "Your code ran, but the result isn't what this exercise expects."}
                  </p>
                  {!feedback.passed && (
                    <p className="mt-1 font-normal opacity-90">{feedback.message}</p>
                  )}
                  {feedback.passed && !isComplete && (
                    <button
                      type="button"
                      onClick={handleSubmit}
                      className="mt-3 inline-flex min-h-[48px] items-center gap-1.5 rounded-lg bg-green-600 px-5 text-sm font-bold text-white hover:bg-green-500"
                    >
                      <CheckCircle2 className="h-4 w-4" aria-hidden="true" />
                      Mark lesson complete
                    </button>
                  )}
                </div>
              </div>
            )}

            {attempts >= 3 &&
              feedback.state === "result" &&
              !feedback.passed && (
                <div className="mt-3 rounded-lg border border-slate-700 bg-slate-800/60 p-4">
                  <p className="flex items-center gap-2 text-sm font-bold text-white">
                    <MessageCircleQuestion className="h-4 w-4 text-indigo-300" aria-hidden="true" />
                    Still stuck?
                  </p>
                  <div className="mt-3 flex flex-wrap gap-2">
                    <Link
                      href="/community/errors"
                      className="inline-flex min-h-[44px] items-center rounded-lg border border-slate-600 px-4 text-sm font-semibold text-slate-200 hover:bg-slate-700"
                    >
                      View related discussions
                    </Link>
                    <Link
                      href="/community"
                      className="inline-flex min-h-[44px] items-center rounded-lg border border-slate-600 px-4 text-sm font-semibold text-slate-200 hover:bg-slate-700"
                    >
                      Ask the community
                    </Link>
                    <button
                      type="button"
                      onClick={() => {
                        setShowHint(true);
                        setTab("instructions");
                      }}
                      className="inline-flex min-h-[44px] items-center rounded-lg bg-indigo-600 px-4 text-sm font-semibold text-white hover:bg-indigo-500"
                    >
                      Try a hint
                    </button>
                  </div>
                </div>
              )}

            <nav
              aria-label="Lesson navigation"
              className="mt-4 flex items-center justify-between gap-3 border-t border-slate-800 pt-4"
            >
              {nav.prev ? (
                <Link
                  href={`/learn/${nav.prev.language}/${nav.prev.slug}`}
                  className="inline-flex min-h-[48px] items-center gap-1.5 rounded-lg border border-slate-700 px-4 text-sm font-semibold text-slate-200 hover:bg-slate-800"
                >
                  <ChevronLeft className="h-4 w-4" aria-hidden="true" />
                  Previous: {nav.prev.title}
                </Link>
              ) : (
                <span />
              )}
              {nav.next ? (
                <Link
                  href={`/learn/${nav.next.language}/${nav.next.slug}`}
                  className="inline-flex min-h-[48px] items-center gap-1.5 rounded-lg bg-slate-100 px-4 text-sm font-semibold text-slate-900 hover:bg-white"
                >
                  Next: {nav.next.title}
                  <ChevronRight className="h-4 w-4" aria-hidden="true" />
                </Link>
              ) : (
                <Link
                  href="/projects"
                  className="inline-flex min-h-[48px] items-center gap-1.5 rounded-lg bg-slate-100 px-4 text-sm font-semibold text-slate-900 hover:bg-white"
                >
                  Browse projects
                  <ArrowRight className="h-4 w-4" aria-hidden="true" />
                </Link>
              )}
            </nav>
          </section>
        </div>
      </div>
    </div>
  );
}
