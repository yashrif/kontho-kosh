'use client';

import { useEffect, useMemo, useState, useCallback } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { Icons } from '@/components/common/Icons';
import { Card, CardContent } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';
import PageLoader from '@/components/common/PageLoader';
import { useKonthoKoshApi, handleKonthoKoshError } from '@/utils/konthokosh-api';
import type { KonthoKoshFeedPost } from '@/types/konthokosh-api';

const PAGE_SIZE_DEFAULT = 10;

const FeedPage = () => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const { getFeedPosts } = useKonthoKoshApi();

  const [posts, setPosts] = useState<KonthoKoshFeedPost[]>([]);
  const [page, setPage] = useState<number>(() => Number(searchParams.get('page')) || 1);
  const [size] = useState<number>(() => Number(searchParams.get('size')) || PAGE_SIZE_DEFAULT);
  const [keyword, setKeyword] = useState<string>(() => searchParams.get('keyword') || '');
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string>('');
  const [totalPages, setTotalPages] = useState<number>(1);
  const [totalCount, setTotalCount] = useState<number>(0);

  const canPrev = useMemo(() => page > 1, [page]);
  const canNext = useMemo(() => page < totalPages, [page, totalPages]);

  const syncUrl = useCallback((p: number, s: number, k: string) => {
    const params = new URLSearchParams();
    params.set('page', String(p));
    params.set('size', String(s));
    if (k) params.set('keyword', k);
    router.replace(`/feed?${params.toString()}`);
  }, [router]);

  const fetchData = useCallback(async () => {
    setLoading(true);
    setError('');
    try {
      const { posts: data, pagination } = await getFeedPosts({ page, size, keyword: keyword || undefined });
      setPosts(data);
      setTotalPages(pagination.totalPages);
      setTotalCount(pagination.totalCount);
    } catch (err) {
      setError(handleKonthoKoshError(err));
    } finally {
      setLoading(false);
    }
  }, [getFeedPosts, page, size, keyword]);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  const handleSearchSubmit = useCallback((e: React.FormEvent) => {
    e.preventDefault();
    setPage(1);
    syncUrl(1, size, keyword);
  }, [syncUrl, size, keyword]);

  const handlePrev = useCallback(() => {
    if (!canPrev) return;
    const newPage = page - 1;
    setPage(newPage);
    syncUrl(newPage, size, keyword);
  }, [canPrev, page, syncUrl, size, keyword]);

  const handleNext = useCallback(() => {
    if (!canNext) return;
    const newPage = page + 1;
    setPage(newPage);
    syncUrl(newPage, size, keyword);
  }, [canNext, page, syncUrl, size, keyword]);

  if (loading) {
    return <PageLoader message="Loading feed..." />;
  }

  return (
    <div className="container mx-auto px-4 py-8 space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-semibold">Feed</h1>
        <div className="text-sm text-muted-foreground">{totalCount} posts</div>
      </div>

      <form onSubmit={handleSearchSubmit} className="flex items-center gap-2">
        <div className="relative flex-1">
          <Icons.Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input
            value={keyword}
            onChange={(e) => setKeyword(e.target.value)}
            placeholder="Search posts by content"
            className="pl-9"
          />
        </div>
        <Button type="submit" className="rounded-full">
          Search
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
              </div>
            </div>
          </CardContent>
        </Card>
      )}

      <div className="grid gap-4">
        {posts.length === 0 && (
          <Card>
            <CardContent className="p-6 text-sm text-muted-foreground">No posts found.</CardContent>
          </Card>
        )}

        {posts.map((p) => (
          <Card key={p.id} className="glow-on-hover">
            <CardContent className="p-6 space-y-3">
              <div className="flex items-center gap-3">
                <div className="h-10 w-10 rounded-full bg-muted flex items-center justify-center overflow-hidden">
                  {p.userImageUrl ? (
                    // eslint-disable-next-line @next/next/no-img-element
                    <img src={p.userImageUrl} alt={p.userFirstName || 'User'} className="h-full w-full object-cover" />
                  ) : (
                    <Icons.User className="h-5 w-5 text-muted-foreground" />
                  )}
                </div>
                <div className="min-w-0">
                  <div className="font-medium truncate">{p.userFirstName || 'User'} {p.userLastName || ''}</div>
                  <div className="text-xs text-muted-foreground">{new Date(p.createdAt).toLocaleString()}</div>
                </div>
              </div>

              <Separator />

              <div className="text-sm whitespace-pre-wrap break-words">{p.post}</div>

              <div className="flex items-center justify-between text-xs text-muted-foreground">
                <div>ID: {p.id}</div>
                <div>Approved: {p.isApproved ? 'Yes' : 'No'}</div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      <div className="flex items-center justify-between pt-4">
        <div className="text-sm text-muted-foreground">Page {page} of {totalPages}</div>
        <div className="flex gap-2">
          <Button variant="outline" size="sm" onClick={handlePrev} disabled={!canPrev} className="rounded-full">
            Prev
          </Button>
          <Button variant="outline" size="sm" onClick={handleNext} disabled={!canNext} className="rounded-full">
            Next
          </Button>
        </div>
      </div>
    </div>
  );
};

export default FeedPage;
