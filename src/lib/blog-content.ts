export type ParsedBlogSection = {
  title: string
  paragraphs: string[]
}

export type ParsedBlogContent = {
  intro: string[]
  sections: ParsedBlogSection[]
}

function toParagraphs(lines: string[]): string[] {
  const text = lines.join("\n").trim()
  if (!text) return []
  return text
    .split(/\n\s*\n/g)
    .map((p) => p.trim())
    .filter(Boolean)
}

export function parseBlogContent(blocks: string[]): ParsedBlogContent {
  const merged = blocks.join("\n\n").replace(/\r/g, "").replace(/\s+##\s+/g, "\n## ")
  const lines = merged.split("\n")

  const introLines: string[] = []
  const sections: ParsedBlogSection[] = []
  let currentTitle: string | null = null
  let currentLines: string[] = []

  for (const rawLine of lines) {
    const line = rawLine.trimEnd()
    const headingMatch = line.match(/^##\s+(.+)$/)

    if (headingMatch) {
      if (currentTitle) {
        sections.push({
          title: currentTitle,
          paragraphs: toParagraphs(currentLines),
        })
      }
      currentTitle = headingMatch[1].trim()
      currentLines = []
      continue
    }

    if (currentTitle) {
      currentLines.push(line)
    } else {
      introLines.push(line)
    }
  }

  if (currentTitle) {
    sections.push({
      title: currentTitle,
      paragraphs: toParagraphs(currentLines),
    })
  }

  return {
    intro: toParagraphs(introLines),
    sections,
  }
}
