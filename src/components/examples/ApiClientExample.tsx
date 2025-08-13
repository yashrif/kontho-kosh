'use client';

import { useState, useCallback } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Icons } from '@/components/common/Icons';
import { usePostApi, handleApiError } from '@/utils/api-service';
import type { PostData, PostFormData } from '@/types/post';

/**
 * 🌐 Example component demonstrating API Client usage
 * 
 * This shows how to use the usePostApi hook with automatic token handling
 */
const ApiClientExample = () => {
	const [posts, setPosts] = useState<PostData[]>([]);
	const [isLoading, setIsLoading] = useState(false);
	const [error, setError] = useState<string | null>(null);
	
	// 🔐 Use the API client hook - tokens are automatically handled!
	const {
		getPosts,
		createPost,
		checkOriginality,
		getUserAnalytics,
	} = usePostApi();

	/**
	 * 📋 Fetch all posts
	 */
	const handleFetchPosts = useCallback(async () => {
		setIsLoading(true);
		setError(null);
		
		try {
			const { posts: fetchedPosts, pagination } = await getPosts({
				page: 1,
				limit: 10,
			});
			
			setPosts(fetchedPosts);
			console.log('✅ Posts fetched successfully:', fetchedPosts);
			console.log('📄 Pagination info:', pagination);
		} catch (err) {
			const errorMessage = handleApiError(err);
			setError(errorMessage);
			console.error('❌ Failed to fetch posts:', err);
		} finally {
			setIsLoading(false);
		}
	}, [getPosts]);

	/**
	 * 📝 Create a sample post
	 */
	const handleCreateSamplePost = useCallback(async () => {
		setIsLoading(true);
		setError(null);
		
		try {
			const samplePost: PostFormData = {
				title: `Sample Post ${Date.now()}`,
				content: '# Hello World\n\nThis is a sample post created via API client!',
				tags: ['sample', 'api-test', 'demo'],
				visibility: 'private',
			};
			
			const createdPost = await createPost(samplePost);
			console.log('✅ Post created successfully:', createdPost);
			
			// Refresh the posts list
			await handleFetchPosts();
		} catch (err) {
			const errorMessage = handleApiError(err);
			setError(errorMessage);
			console.error('❌ Failed to create post:', err);
		} finally {
			setIsLoading(false);
		}
	}, [createPost, handleFetchPosts]);

	/**
	 * 🔍 Test originality checking
	 */
	const handleCheckOriginality = useCallback(async () => {
		setIsLoading(true);
		setError(null);
		
		try {
			const testContent = `
				Artificial Intelligence is transforming the way we work and live.
				Machine learning algorithms are becoming more sophisticated every day.
				The future of technology lies in the integration of AI with human creativity.
			`;
			
			const report = await checkOriginality(testContent, 'AI and the Future');
			console.log('✅ Originality report:', report);
			
			// Show results in a simple alert for demo purposes
			alert(`Originality Score: ${report.score}%\nOriginal: ${report.isOriginal}\nSimilar posts found: ${report.similarPosts.length}`);
		} catch (err) {
			const errorMessage = handleApiError(err);
			setError(errorMessage);
			console.error('❌ Failed to check originality:', err);
		} finally {
			setIsLoading(false);
		}
	}, [checkOriginality]);

	/**
	 * 📊 Fetch user analytics
	 */
	const handleGetAnalytics = useCallback(async () => {
		setIsLoading(true);
		setError(null);
		
		try {
			const analytics = await getUserAnalytics();
			console.log('✅ Analytics data:', analytics);
			
			alert(`Your Stats:\nTotal Posts: ${analytics.totalPosts}\nVerified Posts: ${analytics.verifiedPosts}\nAverage Originality Score: ${analytics.averageOriginalityScore}%`);
		} catch (err) {
			const errorMessage = handleApiError(err);
			setError(errorMessage);
			console.error('❌ Failed to fetch analytics:', err);
		} finally {
			setIsLoading(false);
		}
	}, [getUserAnalytics]);

	return (
		<Card className="w-full max-w-4xl mx-auto">
			<CardHeader>
				<CardTitle className="flex items-center gap-2">
					<Icons.Shield className="h-6 w-6 text-primary" />
					API Client Demo - Automatic Token Handling
				</CardTitle>
				<p className="text-sm text-muted-foreground">
					This component demonstrates how the API client automatically adds Bearer tokens to external API requests.
					Check your browser&apos;s Network tab to see the Authorization headers!
				</p>
			</CardHeader>

			<CardContent className="space-y-6">
				{/* Error Display */}
				{error && (
					<div className="p-4 rounded-lg bg-destructive/10 border border-destructive/20">
						<div className="flex items-center gap-2 text-destructive">
							<Icons.X className="h-4 w-4" />
							<span className="font-medium">Error:</span>
						</div>
						<p className="text-sm mt-1 text-destructive/80">{error}</p>
					</div>
				)}

				{/* Action Buttons */}
				<div className="grid grid-cols-1 md:grid-cols-2 gap-4">
					<Button
						onClick={handleFetchPosts}
						disabled={isLoading}
						className="flex items-center gap-2"
						variant="outline"
					>
						{isLoading ? (
							<Icons.Shield className="h-4 w-4 animate-spin" />
						) : (
							<Icons.FileText className="h-4 w-4" />
						)}
						Fetch My Posts
					</Button>

					<Button
						onClick={handleCreateSamplePost}
						disabled={isLoading}
						className="flex items-center gap-2"
						variant="outline"
					>
						{isLoading ? (
							<Icons.Shield className="h-4 w-4 animate-spin" />
						) : (
							<Icons.Plus className="h-4 w-4" />
						)}
						Create Sample Post
					</Button>

					<Button
						onClick={handleCheckOriginality}
						disabled={isLoading}
						className="flex items-center gap-2"
						variant="outline"
					>
						{isLoading ? (
							<Icons.Shield className="h-4 w-4 animate-spin" />
						) : (
							<Icons.Search className="h-4 w-4" />
						)}
						Test Originality Check
					</Button>

					<Button
						onClick={handleGetAnalytics}
						disabled={isLoading}
						className="flex items-center gap-2"
						variant="outline"
					>
						{isLoading ? (
							<Icons.Shield className="h-4 w-4 animate-spin" />
						) : (
							<Icons.TrendingUp className="h-4 w-4" />
						)}
						Get Analytics
					</Button>
				</div>

				{/* Posts Display */}
				{posts.length > 0 && (
					<div className="space-y-4">
						<h3 className="font-semibold text-lg flex items-center gap-2">
							<Icons.Gem className="h-5 w-5 text-primary" />
							Your Posts ({posts.length})
						</h3>
						<div className="grid gap-4">
							{posts.map((post) => (
								<Card key={post.id} className="p-4">
									<div className="flex items-start justify-between">
										<div className="flex-1">
											<h4 className="font-medium">{post.title}</h4>
											<div className="flex items-center gap-2 mt-2">
												<span className="text-xs bg-primary/10 text-primary px-2 py-1 rounded-full">
													{post.status}
												</span>
												<span className="text-xs bg-secondary/10 text-secondary px-2 py-1 rounded-full">
													{post.visibility}
												</span>
											</div>
											{post.tags && post.tags.length > 0 && (
												<div className="flex flex-wrap gap-1 mt-2">
													{post.tags.map((tag, index) => (
														<span
															key={index}
															className="text-xs bg-accent/10 text-accent px-2 py-0.5 rounded"
														>
															#{tag}
														</span>
													))}
												</div>
											)}
										</div>
										{post.originalityScore && (
											<div className="text-right">
												<div className="text-sm font-medium">
													{post.originalityScore}%
												</div>
												<div className="text-xs text-muted-foreground">
													Originality
												</div>
											</div>
										)}
									</div>
								</Card>
							))}
						</div>
					</div>
				)}

				{/* Instructions */}
				<div className="p-4 rounded-lg bg-muted/50 border border-muted">
					<h4 className="font-medium mb-2">🔍 How It Works:</h4>
					<ul className="text-sm text-muted-foreground space-y-1 list-disc pl-5">
						<li>
							<strong>Automatic Token Handling:</strong> The API client automatically retrieves and adds your JWT token to every request
						</li>
						<li>
							<strong>Error Handling:</strong> Built-in error handling with user-friendly messages
						</li>
						<li>
							<strong>TypeScript Support:</strong> Full type safety for requests and responses
						</li>
						<li>
							<strong>Retry Logic:</strong> Automatic retries for failed requests (server errors only)
						</li>
						<li>
							<strong>Timeout Protection:</strong> Requests timeout after 30 seconds by default
						</li>
					</ul>
				</div>

				{/* Code Example */}
				<div className="p-4 rounded-lg bg-background border">
					<h4 className="font-medium mb-3">💻 Usage Example:</h4>
					<pre className="text-xs text-muted-foreground overflow-x-auto">
{`// In your component:
import { usePostApi, handleApiError } from '@/utils/api-service';

const { getPosts, createPost } = usePostApi();

// No need to handle tokens - they're automatic!
const fetchPosts = async () => {
  try {
    const { posts } = await getPosts({ page: 1, limit: 10 });
    console.log('Posts:', posts);
  } catch (error) {
    const message = handleApiError(error);
    console.error(message);
  }
};`}
					</pre>
				</div>
			</CardContent>
		</Card>
	);
};

export { ApiClientExample };
export default ApiClientExample;
