"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import type { ExecutionResult } from "@/types";
import { quickCheckJS, quickCheckPython } from "@/lib/feedback";

export type RunnerStatus =
  | "idle"
  | "loading-runtime"
  | "running"
  | "success"
  | "error";

interface WorkerResponse extends ExecutionResult {
  id: number;
  loadFailed?: boolean;
}

let workerPromise: Promise<Worker> | null = null;

function getWorker(): Promise<Worker> {
  if (!workerPromise) {
    workerPromise = new Promise((resolve, reject) => {
      try {
        const w = new Worker(
          new URL("@/workers/pyodide-worker.ts", import.meta.url),
        );
        resolve(w);
      } catch (e) {
        reject(e);
      }
    });
  }
  return workerPromise;
}

export function useCodeRunner(language: "python" | "javascript") {
  const [status, setStatus] = useState<RunnerStatus>("idle");
  const [result, setResult] = useState<ExecutionResult | null>(null);
  const [runtimeNote, setRuntimeNote] = useState<string | null>(null);
  const idRef = useRef(0);

  useEffect(() => {
    return () => {
      workerPromise?.then((w) => w.terminate()).catch(() => undefined);
      workerPromise = null;
    };
  }, []);

  const run = useCallback(
    async (code: string) => {
      const id = ++idRef.current;
      setStatus(language === "python" ? "loading-runtime" : "running");
      setRuntimeNote(null);
      try {
        if (language === "javascript") {
          const r = quickCheckJS(code);
          if (id !== idRef.current) return r;
          setResult(r);
          setStatus(r.ok ? "success" : "error");
          setRuntimeNote("Ran instantly in your browser (no download needed).");
          return r;
        }
        let worker: Worker;
        try {
          worker = await getWorker();
        } catch {
          const r = quickCheckPython(code);
          if (id !== idRef.current) return r;
          setResult(r);
          setStatus(r.ok ? "success" : "error");
          setRuntimeNote(
            "Full Python runtime unavailable — ran with the lightweight built-in runner.",
          );
          return r;
        }
        setStatus("running");
        const r = await new Promise<WorkerResponse>((resolve, reject) => {
          const timer = setTimeout(() => {
            try {
              worker.terminate();
            } catch {
              /* noop */
            }
            workerPromise = null;
            reject(new Error("timeout"));
          }, 30000);
          const handler = (event: MessageEvent<WorkerResponse>) => {
            if (event.data.id !== id) return;
            clearTimeout(timer);
            worker.removeEventListener("message", handler);
            resolve(event.data);
          };
          worker.addEventListener("message", handler);
          worker.postMessage({ id, code });
        });
        if (id !== idRef.current) return r;
        if (r.loadFailed) {
          workerPromise?.then((w) => {
            try {
              w.terminate();
            } catch {
              /* noop */
            }
          }).catch(() => undefined);
          workerPromise = null;
          const fallback = quickCheckPython(code);
          setResult(fallback);
          setStatus(fallback.ok ? "success" : "error");
          setRuntimeNote(
            "Python runtime could not be loaded. Ran with the lightweight built-in runner instead — try again for the full runtime.",
          );
          return fallback;
        }
        setResult(r);
        setStatus(r.ok ? "success" : "error");
        if (r.engine === "pyodide")
          setRuntimeNote("Ran with full Python (Pyodide) in a Web Worker.");
        return r;
      } catch {
        const fallback = quickCheckPython(code);
        if (id !== idRef.current) return fallback;
        setResult(fallback);
        setStatus(fallback.ok ? "success" : "error");
        setRuntimeNote(
          "Python runtime could not be loaded. Try again — or continue with the built-in runner.",
        );
        return fallback;
      }
    },
    [language],
  );

  const reset = useCallback(() => {
    idRef.current++;
    setStatus("idle");
    setResult(null);
    setRuntimeNote(null);
  }, []);

  return { status, result, runtimeNote, run, reset };
}
