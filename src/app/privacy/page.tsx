import type { Metadata } from "next";
import { Breadcrumbs } from "@/components/seo/Breadcrumbs";
import { pageMetadata } from "@/lib/seo";

export const metadata: Metadata = pageMetadata({
  title: "Privacy Policy",
  description: "How CodeCraft handles your data: local-first progress storage and no tracking in this prototype.",
  path: "/privacy",
});

export default function PrivacyPage() {
  return (
    <main className="mx-auto max-w-3xl flex-1 px-4 py-10 sm:px-6 lg:px-8">
      <Breadcrumbs items={[{ name: "Home", href: "/" }, { name: "Privacy" }]} />
      <h1 className="mt-4 text-3xl font-bold tracking-tight text-slate-900">
        Privacy Policy
      </h1>
      <p className="mt-2 text-sm text-slate-500">Last updated: October 2026</p>
      <div className="article-body mt-6">
        <h2>Local-first data</h2>
        <p>
          This prototype stores your learning progress (completed lessons,
          project milestones, streak) in your own browser using localStorage.
          That data never leaves your device — there is no backend to send it
          to.
        </p>
        <h2>Code execution</h2>
        <p>
          Code you write runs entirely in your browser (via Pyodide in a Web
          Worker, or a built-in interpreter fallback). It is never uploaded to
          any server.
        </p>
        <h2>Analytics and tracking</h2>
        <p>
          This prototype ships with no analytics, no advertising trackers, and
          no third-party cookies. The only network requests are loading the
          page itself and, when needed, the Pyodide runtime from a public CDN.
        </p>
        <h2>Accounts</h2>
        <p>
          Account forms in this prototype validate locally and store details
          only in your browser. Real authentication will be introduced with a
          backend, at which point this policy will be updated.
        </p>
        <h2>Contact</h2>
        <p>
          Questions about privacy? Reach us via the links in the footer. This
          is a college project prototype — do not submit sensitive personal
          data.
        </p>
      </div>
    </main>
  );
}
