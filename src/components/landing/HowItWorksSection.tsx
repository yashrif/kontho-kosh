import { Icons } from '@/components/common/Icons'
import { HOW_IT_WORKS_STEPS } from '@/constants/landing'

const HowItWorksSection = () => {
	return (
		<section className="py-24 bg-muted/30">
			<div className="mx-auto max-w-7xl px-6 lg:px-8">
				<div className="mx-auto max-w-3xl text-center">
					<h2 className="text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
						How It Works
					</h2>
					<p className="mt-4 text-lg text-muted-foreground">
						Simple, secure, and transparent process to protect your original content
					</p>
				</div>

				<div className="mt-16">
					<div className="grid grid-cols-1 gap-8 lg:grid-cols-5">
						{HOW_IT_WORKS_STEPS.map((step, index) => (
							<div key={step.step} className="relative h-full">
								{/* Connector line */}
								{index < HOW_IT_WORKS_STEPS.length - 1 && (
									<div className="hidden lg:block absolute top-12 left-full w-full h-0.5 bg-gradient-to-r from-primary/30 to-primary/10 z-0" />
								)}

								<div className="relative bg-card rounded-xl p-6 border shadow-sm hover:shadow-md transition-shadow duration-200 h-full flex flex-col">
									{/* Step number */}
									<div className="absolute -top-3 -left-3 w-8 h-8 bg-primary text-primary-foreground rounded-full flex items-center justify-center text-sm font-bold shadow-md">
										{step.step}
									</div>

									{/* Icon */}
									<div className="flex justify-center mb-4">
										<div className="flex h-12 w-12 items-center justify-center rounded-full bg-primary/10">
											<step.icon className="h-6 w-6 text-primary" />
										</div>
									</div>

									{/* Content */}
									<div className="text-center flex-1 flex flex-col">
										<div className="flex-1 flex flex-col justify-center min-h-[120px]">
											<h3 className="text-lg font-semibold text-foreground mb-3 h-[2.5rem] flex items-center justify-center">
												{step.title}
											</h3>
											<p className="text-sm text-muted-foreground leading-relaxed flex-1 flex items-start justify-center">
												<span className="block">{step.description}</span>
											</p>
										</div>
									</div>
								</div>
							</div>
						))}
					</div>
				</div>

				{/* Call to action */}
				<div className="mt-16 text-center">
					<div className="inline-flex items-center gap-2 text-sm text-muted-foreground bg-background/50 px-4 py-2 rounded-full border">
						<Icons.Zap className="h-4 w-4 text-accent" />
						<span>Get started in under 2 minutes</span>
					</div>
				</div>
			</div>
		</section>
	)
}

export default HowItWorksSection
