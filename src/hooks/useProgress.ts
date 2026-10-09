"use client";

import { useCallback, useEffect, useMemo } from "react";
import type { UserProgress } from "@/types";
import { useLocalStorage } from "./useLocalStorage";

const KEY = "codecraft-progress-v1";

const DEFAULT_PROGRESS: UserProgress = {
  completedLessons: [],
  projectMilestones: {},
  currentCourse: null,
  streakDays: 0,
  lastVisit: null,
  attempts: {},
  visitHistory: [],
};

function todayKey(): string {
  return new Date().toISOString().slice(0, 10);
}

function withVisit(p: UserProgress): UserProgress {
  const today = todayKey();
  if (p.lastVisit === today) return p;
  const history = [...p.visitHistory, today].slice(-60);
  const yesterday = new Date(Date.now() - 86400000).toISOString().slice(0, 10);
  const streak = p.lastVisit === yesterday ? p.streakDays + 1 : 1;
  return { ...p, lastVisit: today, visitHistory: history, streakDays: streak };
}

export function useProgress() {
  const [progress, setProgress] = useLocalStorage<UserProgress>(
    KEY,
    DEFAULT_PROGRESS,
  );

  useEffect(() => {
    setProgress((p) => withVisit(p));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const completeLesson = useCallback(
    (id: string, courseSlug?: string) => {
      setProgress((p) => {
        if (p.completedLessons.includes(id)) {
          return courseSlug && p.currentCourse !== courseSlug
            ? { ...p, currentCourse: courseSlug }
            : p;
        }
        return {
          ...p,
          completedLessons: [...p.completedLessons, id],
          currentCourse: courseSlug ?? p.currentCourse,
        };
      });
    },
    [setProgress],
  );

  const recordAttempt = useCallback(
    (id: string) => {
      setProgress((p) => ({
        ...p,
        attempts: { ...p.attempts, [id]: (p.attempts[id] ?? 0) + 1 },
      }));
    },
    [setProgress],
  );

  const toggleMilestone = useCallback(
    (projectSlug: string, index: number) => {
      setProgress((p) => {
        const current = p.projectMilestones[projectSlug] ?? [];
        const next = current.includes(index)
          ? current.filter((i) => i !== index)
          : [...current, index];
        return {
          ...p,
          projectMilestones: { ...p.projectMilestones, [projectSlug]: next },
        };
      });
    },
    [setProgress],
  );

  const setCourse = useCallback(
    (slug: string) => setProgress((p) => ({ ...p, currentCourse: slug })),
    [setProgress],
  );

  const stats = useMemo(
    () => ({
      completedCount: progress.completedLessons.length,
      streak: progress.streakDays,
    }),
    [progress],
  );

  return {
    progress,
    stats,
    completeLesson,
    recordAttempt,
    toggleMilestone,
    setCourse,
  };
}
