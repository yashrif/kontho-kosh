'use client';

import { useUser, useAuth } from "@clerk/nextjs";
import { useState } from "react";
import Link from "next/link";
import ProtectedRoute from "@/components/auth/ProtectedRoute";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Icons } from "@/components/common/Icons";

const DashboardPage = () => {
	const { user } = useUser();
	const { getToken } = useAuth();
	const [tokenStatus, setTokenStatus] = useState<string>("");
	const [isLoading, setIsLoading] = useState(false);
	const [clientToken, setClientToken] = useState<string>("");

	/**
	 * 🎯 Get JWT token on the client side
	 */
	const handleGetClientToken = async () => {
		setIsLoading(true);
		setTokenStatus("Getting client-side token...");

		try {
			if (!getToken) {
				setTokenStatus("❌ getToken not available");
				return;
			}

			const token = await getToken();
			if (token) {
				setClientToken(token);
				setTokenStatus(`✅ Client token retrieved! Length: ${token.length} chars`);
				console.log("🎯 Client-side JWT Token:", token);

				// Decode and log token parts
				try {
					const tokenParts = token.split('.');
					const payload = JSON.parse(
						Buffer.from(tokenParts[1], 'base64url').toString('utf-8')
					);
					console.log("📄 Client Token Payload:", JSON.stringify(payload, null, 2));
				} catch (decodeError) {
					console.error("❌ Error decoding client token:", decodeError);
				}
			} else {
				setTokenStatus("❌ No token received");
			}
		} catch (error) {
			console.error("Client token error:", error);
			setTokenStatus(`❌ Error getting client token: ${error instanceof Error ? error.message : 'Unknown error'}`);
		} finally {
			setIsLoading(false);
		}
	};

	/**
	 * 🔐 Trigger JWT token logging on the server
	 */
	const handleLogToken = async () => {
		setIsLoading(true);
		setTokenStatus("Fetching token...");

		try {
			const response = await fetch('/api/debug/token');
			const data = await response.json();

			if (response.ok) {
				setTokenStatus(`✅ Token logged to console! User ID: ${data.userId} | Token Length: ${data.tokenLength} chars`);
				console.log("🎯 Token debug response:", data);
			} else {
				setTokenStatus(`❌ Error: ${data.error || 'Unknown error'}`);
				console.error("API Error Response:", data);
			}
		} catch (error) {
			console.error("Token fetch error:", error);
			setTokenStatus(`❌ Network error: ${error instanceof Error ? error.message : 'Unknown error'}`);
		} finally {
			setIsLoading(false);
		}
	};

	/**
	 * 🔗 Trigger user data API call (which also logs token)
	 */
	const handleUserApiCall = async () => {
		setIsLoading(true);
		setTokenStatus("Calling user API...");

		try {
			const response = await fetch('/api/user');
			const data = await response.json();

			if (response.ok) {
				setTokenStatus(`✅ User API called successfully! Check console for token. Protected docs: ${data.data?.protectedDocuments || 0}`);
				console.log("👤 User API response:", data);
			} else {
				setTokenStatus(`❌ Error: ${data.error || 'Unknown error'}`);
				console.error("User API Error Response:", data);
			}
		} catch (error) {
			console.error("User API error:", error);
			setTokenStatus(`❌ Network error: ${error instanceof Error ? error.message : 'Unknown error'}`);
		} finally {
			setIsLoading(false);
		}
	};

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

					{/* JWT Token Debug Section */}
					<Card className="mb-8 p-6 bg-primary/5 border-primary/20">
						<h2 className="text-lg font-semibold mb-4 flex items-center gap-2">
							<Icons.Shield className="h-5 w-5 text-primary" />
							JWT Token Debug Console
						</h2>
						<p className="text-sm text-muted-foreground mb-4">
							Click the buttons below to trigger JWT token logging in the server console.
							Check your terminal/server logs to see the token details.
						</p>

						<div className="flex flex-wrap gap-3 mb-4">
							<Button
								onClick={handleGetClientToken}
								disabled={isLoading}
								className="flex items-center gap-2"
							>
								{isLoading ? (
									<Icons.Shield className="h-4 w-4 animate-heartbeat" />
								) : (
									<Icons.Gem className="h-4 w-4" />
								)}
								Get Client Token
							</Button>

							<Button
								onClick={handleLogToken}
								disabled={isLoading}
								variant="outline"
								className="flex items-center gap-2"
							>
								{isLoading ? (
									<Icons.Shield className="h-4 w-4 animate-heartbeat" />
								) : (
									<Icons.Search className="h-4 w-4" />
								)}
								Debug Server Token
							</Button>

							<Button
								onClick={handleUserApiCall}
								disabled={isLoading}
								variant="outline"
								className="flex items-center gap-2"
							>
								{isLoading ? (
									<Icons.Shield className="h-4 w-4 animate-heartbeat" />
								) : (
									<Icons.FileText className="h-4 w-4" />
								)}
								Call User API
							</Button>
						</div>

						{tokenStatus && (
							<div className="p-3 rounded-lg bg-background/50 border">
								<p className="text-sm font-mono">{tokenStatus}</p>
							</div>
						)}

						{clientToken && (
							<div className="mt-4 p-4 rounded-lg bg-accent/10 border border-accent/20">
								<h4 className="font-medium text-sm text-accent-foreground mb-2">Client-side JWT Token:</h4>
								<div className="bg-background/50 p-3 rounded border">
									<p className="text-xs font-mono break-all">{clientToken}</p>
								</div>
							</div>
						)}
					</Card>

					{/* Debug: User Object Display */}
					{user && (
						<Card className="mb-8 p-6 bg-muted/30">
							<h2 className="text-lg font-semibold mb-4 flex items-center gap-2">
								<Icons.Shield className="h-5 w-5 text-primary" />
								User Object Debug Info
							</h2>
							<div className="space-y-4">
								<div>
									<h3 className="font-medium text-sm text-muted-foreground mb-2">Basic Info:</h3>
									<pre className="bg-background p-3 rounded-lg text-xs overflow-auto">
										{JSON.stringify({
											id: user.id,
											firstName: user.firstName,
											lastName: user.lastName,
											fullName: user.fullName,
											username: user.username,
											primaryEmailAddress: user.primaryEmailAddress?.emailAddress,
											imageUrl: user.imageUrl,
										}, null, 2)}
									</pre>
								</div>

								<div>
									<h3 className="font-medium text-sm text-muted-foreground mb-2">External Accounts (including MetaMask):</h3>
									<pre className="bg-background p-3 rounded-lg text-xs overflow-auto">
										{JSON.stringify(user.externalAccounts?.map(account => ({
											id: account.id,
											provider: account.provider,
											externalId: 'externalId' in account ? account.externalId : undefined,
											emailAddress: account.emailAddress,
											username: account.username,
											publicMetadata: account.publicMetadata,
										})), null, 2)}
									</pre>
								</div>

								<div>
									<h3 className="font-medium text-sm text-muted-foreground mb-2">Web3 Wallets:</h3>
									<pre className="bg-background p-3 rounded-lg text-xs overflow-auto">
										{JSON.stringify(user.web3Wallets?.map(wallet => ({
											id: wallet.id,
											web3Wallet: wallet.web3Wallet,
										})), null, 2)}
									</pre>
								</div>

								<div>
									<h3 className="font-medium text-sm text-muted-foreground mb-2">Complete User Object:</h3>
									<pre className="bg-background p-3 rounded-lg text-xs overflow-auto max-h-96">
										{JSON.stringify(user, null, 2)}
									</pre>
								</div>
							</div>
						</Card>
					)}

					{/* Dashboard Grid */}
					<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
						{/* Upload Content Card */}
						<Card className="p-6 hover:shadow-lg transition-shadow">
							<div className="flex items-center gap-4 mb-4">
								<div className="p-3 rounded-lg bg-primary/10">
									<Icons.FileText className="h-6 w-6 text-primary" />
								</div>
								<div>
									<h3 className="font-semibold">Create New Post</h3>
									<p className="text-sm text-muted-foreground">
										Write and protect your original content
									</p>
								</div>
							</div>
							<Link href="/dashboard/new-post">
								<Button className="w-full">
									<Icons.Plus className="mr-2 h-4 w-4" />
									Create New Post
								</Button>
							</Link>
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
