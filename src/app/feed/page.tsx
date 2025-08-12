'use client';

import { useState, useCallback } from 'react';
import { Icons } from '@/components/common/Icons';
import { Card, CardContent } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';
import PageLoader from '@/components/common/PageLoader';
import ClientNavigation from '@/components/common/ClientNavigation';
import { CreatePostSection } from '@/components/feed/CreatePostSection';
import { useBackendApi } from '@/utils/api-client';
import type { KonthoKoshFeedPost } from '@/types/konthokosh-api';

const FeedPage = () => {
  const api = useBackendApi();
  
  const [posts, setPosts] = useState<KonthoKoshFeedPost[]>([]);
  const [page, setPage] = useState(1);
  const [keyword, setKeyword] = useState('');
  const [searchInput, setSearchInput] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [totalPages, setTotalPages] = useState(1);
  const [totalCount, setTotalCount] = useState(0);
  const [hasLoaded, setHasLoaded] = useState(false);

  const loadPosts = useCallback(async (pageNum: number, searchKeyword: string = '') => {
    setLoading(true);
    setError('');
    
    try {
      const response = await api.get('/api/v1/posts', {
        params: {
          page: pageNum,
          size: 10,
          ...(searchKeyword ? { keyword: searchKeyword } : {})
        }
      });

      const data = response.data as { success: boolean; data: { data: KonthoKoshFeedPost[]; pagination: { totalPages: number; totalCount: number; } } };
      if (data.success && data.data) {
        setPosts(data.data.data);
        setTotalPages(data.data.pagination.totalPages);
        setTotalCount(data.data.pagination.totalCount);
      } else {
        setError('Failed to load posts');
      }
    } catch {
      setError('Network error. Please try again.');
    } finally {
      setLoading(false);
      setHasLoaded(true);
    }
  }, [api]);

  /**
   * � Handle when a post is created to refresh the feed
   */
  const handlePostCreated = useCallback(() => {
    loadPosts(1, keyword);
    setPage(1);
  }, [loadPosts, keyword]);

  const handleInitialLoad = () => {
    if (!hasLoaded) {
      loadPosts(1);
    }
  };

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    setKeyword(searchInput);
    setPage(1);
    loadPosts(1, searchInput);
  };

  const handlePrevPage = () => {
    if (page > 1) {
      const newPage = page - 1;
      setPage(newPage);
      loadPosts(newPage, keyword);
    }
  };

  const handleNextPage = () => {
    if (page < totalPages) {
      const newPage = page + 1;
      setPage(newPage);
      loadPosts(newPage, keyword);
    }
  };

  // Auto-load on first render
  if (!hasLoaded && !loading) {
    handleInitialLoad();
  }

  if (loading && !hasLoaded) {
    return (
      <div className="min-h-screen">
        <ClientNavigation />
        <div className="pt-16">
          <PageLoader message="Loading feed..." />
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen">
      <ClientNavigation />
      <div className="container mx-auto px-4 py-8 pt-24 space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-semibold">Feed</h1>
        <div className="text-sm text-muted-foreground">{totalCount} posts</div>
      </div>

      {/* Create Post Section */}
      <CreatePostSection onPostCreated={handlePostCreated} />

      <form onSubmit={handleSearch} className="flex items-center gap-2">
        <div className="relative flex-1">
          <Icons.Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input
            value={searchInput}
            onChange={(e) => setSearchInput(e.target.value)}
            placeholder="Search posts by content"
            className="pl-9"
          />
        </div>
        <Button type="submit" className="rounded-full" disabled={loading}>
          {loading ? 'Searching...' : 'Search'}
        </Button>
      </form>

      {error && (
        <Card className="border-l-4 border-l-red-500 bg-red-50 dark:bg-red-900/20">
          <CardContent className="p-4">
            <div className="flex items-start gap-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-full bg-red-100 dark:bg-red-900/40">
                <Icons.X className="h-5 w-5 text-red-600 dark:text-red-400" />
              </div>
              <div>
                <p className="text-sm text-red-700 dark:text-red-300">{error}</p>
                <Button 
                  variant="outline" 
                  size="sm" 
                  className="mt-2" 
                  onClick={() => loadPosts(page, keyword)}
                >
                  Retry
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>
      )}

      <div className="grid gap-4">
        {posts.length === 0 && hasLoaded && !loading && (
          <Card>
            <CardContent className="p-6 text-sm text-muted-foreground">
              No posts found. {keyword && `Try a different search term.`}
            </CardContent>
          </Card>
        )}

        {posts.map((post) => (
          <Card key={post.id} className="glow-on-hover">
            <CardContent className="p-6 space-y-3">
              <div className="flex items-center gap-3">
                <div className="h-10 w-10 rounded-full bg-muted flex items-center justify-center overflow-hidden">
                  {post.userImageUrl ? (
                    // eslint-disable-next-line @next/next/no-img-element
                    <img 
                      src={post.userImageUrl} 
                      alt={post.userFirstName || 'User'} 
                      className="h-full w-full object-cover" 
                    />
                  ) : (
                    <Icons.User className="h-5 w-5 text-muted-foreground" />
                  )}
                </div>
                <div className="min-w-0">
                  <div className="font-medium truncate">
                    {post.userFirstName || 'User'} {post.userLastName || ''}
                  </div>
                  <div className="text-xs text-muted-foreground">
                    {new Date(post.createdAt).toLocaleString()}
                  </div>
                </div>
              </div>

              <Separator />

              <div className="text-sm whitespace-pre-wrap break-words">{post.post}</div>

              <div className="flex items-center justify-between text-xs text-muted-foreground">
                <div>ID: {post.id}</div>
                <div>Approved: {post.isApproved ? 'Yes' : 'No'}</div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {totalPages > 1 && (
        <div className="flex items-center justify-between pt-4">
          <div className="text-sm text-muted-foreground">
            Page {page} of {totalPages}
          </div>
          <div className="flex gap-2">
            <Button 
              variant="outline" 
              size="sm" 
              onClick={handlePrevPage} 
              disabled={page <= 1 || loading}
              className="rounded-full"
            >
              Prev
            </Button>
            <Button 
              variant="outline" 
              size="sm" 
              onClick={handleNextPage} 
              disabled={page >= totalPages || loading}
              className="rounded-full"
            >
              Next
            </Button>
          </div>
        </div>
      )}
      </div>
    </div>
  );
};

export default FeedPage;
