// @ts-check

import tailwindcss from "@tailwindcss/vite"
import { defineConfig } from "astro/config"
import react from "@astrojs/react"

const configuredSite = process.env.PUBLIC_SITE_URL || process.env.SITE_URL
const vercelUrl = process.env.VERCEL_PROJECT_PRODUCTION_URL || process.env.VERCEL_URL
const site =
  configuredSite ||
  (vercelUrl ? `https://${vercelUrl.replace(/^https?:\/\//, "")}` : undefined) ||
  "https://ade.codes"

// https://astro.build/config
export default defineConfig({
  site,
  vite: {
    plugins: [tailwindcss()],
  },
  integrations: [react()],
})
