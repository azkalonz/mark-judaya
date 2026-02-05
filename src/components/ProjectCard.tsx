import React from 'react'
import type { Project } from '../data/projects'

const ProjectCard: React.FC<{ project: Project }> = ({ project }) => {
	return (
		<article className="group relative rounded-lg border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 hover:shadow-lg hover:-translate-y-1 transform-gpu transition-all duration-200 overflow-hidden">
			<div className="relative h-40 sm:h-48 w-full bg-gradient-to-br from-slate-100 to-white dark:from-slate-800 dark:to-slate-900">
				{project.thumbnail ? (
					<img src={project.thumbnail} alt={project.title} className="w-full h-full object-cover" />
				) : (
					<div className="w-full h-full" />
				)}
				<div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent pointer-events-none" />
			</div>

			<div className="p-5">
				<h3 className="text-lg font-semibold text-slate-900 dark:text-slate-100">{project.title}</h3>
				<p className="mt-2 text-sm text-slate-600 dark:text-slate-300 leading-relaxed">{project.description}</p>

				<div className="mt-4 flex flex-wrap gap-2">
					{project.stack.map((s) => (
						<span key={s} className="text-xs px-2 py-1 rounded-full bg-slate-100 dark:bg-slate-800 text-slate-800 dark:text-slate-200">{s}</span>
					))}
				</div>

				<div className="mt-4 flex items-center justify-between">
					<div className="text-sm text-slate-500 dark:text-slate-400">CRM / Integrations</div>
					<div className="flex gap-3 items-center">
						{project.links?.live && (
							<a href={project.links.live} target="_blank" rel="noreferrer" className="text-slate-600 dark:text-slate-300 hover:text-indigo-600 transition-colors">Live</a>
						)}
						{project.links?.repo && (
							<a href={project.links.repo} target="_blank" rel="noreferrer" className="text-slate-600 dark:text-slate-300 hover:text-indigo-600 transition-colors">Code</a>
						)}
					</div>
				</div>
			</div>
		</article>
	)
}

export default ProjectCard
