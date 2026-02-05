import fs from 'fs'
import path from 'path'
import { fileURLToPath } from 'url'
import React from 'react'
import { renderToStaticMarkup } from 'react-dom/server'
import { StaticRouter } from 'react-router-dom/server'
import { Routes, Route } from 'react-router-dom'

const __dirname = path.dirname(fileURLToPath(import.meta.url))
const projectRoot = path.resolve(__dirname, '..')
const distDir = path.resolve(projectRoot, 'dist')

// Dynamic imports for pages and dependencies
const importPages = async () => {
    const { default: MainLayout } = await import('../src/layouts/MainLayout.tsx')
    const { default: Home } = await import('../src/pages/Home.tsx')
    const { default: About } = await import('../src/pages/About.tsx')
    const { default: Projects } = await import('../src/pages/Projects.tsx')
    const { default: Contact } = await import('../src/pages/Contact.tsx')

    return { MainLayout, Home, About, Projects, Contact }
}

const importHelmet = async () => {
    const helmetModule = await import('react-helmet-async')
    return {
        HelmetProvider: helmetModule.HelmetProvider
    }
}

const pageRoutes = [
    { path: '/', fileName: 'Home' },
    { path: '/about', fileName: 'About' },
    { path: '/projects', fileName: 'Projects' },
    { path: '/contact', fileName: 'Contact' },
]

// Page mapping for filename generation
const pageFilenames = [
    { path: '/', filename: 'index.html' },
    { path: '/about', filename: 'about/index.html' },
    { path: '/projects', filename: 'projects/index.html' },
    { path: '/contact', filename: 'contact/index.html' },
]

// Main prerender function
const prerender = async () => {
    try {
        // Import all modules
        const pages = await importPages()
        const helmet = await importHelmet()

        // Read main template HTML
        const templatePath = path.resolve(distDir, 'index.html')
        let template = fs.readFileSync(templatePath, 'utf-8')

        // Extract assets from template - match complete script tags
        const scriptMatch = template.match(/<script\b[^>]*>[\s\S]*?<\/script>/gi) || []
        const scripts = scriptMatch.join('\n    ')

        // Extract CSS links from template
        const cssMatch = template.match(/<link[^>]*>/g) || []
        const cssLinks = cssMatch.join('\n    ')

        // Generate static pages
        for (const { path: routePath, filename } of pageFilenames) {
            try {
                const pageRoute = pageRoutes.find(r => r.path === routePath)
                if (!pageRoute) continue

                const PageComponent = (pages as any)[pageRoute.fileName]
                const helmetContext: { helmet?: any } = {}

                // Render the full app structure with Routes and Helmet
                const content = renderToStaticMarkup(
                    React.createElement(
                        helmet.HelmetProvider,
                        { context: helmetContext },
                        React.createElement(
                            StaticRouter,
                            { location: routePath },
                            React.createElement(
                                pages.MainLayout,
                                null,
                                React.createElement(
                                    Routes,
                                    null,
                                    React.createElement(Route, {
                                        key: routePath,
                                        path: routePath,
                                        element: React.createElement(PageComponent),
                                    })
                                )
                            )
                        )
                    )
                )

                // Extract Helmet data
                const helmetData = helmetContext.helmet

                // Calculate depth for relative path adjustment
                const depth = filename.split('/').length - 1
                const relativeBase = depth > 0 ? '../'.repeat(depth) : './'

                // Adjust CSS and script paths based on directory depth
                // Replace ./ with the appropriate relative path
                const adjustedCssLinks = cssLinks.replace(/href="\.\//g, `href="${relativeBase}`)
                const adjustedScripts = scripts.replace(/src="\.\//g, `src="${relativeBase}`)

                // Build the head content from Helmet
                const helmtTitle = helmetData?.title.toComponent() || []
                const helmetMeta = helmetData?.meta.toComponent() || []
                const helmetLink = helmetData?.link.toComponent() || []

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
            }
        }

        console.log('\n✓ Static site generation complete!')
    } catch (err) {
        console.error('✗ Prerender failed:', err)
        process.exit(1)
    }
}

// Run prerender
prerender()
