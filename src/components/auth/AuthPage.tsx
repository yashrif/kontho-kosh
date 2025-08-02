import { SignIn } from "@clerk/nextjs";
import { Icons } from "@/components/common/Icons";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import Link from "next/link";
import {
  BRAND_NAME,
  TRUST_INDICATORS,
  AUTH_CONTENT,
  TESTIMONIAL,
  NAVIGATION,
  METAMASK_REQUIREMENT,
} from "@/constants/auth";

/**
 * 🔐 Unified authentication page component with MetaMask integration
 *
 * IMPORTANT: To enable Web3/MetaMask authentication through Clerk:
 * 1. Go to your Clerk Dashboard > SSO Connections
 * 2. Enable Web3 authentication (MetaMask)
 * 3. Configure the Web3 settings in your Clerk dashboard
 * 4. Set up proper environment variables for Web3 support
 *
 * The SignIn component will automatically show Web3 authentication options
 * when properly configured in the Clerk dashboard.
 */
const AuthPage = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-background to-muted/30 relative overflow-hidden">
      {/* Background grid pattern */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:24px_24px]" />

      {/* Header */}
      <header className="absolute top-0 w-full z-50 bg-background/80 backdrop-blur-md border-b">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="flex h-16 items-center justify-between">
            {/* Logo */}
            <Link href="/" className="flex items-center gap-2 group">
              <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-primary text-primary-foreground group-hover:scale-105 transition-transform duration-200">
                <Icons.Shield className="h-5 w-5" />
              </div>
              <span className="text-xl font-bold text-foreground">
                {BRAND_NAME}
              </span>
            </Link>

            {/* Back to Home */}
            <Link href="/">
              <Button
                variant="outline"
                className="group hover:bg-primary hover:text-primary-foreground hover:border-primary transition-colors"
              >
                <Icons.ArrowRight className="mr-2 h-4 w-4 rotate-180 group-hover:-translate-x-1 transition-transform duration-200" />
                {NAVIGATION.backToHome}
              </Button>
            </Link>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <div className="relative flex min-h-screen items-center justify-center px-6 pt-20 pb-8">
        <div className="w-full max-w-7xl grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          {/* Left Side - Hero Section */}
          <div className="space-y-8 lg:pr-8">
            {/* Badge */}
            <div className="flex justify-start">
              <div className="inline-flex items-center gap-2 rounded-full bg-primary/10 px-4 py-2 text-sm font-medium text-primary ring-1 ring-primary/20">
                <Icons.Shield className="h-4 w-4" />
                <span>{AUTH_CONTENT.badge}</span>
              </div>
            </div>

            {/* Main Title */}
            <div className="space-y-6">
              <h1 className="text-4xl font-bold tracking-tight text-foreground sm:text-5xl lg:text-6xl">
                <span className="block">{AUTH_CONTENT.title.line1}</span>
                <span className="block text-primary mt-2">
                  {AUTH_CONTENT.title.line2}
                </span>
              </h1>
              <p className="text-xl leading-8 text-muted-foreground max-w-2xl">
                {AUTH_CONTENT.description}
              </p>
            </div>

            {/* Trust Indicators */}
            <div className="grid grid-cols-2 gap-6 md:grid-cols-4">
              {TRUST_INDICATORS.map((indicator, index) => (
                <div
                  key={index}
                  className="flex flex-col items-center text-center"
                >
                  <div
                    className={`flex h-12 w-12 items-center justify-center rounded-full ${indicator.bgColor} mb-3`}
                  >
                    <indicator.icon
                      className={`h-6 w-6 ${indicator.iconColor}`}
                    />
                  </div>
                  <div className="text-2xl font-bold text-foreground">
                    {indicator.value}
                  </div>
                  <div className="text-sm text-muted-foreground">
                    {indicator.label}
                  </div>
                </div>
              ))}
            </div>

            {/* Testimonial Quote */}
            <Card className="p-6 bg-gradient-to-br from-muted/50 to-muted/30 border-l-4 border-l-primary/30 hover:border-l-primary/60 transition-colors duration-300 group">
              <blockquote className="text-sm italic text-muted-foreground leading-relaxed">
                &ldquo;{TESTIMONIAL.quote}&rdquo;
              </blockquote>
              <footer className="mt-4 flex items-center gap-3">
                <div className="h-8 w-8 rounded-full bg-primary/10 flex items-center justify-center">
                  <Icons.User className="h-4 w-4 text-primary" />
                </div>
                <div>
                  <div className="text-xs font-medium text-foreground">
                    {TESTIMONIAL.author.name}
                  </div>
                  <div className="text-xs text-muted-foreground">
                    {TESTIMONIAL.author.title}
                  </div>
                </div>
              </footer>
            </Card>
          </div>

          {/* Right Side - Auth Form */}
          <div className="flex justify-center lg:justify-end">
            <div className="w-full max-w-md">
              <div className="relative">
                {/* Glassmorphism background */}
                <div className="absolute inset-0 bg-card/80 backdrop-blur-xl rounded-2xl border border-border/50 shadow-2xl" />

                <div className="relative p-8">
                  {/* Web3/MetaMask Auth Component */}
                  <div className="space-y-6">
                    {/* Header */}
                    <div className="text-center space-y-2">
                      <h2 className="text-2xl font-bold text-foreground">
                        Connect Your Wallet
                      </h2>
                      <p className="text-sm text-muted-foreground">
                        Connect with MetaMask to access the decentralized
                        content protection platform
                      </p>
                    </div>

                    {/* MetaMask Connection through Clerk */}
                    <SignIn
                      appearance={{
                        elements: {
                          formButtonPrimary:
                            "bg-primary hover:bg-primary/90 text-primary-foreground rounded-full font-semibold transition-all duration-200 shadow-lg hover:shadow-xl hover:scale-[1.02]",
                          card: "shadow-none border-0 bg-transparent p-0",
                          rootBox: "w-full",
                          headerTitle: "hidden",
                          headerSubtitle: "hidden",
                          socialButtonsBlockButton:
                            "border-border hover:bg-muted rounded-full transition-all duration-200 bg-gradient-to-r from-orange-500/10 to-orange-600/10 border-orange-500/20 hover:border-orange-500/40",
                          socialButtonsBlockButtonText:
                            "text-foreground font-medium",
                          formFieldInput:
                            "border-border bg-background/50 backdrop-blur-sm rounded-lg focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all duration-200",
                          footerActionLink:
                            "text-primary hover:text-primary/80 font-medium transition-colors duration-200",
                          dividerLine: "bg-border",
                          dividerText: "text-muted-foreground text-xs",
                          formFieldLabel: "text-foreground font-medium",
                          identityPreviewText: "text-foreground",
                          identityPreviewEditButton:
                            "text-primary hover:text-primary/80",
                          socialButtonsProviderIcon: "w-5 h-5",
                        },
                        layout: {
                          socialButtonsPlacement: "top",
                          socialButtonsVariant: "blockButton",
                          showOptionalFields: false,
                        },
                      }}
                      redirectUrl="/dashboard"
                      signUpUrl="/auth"
                    />

                    {/* MetaMask Installation Requirement */}
                    <div className="mt-8 space-y-4">
                      <div className="text-xs text-center text-muted-foreground">
                        {METAMASK_REQUIREMENT.sectionTitle}
                      </div>
                      <div className="grid grid-cols-1 gap-3">
                        <div className="flex items-center gap-3 p-3 rounded-lg bg-muted/30 border border-accent/30 hover:border-accent/50 transition-colors duration-300">
                          <div className="flex h-8 w-8 items-center justify-center rounded-full bg-accent/10">
                            <Icons.Download className="h-4 w-4 text-accent" />
                          </div>
                          <div className="text-sm flex-1">
                            <div className="font-medium text-foreground">
                              {METAMASK_REQUIREMENT.installTitle}
                            </div>
                            <div className="text-muted-foreground text-xs">
                              {METAMASK_REQUIREMENT.installDescription}
                            </div>
                          </div>
                          <Link
                            href={METAMASK_REQUIREMENT.installUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="inline-flex items-center gap-1 rounded-full bg-accent text-accent-foreground px-3 py-1.5 text-xs font-medium hover:bg-accent/90 transition-all duration-200 shadow-sm hover:shadow-md"
                          >
                            <Icons.Download className="h-3 w-3" />
                            {METAMASK_REQUIREMENT.installButtonText}
                          </Link>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Background Decorations */}
      <div className="fixed inset-0 -z-10 overflow-hidden">
        {/* Gradient blobs */}
        <div className="absolute top-0 left-1/4 w-96 h-96 bg-primary/5 rounded-full blur-3xl animate-pulse-glow" />
        <div
          className="absolute bottom-0 right-1/4 w-96 h-96 bg-secondary/5 rounded-full blur-3xl animate-pulse-glow"
          style={{ animationDelay: "1s" }}
        />
        <div className="absolute top-1/2 left-0 w-64 h-64 bg-accent/3 rounded-full blur-3xl" />
        <div className="absolute top-1/3 right-0 w-64 h-64 bg-chart-4/3 rounded-full blur-3xl" />
      </div>
    </div>
  );
};

export default AuthPage;
