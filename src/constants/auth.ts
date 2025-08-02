import { Icons } from '@/components/common/Icons'
import type { TrustIndicator, AuthContentMode, FeatureHighlight } from '@/types/auth'

export const BRAND_NAME = "Konthokosh"

export const TRUST_INDICATORS: TrustIndicator[] = [
	{
		icon: Icons.Shield,
		value: "100%",
		label: "Tamper-proof",
		bgColor: "bg-primary/10",
		iconColor: "text-primary"
	},
	{
		icon: Icons.Brain,
		value: "AI",
		label: "Detection",
		bgColor: "bg-secondary/10",
		iconColor: "text-secondary"
	},
	{
		icon: Icons.Zap,
		value: "Instant",
		label: "Verification",
		bgColor: "bg-accent/10",
		iconColor: "text-accent"
	},
	{
		icon: Icons.Globe,
		value: "Global",
		label: "Network",
		bgColor: "bg-chart-4/10",
		iconColor: "text-chart-4"
	}
]

export const AUTH_CONTENT: Record<'sign-in' | 'sign-up', AuthContentMode> = {
	'sign-in': {
		badge: "Secure • Decentralized • AI-Powered",
		title: {
			line1: "Welcome Back to",
			line2: "Content Protection"
		},
		description: "Continue protecting your intellectual property with blockchain-verified originality."
	},
	'sign-up': {
		badge: "Secure • Decentralized • AI-Powered",
		title: {
			line1: "Join the Future of",
			line2: "Content Protection"
		},
		description: "Be part of the revolution that combines AI detection with decentralized verification."
	}
}

export const TESTIMONIAL = {
	quote: "Konthokosh revolutionized how I protect my content. The peace of mind knowing my work is blockchain-verified is invaluable.",
	author: {
		name: "Sarah Chen",
		title: "Digital Content Creator"
	}
}

export const NAVIGATION = {
	backToHome: "Back to Home"
}

export const FEATURE_HIGHLIGHTS: FeatureHighlight[] = [
	{
		icon: Icons.Lock,
		title: "Blockchain Security",
		description: "Immutable proof of ownership",
		bgColor: "bg-primary/10",
		iconColor: "text-primary"
	},
	{
		icon: Icons.Search,
		title: "Smart Detection",
		description: "Advanced plagiarism analysis",
		bgColor: "bg-secondary/10",
		iconColor: "text-secondary"
	},
	{
		icon: Icons.Award,
		title: "Verified Certificates",
		description: "Downloadable authenticity proof",
		bgColor: "bg-accent/10",
		iconColor: "text-accent"
	},
	{
		icon: Icons.TrendingUp,
		title: "Analytics Dashboard",
		description: "Track protection metrics",
		bgColor: "bg-chart-4/10",
		iconColor: "text-chart-4"
	}
]
