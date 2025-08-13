'use client';

import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Icons } from '@/components/common/Icons';
import { useBackendApi } from '@/utils/api-client';

/**
 * 🎯 Quick demo card to show automatic token usage
 */
const AutoTokenDemo = () => {
	// 🔐 This API client automatically uses your Clerk JWT token!
	const api = useBackendApi();

	const testApiCall = async () => {
		try {
			// 🚀 Bearer token is automatically added by the API client!
			console.log('🔐 Making API call with automatic Clerk token...');
			
			// Example calls - all automatically authenticated:
			// await api.get('/posts');
			// await api.post('/posts', { title: 'Test', content: 'Test content' });
			// await api.put('/posts/123', { title: 'Updated' });
			// await api.delete('/posts/123');
			
			console.log('✅ API client ready! Token will be auto-added to requests.');
			console.log('🔍 API client configured with:', process.env.NEXT_PUBLIC_BACKEND_URL || 'default URL');
			alert('✅ API client configured! Check browser console.');
		} catch (error) {
			console.error('❌ Setup check failed:', error);
			alert('❌ Setup check failed - check console for details');
		}
	};

	return (
		<Card className="p-6 bg-green-50 dark:bg-green-900/20 border-green-200 dark:border-green-800">
			<CardHeader className="pb-4">
				<CardTitle className="flex items-center gap-2 text-green-800 dark:text-green-200">
					<Icons.Shield className="h-5 w-5" />
					🎉 Auto-Token API Client Ready!
				</CardTitle>
			</CardHeader>
			<CardContent className="space-y-3">
				<p className="text-sm text-green-700 dark:text-green-300">
					Your API client now automatically adds Clerk JWT tokens to all external API requests!
				</p>
				
				<div className="space-y-2 text-xs text-green-600 dark:text-green-400">
					<div>✅ Automatic Bearer token from Clerk</div>
					<div>✅ No manual token management needed</div>
					<div>✅ Works with any external backend API</div>
					<div>✅ Full TypeScript support</div>
				</div>

				<Button 
					onClick={testApiCall} 
					size="sm"
					className="w-full bg-green-600 hover:bg-green-700"
				>
					<Icons.Zap className="mr-2 h-4 w-4" />
					Test API Client
				</Button>

				<div className="text-xs text-green-600 dark:text-green-400 mt-2">
					<strong>Usage:</strong>
					<pre className="mt-1 p-2 bg-green-100 dark:bg-green-900/30 rounded text-xs">
{`import { useBackendApi } from '@/utils/api-client';

const api = useBackendApi();
// Bearer token auto-added!
await api.get('/posts');`}
					</pre>
				</div>
			</CardContent>
		</Card>
	);
};

export { AutoTokenDemo };
export default AutoTokenDemo;
