import React, { useEffect, useMemo, useRef, useState } from 'react'
import { Link, useParams } from 'react-router-dom'
import ReactMarkdown from 'react-markdown'
import Seo from '../components/Seo'
import projects from '../data/projects'

const ProjectDetails: React.FC = () => {
    const { id } = useParams<{ id: string }>()
    const project = useMemo(() => projects.find((item) => item.id === id), [id])
    const [showBanner, setShowBanner] = useState(true)
    const [inlineVisible, setInlineVisible] = useState(false)
    const inlineBannerRef = useRef<HTMLDivElement | null>(null)
    const [details, setDetails] = useState(() => {
        if (!id) return ''
        const preloaded = (globalThis as any).__PROJECT_DETAILS__ as Record<string, string> | undefined
        return preloaded?.[id] ?? ''
    })

    useEffect(() => {
        if (!id || details) return
        const controller = new AbortController()

        fetch(`/project-details/${id}.md`, { signal: controller.signal })
            .then((response) => (response.ok ? response.text() : ''))
            .then((text) => {
                if (text) setDetails(text)
            })
            .catch(() => undefined)

        return () => controller.abort()
    }, [id, details])

    useEffect(() => {
        if (!project?.fiverrUrl) return
        let lastScrollY = window.scrollY

        const onScroll = () => {
            const currentY = window.scrollY
            const maxScroll = Math.max(document.documentElement.scrollHeight - window.innerHeight, 1)
            const progress = currentY / maxScroll
            const isScrollingDown = currentY > lastScrollY

            if (isScrollingDown) {
                setShowBanner(false)
            } else if (progress >= 0.5) {
                setShowBanner(true)
            }

            lastScrollY = currentY
        }

        window.addEventListener('scroll', onScroll, { passive: true })
        return () => window.removeEventListener('scroll', onScroll)
    }, [project?.fiverrUrl])

    useEffect(() => {
        if (!project?.fiverrUrl || !inlineBannerRef.current) return
        const target = inlineBannerRef.current
        const observer = new IntersectionObserver(
            ([entry]) => setInlineVisible(entry.isIntersecting),
            { threshold: 0.2 }
        )
        observer.observe(target)
        return () => observer.disconnect()
    }, [project?.fiverrUrl])

    if (!project) {
        return (
            <>
                <Seo
                    title="Project Not Found"
                    description="The requested project could not be found."
                    ogTitle="Project Not Found"
                    ogDescription="The requested project could not be found."
                />
                <section className="max-w-3xl">
                    <h1 className="text-3xl font-semibold">Project not found</h1>
                    <p className="mt-3 text-slate-600 dark:text-slate-300">The project you are looking for does not exist.</p>
                    <Link to="/projects" className="mt-6 inline-flex items-center px-4 py-2 rounded-md bg-indigo-600 text-white hover:bg-indigo-700 transition">
                        Back to projects
                    </Link>
                </section>
            </>
        )
    }

    return (
        <>
            <Seo
                title={project.title}
                description={project.description}
                ogTitle={project.title}
                ogDescription={project.description}
                ogType="article"
                canonical={`/projects/${project.id}`}
            />
            <section className="max-w-4xl">
                <div className="flex items-center justify-between gap-4 flex-wrap">
                    <Link to="/projects" className="text-sm text-slate-600 dark:text-slate-300 hover:text-indigo-600 transition">
                        Back to projects
                    </Link>
                </div>

                <h1 className="mt-4 text-3xl sm:text-4xl font-semibold text-slate-900 dark:text-slate-100">{project.title}</h1>
                <div className="mt-3 flex flex-wrap gap-2">
                    {project.featured && (
                        <span className="text-xs px-2 py-1 rounded-full bg-indigo-600/10 text-indigo-700 dark:bg-indigo-500/15 dark:text-indigo-200">
                            Featured
                        </span>
                    )}
                </div>
                <p className="mt-3 text-slate-600 dark:text-slate-300">{project.description}</p>

                {project.featuredPhoto && <div className="mt-6 overflow-hidden rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-100 dark:bg-slate-900">
                    <img src={project.featuredPhoto} alt={`${project.title} featured`} className="w-full h-64 object-cover object-center" />
                </div>}

                <div className="mt-6 grid gap-4 sm:grid-cols-2">
                    <div className="rounded-lg border border-slate-200 dark:border-slate-800 p-4">
                        <h2 className="text-sm font-semibold text-slate-900 dark:text-slate-100">Timeline</h2>
                        <p className="mt-2 text-sm text-slate-600 dark:text-slate-300">Started: {project.dateStarted}</p>
                        <p className="text-sm text-slate-600 dark:text-slate-300">Finished: {project.dateFinished}</p>
                    </div>
                    <div className="rounded-lg border border-slate-200 dark:border-slate-800 p-4">
                        <h2 className="text-sm font-semibold text-slate-900 dark:text-slate-100">Tags</h2>
                        <div className="mt-2 flex flex-wrap gap-2">
                            {project.tags.map((tag) => (
                                <span key={tag} className="text-xs px-2 py-1 rounded-full bg-indigo-50 text-indigo-700 dark:bg-indigo-500/10 dark:text-indigo-200">
                                    {tag}
                                </span>
                            ))}
                        </div>
                    </div>
                </div>

                <div className="mt-6 flex flex-wrap gap-2">
                    {project.stack.map((item) => (
                        <span key={item} className="text-xs px-2 py-1 rounded-full bg-slate-100 dark:bg-slate-800 text-slate-800 dark:text-slate-200">
                            {item}
                        </span>
                    ))}
                </div>

                {project.links && (
                    <div className="mt-6 flex flex-wrap gap-3">
                        {project.links.live && (
                            <a href={project.links.live} target="_blank" rel="noreferrer" className="inline-flex items-center px-4 py-2 rounded-md bg-indigo-600 text-white hover:bg-indigo-700 transition">
                                Live demo
                            </a>
                        )}
                        {project.links.repo && (
                            <a href={project.links.repo} target="_blank" rel="noreferrer" className="inline-flex items-center px-4 py-2 rounded-md border border-slate-200 dark:border-slate-800 text-slate-700 dark:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-800 transition">
                                View code
                            </a>
                        )}
                    </div>
                )}

                {details && (
                    <article className="prose prose-slate dark:prose-invert mt-8 max-w-none">
                        <ReactMarkdown>{details}</ReactMarkdown>
                    </article>
                )}

                {project.fiverrUrl && details && (
                    <div ref={inlineBannerRef} className="mt-8">
                        <a
                            href={project.fiverrUrl}
                            target="_blank"
                            rel="noreferrer"
                            className="flex items-center justify-between gap-4 rounded-xl border border-slate-200 bg-white px-5 py-4 text-left text-slate-900 shadow-sm transition hover:shadow-md dark:border-slate-800 dark:bg-slate-900 dark:text-slate-100"
                        >
                            <div className="flex items-center gap-3">
                                <span className="flex h-10 w-10 items-center justify-center rounded-full bg-indigo-600/10 text-indigo-600 dark:bg-indigo-500/15 dark:text-indigo-300">
                                    <svg
                                        xmlns="http://www.w3.org/2000/svg"
                                        viewBox="0 0 24 24"
                                        fill="none"
                                        stroke="currentColor"
                                        strokeWidth={2}
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        className="h-5 w-5"
                                    >
                                        <path d="M4 7h16" />
                                        <path d="M4 12h16" />
                                        <path d="M4 17h10" />
                                    </svg>
                                </span>
                                <div>
                                    <p className="text-sm font-semibold">Hire me on Fiverr</p>
                                    <p className="text-sm text-slate-600 dark:text-slate-300">
                                        {project.fiverrMessage || 'Get this kind of build for your CRM or automation stack.'}
                                    </p>
                                </div>
                            </div>
                            <span className="text-sm font-medium text-indigo-600 dark:text-indigo-300 whitespace-nowrap">View gig</span>
                        </a>
                    </div>
                )}


                {!details && (
                    <p className="mt-8 text-sm text-slate-500 dark:text-slate-400"></p>
                )}
            </section>

            {project.fiverrUrl && (
                <div
                    className={`fixed inset-x-0 bottom-4 z-40 px-4 transition-all duration-300 ${showBanner && !inlineVisible ? 'translate-y-0 opacity-100' : 'translate-y-6 opacity-0 pointer-events-none'
                        }`}
                >
                    <a
                        href={project.fiverrUrl}
                        target="_blank"
                        rel="noreferrer"
                        className="mx-auto flex max-w-3xl items-center justify-between gap-4 rounded-xl border border-emerald-700 bg-emerald-700 px-5 py-4 text-left text-white shadow-lg transition hover:shadow-xl"
                    >
                        <div className="flex items-center gap-3">
                            <span className="flex h-10 w-10 items-center justify-center rounded-full bg-white/15">
                                <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    viewBox="0 0 24 24"
                                    fill="none"
                                    stroke="currentColor"
                                    strokeWidth={2}
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    className="h-5 w-5"
                                >
                                    <path d="M4 7h16" />
                                    <path d="M4 12h16" />
                                    <path d="M4 17h10" />
                                </svg>
                            </span>
                            <div>
                                <p className="text-sm font-semibold">Hire me on Fiverr</p>
                                <p className="text-sm text-white/80">
                                    {project.fiverrMessage || 'Get this kind of build for your CRM or automation stack.'}
                                </p>
                            </div>
                        </div>
                        <span className="text-sm font-medium whitespace-nowrap">View gig</span>
                    </a>
                </div>
            )}
        </>
    )
}

export default ProjectDetails
