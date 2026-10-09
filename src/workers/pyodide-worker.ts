// Pyodide worker: runs user Python off the main thread with a hard timeout.
// Loaded lazily — only lesson/visualizer pages import it.

const PYODIDE_CDN =
  "https://cdn.jsdelivr.net/pyodide/v0.26.4/full/pyodide.js";

interface RunRequest {
  id: number;
  code: string;
}

let pyodide: unknown = null;
let loadError: string | null = null;

async function ensurePyodide(): Promise<unknown> {
  if (pyodide) return pyodide;
  if (loadError) throw new Error(loadError);
  try {
    (self as unknown as { importScripts: (...urls: string[]) => void }).importScripts(PYODIDE_CDN);
    const factory = (
      globalThis as unknown as { loadPyodide: (o: object) => Promise<unknown> }
    ).loadPyodide;
    pyodide = await factory({ indexURL: "https://cdn.jsdelivr.net/pyodide/v0.26.4/full/" });
    return pyodide;
  } catch (e) {
    loadError =
      e instanceof Error ? e.message : "Failed to load the Python runtime.";
    throw new Error(loadError);
  }
}

function runWithTimeout(code: string, timeoutMs: number): Promise<string> {
  return new Promise((resolve, reject) => {
    const pyd = pyodide as {
      setStdout: (o: { batched: (s: string) => void }) => void;
      setStderr: (o: { batched: (s: string) => void }) => void;
      runPythonAsync: (c: string) => Promise<unknown>;
    };
    let out = "";
    pyd.setStdout({ batched: (s: string) => (out += s + "\n") });
    pyd.setStderr({ batched: (s: string) => (out += s + "\n") });
    const timer = setTimeout(() => {
      reject(new Error("__TIMEOUT__"));
    }, timeoutMs);
    pyd
      .runPythonAsync(code)
      .then(() => {
        clearTimeout(timer);
        resolve(out);
      })
      .catch((e: unknown) => {
        clearTimeout(timer);
        reject(e);
      });
  });
}

self.onmessage = async (event: MessageEvent<RunRequest>) => {
  const { id, code } = event.data;
  const started = Date.now();
  try {
    await ensurePyodide();
    const output = await runWithTimeout(code, 8000);
    self.postMessage({
      id,
      ok: true,
      output,
      error: null,
      errorLine: null,
      engine: "pyodide",
      timedOut: false,
      executionMs: Date.now() - started,
    });
  } catch (e) {
    const message = e instanceof Error ? e.message : String(e);
    if (message === "__TIMEOUT__") {
      self.postMessage({
        id,
        ok: false,
        output: "",
        error:
          "Your code took too long to run — it may contain an infinite loop (like `while True:` with no way out).",
        errorLine: null,
        engine: "pyodide",
        timedOut: true,
        executionMs: Date.now() - started,
      });
      return;
    }
    const m = /line (\d+)/i.exec(message);
    self.postMessage({
      id,
      ok: false,
      output: "",
      error: message.slice(0, 600),
      errorLine: m ? Number(m[1]) : null,
      engine: "pyodide",
      timedOut: false,
      executionMs: Date.now() - started,
      loadFailed: /load|fetch|network|importscripts/i.test(message),
    });
  }
};

export {};
