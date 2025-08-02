import Navigation from '@/components/common/Navigation'
import HeroSection from '@/components/landing/HeroSection'
import HowItWorksSection from '@/components/landing/HowItWorksSection'
import FeaturesSection from '@/components/landing/FeaturesSection'
import UseCasesSection from '@/components/landing/UseCasesSection'
import Footer from '@/components/common/Footer'

export default function Home() {
	return (
		<div className="flex flex-col min-h-screen">
			<Navigation />
			<main className="flex-grow">
				<HeroSection />
				<FeaturesSection />
				<HowItWorksSection />
				<UseCasesSection />
			</main>
			<Footer />
		</div>
	)
}
