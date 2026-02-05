import { useCallback, useEffect, useState } from 'react'

type Theme = 'light' | 'dark'

const THEME_KEY = 'theme'

export default function useTheme() {
	const [theme, setTheme] = useState<Theme>(() => {
		if (typeof window === 'undefined') return 'light'
		const stored = localStorage.getItem(THEME_KEY) as Theme | null
		if (stored) return stored
		return window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light'
	})

	useEffect(() => {
		const root = window.document.documentElement
		if (theme === 'dark') {
			root.classList.add('dark')
			localStorage.setItem(THEME_KEY, 'dark')
		} else {
			root.classList.remove('dark')
			localStorage.setItem(THEME_KEY, 'light')
		}
	}, [theme])

	useEffect(() => {
		const mq = window.matchMedia('(prefers-color-scheme: dark)')
		const handle = (e: MediaQueryListEvent | MediaQueryList) => {
			// only update when user hasn't explicitly chosen a theme
			if (!localStorage.getItem(THEME_KEY)) {
				const matches = 'matches' in e ? e.matches : (e as MediaQueryList).matches
				setTheme(matches ? 'dark' : 'light')
			}
		}

		if (mq.addEventListener) mq.addEventListener('change', handle as any)
		else mq.addListener(handle as any)

		return () => {
			if (mq.removeEventListener) mq.removeEventListener('change', handle as any)
			else mq.removeListener(handle as any)
		}
	}, [])

	const toggle = useCallback(() => setTheme((t) => (t === 'dark' ? 'light' : 'dark')), [])

	return { theme, setTheme, toggle, isDark: theme === 'dark' }
}

