/** Primary links and star overrides must use this origin (enforced at compile time for tool seeds). */
export type GithubComHttpsUrl = `https://github.com/${string}`

const NON_REPO_PATH_ROOTS = new Set([
  "features",
  "settings",
  "orgs",
  "topics",
  "collections",
  "sponsors",
  "explore",
  "marketplace",
  "login",
  "pricing",
  "account",
  "enterprise",
])

/**
 * Returns `owner/repo` for public API stargazers when `url` points at a GitHub repository path.
 */
export function parseGithubRepoFromUrl(urlString: string): string | null {
  try {
    const u = new URL(urlString)
    const host = u.hostname.replace(/^www\./i, "").toLowerCase()
    if (host !== "github.com") return null

    const parts = u.pathname.split("/").filter(Boolean)
    if (parts.length < 2) return null

    const [owner, repo] = parts
    if (!owner || !repo || NON_REPO_PATH_ROOTS.has(owner.toLowerCase())) {
      return null
    }

    const repoName = repo.replace(/\.git$/i, "")
    if (!repoName) return null

    return `${owner}/${repoName}`
  } catch {
    return null
  }
}

export function resolveGithubRepoForStars(tool: {
  url: string
  githubStarsUrl?: GithubComHttpsUrl
}): string | null {
  if (tool.githubStarsUrl) {
    const fromOverride = parseGithubRepoFromUrl(tool.githubStarsUrl)
    if (fromOverride) return fromOverride
  }
  return parseGithubRepoFromUrl(tool.url) ?? null
}
