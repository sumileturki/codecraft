import {
  Eye,
  FolderKanban,
  MessagesSquare,
  MonitorDown,
} from "lucide-react";

const FEATURES = [
  {
    icon: MonitorDown,
    title: "No Setup",
    body: "Write and run code directly in your browser.",
  },
  {
    icon: Eye,
    title: "Learn Visually",
    body: "See what your code is doing step by step.",
  },
  {
    icon: MessagesSquare,
    title: "Helpful Feedback",
    body: "Understand your mistakes instead of just seeing an error.",
  },
  {
    icon: FolderKanban,
    title: "Build Projects",
    body: "Turn lessons into real, shareable projects.",
  },
];

const STEPS = [
  {
    n: "01",
    title: "Learn",
    body: "Understand the concept through plain-language explanations.",
  },
  {
    n: "02",
    title: "Practice",
    body: "Write code and receive immediate feedback.",
  },
  {
    n: "03",
    title: "Build",
    body: "Apply your knowledge to real projects.",
  },
];

export function WhyCodeCraft() {
  return (
    <section
      aria-labelledby="why-heading"
      className="border-y border-slate-200 bg-slate-50 py-16 sm:py-20"
    >
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <h2
          id="why-heading"
          className="text-2xl font-bold tracking-tight text-slate-900 sm:text-3xl"
        >
          Why CodeCraft works for beginners
        </h2>
        <p className="mt-3 max-w-2xl text-slate-600">
          Built for people starting from zero — no programming background, no
          environment setup, no jargon without explanation.
        </p>
        <ul className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {FEATURES.map((f) => (
            <li
              key={f.title}
              className="rounded-xl border border-slate-200 bg-white p-6 shadow-sm"
            >
              <span className="inline-flex h-10 w-10 items-center justify-center rounded-lg bg-indigo-600 text-white">
                <f.icon className="h-5 w-5" aria-hidden="true" />
              </span>
              <h3 className="mt-4 font-bold text-slate-900">{f.title}</h3>
              <p className="mt-1.5 text-sm leading-6 text-slate-600">{f.body}</p>
            </li>
          ))}
        </ul>

        <div className="mt-14">
          <h3 className="text-xl font-bold text-slate-900">How it works</h3>
          <ol className="mt-6 grid gap-6 md:grid-cols-3">
            {STEPS.map((s) => (
              <li
                key={s.n}
                className="relative rounded-xl border border-slate-200 bg-white p-6 shadow-sm"
              >
                <span
                  aria-hidden="true"
                  className="font-mono text-sm font-bold text-indigo-600"
                >
                  {s.n}
                </span>
                <h4 className="mt-2 text-lg font-bold text-slate-900">
                  {s.title}
                </h4>
                <p className="mt-1.5 text-sm leading-6 text-slate-600">{s.body}</p>
              </li>
            ))}
          </ol>
        </div>
      </div>
    </section>
  );
}
