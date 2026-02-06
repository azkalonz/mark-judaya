import React from 'react'

const Footer: React.FC = () => {
	return (
		<footer className="mt-12 border-t border-slate-200 dark:border-slate-800">
			<div className="max-w-6xl mx-auto px-4 sm:px-6 py-8 text-sm text-slate-600 dark:text-slate-400 flex items-center justify-between">
				<div>© {new Date().getFullYear()} Mark Judaya</div>
				<div className="hidden sm:flex items-center gap-6">
					<a href="https://calendar.app.google/MtqQgN54P647GRcx7" target="_blank" rel="noreferrer" className="text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white transition">
						Book now
					</a>
					<span>Built with TypeScript, React, Vite & Tailwind</span>
				</div>
			</div>
		</footer>
	)
}

export default Footer

