import Navigation from '@/components/common/Navigation'
import HeroSection from '@/components/common/HeroSection'
import HowItWorksSection from '@/components/common/HowItWorksSection'
import FeaturesSection from '@/components/common/FeaturesSection'
import UseCasesSection from '@/components/common/UseCasesSection'
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
