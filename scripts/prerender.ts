import fs from 'fs'
import path from 'path'
import { fileURLToPath } from 'url'
import React from 'react'
import { renderToStaticMarkup } from 'react-dom/server'
import { HelmetServerState, HelmetProvider } from 'react-helmet-async'
import { StaticRouter } from 'react-router-dom/server'
import { Routes, Route } from 'react-router-dom'
import MainLayout from '../src/layouts/MainLayout.tsx'
import Home from '../src/pages/Home.tsx'
import About from '../src/pages/About.tsx'
import Projects from '../src/pages/Projects.tsx'
import Contact from '../src/pages/Contact.tsx'

const __dirname = path.dirname(fileURLToPath(import.meta.url))
const projectRoot = path.resolve(__dirname, '..')
const distDir = path.resolve(projectRoot, 'dist')

const pageRoutes = [
    { path: '/', Component: Home },
    { path: '/about', Component: About },
    { path: '/projects', Component: Projects },
    { path: '/contact', Component: Contact },
]

// Read main template HTML
const templatePath = path.resolve(distDir, 'index.html')
let template = fs.readFileSync(templatePath, 'utf-8')

// Extract assets from template
const scriptMatch = template.match(/<script[^>]*>/g) || []
const scripts = scriptMatch
    .map((tag) => {
        return tag.replace(/src="\/(?!\/)/g, 'src="../../')
    })
    .join('\n  ')

// Extract CSS links from template
const cssMatch = template.match(/<link[^>]*>/g) || []
const cssLinks = cssMatch.join('\n    ')

// Page mapping for filename generation
const pageFilenames = [
    { path: '/', filename: 'index.html' },
    { path: '/about', filename: 'about/index.html' },
    { path: '/projects', filename: 'projects/index.html' },
    { path: '/contact', filename: 'contact/index.html' },
]

// Generate static pages
for (const { path: routePath, filename } of pageFilenames) {
    try {
        const helmetContext: { helmet?: HelmetServerState } = {}

        // Render the full app structure with Routes and Helmet
        const content = renderToStaticMarkup(
            React.createElement(
                HelmetProvider,
                { context: helmetContext },
                React.createElement(
                    StaticRouter,
                    { location: routePath },
                    React.createElement(
                        MainLayout,
                        null,
                        React.createElement(
                            Routes,
                            null,
                            pageRoutes.map((route) =>
                                React.createElement(Route, {
                                    key: route.path,
                                    path: route.path,
                                    element: React.createElement(route.Component),
                                })
                            )
                        )
                    )
                )
            )
        )

        // Extract Helmet data
        const helmet = helmetContext.helmet

        // Calculate depth for relative path adjustment
        const depth = filename.split('/').length - 1
        const relativeBase = depth > 0 ? '../'.repeat(depth) : ''

        // Adjust CSS link paths based on directory depth
        const adjustedCssLinks = cssLinks.replace(/href="\/(?!\/)/g, `href="${relativeBase}`)
        const adjustedScripts = scripts.replace(/src="\/(?!\/)/g, `src="${relativeBase}`)

        // Build the head content from Helmet
        const helmtTitle = helmet?.title.toComponent() || []
        const helmetMeta = helmet?.meta.toComponent() || []
        const helmetLink = helmet?.link.toComponent() || []

        // Convert Helmet components to string
        let headContent = ''
        if (Array.isArray(helmtTitle) && helmtTitle.length > 0) {
            headContent += helmtTitle.map((c: any) => {
                if (c.props && 'children' in c.props) {
                    return `<title>${c.props.children}</title>`
                }
                return ''
            }).filter(Boolean).join('\n    ')
        }

        if (Array.isArray(helmetMeta)) {
            headContent += '\n    ' + helmetMeta.map((c: any) => {
                const props = c.props || {}
                const attrs = Object.entries(props)
                    .filter(([k]) => !['key', 'children'].includes(k))
                    .map(([k, v]) => `${k}="${v}"`)
                    .join(' ')
                return `<meta ${attrs} />`
            }).filter(Boolean).join('\n    ')
        }

        // Fallback to default meta if Helmet didn't provide sufficient data
        if (!headContent.includes('<title>')) {
            headContent = `<title>Mark Judaya</title>\n    `
        }

        const html = `<!doctype html>
<html lang="en" class="scroll-smooth">
  <head>
    <meta charset="UTF-8" />
    <link rel="icon" type="image/svg+xml" href="${relativeBase}vite.svg" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    ${headContent}
    ${adjustedCssLinks}
  </head>
  <body>
    <div id="root">${content}</div>
    ${adjustedScripts}
  </body>
</html>`

        // Create directory if needed
        const filePath = path.resolve(distDir, filename)
        const fileDir = path.dirname(filePath)
        if (!fs.existsSync(fileDir)) {
            fs.mkdirSync(fileDir, { recursive: true })
        }

        // Write HTML file
        fs.writeFileSync(filePath, html)
        console.log(`✓ Generated ${filename}`)
    } catch (err) {
        console.error(`✗ Error generating ${filename}:`, err)
        process.exit(1)
    }
}

console.log('\n✓ Static site generation complete!')
