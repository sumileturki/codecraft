import type { Metadata } from "next";
import { AuthForm } from "@/components/auth/AuthForm";
import { pageMetadata } from "@/lib/seo";

export const metadata: Metadata = pageMetadata({
  title: "Create a Free Account",
  description: "Create a free CodeCraft account and start coding in your browser today.",
  path: "/signup",
  noindex: true,
});

export default function SignupPage() {
  return (
    <main className="mx-auto w-full max-w-md flex-1 px-4 py-12 sm:px-6">
      <h1 className="text-3xl font-bold tracking-tight text-slate-900">
        Start coding free
      </h1>
      <p className="mt-2 text-slate-600">
        One account for lessons, projects, and progress.
      </p>
      <div className="mt-6 rounded-xl border border-slate-200 bg-white p-6 shadow-sm">
        <AuthForm mode="signup" />
      </div>
    </main>
  );
}
