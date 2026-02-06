import React from 'react'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import MainLayout from './layouts/MainLayout'
import ScrollToTop from './components/ScrollToTop'
import Home from './pages/Home'
import About from './pages/About'
import Projects from './pages/Projects'
import ProjectDetails from './pages/ProjectDetails'
import Contact from './pages/Contact'

const App: React.FC = () => {
	return (
		<BrowserRouter>
			<ScrollToTop />
			<MainLayout>
				<Routes>
					<Route path="/" element={<Home />} />
					<Route path="/about" element={<About />} />
					<Route path="/projects" element={<Projects />} />
					<Route path="/projects/:id" element={<ProjectDetails />} />
					<Route path="/contact" element={<Contact />} />
				</Routes>
			</MainLayout>
		</BrowserRouter>
	)
}

export default App
