'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Icons } from '@/components/common/Icons';
import { useKonthoKoshApi, handleKonthoKoshError } from '@/utils/konthokosh-api';

/**
 * 🧪 KonthoKosh API Test Component
 * 
 * This component tests the integration with your Railway backend
 */
const KonthoKoshTestComponent = () => {
	const [result, setResult] = useState<string>('');
	const [isLoading, setIsLoading] = useState(false);
	
	const { createPost } = useKonthoKoshApi();

	/**
	 * 🧪 Test creating a post
	 */
	const testCreatePost = async () => {
		setIsLoading(true);
		setResult('');
		
		try {
			console.log('🧪 Testing KonthoKosh API post creation...');
			
			const testPostContent = `Test post from frontend - ${new Date().toISOString()}`;
			
			const createdPost = await createPost(testPostContent);
			
			setResult(`✅ SUCCESS! Post created:
ID: ${createdPost.id}
User ID: ${createdPost.userId}
Content: ${createdPost.post}
Created: ${createdPost.createdAt}
Approved: ${createdPost.isApproved ? 'Yes' : 'No'}`);

		} catch (error) {
			const errorMessage = handleKonthoKoshError(error);
			setResult(`❌ ERROR: ${errorMessage}`);
			console.error('KonthoKosh API test failed:', error);
		} finally {
			setIsLoading(false);
		}
	};

	return (
		<Card className="w-full max-w-2xl mx-auto">
			<CardHeader>
				<CardTitle className="flex items-center gap-2">
					<Icons.Zap className="h-6 w-6 text-primary" />
					KonthoKosh API Test
				</CardTitle>
				<p className="text-sm text-muted-foreground">
					Test the integration with your Railway backend API
				</p>
			</CardHeader>

			<CardContent className="space-y-4">
				<div className="p-3 rounded-lg bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800">
					<p className="text-sm text-blue-800 dark:text-blue-200">
						<strong>Backend URL:</strong> {process.env.NEXT_PUBLIC_BACKEND_URL || 'Not configured'}
					</p>
					<p className="text-sm text-blue-800 dark:text-blue-200 mt-1">
						<strong>Endpoint:</strong> /api/v1/posts
					</p>
				</div>

				<Button
					onClick={testCreatePost}
					disabled={isLoading}
					className="w-full"
				>
					{isLoading ? (
						<>
							<Icons.Shield className="mr-2 h-4 w-4 animate-spin" />
							Testing API...
						</>
					) : (
						<>
							<Icons.Send className="mr-2 h-4 w-4" />
							Test Create Post
						</>
					)}
				</Button>

				{result && (
					<div className={`p-4 rounded-lg border ${
						result.includes('SUCCESS') 
							? 'bg-green-50 dark:bg-green-900/20 border-green-200 dark:border-green-800 text-green-800 dark:text-green-200'
							: 'bg-red-50 dark:bg-red-900/20 border-red-200 dark:border-red-800 text-red-800 dark:text-red-200'
					}`}>
						<h4 className="font-medium mb-2">Result:</h4>
						<pre className="text-xs whitespace-pre-wrap break-words">
							{result}
						</pre>
					</div>
				)}

				<div className="p-4 rounded-lg bg-muted/50 border">
					<h4 className="font-medium mb-2">ℹ️ How it works:</h4>
					<ul className="text-sm text-muted-foreground space-y-1">
						<li>• Automatically gets JWT token from Clerk</li>
						<li>• Adds Authorization header to request</li>
						<li>• Calls https://konthokosh.up.railway.app/api/v1/posts</li>
						<li>• User ID extracted from JWT on backend</li>
					</ul>
				</div>
			</CardContent>
		</Card>
	);
};

export { KonthoKoshTestComponent };
export default KonthoKoshTestComponent;
