import Link from "next/link";
import { ChevronRight } from "lucide-react";

export function Breadcrumbs({
  items,
}: {
  items: { name: string; href?: string }[];
}) {
  return (
    <nav aria-label="Breadcrumb">
      <ol className="flex flex-wrap items-center gap-1 text-sm text-slate-500">
        {items.map((item, i) => (
          <li key={item.name} className="flex items-center gap-1">
            {i > 0 && (
              <ChevronRight aria-hidden="true" className="h-3.5 w-3.5 text-slate-400" />
            )}
            {item.href && i < items.length - 1 ? (
              <Link
                href={item.href}
                className="rounded hover:text-indigo-700 hover:underline"
              >
                {item.name}
              </Link>
            ) : (
              <span aria-current="page" className="font-medium text-slate-800">
                {item.name}
              </span>
            )}
          </li>
        ))}
      </ol>
    </nav>
  );
}
