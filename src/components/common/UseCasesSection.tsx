import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { USE_CASES } from '@/constants/landing'

const UseCasesSection = () => {
	return (
		<section className="py-24 bg-background">
			<div className="mx-auto max-w-7xl px-6 lg:px-8">
				<div className="mx-auto max-w-3xl text-center">
					<h2 className="text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
						Who Benefits from Konthokosh?
					</h2>
					<p className="mt-4 text-lg text-muted-foreground">
						Protecting creators across industries with tailored solutions for every type of content
					</p>
				</div>

				<div className="mt-16 grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-4">
					{USE_CASES.map((useCase, index) => (
						<Card key={index} className="relative group hover:shadow-xl transition-all duration-300 border-t-4 border-t-primary/20 hover:border-t-primary overflow-hidden">
							<CardHeader className="text-center pb-4">
								<div className="flex justify-center mb-4">
									<div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-gradient-to-br from-primary/10 to-primary/20 group-hover:from-primary/20 group-hover:to-primary/30 transition-all duration-300 group-hover:scale-110">
										<useCase.icon className="h-7 w-7 text-primary" />
									</div>
								</div>
								<CardTitle className="text-xl font-bold group-hover:text-primary transition-colors duration-200">
									{useCase.title}
								</CardTitle>
							</CardHeader>
							<CardContent className="text-center pt-0">
								<CardDescription className="text-sm leading-relaxed">
									{useCase.description}
								</CardDescription>
							</CardContent>

							{/* Animated background gradient */}
							<div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-transparent to-secondary/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />

							{/* Bottom accent line */}
							<div className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-primary via-secondary to-accent transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-left" />
						</Card>
					))}
				</div>

				{/* Additional content section */}
				<div className="mt-20 grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
					<div>
						<h3 className="text-2xl font-bold text-foreground mb-6">
							Real-World Impact
						</h3>
						<div className="space-y-4">
							<div className="flex items-start gap-3">
								<div className="flex h-6 w-6 items-center justify-center rounded-full bg-primary/10 mt-0.5 flex-shrink-0">
									<div className="w-2 h-2 rounded-full bg-primary" />
								</div>
								<div>
									<h4 className="font-semibold text-foreground mb-1">Content Creators</h4>
									<p className="text-sm text-muted-foreground">Protect your intellectual property from theft and unauthorized republishing</p>
								</div>
							</div>
							<div className="flex items-start gap-3">
								<div className="flex h-6 w-6 items-center justify-center rounded-full bg-secondary/10 mt-0.5 flex-shrink-0">
									<div className="w-2 h-2 rounded-full bg-secondary" />
								</div>
								<div>
									<h4 className="font-semibold text-foreground mb-1">Academic Institutions</h4>
									<p className="text-sm text-muted-foreground">Ensure research integrity and combat plagiarism in academic publications</p>
								</div>
							</div>
							<div className="flex items-start gap-3">
								<div className="flex h-6 w-6 items-center justify-center rounded-full bg-accent/10 mt-0.5 flex-shrink-0">
									<div className="w-2 h-2 rounded-full bg-accent" />
								</div>
								<div>
									<h4 className="font-semibold text-foreground mb-1">Legal Professionals</h4>
									<p className="text-sm text-muted-foreground">Generate court-admissible evidence for intellectual property cases</p>
								</div>
							</div>
						</div>
					</div>

					<div className="relative">
						<div className="bg-gradient-to-br from-primary/10 via-secondary/10 to-accent/10 rounded-2xl p-8 border">
							<h4 className="text-xl font-bold text-foreground mb-4">Join the Movement</h4>
							<p className="text-muted-foreground mb-6 leading-relaxed">
								Be part of the revolution that&apos;s making content protection accessible to everyone.
								From individual creators to enterprise organizations, Konthokosh scales with your needs.
							</p>
							<div className="flex flex-wrap gap-2">
								<span className="px-3 py-1 bg-primary/10 text-primary text-xs font-medium rounded-full">Writers</span>
								<span className="px-3 py-1 bg-secondary/10 text-secondary text-xs font-medium rounded-full">Researchers</span>
								<span className="px-3 py-1 bg-accent/10 text-accent text-xs font-medium rounded-full">Bloggers</span>
								<span className="px-3 py-1 bg-chart-4/10 text-chart-4 text-xs font-medium rounded-full">Students</span>
								<span className="px-3 py-1 bg-chart-5/10 text-chart-5 text-xs font-medium rounded-full">Publishers</span>
							</div>
						</div>
					</div>
				</div>
			</div>
		</section>
	)
}

export default UseCasesSection
