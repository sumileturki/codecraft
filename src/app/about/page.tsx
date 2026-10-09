import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { Breadcrumbs } from "@/components/seo/Breadcrumbs";
import { JsonLd } from "@/components/seo/JsonLd";
import { CTAButton } from "@/components/ui/CTAButton";
import { breadcrumbJsonLd, pageMetadata } from "@/lib/seo";

export const metadata: Metadata = pageMetadata({
  title: "About CodeCraft — Learn to Code by Building",
  description:
    "CodeCraft is a beginner-friendly coding education platform: zero-setup browser lessons, visual execution tracing, instant feedback, and guided projects.",
  path: "/about",
});

export default function AboutPage() {
  return (
    <main className="mx-auto max-w-4xl flex-1 px-4 py-10 sm:px-6 lg:px-8">
      <JsonLd
        data={breadcrumbJsonLd([
          { name: "Home", path: "/" },
          { name: "About", path: "/about" },
        ])}
      />
      <Breadcrumbs items={[{ name: "Home", href: "/" }, { name: "About" }]} />
      <h1 className="mt-4 text-3xl font-bold tracking-tight text-slate-900 sm:text-4xl">
        Learn to code by building.
      </h1>
      <div className="article-body mt-6">
        <p>
          CodeCraft exists for one reason: most beginners quit before they ever
          run a program. Not because coding is too hard — but because setup is
          too hard, explanations assume too much, and tutorials never become
          projects.
        </p>
        <h2>What we do differently</h2>
        <ul>
          <li>
            <strong>Zero setup.</strong> Every lesson runs in your browser via{" "}
            <Link href="/learn/python/intro">interactive Python lessons</Link>{" "}
            and instant JavaScript execution.
          </li>
          <li>
            <strong>Visual execution.</strong> The{" "}
            <Link href="/tools/visualizer">code visualizer</Link> shows
            variables and loops changing line by line.
          </li>
          <li>
            <strong>Helpful feedback.</strong> Errors are explained in plain
            language with hints — see the{" "}
            <Link href="/community/errors">common errors guide</Link>.
          </li>
          <li>
            <strong>Real projects.</strong> Guided builds like the{" "}
            <Link href="/projects/python-weather-dashboard">
              weather dashboard
            </Link>{" "}
            turn lessons into portfolio pieces.
          </li>
        </ul>
        <h2>Who it&apos;s for</h2>
        <p>
          Career switchers, university students, complete beginners, aspiring
          founders, and self-taught developers — anyone starting from zero who
          wants the{" "}
          <Link href="/courses">
            best coding pathway for a non-tech background
          </Link>
          .
        </p>
        <h2>Prototype honesty</h2>
        <p>
          This is a frontend prototype: progress persists in your browser via
          localStorage, community threads are illustrative mock data, and
          feedback comes from an educational rules engine — not AI, not a
          backend. The architecture is documented in our README, including how
          WordPress can serve as the CMS for public content.
        </p>
      </div>
      <div className="mt-8 flex flex-col gap-3 sm:flex-row">
        <CTAButton href="/learn/python/intro" size="lg">
          Start Coding Free
          <ArrowRight className="h-4 w-4" aria-hidden="true" />
        </CTAButton>
        <CTAButton href="/courses" variant="secondary" size="lg">
          Explore Learning Paths
        </CTAButton>
      </div>
    </main>
  );
}
