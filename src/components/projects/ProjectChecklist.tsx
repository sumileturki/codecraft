"use client";

import { useEffect, useState } from "react";
import { CheckCircle2, Circle, Lightbulb } from "lucide-react";
import type { Project } from "@/types";
import { useProgress } from "@/hooks/useProgress";
import { cn } from "@/lib/utils";

export function ProjectChecklist({ project }: { project: Project }) {
  const { progress, toggleMilestone } = useProgress();
  const [mounted, setMounted] = useState(false);
  const [revealed, setRevealed] = useState<number[]>([]);
  useEffect(() => setMounted(true), []);

  const done = mounted
    ? (progress.projectMilestones[project.slug] ?? [])
    : [];
  const pct = Math.round((done.length / project.milestones.length) * 100);

  return (
    <div>
      <div className="flex items-center justify-between">
        <p className="text-sm font-semibold text-slate-900">
          Step {Math.min(done.length + 1, project.milestones.length)} of{" "}
          {project.milestones.length}
        </p>
        <p className="text-sm font-bold text-indigo-700" aria-live="polite">
          {mounted ? `${pct}% complete` : "0% complete"}
        </p>
      </div>
      <div
        className="mt-2 h-2.5 overflow-hidden rounded-full bg-slate-100"
        role="progressbar"
        aria-valuenow={mounted ? pct : 0}
        aria-valuemin={0}
        aria-valuemax={100}
        aria-label="Project progress"
      >
        <div
          className="h-full rounded-full bg-indigo-600 transition-all"
          style={{ width: `${mounted ? pct : 0}%` }}
        />
      </div>

      <ol className="mt-6 space-y-4">
        {project.milestones.map((m, i) => {
          const checked = done.includes(i);
          const hintShown = revealed.includes(i);
          return (
            <li
              key={m.title}
              className={cn(
                "rounded-xl border p-5",
                checked
                  ? "border-green-200 bg-green-50/60"
                  : "border-slate-200 bg-white",
              )}
            >
              <div className="flex items-start gap-3">
                <button
                  type="button"
                  onClick={() => toggleMilestone(project.slug, i)}
                  aria-pressed={checked}
                  aria-label={`Mark milestone ${i + 1} ${checked ? "incomplete" : "complete"}: ${m.title}`}
                  className="mt-0.5 inline-flex min-h-[44px] min-w-[44px] items-center justify-center rounded-lg hover:bg-slate-100"
                >
                  {checked ? (
                    <CheckCircle2 className="h-6 w-6 text-green-600" aria-hidden="true" />
                  ) : (
                    <Circle className="h-6 w-6 text-slate-300" aria-hidden="true" />
                  )}
                </button>
                <div className="flex-1">
                  <h3 className="font-bold text-slate-900">
                    <span className="mr-2 font-mono text-sm text-indigo-600">
                      {i + 1}.
                    </span>
                    {m.title}
                  </h3>
                  <p className="mt-1 text-sm leading-6 text-slate-600">
                    {m.description}
                  </p>
                  {hintShown ? (
                    <p className="mt-2 rounded-lg bg-amber-50 px-3 py-2 text-sm leading-6 text-amber-900">
                      <strong>Hint:</strong> {m.hint}
                    </p>
                  ) : (
                    <button
                      type="button"
                      onClick={() =>
                        setRevealed((r) => (r.includes(i) ? r : [...r, i]))
                      }
                      className="mt-2 inline-flex min-h-[44px] items-center gap-1.5 rounded-lg text-sm font-semibold text-indigo-700 hover:underline"
                    >
                      <Lightbulb className="h-4 w-4" aria-hidden="true" />
                      Show hint
                    </button>
                  )}
                </div>
              </div>
            </li>
          );
        })}
      </ol>
    </div>
  );
}
