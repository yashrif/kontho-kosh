'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Icons } from '@/components/common/Icons';
import { useBackendApi, ApiError } from '@/utils/api-client';

/**
 * 🎯 Simple example showing automatic Clerk token usage
 * 
 * This demonstrates how the API client automatically gets and uses
 * your JWT token from Clerk's useAuth() hook without any manual work!
 */
const SimpleApiExample = () => {
	const [result, setResult] = useState<string>('');
	const [isLoading, setIsLoading] = useState(false);
	
	// 🔐 This automatically uses Clerk's getToken() internally!
	const api = useBackendApi();

	/**
	 * 📡 Example: Call your external backend API
	 * The Bearer token is automatically added by the API client!
	 */
	const callExternalApi = async () => {
		setIsLoading(true);
		setResult('');
		
		try {
			// 🚀 All these calls automatically include your Clerk JWT token!
			
			// GET request
			const response = await api.get('/api/posts');
			setResult(`✅ GET Success: ${JSON.stringify(response.data, null, 2)}`);
			
			// POST request  
			// const response = await api.post('/api/posts', { 
			//   title: 'My Post', 
			//   content: 'Post content...' 
			// });
			// setResult(`✅ POST Success: ${JSON.stringify(response.data, null, 2)}`);
			
		} catch (error) {
			if (error instanceof ApiError) {
				setResult(`❌ API Error (${error.status}): ${error.message}`);
			} else {
				setResult(`❌ Unknown Error: ${error}`);
			}
			console.error('API call failed:', error);
		} finally {
			setIsLoading(false);
		}
	};

	/**
	 * 📊 Example: Call multiple endpoints
	 */
	const callMultipleEndpoints = async () => {
		setIsLoading(true);
		setResult('');
		
		try {
			// 🔐 All these automatically include your Bearer token!
			const [posts, analytics, profile] = await Promise.all([
				api.get('/api/posts'),
				api.get('/api/analytics'),  
				api.get('/api/profile')
			]);
			
			setResult(`✅ Multiple calls successful:
Posts: ${Array.isArray(posts.data) ? posts.data.length : 0} items
Analytics: ${JSON.stringify(analytics.data)}
Profile: ${(profile.data as { name?: string })?.name || 'Unknown'}`);
			
		} catch (error) {
			if (error instanceof ApiError) {
				setResult(`❌ API Error (${error.status}): ${error.message}`);
			} else {
				setResult(`❌ Unknown Error: ${error}`);
			}
		} finally {
			setIsLoading(false);
		}
	};

	return (
		<Card className="w-full max-w-2xl mx-auto">
			<CardHeader>
				<CardTitle className="flex items-center gap-2">
					<Icons.Zap className="h-6 w-6 text-primary" />
					Automatic Clerk Token API Client
				</CardTitle>
				<p className="text-sm text-muted-foreground">
					No manual token handling required! The API client automatically gets your JWT token from Clerk.
				</p>
			</CardHeader>

			<CardContent className="space-y-4">
				{/* Action Buttons */}
				<div className="flex flex-wrap gap-3">
					<Button
						onClick={callExternalApi}
						disabled={isLoading}
						className="flex items-center gap-2"
					>
						{isLoading ? (
							<Icons.Shield className="h-4 w-4 animate-spin" />
						) : (
							<Icons.Globe className="h-4 w-4" />
						)}
						Call External API
					</Button>

					<Button
						onClick={callMultipleEndpoints}
						disabled={isLoading}
						variant="outline"
						className="flex items-center gap-2"
					>
						{isLoading ? (
							<Icons.Shield className="h-4 w-4 animate-spin" />
						) : (
							<Icons.Target className="h-4 w-4" />
						)}
						Multiple Endpoints
					</Button>
				</div>

				{/* Result Display */}
				{result && (
					<div className="p-4 rounded-lg bg-muted/50 border">
						<h4 className="font-medium mb-2">Result:</h4>
						<pre className="text-xs whitespace-pre-wrap break-words">
							{result}
						</pre>
					</div>
				)}

				{/* Code Example */}
				<div className="p-4 rounded-lg bg-background border">
					<h4 className="font-medium mb-3">💻 Usage Example:</h4>
					<pre className="text-xs text-muted-foreground overflow-x-auto">
{`import { useBackendApi } from '@/utils/api-client';

const MyComponent = () => {
  // 🔐 Automatically uses Clerk's getToken()!
  const api = useBackendApi();

  const fetchData = async () => {
    // Bearer token automatically added!
    const response = await api.get('/api/posts');
    console.log('Posts:', response.data);
  };

  const createPost = async () => {
    // Bearer token automatically added!
    const response = await api.post('/api/posts', {
      title: 'My Post',
      content: 'Content...'
    });
  };
};`}
					</pre>
				</div>

				{/* Environment Setup */}
				<div className="p-4 rounded-lg bg-primary/5 border border-primary/20">
					<h4 className="font-medium mb-2 text-primary">⚙️ Setup Required:</h4>
					<p className="text-sm text-muted-foreground mb-2">
						Add your backend URL to <code>.env.local</code>:
					</p>
					<pre className="text-xs bg-background p-2 rounded border">
						NEXT_PUBLIC_BACKEND_URL=https://your-backend.com/api
					</pre>
				</div>
			</CardContent>
		</Card>
	);
};

export { SimpleApiExample };
export default SimpleApiExample;
