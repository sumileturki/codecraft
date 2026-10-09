import Link from "next/link";
import type { BlogBlock } from "@/types";

export function BlogBlocks({ blocks }: { blocks: BlogBlock[] }) {
  return (
    <>
      {blocks.map((block, i) => {
        switch (block.type) {
          case "intro":
            return (
              <p key={i} className="text-lg leading-8 text-slate-700">
                {block.text}
              </p>
            );
          case "paragraph":
            return <p key={i}>{renderInline(block.text)}</p>;
          case "heading":
            return block.level === 2 ? (
              <h2 key={i} id={block.id} className="scroll-mt-24">
                {block.text}
              </h2>
            ) : (
              <h3 key={i} id={block.id} className="scroll-mt-24">
                {block.text}
              </h3>
            );
          case "list":
            return block.ordered ? (
              <ol key={i}>
                {block.items.map((item) => (
                  <li key={item.slice(0, 32)}>{renderInline(item)}</li>
                ))}
              </ol>
            ) : (
              <ul key={i}>
                {block.items.map((item) => (
                  <li key={item.slice(0, 32)}>{renderInline(item)}</li>
                ))}
              </ul>
            );
          case "code":
            return (
              <pre key={i}>
                <code>{block.code}</code>
              </pre>
            );
          case "quote":
            return <blockquote key={i}>{block.text}</blockquote>;
        }
      })}
    </>
  );
}

// Tiny inline renderer: `code` spans and [text](/href) links, safely escaped.
function renderInline(text: string): React.ReactNode {
  const parts: React.ReactNode[] = [];
  const re = /(`[^`]+`|\[[^\]]+\]\([^)]+\))/g;
  let last = 0;
  let m: RegExpExecArray | null;
  let k = 0;
  while ((m = re.exec(text)) !== null) {
    if (m.index > last) parts.push(text.slice(last, m.index));
    const token = m[0];
    if (token.startsWith("`")) {
      parts.push(<code key={k++}>{token.slice(1, -1)}</code>);
    } else {
      const lm = /\[([^\]]+)\]\(([^)]+)\)/.exec(token);
      if (lm) {
        const href = lm[2]!;
        const internal = href.startsWith("/");
        parts.push(
          internal ? (
            <Link key={k++} href={href}>
              {lm[1]}
            </Link>
          ) : (
            <a key={k++} href={href} rel="noopener noreferrer">
              {lm[1]}
            </a>
          ),
        );
      } else {
        parts.push(token);
      }
    }
    last = m.index + token.length;
  }
  if (last < text.length) parts.push(text.slice(last));
  return <>{parts}</>;
}
