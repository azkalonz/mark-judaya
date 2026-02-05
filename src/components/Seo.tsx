import React, { Suspense, lazy } from 'react'

interface SeoProps {
    title: string
    description: string
    ogTitle?: string
    ogDescription?: string
    ogType?: string
    canonical?: string
}

// Lazy load Helmet to avoid module resolution issues during prerender
const HelmetComponent = lazy(async () => {
    const { Helmet } = await import('react-helmet-async')
    // Wrap Helmet to properly handle children
    return {
        default: (props: any) => React.createElement(Helmet, null, props.children)
    }
})

const SeoContent: React.FC<SeoProps> = ({
    title,
    description,
    ogTitle,
    ogDescription,
    ogType = 'website',
    canonical,
}) => {
    const siteName = 'Mark Judaya'
    const fullTitle = `${title} – ${siteName}`

    return (
        <Suspense fallback={null}>
            <HelmetComponent>
                <title>{fullTitle}</title>
                <meta name="description" content={description} />
                <meta name="viewport" content="width=device-width, initial-scale=1.0" />

                {/* Open Graph Tags */}
                <meta property="og:title" content={ogTitle || title} />
                <meta property="og:description" content={ogDescription || description} />
                <meta property="og:type" content={ogType} />
                <meta property="og:site_name" content={siteName} />

                {/* Canonical */}
                {canonical && <link rel="canonical" href={canonical} />}

                {/* Additional useful metas */}
                <meta name="theme-color" content="#ffffff" media="(prefers-color-scheme: light)" />
                <meta name="theme-color" content="#0f172a" media="(prefers-color-scheme: dark)" />
            </HelmetComponent>
        </Suspense>
    )
}

export default SeoContent
