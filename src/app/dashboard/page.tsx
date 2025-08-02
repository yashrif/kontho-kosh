'use client';

import { useUser } from "@clerk/nextjs";
import ProtectedRoute from "@/components/auth/ProtectedRoute";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Icons } from "@/components/common/Icons";

const DashboardPage = () => {
	const { user } = useUser();

	return (
		<ProtectedRoute>
			<div className="min-h-screen bg-background">
				<div className="mx-auto max-w-7xl px-6 lg:px-8 pt-24 pb-16">
					{/* Welcome Section */}
					<div className="mb-8">
						<h1 className="text-3xl font-bold text-foreground mb-2">
							Welcome back, {user?.firstName || 'User'}!
						</h1>
						<p className="text-muted-foreground">
							Manage your content protection and verify authenticity with blockchain technology.
						</p>
					</div>

					{/* Dashboard Grid */}
					<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
						{/* Upload Content Card */}
						<Card className="p-6 hover:shadow-lg transition-shadow">
							<div className="flex items-center gap-4 mb-4">
								<div className="p-3 rounded-lg bg-primary/10">
									<Icons.FileText className="h-6 w-6 text-primary" />
								</div>
								<div>
									<h3 className="font-semibold">Upload Content</h3>
									<p className="text-sm text-muted-foreground">
										Protect your original work
									</p>
								</div>
							</div>
							<Button className="w-full">
								<Icons.ArrowRight className="mr-2 h-4 w-4" />
								Upload New Content
							</Button>
						</Card>

						{/* Verify Content Card */}
						<Card className="p-6 hover:shadow-lg transition-shadow">
							<div className="flex items-center gap-4 mb-4">
								<div className="p-3 rounded-lg bg-secondary/10">
									<Icons.Search className="h-6 w-6 text-secondary" />
								</div>
								<div>
									<h3 className="font-semibold">Verify Content</h3>
									<p className="text-sm text-muted-foreground">
										Check authenticity
									</p>
								</div>
							</div>
							<Button variant="outline" className="w-full">
								<Icons.Shield className="mr-2 h-4 w-4" />
								Verify Now
							</Button>
						</Card>

						{/* My Content Card */}
						<Card className="p-6 hover:shadow-lg transition-shadow">
							<div className="flex items-center gap-4 mb-4">
								<div className="p-3 rounded-lg bg-accent/10">
									<Icons.Gem className="h-6 w-6 text-accent" />
								</div>
								<div>
									<h3 className="font-semibold">My Content</h3>
									<p className="text-sm text-muted-foreground">
										View protected works
									</p>
								</div>
							</div>
							<Button variant="outline" className="w-full">
								<Icons.Globe className="mr-2 h-4 w-4" />
								View Collection
							</Button>
						</Card>
					</div>

					{/* Stats Section */}
					<div className="mt-12">
						<h2 className="text-xl font-semibold mb-6">Your Protection Stats</h2>
						<div className="grid grid-cols-1 md:grid-cols-4 gap-4">
							<Card className="p-4 text-center">
								<div className="text-2xl font-bold text-primary">0</div>
								<div className="text-sm text-muted-foreground">Protected Documents</div>
							</Card>
							<Card className="p-4 text-center">
								<div className="text-2xl font-bold text-secondary">0</div>
								<div className="text-sm text-muted-foreground">Verifications</div>
							</Card>
							<Card className="p-4 text-center">
								<div className="text-2xl font-bold text-accent">0</div>
								<div className="text-sm text-muted-foreground">Blockchain Records</div>
							</Card>
							<Card className="p-4 text-center">
								<div className="text-2xl font-bold text-chart-4">100%</div>
								<div className="text-sm text-muted-foreground">Security Score</div>
							</Card>
						</div>
					</div>
				</div>
			</div>
		</ProtectedRoute>
	);
};

export default DashboardPage;
