import React, { useMemo, useState } from 'react'
import projects from '../data/projects'
import ProjectCard from '../components/ProjectCard'
import Seo from '../components/Seo'

const Projects: React.FC = () => {
    const [activeTag, setActiveTag] = useState('All')
    const tags = useMemo(() => {
        const unique = new Set<string>()
        projects.forEach((project) => project.tags.forEach((tag) => unique.add(tag)))
        return ['All', ...Array.from(unique).sort()]
    }, [])

    const filteredProjects = activeTag === 'All' ? projects : projects.filter((project) => project.tags.includes(activeTag))

    return (
        <>
            <Seo
                title="Projects – Mark Judaya"
                description="A collection of real-world projects focused on CRM systems, automation, and full-stack development. View my work in action."
                ogTitle="Projects – Mark Judaya"
                ogDescription="Real-world CRM, automation, and integration projects showcasing full-stack development."
            />
            <section>
                <h1 className="text-3xl font-semibold">Projects</h1>
                <p className="mt-3 text-slate-600 dark:text-slate-300">A selection of my recent work focused on CRM, automations and integrations.</p>

                <div className="mt-6 flex flex-wrap gap-2">
                    {tags.map((tag) => {
                        const isActive = tag === activeTag
                        return (
                            <button
                                key={tag}
                                onClick={() => setActiveTag(tag)}
                                className={`px-3 py-1 rounded-full text-sm border transition ${isActive
                                        ? 'bg-indigo-600 text-white border-indigo-600'
                                        : 'border-slate-200 dark:border-slate-800 text-slate-700 dark:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-800'
                                    }`}
                            >
                                {tag}
                            </button>
                        )
                    })}
                </div>

                <div className="mt-6 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                    {filteredProjects.map((p) => (
                        <ProjectCard key={p.id} project={p} />
                    ))}
                </div>
            </section>
        </>
    )
}

export default Projects
