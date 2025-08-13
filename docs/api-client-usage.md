# 🌐 API Client Documentation

This document explains how to use the automatic Bearer token API client utility in your Next.js application.

## 📋 Table of Contents

1. [Overview](#overview)
2. [Setup](#setup)
3. [Basic Usage](#basic-usage)
4. [API Client Hook](#api-client-hook)
5. [Server-Side Usage](#server-side-usage)
6. [Error Handling](#error-handling)
7. [Configuration](#configuration)
8. [Examples](#examples)

## 🎯 Overview

The API client utility automatically handles JWT Bearer token authentication for all your external API requests. No need to manually add tokens to every request - it's all handled automatically!

### ✨ Key Features

- 🔐 **Automatic Token Handling**: JWT tokens are automatically retrieved from Clerk and added to requests
- 🎯 **TypeScript Support**: Full type safety for requests and responses
- ⚡ **React Hook**: Easy-to-use hook for client components
- 🌐 **Server Support**: Standalone client for server-side operations
- ❌ **Error Handling**: Built-in error handling with user-friendly messages
- 🔄 **Retry Logic**: Automatic retries for failed requests (server errors only)
- ⏱️ **Timeout Protection**: Configurable request timeouts
- 📝 **Request Logging**: Automatic logging of authenticated requests

## 🛠️ Setup

### 1. Environment Variables

Add your backend API URL to your `.env.local` file:

```bash
# .env.local
NEXT_PUBLIC_BACKEND_URL=https://your-backend-api.com/api/v1
```

### 2. Import the Utilities

```typescript
// For React components (hooks)
import { useApiClient, usePostApi } from '@/utils/api-client';

// For server-side usage
import { createApiClient, PostApiService } from '@/utils/api-service';

// For error handling
import { handleApiError, retryOperation } from '@/utils/api-service';
```

## 🚀 Basic Usage

### Client Components (React Hooks)

```tsx
'use client';

import { useApiClient } from '@/utils/api-client';
import { handleApiError } from '@/utils/api-service';

const MyComponent = () => {
  const apiClient = useApiClient({
    baseURL: 'https://your-api.com/api',
  });

  const fetchData = async () => {
    try {
      // 🔐 Bearer token is automatically added!
      const response = await apiClient.get('/posts');
      console.log('Posts:', response.data);
    } catch (error) {
      const message = handleApiError(error);
      console.error('Error:', message);
    }
  };

  return (
    <button onClick={fetchData}>
      Fetch Posts
    </button>
  );
};
```

### Server-Side Usage

```typescript
// app/api/posts/route.ts
import { auth } from '@clerk/nextjs/server';
import { createApiClient } from '@/utils/api-client';

export async function GET() {
  const { getToken } = await auth();
  const token = await getToken();
  
  const apiClient = createApiClient({
    baseURL: process.env.BACKEND_URL,
  }, token);

  try {
    const response = await apiClient.get('/posts');
    return Response.json(response.data);
  } catch (error) {
    return Response.json(
      { error: 'Failed to fetch posts' },
      { status: 500 }
    );
  }
}
```

## 🎣 API Client Hook

The `useApiClient` hook provides a configured API client with automatic authentication:

```tsx
import { useApiClient } from '@/utils/api-client';

const apiClient = useApiClient({
  baseURL: 'https://api.example.com',
  timeout: 30000,
  defaultHeaders: {
    'X-API-Version': '1.0',
  },
});

// Available methods:
const response = await apiClient.get('/endpoint');
const response = await apiClient.post('/endpoint', data);
const response = await apiClient.put('/endpoint', data);
const response = await apiClient.patch('/endpoint', data);
const response = await apiClient.delete('/endpoint');

// Custom request:
const response = await apiClient.request({
  url: '/custom',
  method: 'POST',
  headers: { 'Custom-Header': 'value' },
  params: { page: 1, limit: 10 },
  skipAuth: false, // Set to true to skip authentication
});
```

## 🍽️ Pre-built API Service

For common operations, use the pre-built `usePostApi` hook:

```tsx
import { usePostApi, handleApiError } from '@/utils/api-service';

const MyComponent = () => {
  const {
    getPosts,
    createPost,
    updatePost,
    deletePost,
    checkOriginality,
    getUserAnalytics,
  } = usePostApi();

  const handleCreatePost = async () => {
    try {
      const postData = {
        title: 'My Post',
        content: 'Post content...',
        tags: ['tag1', 'tag2'],
        visibility: 'public',
      };

      const createdPost = await createPost(postData);
      console.log('Created:', createdPost);
    } catch (error) {
      const message = handleApiError(error);
      console.error('Error:', message);
    }
  };

  const handleCheckOriginality = async () => {
    try {
      const report = await checkOriginality(
        'Content to check...',
        'Post Title'
      );
      console.log('Originality Score:', report.score);
    } catch (error) {
      const message = handleApiError(error);
      console.error('Error:', message);
    }
  };
};
```

## 🌐 Server-Side Usage

For server-side operations, use the `PostApiService` class:

```typescript
// app/api/analyze/route.ts
import { auth } from '@clerk/nextjs/server';
import { PostApiService } from '@/utils/api-service';

export async function POST(request: Request) {
  const { getToken } = await auth();
  const token = await getToken();
  
  if (!token) {
    return Response.json({ error: 'Unauthorized' }, { status: 401 });
  }

  const postApiService = new PostApiService(token);
  const { content, title } = await request.json();

  try {
    const report = await postApiService.checkOriginality(content, title);
    return Response.json({ success: true, data: report });
  } catch (error) {
    console.error('Analysis failed:', error);
    return Response.json(
      { error: 'Analysis failed' },
      { status: 500 }
    );
  }
}
```

## ❌ Error Handling

The API client includes comprehensive error handling:

```tsx
import { ApiError, handleApiError, retryOperation } from '@/utils/api-service';

// Basic error handling:
try {
  const response = await apiClient.get('/posts');
} catch (error) {
  if (error instanceof ApiError) {
    console.log('Status:', error.status);
    console.log('Response:', error.response);
  }
  
  // Get user-friendly error message:
  const message = handleApiError(error);
  console.log('User Message:', message);
}

// Retry failed operations:
const fetchWithRetry = () => retryOperation(
  () => apiClient.get('/posts'),
  3, // max retries
  1000 // delay in ms
);
```

### Error Status Codes

The API client handles these error scenarios:

- `401`: Authentication failed (token expired/invalid)
- `403`: Permission denied
- `404`: Resource not found
- `429`: Rate limit exceeded
- `500+`: Server errors (automatically retried)
- `0`: Network errors (connection failed, timeout)

## ⚙️ Configuration

### Default Configuration

```typescript
export const DEFAULT_API_CONFIG = {
  baseURL: process.env.NEXT_PUBLIC_API_BASE_URL || '',
  timeout: 30000, // 30 seconds
  defaultHeaders: {
    'Accept': 'application/json',
    'Content-Type': 'application/json',
  },
};
```

### Custom Configuration

```typescript
const apiClient = useApiClient({
  baseURL: 'https://api.example.com/v2',
  timeout: 60000, // 1 minute
  defaultHeaders: {
    'X-API-Key': 'your-api-key',
    'X-Client-Version': '2.0.0',
  },
});
```

## 📚 Examples

### Example 1: Fetch User Posts

```tsx
import { usePostApi, handleApiError } from '@/utils/api-service';

const UserPostsList = () => {
  const [posts, setPosts] = useState([]);
  const { getPosts } = usePostApi();

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const { posts } = await getPosts({ 
          page: 1, 
          limit: 20,
          status: 'published' 
        });
        setPosts(posts);
      } catch (error) {
        console.error(handleApiError(error));
      }
    };

    fetchPosts();
  }, [getPosts]);

  return (
    <div>
      {posts.map(post => (
        <div key={post.id}>{post.title}</div>
      ))}
    </div>
  );
};
```

### Example 2: Upload with Progress

```tsx
const FileUpload = () => {
  const apiClient = useApiClient();

  const uploadFile = async (file: File) => {
    const formData = new FormData();
    formData.append('file', file);

    try {
      // Custom request for file upload
      const response = await apiClient.request({
        url: '/upload',
        method: 'POST',
        body: formData,
        headers: {
          // Don't set Content-Type - let browser set it with boundary
        },
      });

      console.log('Upload successful:', response.data);
    } catch (error) {
      console.error('Upload failed:', handleApiError(error));
    }
  };

  return (
    <input
      type="file"
      onChange={(e) => {
        const file = e.target.files?.[0];
        if (file) uploadFile(file);
      }}
    />
  );
};
```

### Example 3: Real-time Updates

```tsx
const RealtimeData = () => {
  const apiClient = useApiClient();
  const [data, setData] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await apiClient.get('/realtime-data');
        setData(response.data);
      } catch (error) {
        console.error(handleApiError(error));
      }
    };

    fetchData();
    const interval = setInterval(fetchData, 5000); // Poll every 5 seconds

    return () => clearInterval(interval);
  }, [apiClient]);

  return (
    <div>
      {data ? JSON.stringify(data, null, 2) : 'Loading...'}
    </div>
  );
};
```

## 🔒 Security Notes

1. **Token Storage**: Tokens are handled by Clerk and stored securely
2. **Automatic Refresh**: Clerk automatically handles token refresh
3. **HTTPS Only**: Always use HTTPS in production
4. **Environment Variables**: Store API URLs in environment variables
5. **Error Logging**: Don't log sensitive data in error messages

## 🚀 Best Practices

1. **Use TypeScript**: Define types for your API responses
2. **Error Boundaries**: Wrap components in error boundaries
3. **Loading States**: Always show loading indicators
4. **Retry Logic**: Use retry for transient failures
5. **Caching**: Consider using React Query or SWR for caching
6. **Testing**: Mock API calls in tests

## 🤝 Contributing

To add new API endpoints or functionality:

1. Add the endpoint to `API_ENDPOINTS` in `api-service.ts`
2. Create typed response interfaces
3. Add methods to `usePostApi` hook
4. Update documentation
5. Add tests for new functionality

---

## 📞 Support

If you encounter issues:

1. Check browser Network tab for request details
2. Verify environment variables are set correctly
3. Check Clerk authentication status
4. Review server logs for backend issues
5. Test with the included example component
