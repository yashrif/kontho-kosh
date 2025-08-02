import { Icons } from '@/components/common/Icons'
import { FeatureItem, HowItWorksStep, UseCaseItem, RoadmapItem } from '@/types/landing'

export const FEATURES: FeatureItem[] = [
	{
		icon: Icons.Brain,
		title: "AI-Based Similarity Detection",
		description: "Advanced BERT embeddings and vector databases to detect even paraphrased content with precision"
	},
	{
		icon: Icons.Shield,
		title: "Blockchain Notarization",
		description: "Ethereum/Polygon smart contracts ensure immutable proof of authorship and timestamp verification"
	},
	{
		icon: Icons.Search,
		title: "Plagiarism Detection",
		description: "Comprehensive analysis that catches sophisticated content theft and unauthorized republishing"
	},
	{
		icon: Icons.Award,
		title: "Verifiable Proof of Authorship",
		description: "Generate legally-recognized certificates with cryptographic signatures for your original work"
	},
	{
		icon: Icons.Lock,
		title: "Immutable Transparent Ledger",
		description: "All verification records stored permanently on blockchain for public verification and trust"
	},
	{
		icon: Icons.Gem,
		title: "Privacy-First Architecture",
		description: "Only content hashes stored on-chain, your full content remains private and secure"
	}
]

export const HOW_IT_WORKS_STEPS: HowItWorksStep[] = [
	{
		step: 1,
		icon: Icons.Wallet,
		title: "Login with MetaMask",
		description: "Connect your Web3 wallet securely to authenticate your identity"
	},
	{
		step: 2,
		icon: Icons.FileText,
		title: "Submit Content",
		description: "Upload or paste your original content for verification and protection"
	},
	{
		step: 3,
		icon: Icons.Brain,
		title: "AI Originality Check",
		description: "Our advanced AI analyzes your content against our comprehensive database"
	},
	{
		step: 4,
		icon: Icons.Shield,
		title: "Blockchain Notarization",
		description: "Content hash and metadata are permanently recorded on the blockchain"
	},
	{
		step: 5,
		icon: Icons.Award,
		title: "Get Immutable Proof",
		description: "Receive your verifiable certificate of authenticity and ownership"
	}
]

export const USE_CASES: UseCaseItem[] = [
	{
		icon: Icons.FileText,
		title: "Writers & Poets",
		description: "Protect your literary works, poems, and creative writing from unauthorized use"
	},
	{
		icon: Icons.Users,
		title: "Bloggers & Creators",
		description: "Secure your blog posts, articles, and digital content with verifiable ownership"
	},
	{
		icon: Icons.Target,
		title: "Academic Writing",
		description: "Ensure originality of research papers, theses, and academic publications"
	},
	{
		icon: Icons.Zap,
		title: "Legal Proof of Authorship",
		description: "Generate court-admissible evidence of content creation and ownership"
	}
]

export const ROADMAP: RoadmapItem[] = [
	{
		title: "Core Platform Launch",
		description: "AI-powered originality detection with blockchain verification",
		status: "completed"
	},
	{
		title: "DAO Moderation System",
		description: "Community-driven content verification and dispute resolution",
		status: "in-progress"
	},
	{
		title: "Code & Image Verification",
		description: "Expand beyond text to protect source code and visual content",
		status: "upcoming"
	},
	{
		title: "NFT Minting Integration",
		description: "Convert verified content into tradeable NFTs",
		status: "upcoming"
	},
	{
		title: "Legal Certificate System",
		description: "Court-recognized certificates with legal framework integration",
		status: "upcoming"
	}
]
