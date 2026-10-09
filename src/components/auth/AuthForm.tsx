"use client";

import Link from "next/link";
import { useState } from "react";
import { z } from "zod";

const schema = z.object({
  email: z.string().email("Enter a valid email address."),
  password: z.string().min(8, "Password must be at least 8 characters."),
});

export function AuthForm({ mode }: { mode: "login" | "signup" }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const [errors, setErrors] = useState<string[]>([]);
  const [done, setDone] = useState(false);

  const submit = (e: React.FormEvent) => {
    e.preventDefault();
    const parsed = schema.safeParse({ email, password });
    if (!parsed.success) {
      setErrors(parsed.error.issues.map((i) => i.message));
      return;
    }
    setErrors([]);
    try {
      const raw = window.localStorage.getItem("codecraft-account");
      const account = raw ? JSON.parse(raw) : {};
      window.localStorage.setItem(
        "codecraft-account",
        JSON.stringify({
          ...account,
          email,
          name: mode === "signup" ? name || account.name || "Coder" : account.name,
        }),
      );
    } catch {
      /* prototype only */
    }
    setDone(true);
  };

  if (done) {
    return (
      <div className="rounded-xl border border-green-200 bg-green-50 p-6 text-center">
        <p className="font-bold text-green-900">
          {mode === "signup" ? "Account created (prototype)" : "Signed in (prototype)"}
        </p>
        <p className="mt-2 text-sm leading-6 text-green-800">
          This prototype stores your details locally in this browser only — no
          server, no real authentication yet. Your lesson progress already
          saves automatically.
        </p>
        <Link
          href="/learn/python/intro"
          className="mt-4 inline-flex min-h-[48px] items-center rounded-lg bg-indigo-600 px-6 text-sm font-semibold text-white hover:bg-indigo-700"
        >
          Start coding free
        </Link>
      </div>
    );
  }

  return (
    <form onSubmit={submit} noValidate className="space-y-4">
      {mode === "signup" && (
        <div>
          <label htmlFor="auth-name" className="block text-sm font-semibold text-slate-900">
            Display name
          </label>
          <input
            id="auth-name"
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            autoComplete="name"
            placeholder="Alex"
            className="mt-1.5 min-h-[52px] w-full rounded-lg border border-slate-300 px-4 text-base focus:border-indigo-500 focus:outline-none"
          />
        </div>
      )}
      <div>
        <label htmlFor="auth-email" className="block text-sm font-semibold text-slate-900">
          Email
        </label>
        <input
          id="auth-email"
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          autoComplete="email"
          required
          placeholder="you@example.com"
          className="mt-1.5 min-h-[52px] w-full rounded-lg border border-slate-300 px-4 text-base focus:border-indigo-500 focus:outline-none"
        />
      </div>
      <div>
        <label htmlFor="auth-password" className="block text-sm font-semibold text-slate-900">
          Password
        </label>
        <input
          id="auth-password"
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          autoComplete={mode === "signup" ? "new-password" : "current-password"}
          required
          minLength={8}
          placeholder="At least 8 characters"
          className="mt-1.5 min-h-[52px] w-full rounded-lg border border-slate-300 px-4 text-base focus:border-indigo-500 focus:outline-none"
        />
      </div>
      {errors.length > 0 && (
        <div role="alert" className="rounded-lg border border-red-200 bg-red-50 p-4">
          <ul className="list-disc pl-5 text-sm text-red-800">
            {errors.map((e) => (
              <li key={e}>{e}</li>
            ))}
          </ul>
        </div>
      )}
      <button
        type="submit"
        className="inline-flex min-h-[52px] w-full items-center justify-center rounded-lg bg-indigo-600 px-6 text-base font-semibold text-white hover:bg-indigo-700"
      >
        {mode === "signup" ? "Create free account" : "Sign in"}
      </button>
      <p className="text-center text-sm text-slate-500">
        {mode === "signup" ? (
          <>
            Already have an account?{" "}
            <Link href="/login" className="font-semibold text-indigo-700 hover:underline">
              Sign in
            </Link>
          </>
        ) : (
          <>
            New to CodeCraft?{" "}
            <Link href="/signup" className="font-semibold text-indigo-700 hover:underline">
              Create a free account
            </Link>
          </>
        )}
      </p>
    </form>
  );
}
