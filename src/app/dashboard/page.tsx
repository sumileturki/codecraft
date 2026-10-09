import type { Metadata } from "next";
import { DashboardClient } from "@/components/dashboard/DashboardClient";
import { pageMetadata } from "@/lib/seo";

export const metadata: Metadata = pageMetadata({
  title: "Your Learning Dashboard",
  description: "Track your CodeCraft progress: streak, completed lessons, projects, and your recommended next lesson.",
  path: "/dashboard",
  noindex: true,
});

export default function DashboardPage() {
  return (
    <main className="mx-auto max-w-7xl flex-1 px-4 py-10 sm:px-6 lg:px-8">
      <DashboardClient />
    </main>
  );
}
