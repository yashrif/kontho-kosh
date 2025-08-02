import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { FEATURES } from '@/constants/landing'

const FeaturesSection = () => {
	return (
		<section className="py-24 bg-background">
			<div className="mx-auto max-w-7xl px-6 lg:px-8">
				<div className="mx-auto max-w-3xl text-center">
					<h2 className="text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
						Key Features
					</h2>
					<p className="mt-4 text-lg text-muted-foreground">
						Advanced technology stack ensuring maximum protection for your original content
					</p>
				</div>

				<div className="mt-16 grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3">
					{FEATURES.map((feature, index) => (
						<Card key={index} className="relative overflow-hidden hover:shadow-lg transition-all duration-300 border-l-4 border-l-primary/20 hover:border-l-primary group">
							<CardHeader className="pb-4">
								<div className="flex items-center gap-3">
									<div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary/10 group-hover:bg-primary/20 transition-colors duration-200">
										<feature.icon className="h-5 w-5 text-primary" />
									</div>
									<CardTitle className="text-lg">
										{feature.title}
									</CardTitle>
								</div>
							</CardHeader>
							<CardContent>
								<CardDescription className="text-sm leading-relaxed text-muted-foreground">
									{feature.description}
								</CardDescription>
							</CardContent>

							{/* Subtle gradient overlay on hover */}
							<div className="absolute inset-0 bg-gradient-to-br from-primary/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none" />
						</Card>
					))}
				</div>
			</div>
		</section>
	)
}

export default FeaturesSection
