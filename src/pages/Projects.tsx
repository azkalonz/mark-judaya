import React from 'react'
import projects from '../data/projects'
import ProjectCard from '../components/ProjectCard'

const Projects: React.FC = () => {
	return (
		<section>
			<h1 className="text-3xl font-semibold">Projects</h1>
			<p className="mt-3 text-slate-600 dark:text-slate-300">A selection of my recent work focused on CRM, automations and integrations.</p>

			<div className="mt-6 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
				{projects.map((p) => (
					<ProjectCard key={p.id} project={p} />
				))}
			</div>
		</section>
	)
}

export default Projects
