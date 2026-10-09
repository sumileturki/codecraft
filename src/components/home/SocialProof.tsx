const METRICS = [
  { value: "10,000+", label: "Practice Exercises" },
  { value: "50+", label: "Guided Lessons" },
  { value: "20+", label: "Beginner Projects" },
  { value: "100%", label: "Browser Based" },
];

export function SocialProof() {
  return (
    <section
      aria-labelledby="proof-heading"
      className="border-b border-slate-200 bg-white"
    >
      <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
        <h2
          id="proof-heading"
          className="text-center text-lg font-semibold text-slate-700"
        >
          Built for people starting from zero
        </h2>
        <dl className="mx-auto mt-8 grid max-w-4xl grid-cols-2 gap-8 text-center lg:grid-cols-4">
          {METRICS.map((m) => (
            <div key={m.label}>
              <dt className="order-2 mt-1 text-sm text-slate-500">{m.label}</dt>
              <dd className="order-1 text-3xl font-bold tracking-tight text-slate-900">
                {m.value}
              </dd>
            </div>
          ))}
        </dl>
      </div>
    </section>
  );
}
