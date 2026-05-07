import { useEffect, useState } from "react"

type Props = {
  repo: string
}

function parseRepo(repo: string) {
  const trimmed = repo.trim()
  const slash = trimmed.indexOf("/")
  const owner = slash >= 0 ? trimmed.slice(0, slash) : ""
  const name = slash >= 0 ? trimmed.slice(slash + 1) : ""
  return { owner, name, valid: Boolean(owner && name) }
}

export default function GitHubStars({ repo }: Props) {
  const { owner, name, valid } = parseRepo(repo)
  const [count, setCount] = useState<number | null>(null)

  useEffect(() => {
    if (!valid) return

    const ac = new AbortController()

    fetch(
      `https://api.github.com/repos/${encodeURIComponent(owner)}/${encodeURIComponent(name)}`,
      {
        signal: ac.signal,
        headers: { Accept: "application/vnd.github+json" },
      }
    )
      .then((r) => {
        if (!r.ok) throw new Error(String(r.status))
        return r.json() as Promise<{ stargazers_count: number }>
      })
      .then((data) => setCount(data.stargazers_count))
      .catch((err: unknown) => {
        if (err instanceof DOMException && err.name === "AbortError") return
      })

    return () => ac.abort()
  }, [valid, owner, name])

  if (!valid || count === null) return null

  const label = count.toLocaleString("en-US")
  const compact = new Intl.NumberFormat("en-US", {
    notation: "compact",
    maximumFractionDigits: 1,
  }).format(count)

  return (
    <span
      className="block text-xs text-zinc-500 tabular-nums"
      title={`${label} GitHub stars`}
      aria-label={`${label} GitHub stars`}
    >
      ★ {compact}
    </span>
  )
}
