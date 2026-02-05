import React from 'react'
import useTheme from '../hooks/useTheme'

const ThemeToggle: React.FC = () => {
	const { isDark, toggle } = useTheme()

	return (
		<button
			onClick={toggle}
			aria-label="Toggle color theme"
			aria-pressed={isDark}
			className="flex items-center justify-center w-10 h-10 rounded-md border border-transparent hover:border-slate-200 dark:hover:border-slate-700 transition-colors duration-150 focus:outline-none focus:ring-2 focus:ring-indigo-400/30"
		>
			{isDark ? (
				<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5">
					<path d="M21.752 15.002A9 9 0 1 1 12.998 2.248 7 7 0 0 0 21.752 15z" />
				</svg>
			) : (
				<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="w-5 h-5">
					<path strokeLinecap="round" strokeLinejoin="round" d="M12 3v2m0 14v2m9-9h-2M5 12H3m15.364-6.364-1.414 1.414M7.05 17.95l-1.414 1.414M17.95 17.95l1.414 1.414M7.05 6.05L5.636 4.636" />
					<circle cx="12" cy="12" r="3" strokeLinecap="round" strokeLinejoin="round" />
				</svg>
			)}
		</button>
	)
}

export default ThemeToggle

