import { readFileSync } from "node:fs"
import { join } from "node:path"
import type { Metadata } from "next"
import { Navbar } from "@/components/landing/navbar"
import { Footer } from "@/components/landing/footer"
import { DocsMarkdown } from "@/components/docs/docs-markdown"
import { preprocessAntalphaMintlifyMd } from "@/lib/preprocess-antalpha-md"

export const metadata: Metadata = {
  title: "Documentation | AntAlpha MCP",
  description:
    "Web3 AI Unified Gateway MCP — installation, tools, rate limits, and troubleshooting for AntAlpha MCP Server.",
}

function loadDocsMarkdown(): string {
  const path = join(process.cwd(), "public", "antalpha-mcp-documentation.md")
  const raw = readFileSync(path, "utf-8")
  return preprocessAntalphaMintlifyMd(raw)
}

export default function DocsPage() {
  const content = loadDocsMarkdown()

  return (
    <div className="min-h-dvh bg-background text-foreground">
      <Navbar />
      <main className="pt-24 pb-16">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <p className="mb-8 font-mono text-xs uppercase tracking-widest text-blue-500">Documentation</p>
          <DocsMarkdown content={content} />
        </div>
      </main>
      <Footer />
    </div>
  )
}
