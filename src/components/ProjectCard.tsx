import React from 'react'
import { useNavigate } from 'react-router-dom'
import type { Project } from '../data/projects'

const ProjectCard: React.FC<{ project: Project }> = ({ project }) => {
	const navigate = useNavigate()
	const tagSummary = project.tags.join(' / ')

	return (
		<article
			className="group relative rounded-lg border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 hover:shadow-lg hover:-translate-y-1 transform-gpu transition-all duration-200 overflow-hidden cursor-pointer focus-within:ring-2 focus-within:ring-indigo-500/50"
			role="link"
			tabIndex={0}
			onClick={() => navigate(`/projects/${project.id}`)}
			onKeyDown={(event) => {
				if (event.key === 'Enter' || event.key === ' ') {
					event.preventDefault()
					navigate(`/projects/${project.id}`)
				}
			}}
		>
			<div className="p-5">
				<h3 className="text-lg font-semibold text-slate-900 dark:text-slate-100">{project.title}</h3>
				<p className="mt-2 text-sm text-slate-600 dark:text-slate-300 leading-relaxed clamp-3 min-h-[4.5rem]">{project.description}</p>

				<div className="mt-4 flex flex-wrap gap-2">
					{project.stack.map((s) => (
						<span key={s} className="text-xs px-2 py-1 rounded-full bg-slate-100 dark:bg-slate-800 text-slate-800 dark:text-slate-200">{s}</span>
					))}
				</div>

				<div className="mt-4 flex items-center justify-between">
					<div className="text-sm text-slate-500 dark:text-slate-400">{tagSummary}</div>
					<div className="flex gap-3 items-center">
						{project.links?.live && (
							<a
								href={project.links.live}
								onClick={(event) => event.stopPropagation()}
								target="_blank"
								rel="noreferrer"
								className="text-slate-600 dark:text-slate-300 hover:text-indigo-600 transition-colors"
							>
								Live
							</a>
						)}
						{project.links?.repo && (
							<a
								href={project.links.repo}
								onClick={(event) => event.stopPropagation()}
								target="_blank"
								rel="noreferrer"
								className="text-slate-600 dark:text-slate-300 hover:text-indigo-600 transition-colors"
							>
								Code
							</a>
						)}
					</div>
				</div>
			</div>
		</article>
	)
}

export default ProjectCard
