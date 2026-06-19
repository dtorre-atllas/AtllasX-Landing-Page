import { defineConfig } from 'vite'
import path from 'path'
import tailwindcss from '@tailwindcss/vite'
import react from '@vitejs/plugin-react'


function figmaAssetResolver() {
  return {
    name: 'figma-asset-resolver',
    resolveId(id) {
      if (id.startsWith('figma:asset/')) {
        const filename = id.replace('figma:asset/', '')
        return path.resolve(__dirname, 'src/assets', filename)
      }
    },
  }
}

// Figma Make exports import packages with a pinned-version suffix, e.g.
// `@radix-ui/react-slot@1.1.2`. Standard npm/Vite can't resolve those ids.
// This plugin strips the trailing `@x.y.z` so imports resolve normally.
function stripVersionResolver() {
  return {
    name: 'strip-version-imports',
    enforce: 'pre' as const,
    async resolveId(source: string, importer: string | undefined, options: any) {
      const m = source.match(/^((?:@[^/]+\/)?[^@/][^@]*)@\d+\.\d+\.\d+(.*)$/)
      if (!m) return null
      const stripped = m[1] + (m[2] || '')
      const resolved = await this.resolve(stripped, importer, { ...options, skipSelf: true })
      return resolved || { id: stripped }
    },
  }
}

export default defineConfig({
  plugins: [
    stripVersionResolver(),
    figmaAssetResolver(),
    // The React and Tailwind plugins are both required for Make, even if
    // Tailwind is not being actively used – do not remove them
    react(),
    tailwindcss(),
  ],
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
    },
  },
})
