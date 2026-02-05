import React from 'react'
import { Link } from 'react-router-dom'

const skills = ['React', 'TypeScript', 'Node', 'CRM', 'Automation', 'Tailwind']

const Home: React.FC = () => {
	return (
		<section className="py-12">
			<div className="max-w-4xl mx-auto text-center px-4">
				<p className="text-sm text-indigo-600 dark:text-indigo-400 font-medium">Full-Stack Developer</p>
				<h1 className="mt-4 text-5xl sm:text-6xl font-extrabold tracking-tight bg-clip-text text-transparent bg-gradient-to-r from-slate-900 to-indigo-600 dark:from-slate-100 dark:to-indigo-400">
					Mark Judaya
				</h1>
				<p className="mt-3 text-xl text-slate-700 dark:text-slate-300">Full-Stack Developer · CRM & Automation Specialist</p>

				<p className="mt-6 text-lg text-slate-600 dark:text-slate-400 max-w-2xl mx-auto">I help teams ship polished web apps and automate CRM workflows that scale — integrations, pipelines, and reliable engineering.</p>

				<div className="mt-8 flex items-center justify-center gap-4">
					<Link to="/projects" className="inline-flex items-center gap-2 px-5 py-3 rounded-md bg-indigo-600 text-white hover:bg-indigo-700 transition-shadow shadow-sm">View Projects</Link>
					<Link to="/contact" className="inline-flex items-center gap-2 px-5 py-3 rounded-md border border-slate-200 dark:border-slate-800 text-slate-700 dark:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-800 transition">Contact Me</Link>
				</div>

				<div className="mt-10">
					<h3 className="text-sm uppercase tracking-wide text-slate-500">Skills</h3>
					<div className="mt-3 flex flex-wrap justify-center gap-2">
						{skills.map((s) => (
							<span key={s} className="px-3 py-1 rounded-full text-sm bg-slate-100 dark:bg-slate-800 text-slate-800 dark:text-slate-200">{s}</span>
						))}
					</div>
				</div>

				<div className="mt-12">
					<h3 className="text-lg font-medium">Featured work</h3>
					<div className="mt-4 grid grid-cols-1 sm:grid-cols-2 gap-4">
						<article className="p-4 rounded-lg border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 shadow-sm hover:shadow-md transition-shadow">
							<h4 className="font-semibold">CRM Integration — Enterprise</h4>
							<p className="mt-2 text-sm text-slate-600 dark:text-slate-300">Built a robust integration syncing leads and automations across platforms.</p>
						</article>
						<article className="p-4 rounded-lg border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 shadow-sm hover:shadow-md transition-shadow">
							<h4 className="font-semibold">Automation Pipeline</h4>
							<p className="mt-2 text-sm text-slate-600 dark:text-slate-300">Automated onboarding workflows that reduced manual work by 70%.</p>
						</article>
					</div>
				</div>
			</div>
		</section>
	)
}

export default Home
