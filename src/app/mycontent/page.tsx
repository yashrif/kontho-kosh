'use client';

import { useState, useCallback } from 'react';
import { Icons } from '@/components/common/Icons';
import { Card, CardContent } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';
import { Badge } from '@/components/ui/badge';
import PageLoader from '@/components/common/PageLoader';
import ProtectedRoute from '@/components/auth/ProtectedRoute';
import ClientNavigation from '@/components/common/ClientNavigation';
import { useBackendApi } from '@/utils/api-client';
import type { KonthoKoshFeedPost } from '@/types/konthokosh-api';

const MyContentPage = () => {
  const api = useBackendApi();
  
  const [posts, setPosts] = useState<KonthoKoshFeedPost[]>([]);
  const [page, setPage] = useState(1);
  const [keyword, setKeyword] = useState('');
  const [searchInput, setSearchInput] = useState('');
  const [isApproved, setIsApproved] = useState<boolean | null>(null); // null means all posts
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [totalPages, setTotalPages] = useState(1);
  const [totalCount, setTotalCount] = useState(0);
  const [hasLoaded, setHasLoaded] = useState(false);

  const loadPosts = useCallback(async (pageNum: number, searchKeyword: string = '', approvalStatus: boolean | null = null) => {
    setLoading(true);
    setError('');
    
    try {
      const params: Record<string, string | number | boolean> = {
        page: pageNum,
        size: 10,
        myPosts: true, // Always true for My Content
      };

      if (searchKeyword) {
        params.keyword = searchKeyword;
      }

      if (approvalStatus !== null) {
        params.isApproved = approvalStatus;
      }

      const response = await api.get('/api/v1/posts', { params });

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

  const handleInitialLoad = () => {
    if (!hasLoaded) {
      loadPosts(1);
    }
  };

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    setKeyword(searchInput);
    setPage(1);
    loadPosts(1, searchInput, isApproved);
  };

  const handleApprovalFilter = (status: boolean | null) => {
    setIsApproved(status);
    setPage(1);
    loadPosts(1, keyword, status);
  };

  const handlePrevPage = () => {
    if (page > 1) {
      const newPage = page - 1;
      setPage(newPage);
      loadPosts(newPage, keyword, isApproved);
    }
  };

  const handleNextPage = () => {
    if (page < totalPages) {
      const newPage = page + 1;
      setPage(newPage);
      loadPosts(newPage, keyword, isApproved);
    }
  };

  // Auto-load on first render
  if (!hasLoaded && !loading) {
    handleInitialLoad();
  }

  if (loading && !hasLoaded) {
    return (
      <ProtectedRoute>
        <div className="min-h-screen">
          <ClientNavigation />
          <div className="pt-16">
            <PageLoader message="Loading your content..." />
          </div>
        </div>
      </ProtectedRoute>
    );
  }

  return (
    <ProtectedRoute>
      <div className="min-h-screen">
        <ClientNavigation />
        <div className="container mx-auto px-4 py-8 pt-24 space-y-6">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-2xl font-semibold flex items-center gap-2">
                <Icons.User className="h-6 w-6 text-primary" />
                My Content
              </h1>
              <p className="text-sm text-muted-foreground mt-1">
                Manage and view all your posts
              </p>
            </div>
            <div className="text-sm text-muted-foreground">{totalCount} posts</div>
          </div>

          {/* Search and Filter Section */}
          <Card className="border-l-4 border-l-secondary/50">
            <CardContent className="p-6 space-y-4">
              <div className="flex flex-col sm:flex-row gap-4">
                {/* Search Form */}
                <form onSubmit={handleSearch} className="flex items-center gap-2 flex-1">
                  <div className="relative flex-1">
                    <Icons.Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                    <Input
                      value={searchInput}
                      onChange={(e) => setSearchInput(e.target.value)}
                      placeholder="Search your posts by content"
                      className="pl-9"
                    />
                  </div>
                  <Button type="submit" className="rounded-full" disabled={loading}>
                    {loading ? 'Searching...' : 'Search'}
                  </Button>
                </form>
              </div>

              {/* Approval Status Filter */}
              <div className="space-y-2">
                <label className="text-sm font-medium">Filter by Status:</label>
                <div className="flex flex-wrap gap-2">
                  <Button
                    variant={isApproved === null ? "default" : "outline"}
                    size="sm"
                    onClick={() => handleApprovalFilter(null)}
                    className="rounded-full"
                  >
                    <Icons.Globe className="mr-2 h-3 w-3" />
                    All Posts
                  </Button>
                  <Button
                    variant={isApproved === true ? "default" : "outline"}
                    size="sm"
                    onClick={() => handleApprovalFilter(true)}
                    className="rounded-full"
                  >
                    <Icons.Check className="mr-2 h-3 w-3" />
                    Approved
                  </Button>
                  <Button
                    variant={isApproved === false ? "default" : "outline"}
                    size="sm"
                    onClick={() => handleApprovalFilter(false)}
                    className="rounded-full"
                  >
                    <Icons.Clock className="mr-2 h-3 w-3" />
                    Pending
                  </Button>
                </div>
              </div>

              {/* Active Filters */}
              {(keyword || isApproved !== null) && (
                <div className="flex flex-wrap gap-2 pt-2 border-t">
                  <span className="text-xs text-muted-foreground">Active filters:</span>
                  {keyword && (
                    <Badge variant="secondary" className="text-xs">
                      Keyword: {keyword}
                      <button
                        onClick={() => {
                          setSearchInput('');
                          setKeyword('');
                          setPage(1);
                          loadPosts(1, '', isApproved);
                        }}
                        className="ml-1 hover:text-destructive"
                      >
                        <Icons.X className="h-3 w-3" />
                      </button>
                    </Badge>
                  )}
                  {isApproved !== null && (
                    <Badge variant="secondary" className="text-xs">
                      Status: {isApproved ? 'Approved' : 'Pending'}
                      <button
                        onClick={() => {
                          setIsApproved(null);
                          setPage(1);
                          loadPosts(1, keyword, null);
                        }}
                        className="ml-1 hover:text-destructive"
                      >
                        <Icons.X className="h-3 w-3" />
                      </button>
                    </Badge>
                  )}
                </div>
              )}
            </CardContent>
          </Card>

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
                      onClick={() => loadPosts(page, keyword, isApproved)}
                    >
                      Retry
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          )}

          {/* Posts Grid */}
          <div className="grid gap-4">
            {posts.length === 0 && hasLoaded && !loading && (
              <Card>
                <CardContent className="p-6 text-center">
                  <div className="flex flex-col items-center gap-4">
                    <div className="flex h-16 w-16 items-center justify-center rounded-full bg-muted">
                      <Icons.FileText className="h-8 w-8 text-muted-foreground" />
                    </div>
                    <div>
                      <h3 className="font-medium">No posts found</h3>
                      <p className="text-sm text-muted-foreground mt-1">
                        {keyword || isApproved !== null 
                          ? "Try adjusting your filters or search terms."
                          : "You haven't created any posts yet. Start sharing your content!"
                        }
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            )}

            {posts.map((post) => (
              <Card key={post.id} className="glow-on-hover">
                <CardContent className="p-6 space-y-3">
                  <div className="flex items-start justify-between">
                    <div className="flex items-center gap-3 flex-1">
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
                      <div className="min-w-0 flex-1">
                        <div className="font-medium truncate">
                          {post.userFirstName || 'User'} {post.userLastName || ''}
                        </div>
                        <div className="text-xs text-muted-foreground">
                          {new Date(post.createdAt).toLocaleString()}
                        </div>
                      </div>
                    </div>
                    
                    {/* Status Badge */}
                    <Badge 
                      variant={post.isApproved ? "default" : "secondary"}
                      className="ml-2"
                    >
                      {post.isApproved ? (
                        <>
                          <Icons.Check className="mr-1 h-3 w-3" />
                          Approved
                        </>
                      ) : (
                        <>
                          <Icons.Clock className="mr-1 h-3 w-3" />
                          Pending
                        </>
                      )}
                    </Badge>
                  </div>

                  <Separator />

                  <div className="text-sm whitespace-pre-wrap break-words">{post.post}</div>

                  <div className="flex items-center justify-between text-xs text-muted-foreground">
                    <div>Post ID: {post.id}</div>
                    <div className="flex items-center gap-4">
                      <span>User ID: {post.userId}</span>
                      <span>Active: {post.isActive ? 'Yes' : 'No'}</span>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          {/* Pagination */}
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
                  <Icons.ChevronLeft className="mr-1 h-4 w-4" />
                  Previous
                </Button>
                <Button 
                  variant="outline" 
                  size="sm" 
                  onClick={handleNextPage} 
                  disabled={page >= totalPages || loading}
                  className="rounded-full"
                >
                  Next
                  <Icons.ChevronRight className="ml-1 h-4 w-4" />
                </Button>
              </div>
            </div>
          )}
        </div>
      </div>
    </ProtectedRoute>
  );
};

export default MyContentPage;
