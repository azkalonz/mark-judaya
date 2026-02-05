import React from 'react'

const About: React.FC = () => {
	return (
		<section className="prose prose-slate dark:prose-invert max-w-3xl">
			<h1 className="text-3xl font-semibold">What I do</h1>

			<p className="mt-2 text-slate-700 dark:text-slate-300">
				I specialize in building resilient web applications and reliable CRM systems, with a focus on
				automations and integrations that remove manual work and surface actionable data.
			</p>

			<h2 className="mt-6 text-xl font-medium">Who I work with</h2>
			<p className="text-slate-600 dark:text-slate-400">Growth-stage SaaS and mid-market teams that need dependable automation and clean data flow between tools.</p>

			<h2 className="mt-6 text-xl font-medium">Problems I solve</h2>
			<ul className="list-disc ml-5 mt-2 text-slate-600 dark:text-slate-400">
				<li>Unreliable CRM data and manual lead routing</li>
				<li>Slow, error-prone onboarding and revenue processes</li>
				<li>Fragile integrations that are hard to observe or retry</li>
			</ul>

			<h2 className="mt-6 text-xl font-medium">How I deliver impact</h2>
			<p className="text-slate-600 dark:text-slate-400">Through pragmatic engineering: clear data contracts, idempotent integrations, observability, and documentation so teams can move faster with confidence.</p>

			<h2 className="mt-6 text-xl font-medium">Tools & strengths</h2>
			<div className="mt-2 flex flex-wrap gap-2">
				<span className="px-3 py-1 rounded-full bg-slate-100 dark:bg-slate-800 text-sm">React</span>
				<span className="px-3 py-1 rounded-full bg-slate-100 dark:bg-slate-800 text-sm">TypeScript</span>
				<span className="px-3 py-1 rounded-full bg-slate-100 dark:bg-slate-800 text-sm">Node</span>
				<span className="px-3 py-1 rounded-full bg-slate-100 dark:bg-slate-800 text-sm">Zoho / Deluge</span>
				<span className="px-3 py-1 rounded-full bg-slate-100 dark:bg-slate-800 text-sm">Salesforce</span>
				<span className="px-3 py-1 rounded-full bg-slate-100 dark:bg-slate-800 text-sm">Serverless / AWS</span>
				<span className="px-3 py-1 rounded-full bg-slate-100 dark:bg-slate-800 text-sm">Observability</span>
			</div>

			<h2 className="mt-6 text-xl font-medium">Experience & outcomes</h2>
			<p className="text-slate-600 dark:text-slate-400">5+ years delivering integrations and automation across SaaS and professional services — projects have reduced manual touch by {'>'}50% and accelerated lead-to-revenue timeframes.</p>

			<div className="mt-8">
				<a href="/contact" className="inline-block px-5 py-3 rounded-md bg-indigo-600 text-white hover:bg-indigo-700 transition">Let's talk — Contact me</a>
			</div>
		</section>
	)
}

export default About
