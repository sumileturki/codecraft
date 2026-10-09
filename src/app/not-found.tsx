import Link from "next/link";

export default function NotFound() {
  return (
    <main className="mx-auto max-w-2xl flex-1 px-4 py-20 text-center sm:px-6">
      <p className="font-mono text-sm font-bold text-indigo-600">404</p>
      <h1 className="mt-2 text-4xl font-bold tracking-tight text-slate-900">
        Page not found
      </h1>
      <p className="mt-3 leading-7 text-slate-600">
        That page doesn&apos;t exist — but your coding journey doesn&apos;t
        have to stop. Try a learning path or search for a lesson.
      </p>
      <div className="mt-6 flex flex-col justify-center gap-3 sm:flex-row">
        <Link
          href="/"
          className="inline-flex min-h-[52px] items-center justify-center rounded-lg bg-indigo-600 px-7 font-semibold text-white hover:bg-indigo-700"
        >
          Back to home
        </Link>
        <Link
          href="/courses"
          className="inline-flex min-h-[52px] items-center justify-center rounded-lg border border-slate-300 bg-white px-7 font-semibold text-slate-800 hover:bg-slate-50"
        >
          Browse learning paths
        </Link>
      </div>
    </main>
  );
}
