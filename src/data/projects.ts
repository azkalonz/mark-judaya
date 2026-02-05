export type Project = {
	id: string
	title: string
	description: string
	stack: string[]
	thumbnail?: string
	links?: {
		repo?: string
		live?: string
	}
}

function makeThumb(title: string, a = '#6366f1', b = '#8b5cf6') {
	const short = title.split(' ').slice(0, 2).map((s) => s[0]).join('').toUpperCase()
	const svg = `
	<svg xmlns='http://www.w3.org/2000/svg' width='1200' height='800' viewBox='0 0 1200 800'>
		<defs>
			<linearGradient id='g' x1='0' x2='1'>
				<stop stop-color='${a}' offset='0'/>
				<stop stop-color='${b}' offset='1'/>
			</linearGradient>
		</defs>
		<rect width='100%' height='100%' fill='url(#g)' />
		<g fill='rgba(255,255,255,0.12)'>
			<rect x='40' y='40' width='400' height='200' rx='12'/>
			<rect x='480' y='200' width='600' height='120' rx='8'/>
		</g>
		<text x='60' y='190' font-family='Inter, Roboto, sans-serif' font-size='140' fill='white' fill-opacity='0.95' font-weight='700'>${short}</text>
	</svg>`
	return `data:image/svg+xml;utf8,${encodeURIComponent(svg)}`
}

export const projects: Project[] = [
	{
		id: 'zoho-migration-acme',
		title: 'Zoho CRM Migration — Acme Co',
		description:
			'Led a full migration from legacy CRM to Zoho CRM for a mid-market SaaS company — data mapping, custom modules, and process automations.',
		stack: ['Zoho CRM', 'Deluge', 'APIs', 'TypeScript'],
		thumbnail: makeThumb('Zoho CRM Migration', '#0ea5e9', '#6366f1')
	},
	{
		id: 'salesforce-sync',
		title: 'Salesforce ↔️ Custom ERP Sync',
		description:
			'Built a real-time integration syncing contacts, opportunities and billing between Salesforce and a bespoke ERP using serverless webhooks.',
		stack: ['Salesforce', 'AWS Lambda', 'Webhook', 'Node'],
		thumbnail: makeThumb('Salesforce Sync', '#06b6d4', '#06b6d4')
	},
	{
		id: 'onboarding-automation',
		title: 'Automated Client Onboarding',
		description:
			'Designed end-to-end onboarding automations that reduced manual tasks by 70%—email flows, task creation, and SLA tracking.',
		stack: ['CRM Workflows', 'Zapier', 'Serverless', 'Postgres'],
		thumbnail: makeThumb('Onboarding Automation', '#10b981', '#059669')
	},
	{
		id: 'integration-platform',
		title: 'Integration Platform — Payment & CRM',
		description:
			'Built integrations connecting payment gateway events to CRM records and revenue reports with idempotent processing and observability.',
		stack: ['Node', 'Kafka', 'Stripe', 'Observability'],
		thumbnail: makeThumb('Integration Platform', '#f97316', '#ef4444')
	}
]

export default projects

