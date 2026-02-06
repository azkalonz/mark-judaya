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
			<section className="max-w-2xl">
				<h1 className="text-3xl font-semibold">Contact</h1>
				<p className="mt-3 text-slate-600 dark:text-slate-300">Interested in working together? Send a brief message and I'll reply within 2 business days.</p>
				<div className="mt-5">
					<a href={bookingUrl} target="_blank" rel="noreferrer" className="inline-flex items-center px-5 py-3 rounded-md bg-indigo-600 text-white hover:bg-indigo-700 transition">
						Book a call
					</a>
				</div>

				{status === 'success' ? (
					<div className="mt-6 rounded-md p-4 bg-green-50 dark:bg-green-900/30 text-green-800 dark:text-green-200">Thanks — your message was sent. I’ll get back to you soon.</div>
				) : (
					<form ref={formRef} onSubmit={handleSubmit} className="mt-6 grid grid-cols-1 gap-4" role="form" aria-labelledby="contact-heading">
						<label className="flex flex-col">
							<span className="text-sm font-medium text-slate-700 dark:text-slate-200">Name</span>
							<input name="from_name" required className="mt-1 px-3 py-2 rounded-md border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 text-slate-900 dark:text-slate-100" />
						</label>

						<label className="flex flex-col">
							<span className="text-sm font-medium text-slate-700 dark:text-slate-200">Email</span>
							<input name="reply_to" type="email" required className="mt-1 px-3 py-2 rounded-md border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 text-slate-900 dark:text-slate-100" />
						</label>

						<label className="flex flex-col">
							<span className="text-sm font-medium text-slate-700 dark:text-slate-200">Message</span>
							<textarea name="message" rows={6} required className="mt-1 px-3 py-2 rounded-md border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 text-slate-900 dark:text-slate-100" />
						</label>

						<div className="flex items-center gap-3">
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
			</section>
		</>
	)
}

export default Contact

