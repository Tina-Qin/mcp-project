/**
 * Converts Mintlify-style MDX-ish tags in `public/antalpha-mcp-documentation.md`
 * into plain Markdown suitable for react-markdown.
 */
export function preprocessAntalphaMintlifyMd(raw: string): string {
  let s = raw

  s = s.replace(/<Info>\s*([\s\S]*?)\s*<\/Info>/gi, (_, inner: string) => {
    const lines = inner.trim().split("\n")
    return "> " + lines.join("\n> ") + "\n\n"
  })

  s = s.replace(/<Tip>\s*([\s\S]*?)\s*<\/Tip>/gi, (_, inner: string) => {
    const t = inner.trim()
    const lines = t.split("\n")
    return "> **Tip:** " + lines.join("\n> ") + "\n\n"
  })

  s = s.replace(/<CardGroup[^>]*>/gi, "")
  s = s.replace(/<\/CardGroup>/gi, "\n")

  s = s.replace(
    /<Card\s+title="([^"]+)"[^>]*>\s*([\s\S]*?)\s*<\/Card>/gi,
    (_m, title: string, body: string) => `### ${title}\n\n${body.trim()}\n\n`
  )

  s = s.replace(/<Steps>\s*([\s\S]*?)\s*<\/Steps>/gi, (_, inner: string) => {
    let n = 0
    return inner.replace(
      /<Step\s+title="([^"]+)"[^>]*>\s*([\s\S]*?)\s*<\/Step>/gi,
      (_s, title: string, body: string) => {
        n += 1
        return `${n}. **${title}**\n\n${body.trim()}\n\n`
      }
    )
  })

  s = s.replace(/<Tabs>\s*([\s\S]*?)\s*<\/Tabs>/gi, (_, inner: string) =>
    inner.replace(
      /<Tab\s+title="([^"]+)"[^>]*>\s*([\s\S]*?)\s*<\/Tab>/gi,
      (_t, title: string, body: string) => `### ${title}\n\n${body.trim()}\n\n`
    )
  )

  s = s.replace(/<Check>\s*([\s\S]*?)\s*<\/Check>/gi, (_, inner: string) => {
    return inner.trim() + "\n\n"
  })

  s = s.replace(/<Warning>\s*([\s\S]*?)\s*<\/Warning>/gi, (_, inner: string) => {
    const lines = inner.trim().split("\n")
    return "> **Warning**  \n> " + lines.join("\n> ") + "\n\n"
  })

  s = s.replace(/<AccordionGroup>\s*([\s\S]*?)\s*<\/AccordionGroup>/gi, (_, inner: string) =>
    inner.replace(
      /<Accordion\s+title="([^"]+)"[^>]*>\s*([\s\S]*?)\s*<\/Accordion>/gi,
      (_a, title: string, body: string) => `### ${title}\n\n${body.trim()}\n\n`
    )
  )

  return s
}
