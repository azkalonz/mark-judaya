import React from 'react'
import Seo from '../components/Seo'

const bookingUrl = 'https://calendar.app.google/MtqQgN54P647GRcx7'

const Contact: React.FC = () => {
	return (
		<>
			<Seo
				title="Contact – Mark Judaya"
				description="Get in touch with Mark Judaya. Send a message about your project or automation needs."
				ogTitle="Contact – Mark Judaya"
				ogDescription="Reach out to discuss your CRM and automation needs."
			/>
			<section className="max-w-5xl">
				<div className="grid gap-8 lg:grid-cols-[1.1fr_0.9fr]">
					<div>
						<h1 className="text-3xl font-semibold">Contact</h1>
						<p className="mt-3 text-slate-600 dark:text-slate-300">Interested in working together? Send a brief message and I'll reply within 2 business days.</p>
						<div className="mt-5">
							<a href={bookingUrl} target="_blank" rel="noreferrer" className="inline-flex items-center px-5 py-3 rounded-md bg-indigo-600 text-white hover:bg-indigo-700 transition">
								Book a call
							</a>
						</div>
					</div>

					<aside className="rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 p-5 shadow-sm">
						<h2 className="text-sm font-semibold text-slate-900 dark:text-slate-100">Connect</h2>
						<p className="mt-2 text-sm text-slate-600 dark:text-slate-300">Prefer social? Reach out on these platforms.</p>
						<div className="mt-4 space-y-3">
							<a href="https://github.com/azkalonz" target="_blank" rel="noreferrer" className="flex items-center justify-between rounded-lg border border-slate-200 dark:border-slate-800 px-3 py-2 text-sm text-slate-700 dark:text-slate-200 hover:border-indigo-400/60 hover:text-indigo-600 transition">
								<span className="inline-flex items-center gap-2">
									<svg aria-hidden="true" viewBox="0 0 24 24" className="h-4 w-4" fill="currentColor">
										<path d="M12 2a10 10 0 0 0-3.16 19.48c.5.1.68-.22.68-.48v-1.68c-2.78.6-3.36-1.18-3.36-1.18-.46-1.16-1.12-1.46-1.12-1.46-.9-.62.08-.6.08-.6 1 .08 1.52 1.02 1.52 1.02.88 1.54 2.32 1.1 2.88.84.08-.66.34-1.1.62-1.36-2.22-.26-4.56-1.12-4.56-5a3.9 3.9 0 0 1 1.04-2.7 3.6 3.6 0 0 1 .1-2.66s.84-.26 2.76 1.02a9.4 9.4 0 0 1 5.04 0c1.92-1.28 2.76-1.02 2.76-1.02.38.92.22 1.94.1 2.66a3.9 3.9 0 0 1 1.04 2.7c0 3.9-2.34 4.74-4.58 5 .36.3.66.9.66 1.82v2.68c0 .28.18.6.68.5A10 10 0 0 0 12 2z" />
									</svg>
									GitHub
								</span>
								<span className="text-slate-400">/azkalonz</span>
							</a>
							<a href="https://www.linkedin.com/in/markjudaya/" target="_blank" rel="noreferrer" className="flex items-center justify-between rounded-lg border border-slate-200 dark:border-slate-800 px-3 py-2 text-sm text-slate-700 dark:text-slate-200 hover:border-indigo-400/60 hover:text-indigo-600 transition">
								<span className="inline-flex items-center gap-2">
									<svg aria-hidden="true" viewBox="0 0 24 24" className="h-4 w-4" fill="currentColor">
										<path d="M4.98 3.5a2.5 2.5 0 1 1 0 5 2.5 2.5 0 0 1 0-5zM3 9h4v12H3zM14.5 9c-2 0-3.5 1.1-4 2v-2H7.5v12h3.5v-6.2c0-1.6.3-3.2 2.3-3.2 2 0 2 1.9 2 3.3V21H19v-6.8c0-3.4-.7-5.2-4.5-5.2z" />
									</svg>
									LinkedIn
								</span>
								<span className="text-slate-400">/markjudaya</span>
							</a>
							<a href="https://www.fiverr.com/markjudaya" target="_blank" rel="noreferrer" className="flex items-center justify-between rounded-lg border border-slate-200 dark:border-slate-800 px-3 py-2 text-sm text-slate-700 dark:text-slate-200 hover:border-indigo-400/60 hover:text-indigo-600 transition">
								<span className="inline-flex items-center gap-2">
									<svg aria-hidden="true" viewBox="0 0 24 24" className="h-4 w-4" fill="currentColor">
										<path d="M7 4a3 3 0 0 1 3-3h4v3h-4v2h4v3h-4v10h-3V9H5V6h2V4z" />
									</svg>
									Fiverr
								</span>
								<span className="text-slate-400">/markjudaya</span>
							</a>
						</div>
					</aside>
				</div>
			</section>
		</>
	)
}

export default Contact
