"use client";

import Editor from "@monaco-editor/react";

interface Props {
  value: string;
  onChange: (value: string | undefined) => void;
  language?: string;
  height?: number | string;
  readOnly?: boolean;
}

export default function CodeEditor({
  value,
  onChange,
  language = "python",
  height = 380,
  readOnly = false,
}: Props) {
  return (
    <div className="overflow-hidden rounded-lg border border-slate-700">
      <Editor
        height={height}
        language={language}
        value={value}
        onChange={onChange}
        theme="vs-dark"
        loading={
          <div className="flex h-full items-center justify-center bg-[#1e1e1e] p-8 text-sm text-slate-400">
            Loading editor…
          </div>
        }
        options={{
          minimap: { enabled: false },
          fontSize: 14,
          lineHeight: 1.7,
          fontFamily: "var(--font-geist-mono), ui-monospace, monospace",
          scrollBeyondLastLine: false,
          automaticLayout: true,
          readOnly,
          tabSize: 4,
          insertSpaces: true,
          renderLineHighlight: "all",
          padding: { top: 12 },
          scrollbar: { verticalScrollbarSize: 10, horizontalScrollbarSize: 10 },
          suggestOnTriggerCharacters: true,
          quickSuggestions: true,
          ariaLabel: "Python code editor",
        }}
      />
    </div>
  );
}
