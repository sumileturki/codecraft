import type { ExecutionResult, Lesson } from "@/types";
import { runMiniPython } from "./python-mini";

const OUTPUT_LIMIT = 4000;

function normalizeOutput(out: string): string {
  return out.replace(/\r\n/g, "\n").replace(/[ \t]+\n/g, "\n").trim();
}

export interface CheckResult {
  passed: boolean;
  message: string;
}

export function gradeLesson(
  lesson: Lesson,
  code: string,
  result: ExecutionResult,
): CheckResult {
  if (!result.ok) {
    return {
      passed: false,
      message: friendlyError(result.error ?? "Something went wrong."),
    };
  }
  const output = normalizeOutput(result.output);

  for (const test of lesson.tests) {
    switch (test.kind) {
      case "definesVariable": {
        const re = new RegExp(
          `(^|\\n)\\s*${test.variable}\\s*=`,
        );
        if (!re.test(code)) return { passed: false, message: test.hint };
        break;
      }
      case "definesFunction": {
        const re = new RegExp(
          `(^|\\n)\\s*def\\s+${test.variable}\\s*\\(`,
        );
        if (!re.test(code)) return { passed: false, message: test.hint };
        break;
      }
      case "callsPrint": {
        if (lesson.language === "python") {
          if (!/(^|\n)\s*print\s*\(/.test(code))
            return { passed: false, message: test.hint };
        } else {
          if (!/console\.log\s*\(/.test(code))
            return { passed: false, message: test.hint };
        }
        break;
      }
      case "outputEquals": {
        if (output !== (test.expected ?? "")) {
          return { passed: false, message: test.hint };
        }
        break;
      }
      case "outputIncludes": {
        const values = test.values ?? [];
        if (values.length > 0) {
          const hit = values.some((v) => output.includes(v));
          if (!hit) return { passed: false, message: test.hint };
        } else {
          if (output.length === 0) return { passed: false, message: test.hint };
        }
        break;
      }
    }
  }
  return { passed: true, message: "Great job! Your solution works." };
}

export function friendlyError(raw: string): string {
  const lower = raw.toLowerCase();
  if (/indentation|indented block/.test(lower))
    return "Check your indentation — Python groups code with 4 spaces. The line after if, for, def, or while must be indented.";
  if (/invalid syntax|syntaxerror/.test(lower))
    return "Check the highlighted line. Python may be expecting a closing bracket, quote, or colon.";
  if (/name .* is not defined|isn't defined/.test(lower)) return raw;
  if (/division by zero|divided by zero/.test(lower))
    return "You divided by zero — check the number after / or %.";
  if (/infinite|too long|timeout/i.test(lower)) return raw;
  if (/eol|unterminated|missing.*quote/i.test(lower))
    return "A string is missing its closing quote — every opening quote needs a matching one.";
  return raw.length > 300 ? `${raw.slice(0, 300)}…` : raw;
}

export function quickCheckJS(code: string): ExecutionResult {
  const started = Date.now();
  try {
    const logs: string[] = [];
    const fn = new Function(
      "console",
      `"use strict";\n${code}\n`,
    );
    fn({
      log: (...args: unknown[]) =>
        logs.push(args.map((a) => jsToString(a)).join(" ")),
      error: (...args: unknown[]) =>
        logs.push(args.map((a) => jsToString(a)).join(" ")),
    });
    const output = logs.join("\n");
    return {
      ok: true,
      output: output.length > OUTPUT_LIMIT ? `${output.slice(0, OUTPUT_LIMIT)}\n… [output truncated]` : output,
      error: null,
      errorLine: null,
      engine: "builtin",
      timedOut: false,
      executionMs: Date.now() - started,
    };
  } catch (e) {
    const message = e instanceof Error ? e.message : "Something went wrong.";
    return {
      ok: false,
      output: "",
      error: friendlyError(message),
      errorLine: null,
      engine: "builtin",
      timedOut: false,
      executionMs: Date.now() - started,
    };
  }
}

function jsToString(v: unknown): string {
  if (typeof v === "string") return v;
  if (v === undefined) return "undefined";
  try {
    return JSON.stringify(v) ?? String(v);
  } catch {
    return String(v);
  }
}

export function quickCheckPython(code: string): ExecutionResult {
  const started = Date.now();
  const r = runMiniPython(code);
  const output =
    r.output.length > OUTPUT_LIMIT
      ? `${r.output.slice(0, OUTPUT_LIMIT)}\n… [output truncated]`
      : r.output;
  return {
    ok: r.error === null,
    output,
    error: r.error,
    errorLine: r.errorLine,
    engine: "builtin",
    timedOut: false,
    executionMs: Date.now() - started,
  };
}
