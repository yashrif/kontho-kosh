"use client";

import { useState, useCallback } from 'react';
import { Icons } from '@/components/common/Icons';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { PostForm } from '@/components/post/PostForm';
import { useKonthoKoshApi, handleKonthoKoshError } from '@/utils/konthokosh-api';
import type { KonthoKoshPost } from '@/types/konthokosh-api';
import type { PostFormData } from '@/types/post';

type CreatePostSectionProps = {
	onPostCreated?: () => void;
};

/**
 * 🚀 Create Post Section Component for Feed
 * 
 * @param onPostCreated - Callback when a post is successfully created
 */
const CreatePostSection = ({ onPostCreated }: CreatePostSectionProps) => {
	const { createPost } = useKonthoKoshApi();
	
	const [showCreatePost, setShowCreatePost] = useState(false);
	const [isSubmitting, setIsSubmitting] = useState(false);
	const [createdPost, setCreatedPost] = useState<KonthoKoshPost | null>(null);
	const [createErrorMessage, setCreateErrorMessage] = useState<string>("");

	/**
	 * 🚀 Handle post creation submission
	 */
	const handleCreatePost = useCallback(
		async (data: PostFormData) => {
			setIsSubmitting(true);
			setCreateErrorMessage("");
			setCreatedPost(null);

			try {
				console.log("🚀 Creating post on KonthoKosh API...");

				// Combine title and content for the API
				const postContent = `${data.title}\n\n${data.content}`;

				// 🌐 Create post using KonthoKosh API with automatic JWT token
				const newPost = await createPost(postContent);

				console.log("✅ Post created successfully:", newPost);
				setCreatedPost(newPost);
				setShowCreatePost(false);
				
				// Notify parent component
				onPostCreated?.();
			} catch (error) {
				console.error("❌ Error creating post:", error);
				const friendly = handleKonthoKoshError(error);
				setCreateErrorMessage(friendly);
			} finally {
				setIsSubmitting(false);
			}
		},
		[createPost, onPostCreated]
	);

	/**
	 * 💾 Handle saving as draft
	 */
	const handleSaveDraft = useCallback(async (data: PostFormData) => {
		try {
			console.log("💾 Saving draft to KonthoKosh API...");

			// Combine title and content for the API, mark as draft
			const draftContent = `[DRAFT] ${data.title}\n\n${data.content}`;
			
			// 🌐 Save draft using KonthoKosh API with automatic JWT token
			const savedDraft = await createPost(draftContent);
			
			console.log("✅ Draft saved successfully:", savedDraft);
			alert("Draft saved successfully to KonthoKosh!");
		} catch (error) {
			console.error("❌ Error saving draft:", error);
			const errorMessage = handleKonthoKoshError(error);
			alert(`Failed to save draft: ${errorMessage}`);
		}
	}, [createPost]);

	/**
	 * 🔄 Reset create post state
	 */
	const handleResetCreatePost = useCallback(() => {
		setCreatedPost(null);
		setCreateErrorMessage("");
	}, []);

	return (
		<div className="space-y-4">
			{/* Toggle Button */}
			<div className="flex justify-end">
				<Button 
					onClick={() => setShowCreatePost(!showCreatePost)} 
					className="rounded-full"
				>
					<Icons.Plus className="mr-2 h-4 w-4" />
					{showCreatePost ? 'Cancel' : 'Create Post'}
				</Button>
			</div>

			{/* Create Post Section */}
			{showCreatePost && (
				<Card className="border-l-4 border-l-primary/50 bg-gradient-to-r from-primary/5 to-transparent animate-fade-in-up">
					<CardContent className="p-6">
						<div className="mb-4">
							<h2 className="text-lg font-semibold flex items-center gap-2">
								<Icons.Edit className="h-5 w-5 text-primary" />
								Create New Post
							</h2>
							<p className="text-sm text-muted-foreground mt-1">
								Share your original content with AI-powered originality verification
							</p>
						</div>
						
						<PostForm
							onSubmit={handleCreatePost}
							onSaveDraft={handleSaveDraft}
							isSubmitting={isSubmitting}
						/>

						{/* Create Error Message */}
						{createErrorMessage && (
							<Card className="border-l-4 border-l-red-500 bg-red-50 dark:bg-red-900/20 mt-4 animate-fade-in-up">
								<CardContent className="p-4">
									<div className="flex items-start gap-3">
										<div className="flex h-8 w-8 items-center justify-center rounded-full bg-red-100 dark:bg-red-900/40">
											<Icons.X className="h-4 w-4 text-red-600 dark:text-red-400" />
										</div>
										<div>
											<h3 className="font-semibold text-red-800 dark:text-red-200 text-sm">
												Failed to create post
											</h3>
											<p className="text-sm text-red-700 dark:text-red-300 mt-1">
												{createErrorMessage}
											</p>
											<Button variant="outline" size="sm" className="mt-2" onClick={handleResetCreatePost}>
												Try Again
											</Button>
										</div>
									</div>
								</CardContent>
							</Card>
						)}

						{/* Created Post Result */}
						{createdPost && (
							<Card className="border-l-4 border-l-green-500 bg-green-50 dark:bg-green-900/20 mt-4 animate-fade-in-up">
								<CardContent className="p-4">
									<div className="flex items-start gap-3">
										<div className="flex h-8 w-8 items-center justify-center rounded-full bg-green-100 dark:bg-green-900/40">
											<Icons.Check className="h-4 w-4 text-green-600 dark:text-green-400" />
										</div>
										<div className="space-y-2">
											<h3 className="font-semibold text-green-800 dark:text-green-200 text-sm">
												Post created successfully
											</h3>
											<div className="text-sm text-green-700 dark:text-green-300">
												<div><span className="font-medium">ID:</span> {createdPost.id}</div>
												<div><span className="font-medium">User ID:</span> {createdPost.userId}</div>
												<div><span className="font-medium">Approved:</span> {createdPost.isApproved ? 'Yes' : 'No'}</div>
												<div><span className="font-medium">Created:</span> {new Date(createdPost.createdAt).toLocaleString()}</div>
											</div>
											<Button size="sm" variant="outline" onClick={handleResetCreatePost}>
												Create Another
											</Button>
										</div>
									</div>
								</CardContent>
							</Card>
						)}
					</CardContent>
				</Card>
			)}
		</div>
	);
};

export { CreatePostSection };
