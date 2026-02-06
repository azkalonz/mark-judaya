import React, { useEffect, useRef, useState } from 'react'
import ThemeToggle from './ThemeToggle'

const links = [
	{ href: '/', label: 'Home' },
	{ href: '/about', label: 'About' },
	{ href: '/projects', label: 'Projects' },
	{ href: '/contact', label: 'Contact' },
]

const bookingUrl = 'https://calendar.app.google/MtqQgN54P647GRcx7'

const Navbar: React.FC = () => {
	const [open, setOpen] = useState(false)
	const panelRef = useRef<HTMLDivElement | null>(null)
	const btnRef = useRef<HTMLButtonElement | null>(null)

	useEffect(() => {
		function onKey(e: KeyboardEvent) {
			if (e.key === 'Escape') setOpen(false)
		}
		document.addEventListener('keydown', onKey)
		return () => document.removeEventListener('keydown', onKey)
	}, [])

	useEffect(() => {
		function onClick(e: MouseEvent) {
			if (!open) return
			const target = e.target as Node
			if (panelRef.current && !panelRef.current.contains(target) && btnRef.current && !btnRef.current.contains(target)) {
				setOpen(false)
			}
		}
		document.addEventListener('click', onClick)
		return () => document.removeEventListener('click', onClick)
	}, [open])

	return (
		<header className="sticky top-0 z-40 backdrop-blur bg-white/60 dark:bg-slate-900/60 border-b border-slate-200 dark:border-slate-800 transition-colors">
			<div className="max-w-6xl mx-auto px-4 sm:px-6 py-3 flex items-center justify-between">
				<a href="/" className="flex items-center gap-3 text-slate-900 dark:text-slate-100">
					<div className="w-9 h-9 rounded-lg bg-gradient-to-br from-indigo-500 to-purple-500 flex items-center justify-center text-white font-semibold">MJ</div>
					<div className="hidden sm:block">
						<div className="text-lg font-semibold leading-tight">Mark Judaya</div>
						<div className="text-xs text-slate-600 dark:text-slate-400">Full‑stack & CRM integrations</div>
					</div>
				</a>

				<nav className="hidden md:flex items-center gap-6">
					<div className="flex items-center gap-4">
						{links.map((l) => (
							<a key={l.href} href={l.href} className="text-sm text-slate-700 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white transition-colors duration-150">
								{l.label}
							</a>
						))}
					</div>
					<a
						href={bookingUrl}
						target="_blank"
						rel="noreferrer"
						className="inline-flex items-center gap-2 px-4 py-2 rounded-md bg-indigo-600 text-white text-sm hover:bg-indigo-700 transition"
					>
						Book now
					</a>
					<ThemeToggle />
				</nav>

				<div className="flex md:hidden items-center gap-3">
					<ThemeToggle />
					<button
						ref={btnRef}
						aria-expanded={open}
						aria-controls="mobile-menu"
						onClick={() => setOpen((v) => !v)}
						aria-label={open ? 'Close menu' : 'Open menu'}
						className="p-2 rounded-md text-slate-700 dark:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors duration-150 focus:outline-none focus:ring-2 focus:ring-indigo-400/40"
					>
						{open ? (
							<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" className="w-5 h-5">
								<path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
							</svg>
						) : (
							<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" className="w-5 h-5">
								<path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
							</svg>
						)}
					</button>
				</div>
			</div>

			{/* Mobile menu panel */}
			<div ref={panelRef} id="mobile-menu" className={`md:hidden ${open ? 'block' : 'hidden'} border-b border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900`}>
				<div className="max-w-6xl mx-auto px-4 sm:px-6 py-4">
					<nav className="flex flex-col gap-3">
						{links.map((l) => (
							<a key={l.href} href={l.href} onClick={() => setOpen(false)} className="py-2 px-3 rounded-md text-slate-700 dark:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors">
								{l.label}
							</a>
						))}
						<a
							href={bookingUrl}
							target="_blank"
							rel="noreferrer"
							onClick={() => setOpen(false)}
							className="py-2 px-3 rounded-md bg-indigo-600 text-white hover:bg-indigo-700 transition"
						>
							Book now
						</a>
					</nav>
				</div>
			</div>
		</header>
	)
}

export default Navbar

