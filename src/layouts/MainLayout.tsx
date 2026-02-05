import React from 'react'
import Navbar from '../components/Navbar'
import Footer from '../components/Footer'

const MainLayout: React.FC<{ children: React.ReactNode }> = ({ children }) => {
	return (
		<div className="min-h-screen bg-white dark:bg-slate-900 text-slate-900 dark:text-slate-100 transition-colors duration-300 ease-in-out antialiased">
			<Navbar />
			<main className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-12">{children}</main>
			<Footer />
		</div>
	)
}

export default MainLayout

