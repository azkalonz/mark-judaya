export type Project = {
	id: string
	title: string
	description: string
	stack: string[]
	tags: string[]
	featured: boolean
	featuredPhoto: string
	dateStarted: string
	dateFinished: string
	fiverrUrl?: string
	fiverrMessage?: string
	thumbnail?: string
	links?: {
		repo?: string
		live?: string
	}
}

function makeThumb(title: string, a = '#6366f1', b = '#8b5cf6') {
	const short = title.toUpperCase()
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
		<text x='60' y='190' font-family='Inter, Roboto, sans-serif' font-size='90' fill='white' fill-opacity='0.95' font-weight='700'>${short}</text>
	</svg>`
	return `data:image/svg+xml;utf8,${encodeURIComponent(svg)}`
}

export const projects: Project[] = [
	{
		id: "salesforce-to-zoho-crm-migration",
		title: "Salesforce to Zoho CRM Migration",
		description: "Led a large-scale CRM data migration from Salesforce to Zoho CRM, covering data export, cleaning, transformation, and field mapping. Ensured data integrity by preserving Salesforce record IDs and executed an initial import while Salesforce remained the active system.",
		stack: ["Zoho CRM", "Salesforce", "Data Migration", "CSV", "Deluge"],
		tags: ["CRM Migration", "Data Engineering", "Salesforce", "Zoho"],
		featured: true,
		featuredPhoto: "",
		dateStarted: "October 2025",
		dateFinished: "November 2025",
		fiverrUrl: "https://www.fiverr.com/s/38QqKDr",
		fiverrMessage: "Need a clean CRM migration plan? I can map, validate, and deploy it fast.",
		thumbnail: makeThumb("CRM Data Migration", "#6366f1", "#4338ca")
	}
	,
	{
		id: "zoho-inventory-erp-integration",
		title: "Zoho Inventory ERP Integration",
		description: "Built a custom integration to automatically push sales orders from Zoho Inventory to a third-party ERP system, eliminating manual data entry and improving order processing accuracy and speed.",
		stack: ["Zoho Deluge", "n8n", "Postman"],
		tags: ['CRM', 'Zoho', 'ERP', 'Automation'],
		featured: true,
		featuredPhoto: "",
		dateStarted: "2023-05",
		dateFinished: "2023-06",
		fiverrUrl: "https://www.fiverr.com/s/wk6N268",
		fiverrMessage: "Automate Zoho Inventory to ERP syncs with validation and retries built-in.",
		thumbnail: ""
	},
	{
		id: 'integration-platform',
		title: 'Integration Platform — Payment & CRM',
		description:
			'Built integrations connecting payment gateway events to CRM records and revenue reports with idempotent processing and observability.',
		stack: ['Node', 'Kafka', 'Stripe', 'Observability'],
		tags: ['Integration', 'Payments', 'CRM', 'Data'],
		featured: false,
		featuredPhoto: makeThumb('Payment CRM Platform', '#f97316', '#fb7185'),
		dateStarted: "2022-10",
		dateFinished: "2023-01",
		fiverrUrl: "",
		fiverrMessage: "",
		thumbnail: makeThumb('Integration Platform', '#f97316', '#ef4444')
	}
]

export default projects

