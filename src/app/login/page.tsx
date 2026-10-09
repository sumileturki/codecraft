import type { Metadata } from "next";
import { AuthForm } from "@/components/auth/AuthForm";
import { pageMetadata } from "@/lib/seo";

export const metadata: Metadata = pageMetadata({
  title: "Sign In",
  description: "Sign in to CodeCraft to sync your learning progress.",
  path: "/login",
  noindex: true,
});

export default function LoginPage() {
  return (
    <main className="mx-auto w-full max-w-md flex-1 px-4 py-12 sm:px-6">
      <h1 className="text-3xl font-bold tracking-tight text-slate-900">
        Welcome back
      </h1>
      <p className="mt-2 text-slate-600">
        Sign in to pick up where you left off.
      </p>
      <div className="mt-6 rounded-xl border border-slate-200 bg-white p-6 shadow-sm">
        <AuthForm mode="login" />
      </div>
    </main>
  );
}
