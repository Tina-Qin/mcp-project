import type { ReactNode } from "react"
import ReactMarkdown from "react-markdown"
import remarkGfm from "remark-gfm"
import Link from "next/link"

const markdownComponents = {
  h1: ({ children }: { children?: ReactNode }) => (
    <h1 className="mb-6 font-mono text-3xl font-bold tracking-tight text-foreground md:text-4xl">
      {children}
    </h1>
  ),
  h2: ({ children }: { children?: ReactNode }) => (
    <h2 className="mb-4 mt-12 scroll-mt-24 border-b border-border/40 pb-2 font-mono text-xl font-semibold text-foreground first:mt-0 md:text-2xl">
      {children}
    </h2>
  ),
  h3: ({ children }: { children?: ReactNode }) => (
    <h3 className="mb-3 mt-8 scroll-mt-24 font-mono text-lg font-semibold text-foreground">
      {children}
    </h3>
  ),
  p: ({ children }: { children?: ReactNode }) => (
    <p className="mb-4 text-[15px] leading-relaxed text-muted-foreground last:mb-0">{children}</p>
  ),
  ul: ({ children }: { children?: ReactNode }) => (
    <ul className="mb-4 list-disc space-y-2 pl-6 text-[15px] text-muted-foreground marker:text-blue-500/80">
      {children}
    </ul>
  ),
  ol: ({ children }: { children?: ReactNode }) => (
    <ol className="mb-4 list-decimal space-y-2 pl-6 text-[15px] text-muted-foreground marker:font-mono marker:text-blue-500/80">
      {children}
    </ol>
  ),
  li: ({ children }: { children?: ReactNode }) => (
    <li className="leading-relaxed [&>p]:mb-2">{children}</li>
  ),
  a: ({ href, children }: { href?: string; children?: ReactNode }) => (
    <a
      href={href}
      className="font-mono text-sm text-blue-400 underline decoration-blue-500/40 underline-offset-2 transition-colors hover:text-blue-300"
      target={href?.startsWith("http") ? "_blank" : undefined}
      rel={href?.startsWith("http") ? "noopener noreferrer" : undefined}
    >
      {children}
    </a>
  ),
  strong: ({ children }: { children?: ReactNode }) => (
    <strong className="font-semibold text-foreground">{children}</strong>
  ),
  code: ({ className, children }: { className?: string; children?: ReactNode }) => {
    const isBlock = className?.includes("language-")
    if (isBlock) {
      return <code className={className}>{children}</code>
    }
    return (
      <code className="rounded border border-border/50 bg-muted/40 px-1.5 py-0.5 font-mono text-[13px] text-blue-200">
        {children}
      </code>
    )
  },
  pre: ({ children }: { children?: ReactNode }) => (
    <pre className="mb-4 overflow-x-auto rounded border border-blue-500/20 bg-black/50 p-4 font-mono text-[13px] leading-relaxed text-blue-100/90 shadow-[inset_0_0_0_1px_rgba(59,130,246,0.08)]">
      {children}
    </pre>
  ),
  blockquote: ({ children }: { children?: ReactNode }) => (
    <blockquote className="mb-4 border-l-4 border-blue-500/40 bg-blue-500/6 py-3 pl-4 pr-2 text-[15px] text-muted-foreground [&_p]:mb-2 [&_p:last-child]:mb-0">
      {children}
    </blockquote>
  ),
  hr: () => <hr className="my-12 border-border/40" />,
}

export function DocsMarkdown({ content }: { content: string }) {
  return (
    <article className="docs-markdown mx-auto max-w-3xl">
      <ReactMarkdown remarkPlugins={[remarkGfm]} components={markdownComponents}>
        {content}
      </ReactMarkdown>
      <p className="mt-16 border-t border-border/30 pt-8 font-mono text-xs text-muted-foreground">
        Source:{" "}
        <Link href="/antalpha-mcp-documentation.md" className="text-blue-400 hover:text-blue-300">
          antalpha-mcp-documentation.md
        </Link>
      </p>
    </article>
  )
}
