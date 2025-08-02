import { Button } from '@/components/ui/button'
import { Icons } from '@/components/common/Icons'

const Footer = () => {
	return (
		<footer className="bg-gradient-to-br from-primary/5 via-background to-secondary/5 border-t">
			{/* Main CTA Section */}
			<div className="py-16 bg-gradient-to-r from-primary/10 via-secondary/10 to-accent/10">
				<div className="mx-auto max-w-7xl px-6 lg:px-8">
					<div className="text-center">
						<h2 className="text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
							Ready to Protect Your Content?
						</h2>
						<p className="mt-4 text-lg text-muted-foreground max-w-2xl mx-auto">
							Join thousands of creators who trust Konthokosh to protect their intellectual property.
							Start securing your content today.
						</p>
						<div className="mt-8 flex flex-col sm:flex-row gap-4 justify-center">
							<Button size="lg" className="text-base px-8 py-3 h-12 font-semibold shadow-lg hover:shadow-xl transition-all duration-200">
								<Icons.Wallet className="mr-2 h-5 w-5" />
								Connect MetaMask
							</Button>
							<Button variant="outline" size="lg" className="text-base px-8 py-3 h-12 font-semibold">
								<Icons.FileText className="mr-2 h-5 w-5" />
								Start Free Trial
							</Button>
						</div>
					</div>
				</div>
			</div>

			{/* Links Section */}
			<div className="py-12">
				<div className="mx-auto max-w-7xl px-6 lg:px-8">
					<div className="grid grid-cols-1 md:grid-cols-4 gap-8">
						{/* Company Info */}
						<div className="md:col-span-2">
							<div className="flex items-center gap-2 mb-4">
								<div className="flex h-8 w-8 items-center justify-center rounded-lg bg-primary text-primary-foreground">
									<Icons.Shield className="h-5 w-5" />
								</div>
								<span className="text-xl font-bold text-foreground">Konthokosh</span>
							</div>
							<p className="text-sm text-muted-foreground leading-relaxed mb-6 max-w-md">
								The first decentralized platform for content originality verification,
								combining AI-powered detection with blockchain-based proof of authorship.
							</p>
							<div className="flex gap-4">
								<a href="#" className="text-muted-foreground hover:text-primary transition-colors duration-200">
									<Icons.GitHub className="h-5 w-5" />
								</a>
								<a href="#" className="text-muted-foreground hover:text-primary transition-colors duration-200">
									<Icons.X className="h-5 w-5" />
								</a>
								<a href="#" className="text-muted-foreground hover:text-primary transition-colors duration-200">
									<Icons.LinkedIn className="h-5 w-5" />
								</a>
							</div>
						</div>

						{/* Quick Links */}
						<div>
							<h3 className="text-sm font-semibold text-foreground mb-4">Quick Links</h3>
							<ul className="space-y-3">
								<li><a href="#features" className="text-sm text-muted-foreground hover:text-primary transition-colors duration-200">Features</a></li>
								<li><a href="#how-it-works" className="text-sm text-muted-foreground hover:text-primary transition-colors duration-200">How It Works</a></li>
								<li><a href="#use-cases" className="text-sm text-muted-foreground hover:text-primary transition-colors duration-200">Use Cases</a></li>
								<li><a href="#roadmap" className="text-sm text-muted-foreground hover:text-primary transition-colors duration-200">Roadmap</a></li>
								<li><a href="#security" className="text-sm text-muted-foreground hover:text-primary transition-colors duration-200">Security</a></li>
							</ul>
						</div>

						{/* Resources */}
						<div>
							<h3 className="text-sm font-semibold text-foreground mb-4">Resources</h3>
							<ul className="space-y-3">
								<li><a href="#" className="text-sm text-muted-foreground hover:text-primary transition-colors duration-200">Documentation</a></li>
								<li><a href="#" className="text-sm text-muted-foreground hover:text-primary transition-colors duration-200">White Paper</a></li>
								<li><a href="#" className="text-sm text-muted-foreground hover:text-primary transition-colors duration-200">Smart Contracts</a></li>
								<li><a href="#" className="text-sm text-muted-foreground hover:text-primary transition-colors duration-200">API Reference</a></li>
								<li><a href="#" className="text-sm text-muted-foreground hover:text-primary transition-colors duration-200">Support</a></li>
							</ul>
						</div>
					</div>
				</div>
			</div>

			{/* Bottom Bar */}
			<div className="border-t bg-muted/30">
				<div className="mx-auto max-w-7xl px-6 lg:px-8">
					<div className="py-6 flex flex-col sm:flex-row justify-between items-center">
						<div className="text-sm text-muted-foreground">
							© 2025 Konthokosh. All rights reserved.
						</div>
						<div className="flex gap-6 mt-4 sm:mt-0">
							<a href="#" className="text-sm text-muted-foreground hover:text-primary transition-colors duration-200">Privacy Policy</a>
							<a href="#" className="text-sm text-muted-foreground hover:text-primary transition-colors duration-200">Terms of Service</a>
							<a href="#" className="text-sm text-muted-foreground hover:text-primary transition-colors duration-200">Contact</a>
						</div>
					</div>
				</div>
			</div>
		</footer>
	)
}

export default Footer
