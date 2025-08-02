import { Button } from '@/components/ui/button'
import { Icons } from '@/components/Icons'

const HeroSection = () => {
	return (
		<section className="relative overflow-hidden bg-gradient-to-br from-background via-background to-muted/30 pt-20 pb-16 sm:pt-32 sm:pb-24">
			{/* Background grid pattern */}
			<div className="absolute inset-0 bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:24px_24px]" />

			{/* Gradient overlays for depth */}
			<div className="absolute top-0 left-1/4 w-96 h-96 bg-primary/5 rounded-full blur-3xl" />
			<div className="absolute bottom-0 right-1/4 w-96 h-96 bg-secondary/5 rounded-full blur-3xl" />

			<div className="relative mx-auto max-w-7xl px-6 lg:px-8">
				<div className="mx-auto max-w-4xl text-center">
					{/* Badge */}
					<div className="mb-8 flex justify-center">
						<div className="inline-flex items-center gap-2 rounded-full bg-primary/10 px-4 py-2 text-sm font-medium text-primary ring-1 ring-primary/20">
							<Icons.Shield className="h-4 w-4" />
							<span>Protect Your Originality with AI & Blockchain</span>
						</div>
					</div>

					{/* Main headline */}
					<h1 className="text-4xl font-bold tracking-tight text-foreground sm:text-6xl lg:text-7xl">
						<span className="block">Protect Your Words.</span>
						<span className="block text-primary">Publish Without Fear.</span>
					</h1>

					{/* Subheadline */}
					<p className="mt-6 text-xl leading-8 text-muted-foreground max-w-3xl mx-auto">
						The first decentralized platform combining AI-powered originality detection with blockchain verification.
						Secure your content, prove your authorship, and build trust in the digital age.
					</p>

					{/* CTA buttons */}
					<div className="mt-10 flex items-center justify-center gap-6 flex-col sm:flex-row">
						<Button size="lg" className="text-base px-8 py-3 h-12 font-semibold shadow-lg hover:shadow-xl transition-all duration-200">
							<Icons.Wallet className="mr-2 h-5 w-5" />
							Connect Wallet
						</Button>
						<Button variant="outline" size="lg" className="text-base px-8 py-3 h-12 font-semibold">
							<Icons.FileText className="mr-2 h-5 w-5" />
							Verify Content
						</Button>
					</div>

					{/* Trust indicators */}
					<div className="mt-16 grid grid-cols-2 gap-8 md:grid-cols-4">
						<div className="flex flex-col items-center">
							<div className="flex h-12 w-12 items-center justify-center rounded-full bg-primary/10">
								<Icons.Shield className="h-6 w-6 text-primary" />
							</div>
							<div className="mt-3 text-center">
								<div className="text-2xl font-bold text-foreground">100%</div>
								<div className="text-sm text-muted-foreground">Tamper-proof</div>
							</div>
						</div>
						<div className="flex flex-col items-center">
							<div className="flex h-12 w-12 items-center justify-center rounded-full bg-secondary/10">
								<Icons.Brain className="h-6 w-6 text-secondary" />
							</div>
							<div className="mt-3 text-center">
								<div className="text-2xl font-bold text-foreground">AI-Powered</div>
								<div className="text-sm text-muted-foreground">Detection</div>
							</div>
						</div>
						<div className="flex flex-col items-center">
							<div className="flex h-12 w-12 items-center justify-center rounded-full bg-accent/10">
								<Icons.Zap className="h-6 w-6 text-accent" />
							</div>
							<div className="mt-3 text-center">
								<div className="text-2xl font-bold text-foreground">Instant</div>
								<div className="text-sm text-muted-foreground">Verification</div>
							</div>
						</div>
						<div className="flex flex-col items-center">
							<div className="flex h-12 w-12 items-center justify-center rounded-full bg-chart-4/10">
								<Icons.Globe className="h-6 w-6 text-chart-4" />
							</div>
							<div className="mt-3 text-center">
								<div className="text-2xl font-bold text-foreground">Decentralized</div>
								<div className="text-sm text-muted-foreground">Trust</div>
							</div>
						</div>
					</div>
				</div>
			</div>
		</section>
	)
}

export default HeroSection
