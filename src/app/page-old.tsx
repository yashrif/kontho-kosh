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
          </a>
        </div>
      </main>
      <footer className="row-start-3 flex gap-[24px] flex-wrap items-center justify-center">
        <a
          className="flex items-center gap-2 hover:underline hover:underline-offset-4"
          href="https://nextjs.org/learn?utm_source=create-next-app&utm_medium=appdir-template-tw&utm_campaign=create-next-app"
          target="_blank"
          rel="noopener noreferrer"
        >
          <Image
            aria-hidden
            src="/file.svg"
            alt="File icon"
            width={16}
            height={16}
          />
          Learn
        </a>
        <a
          className="flex items-center gap-2 hover:underline hover:underline-offset-4"
          href="https://vercel.com/templates?framework=next.js&utm_source=create-next-app&utm_medium=appdir-template-tw&utm_campaign=create-next-app"
          target="_blank"
          rel="noopener noreferrer"
        >
          <Image
            aria-hidden
            src="/window.svg"
            alt="Window icon"
            width={16}
            height={16}
          />
          Examples
        </a>
        <a
          className="flex items-center gap-2 hover:underline hover:underline-offset-4"
          href="https://nextjs.org?utm_source=create-next-app&utm_medium=appdir-template-tw&utm_campaign=create-next-app"
          target="_blank"
          rel="noopener noreferrer"
        >
          <Image
            aria-hidden
            src="/globe.svg"
            alt="Globe icon"
            width={16}
            height={16}
          />
          Go to nextjs.org →
        </a>
      </footer>
    </div>
  );
}
