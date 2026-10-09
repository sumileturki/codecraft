import type { TraceStep } from "@/types";

interface Example {
  id: string;
  title: string;
  code: string;
  steps: TraceStep[];
}

export const traceExamples: Example[] = [
  {
    id: "sum",
    title: "Add two numbers",
    code: "x = 5\ny = 10\ntotal = x + y",
    steps: [
      { step: 1, line: 1, label: "Assign x", variables: { x: "5" }, output: "" },
      {
        step: 2,
        line: 2,
        label: "Assign y",
        variables: { x: "5", y: "10" },
        output: "",
      },
      {
        step: 3,
        line: 3,
        label: "Compute 5 + 10",
        variables: { x: "5", y: "10", total: "15" },
        output: "",
      },
    ],
  },
  {
    id: "loop",
    title: "Loop with range(3)",
    code: "for i in range(3):\n    print(i)",
    steps: [
      { step: 1, line: 1, label: "Start loop, i = 0", variables: { i: "0" }, output: "" },
      { step: 2, line: 2, label: "Print i", variables: { i: "0" }, output: "0" },
      { step: 3, line: 1, label: "Next iteration, i = 1", variables: { i: "1" }, output: "0" },
      { step: 4, line: 2, label: "Print i", variables: { i: "1" }, output: "0\n1" },
      { step: 5, line: 1, label: "Next iteration, i = 2", variables: { i: "2" }, output: "0\n1" },
      { step: 6, line: 2, label: "Print i", variables: { i: "2" }, output: "0\n1\n2" },
      { step: 7, line: 1, label: "Loop finished", variables: { i: "2" }, output: "0\n1\n2" },
    ],
  },
  {
    id: "condition",
    title: "If / else decision",
    code: 'score = 75\nif score >= 50:\n    print("Pass")\nelse:\n    print("Fail")',
    steps: [
      { step: 1, line: 1, label: "Assign score", variables: { score: "75" }, output: "" },
      {
        step: 2,
        line: 2,
        label: "Check: 75 >= 50 is True",
        variables: { score: "75" },
        output: "",
      },
      {
        step: 3,
        line: 3,
        label: "Take the if branch",
        variables: { score: "75" },
        output: "Pass",
      },
    ],
  },
  {
    id: "function",
    title: "Define and call a function",
    code: 'def greet():\n    return "Hello!"\n\nprint(greet())',
    steps: [
      { step: 1, line: 1, label: "Define greet()", variables: { "greet()": "function" }, output: "" },
      { step: 2, line: 4, label: "Call greet()", variables: { "greet()": "function" }, output: "" },
      { step: 3, line: 2, label: 'Return "Hello!"', variables: { "greet()": "function", return: '"Hello!"' }, output: "" },
      { step: 4, line: 4, label: "Print the result", variables: { "greet()": "function" }, output: "Hello!" },
    ],
  },
];
