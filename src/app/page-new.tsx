import Navigation from '@/components/common/Navigation'
import HeroSection from '@/components/common/HeroSection'
import HowItWorksSection from '@/components/common/HowItWorksSection'
import FeaturesSection from '@/components/common/FeaturesSection'
import BenefitsSection from '@/components/common/BenefitsSection'
import TechStackSection from '@/components/common/TechStackSection'
import DemoPreviewSection from '@/components/common/DemoPreviewSection'
import UseCasesSection from '@/components/common/UseCasesSection'
import SecurityPrivacySection from '@/components/common/SecurityPrivacySection'
import RoadmapSection from '@/components/common/RoadmapSection'
import Footer from '@/components/common/Footer'

export default function Home() {
  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      <main>
        <HeroSection />
        <section id="how-it-works">
          <HowItWorksSection />
        </section>
        <section id="features">
          <FeaturesSection />
        </section>
        <BenefitsSection />
        <TechStackSection />
        <DemoPreviewSection />
        <section id="use-cases">
          <UseCasesSection />
        </section>
        <section id="security">
          <SecurityPrivacySection />
        </section>
        <section id="roadmap">
          <RoadmapSection />
        </section>
      </main>
      <Footer />
    </div>
  )
}
