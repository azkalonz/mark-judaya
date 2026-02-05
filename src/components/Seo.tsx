import React from 'react'
import { Helmet } from 'react-helmet-async'

interface SeoProps {
    title: string
    description: string
    ogTitle?: string
    ogDescription?: string
    ogType?: string
    canonical?: string
}

const Seo: React.FC<SeoProps> = ({
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
        <Helmet>
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
        </Helmet>
    )
}

export default Seo
