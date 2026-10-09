export const SITE_URL =
  process.env.NEXT_PUBLIC_SITE_URL ?? "https://codecraft.dev";

export const SITE_NAME = "CodeCraft";
export const SITE_TAGLINE = "Learn to code by building.";
export const SITE_DESCRIPTION =
  "Master programming through interactive browser lessons, instant feedback, visual execution tracing, and guided projects built for beginners.";

export const NAV_LINKS = [
  { href: "/courses", label: "Learn" },
  { href: "/courses", label: "Paths" },
  { href: "/projects", label: "Projects" },
  { href: "/tools/visualizer", label: "Tools" },
  { href: "/community", label: "Community" },
] as const;

export const FOOTER_COLUMNS = [
  {
    heading: "Learn",
    links: [
      { href: "/courses/python", label: "Python" },
      { href: "/courses/javascript", label: "JavaScript" },
      { href: "/courses/html-css", label: "HTML & CSS" },
    ],
  },
  {
    heading: "Resources",
    links: [
      { href: "/courses", label: "Learning Paths" },
      { href: "/projects", label: "Projects" },
      { href: "/tools/visualizer", label: "Code Visualizer" },
      { href: "/community", label: "Community" },
    ],
  },
  {
    heading: "Company",
    links: [
      { href: "/about", label: "About" },
      { href: "/blog", label: "Blog" },
      { href: "/search", label: "Search" },
    ],
  },
  {
    heading: "Legal",
    links: [
      { href: "/privacy", label: "Privacy" },
      { href: "/terms", label: "Terms" },
    ],
  },
] as const;

export function canonical(path: string): string {
  return `${SITE_URL}${path}`;
}
