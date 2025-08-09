"use client";

import ProtectedRoute from "@/components/auth/ProtectedRoute";
import { Icons } from "@/components/common/Icons";
import { PostForm } from "@/components/post/PostForm";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { type PostFormData } from "@/types/post";
import { useKonthoKoshApi, handleKonthoKoshError } from "@/utils/konthokosh-api";
import type { KonthoKoshPost } from "@/types/konthokosh-api";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useCallback, useState } from "react";

/**
 * 🚀 New Post Creation Page - Modern, futuristic design
 */
const NewPostPage = () => {
  const router = useRouter();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [createdPost, setCreatedPost] = useState<KonthoKoshPost | null>(null);
  const [errorMessage, setErrorMessage] = useState<string>("");
  
  // 🌐 KonthoKosh API integration with automatic JWT token
  const { createPost } = useKonthoKoshApi();

  /**
   * � Handle form submission (Direct KonthoKosh API)
   */
  const handleSubmit = useCallback(
    async (data: PostFormData) => {
      setIsSubmitting(true);
      setErrorMessage("");
      setCreatedPost(null);

      try {
        console.log("🚀 Creating post on KonthoKosh API...");

        // Combine title and content for the API
        const postContent = `${data.title}\n\n${data.content}`;

        // 🌐 Create post using KonthoKosh API with automatic JWT token
        const newPost = await createPost(postContent);

        console.log("✅ Post created successfully:", newPost);
        setCreatedPost(newPost);
      } catch (error) {
        console.error("❌ Error creating post:", error);
        const friendly = handleKonthoKoshError(error);
        setErrorMessage(friendly);
      } finally {
        setIsSubmitting(false);
      }
    },
  [createPost]
  );

  /**
   * 💾 Handle saving as draft (using KonthoKosh API)
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

  // Reset helpers (not analyzing anymore)
  const handleReset = useCallback(() => {
    setCreatedPost(null);
    setErrorMessage("");
  }, []);

  return (
    <ProtectedRoute>
      <div className="min-h-screen bg-gradient-to-br from-background via-background to-muted/30 relative overflow-hidden">
        {/* Background Effects */}
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:24px_24px]" />
        <div className="absolute top-0 left-1/4 w-96 h-96 bg-primary/5 rounded-full blur-3xl animate-pulse-glow" />
        <div
          className="absolute bottom-0 right-1/4 w-96 h-96 bg-secondary/5 rounded-full blur-3xl animate-pulse-glow"
          style={{ animationDelay: "2s" }}
        />

        <div className="relative mx-auto max-w-4xl px-6 lg:px-8 pt-24 pb-16">
          {/* Header */}
          <div className="mb-8 text-center">
            <div className="flex items-center justify-center gap-4 mb-6">
              <Link href="/dashboard">
                <Button variant="outline" className="group">
                  <Icons.ChevronLeft className="mr-2 h-4 w-4 group-hover:-translate-x-1 transition-transform duration-200" />
                  Back to Dashboard
                </Button>
              </Link>
            </div>

            <h1 className="text-4xl font-bold tracking-tight text-foreground sm:text-5xl mb-4">
              Create New Post
            </h1>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Share your original content with AI-powered originality
              verification and blockchain protection
            </p>
          </div>

          {/* Main Content */}
          <div className="space-y-8">
            {/* Post Form */}
            <div className="animate-fade-in-up">
              <PostForm
                onSubmit={handleSubmit}
                onSaveDraft={handleSaveDraft}
                isSubmitting={isSubmitting}
              />
            </div>

            {/* Error Message */}
            {errorMessage && (
              <Card className="border-l-4 border-l-red-500 bg-red-50 dark:bg-red-900/20 animate-fade-in-up">
                <CardContent className="p-6">
                  <div className="flex items-start gap-3">
                    <div className="flex h-10 w-10 items-center justify-center rounded-full bg-red-100 dark:bg-red-900/40">
                      <Icons.X className="h-5 w-5 text-red-600 dark:text-red-400" />
                    </div>
                    <div>
                      <h3 className="font-semibold text-red-800 dark:text-red-200">
                        Failed to create post
                      </h3>
                      <p className="text-sm text-red-700 dark:text-red-300 mt-1">
                        {errorMessage}
                      </p>
                      <Button variant="outline" size="sm" className="mt-3" onClick={handleReset}>
                        Try Again
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            )}

            {/* Created Post Result */}
            {createdPost && (
              <Card className="border-l-4 border-l-green-500 bg-green-50 dark:bg-green-900/20 animate-fade-in-up">
                <CardContent className="p-6">
                  <div className="flex items-start gap-3">
                    <div className="flex h-10 w-10 items-center justify-center rounded-full bg-green-100 dark:bg-green-900/40">
                      <Icons.Check className="h-5 w-5 text-green-600 dark:text-green-400" />
                    </div>
                    <div className="space-y-2">
                      <h3 className="font-semibold text-green-800 dark:text-green-200">
                        Post created successfully
                      </h3>
                      <div className="text-sm text-green-700 dark:text-green-300">
                        <div><span className="font-medium">ID:</span> {createdPost.id}</div>
                        <div><span className="font-medium">User ID:</span> {createdPost.userId}</div>
                        <div><span className="font-medium">Approved:</span> {createdPost.isApproved ? 'Yes' : 'No'}</div>
                        <div><span className="font-medium">Created:</span> {new Date(createdPost.createdAt).toLocaleString()}</div>
                      </div>
                      <div className="mt-2 p-3 rounded bg-white/70 dark:bg-black/20 border text-sm">
                        <pre className="whitespace-pre-wrap break-words">{createdPost.post}</pre>
                      </div>
                      <div className="flex gap-2 pt-2">
                        <Button size="sm" onClick={() => router.push('/dashboard')}>
                          Go to Dashboard
                        </Button>
                        <Button size="sm" variant="outline" onClick={handleReset}>
                          Create Another
                        </Button>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            )}
          </div>
        </div>
      </div>
    </ProtectedRoute>
  );
};

export default NewPostPage;
