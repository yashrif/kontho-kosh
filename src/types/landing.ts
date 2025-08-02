export type FeatureItem = {
	icon: React.ComponentType<{ className?: string }>
	title: string
	description: string
}

export type HowItWorksStep = {
	step: number
	icon: React.ComponentType<{ className?: string }>
	title: string
	description: string
}

export type UseCaseItem = {
	icon: React.ComponentType<{ className?: string }>
	title: string
	description: string
}

export type RoadmapItem = {
	title: string
	description: string
	status: 'completed' | 'in-progress' | 'upcoming'
}
