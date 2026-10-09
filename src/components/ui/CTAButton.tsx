import Link from "next/link";
import { cn } from "@/lib/utils";

interface Props {
  href: string;
  variant?: "primary" | "secondary" | "ghost" | "dark";
  size?: "sm" | "md" | "lg";
  className?: string;
  children: React.ReactNode;
}

export function CTAButton({
  href,
  variant = "primary",
  size = "md",
  className,
  children,
}: Props) {
  return (
    <Link
      href={href}
      className={cn(
        "touch-target inline-flex items-center justify-center gap-2 rounded-lg font-semibold transition-colors",
        size === "sm" && "px-3.5 py-2 text-sm",
        size === "md" && "px-5 py-2.5 text-sm",
        size === "lg" && "px-7 py-3.5 text-base",
        variant === "primary" &&
          "bg-indigo-600 text-white shadow-sm hover:bg-indigo-700",
        variant === "secondary" &&
          "border border-slate-300 bg-white text-slate-800 hover:border-slate-400 hover:bg-slate-50",
        variant === "ghost" && "text-slate-600 hover:bg-slate-100 hover:text-slate-900",
        variant === "dark" && "bg-slate-900 text-white hover:bg-slate-800",
        className,
      )}
    >
      {children}
    </Link>
  );
}
