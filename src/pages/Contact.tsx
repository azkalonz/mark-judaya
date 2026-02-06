import React, { useRef, useState } from 'react'
import emailjs from '@emailjs/browser'
import Seo from '../components/Seo'

// Environment variables (set these in .env as VITE_EMAILJS_SERVICE_ID, VITE_EMAILJS_TEMPLATE_ID, VITE_EMAILJS_PUBLIC_KEY)
const SERVICE_ID = 'service_st7w3lj';
const TEMPLATE_ID = 'template_wuyaxsj';
const PUBLIC_KEY = '5ZJnS_bUZBcFvG7Yv';
const bookingUrl = 'https://calendar.app.google/MtqQgN54P647GRcx7'

const Contact: React.FC = () => {
	const [status, setStatus] = useState<'idle' | 'sending' | 'success' | 'error'>('idle')
	const formRef = useRef<HTMLFormElement | null>(null)

	const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
		e.preventDefault()
		if (!formRef.current) return
		setStatus('sending')

		if (!SERVICE_ID || !TEMPLATE_ID || !PUBLIC_KEY) {
			// No configuration: fallback to mailto
			setStatus('error')
			window.location.href = `mailto:markjosephjudaya@gmail.com?subject=${encodeURIComponent('Contact from portfolio')}`
			return
		}

		try {
			const form = formRef.current
			const formData = new FormData(form)
			const templateParams = Object.fromEntries(formData.entries())
			// Ensure recipient in template params (EmailJS template should be configured to accept this)
			templateParams.to_email = 'markjosephjudaya@gmail.com'

			await emailjs.send(SERVICE_ID, TEMPLATE_ID, templateParams as Record<string, any>, PUBLIC_KEY)
			setStatus('success')
			form.reset()
		} catch (err) {
			setStatus('error')
		}
	}

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

						{status === 'success' ? (
							<div className="mt-6 rounded-md border border-green-200 bg-green-50 p-4 text-green-800 dark:border-green-800/40 dark:bg-green-900/30 dark:text-green-200">Thanks — your message was sent. I’ll get back to you soon.</div>
						) : (
							<form ref={formRef} onSubmit={handleSubmit} className="mt-6 grid grid-cols-1 gap-4 rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 p-5 shadow-sm" role="form" aria-labelledby="contact-heading">
								<div className="grid gap-4 sm:grid-cols-2">
									<label className="flex flex-col">
										<span className="text-sm font-medium text-slate-700 dark:text-slate-200">Name</span>
										<input name="from_name" required placeholder="Your name" className="mt-2 px-3 py-2 rounded-md border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-950 text-slate-900 dark:text-slate-100 focus:outline-none focus:ring-2 focus:ring-indigo-500/30" />
									</label>

									<label className="flex flex-col">
										<span className="text-sm font-medium text-slate-700 dark:text-slate-200">Email</span>
										<input name="reply_to" type="email" required placeholder="you@company.com" className="mt-2 px-3 py-2 rounded-md border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-950 text-slate-900 dark:text-slate-100 focus:outline-none focus:ring-2 focus:ring-indigo-500/30" />
									</label>
								</div>

								<label className="flex flex-col">
									<span className="text-sm font-medium text-slate-700 dark:text-slate-200">Message</span>
									<textarea name="message" rows={6} required placeholder="Tell me about your CRM or automation needs" className="mt-2 px-3 py-2 rounded-md border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-950 text-slate-900 dark:text-slate-100 focus:outline-none focus:ring-2 focus:ring-indigo-500/30" />
								</label>

								<div className="flex flex-wrap items-center gap-3">
									<button
										type="submit"
										disabled={status === 'sending'}
										className="inline-flex items-center px-5 py-3 rounded-md bg-indigo-600 text-white hover:bg-indigo-700 transition"
									>
										{status === 'sending' ? 'Sending…' : 'Send message'}
									</button>
									<a href="mailto:markjosephjudaya@gmail.com" className="text-sm text-slate-600 dark:text-slate-300">Or email: markjosephjudaya@gmail.com</a>
								</div>

								{status === 'error' && (
									<div className="text-sm text-red-600 dark:text-red-300">Failed to send — you can email directly at markjosephjudaya@gmail.com</div>
								)}
							</form>
						)}
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

