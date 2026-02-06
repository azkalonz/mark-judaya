import React from 'react'
import { Link } from 'react-router-dom'
import type { Project } from '../data/projects'

const FeaturedProjectCard: React.FC<{ project: Project }> = ({ project }) => {
    return (
        <Link
            to="/projects"
            className="group relative block overflow-hidden rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 shadow-sm hover:shadow-lg transition-shadow focus:outline-none focus-visible:ring-2 focus-visible:ring-indigo-500/60"
            aria-label={`View featured project: ${project.title}`}
        >
            <div className="absolute inset-0 bg-gradient-to-br from-indigo-500/10 via-transparent to-transparent pointer-events-none" />
            <div className="relative p-6 text-left">
                <div className="flex items-center justify-between">
                    <span className="px-2.5 py-1 rounded-full text-xs font-medium bg-indigo-600/10 text-indigo-700 dark:bg-indigo-500/15 dark:text-indigo-200">
                        Featured
                    </span>
                    <span className="text-xs uppercase tracking-wide text-slate-500 dark:text-slate-400">View all projects</span>
                </div>

                <h3 className="mt-4 text-lg font-semibold text-slate-900 dark:text-slate-100">{project.title}</h3>
                <p className="mt-2 text-sm text-slate-600 dark:text-slate-300 leading-relaxed">{project.description}</p>

                <div className="mt-3 flex flex-wrap gap-2">
                    {project.tags.map((tag) => (
                        <span key={tag} className="text-xs px-2 py-1 rounded-full bg-indigo-50 text-indigo-700 dark:bg-indigo-500/10 dark:text-indigo-200">
                            {tag}
                        </span>
                    ))}
                </div>
            </div>
        </Link>
    )
}

export default FeaturedProjectCard
