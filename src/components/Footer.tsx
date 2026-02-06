import React from 'react'

const Footer: React.FC = () => {
	return (
		<footer className="mt-12 border-t border-slate-200 dark:border-slate-800">
			<div className="max-w-6xl mx-auto px-4 sm:px-6 py-8 text-sm text-slate-600 dark:text-slate-400 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
				<div>© {new Date().getFullYear()} Mark Judaya</div>
				<div className="flex flex-wrap items-center gap-4 sm:gap-6">

					<a href="https://github.com/azkalonz" target="_blank" rel="noreferrer" className="inline-flex items-center gap-2 text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white transition">
						<svg aria-hidden="true" viewBox="0 0 24 24" className="h-4 w-4" fill="currentColor">
							<path d="M12 2a10 10 0 0 0-3.16 19.48c.5.1.68-.22.68-.48v-1.68c-2.78.6-3.36-1.18-3.36-1.18-.46-1.16-1.12-1.46-1.12-1.46-.9-.62.08-.6.08-.6 1 .08 1.52 1.02 1.52 1.02.88 1.54 2.32 1.1 2.88.84.08-.66.34-1.1.62-1.36-2.22-.26-4.56-1.12-4.56-5a3.9 3.9 0 0 1 1.04-2.7 3.6 3.6 0 0 1 .1-2.66s.84-.26 2.76 1.02a9.4 9.4 0 0 1 5.04 0c1.92-1.28 2.76-1.02 2.76-1.02.38.92.22 1.94.1 2.66a3.9 3.9 0 0 1 1.04 2.7c0 3.9-2.34 4.74-4.58 5 .36.3.66.9.66 1.82v2.68c0 .28.18.6.68.5A10 10 0 0 0 12 2z" />
						</svg>
						GitHub
					</a>
					<a href="https://www.linkedin.com/in/markjudaya/" target="_blank" rel="noreferrer" className="inline-flex items-center gap-2 text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white transition">
						<svg aria-hidden="true" viewBox="0 0 24 24" className="h-4 w-4" fill="currentColor">
							<path d="M4.98 3.5a2.5 2.5 0 1 1 0 5 2.5 2.5 0 0 1 0-5zM3 9h4v12H3zM14.5 9c-2 0-3.5 1.1-4 2v-2H7.5v12h3.5v-6.2c0-1.6.3-3.2 2.3-3.2 2 0 2 1.9 2 3.3V21H19v-6.8c0-3.4-.7-5.2-4.5-5.2z" />
						</svg>
						LinkedIn
					</a>
					<a href="https://www.fiverr.com/markjudaya" target="_blank" rel="noreferrer" className="inline-flex items-center gap-2 text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white transition">
						<svg aria-hidden="true" viewBox="0 0 24 24" className="h-4 w-4" fill="currentColor">
							<path d="M7 4a3 3 0 0 1 3-3h4v3h-4v2h4v3h-4v10h-3V9H5V6h2V4z" />
						</svg>
						Fiverr
					</a>
				</div>
			</div>
		</footer>
	)
}

export default Footer

