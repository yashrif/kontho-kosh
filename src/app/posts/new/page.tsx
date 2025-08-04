"use client";

import ProtectedRoute from "@/components/auth/ProtectedRoute";
import { Icons } from "@/components/common/Icons";
import { PostForm } from "@/components/post/PostForm";
import { PostStatusCard } from "@/components/post/PostStatusCard";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import {
  type OriginalityReport,
  type PostFormData,
  type PostStatus,
} from "@/types/post";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useCallback, useState } from "react";

/**
 * 🚀 New Post Creation Page - Modern, futuristic design
 */
const NewPostPage = () => {
  const router = useRouter();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [postStatus, setPostStatus] = useState<PostStatus>("draft");
  const [originalityReport, setOriginalityReport] =
    useState<OriginalityReport>();
  const [showStatusCard, setShowStatusCard] = useState(false);

  /**
   * 🔍 Simulate AI originality analysis
   */
  const simulateOriginalityAnalysis =
    useCallback(async (): Promise<OriginalityReport> => {
      // Simulate API delay
      await new Promise((resolve) => setTimeout(resolve, 3000));

      // Mock originality report
      const mockReport: OriginalityReport = {
        score: Math.floor(Math.random() * 30) + 70, // 70-100% original
        isOriginal: true,
        confidence: 0.95,
        similarPosts: [
          {
            id: "1",
            title: "Understanding Blockchain Technology",
            author: "TechWriter123",
            similarity: 15,
            source: "Medium",
            url: "https://medium.com/example",
          },
          {
            id: "2",
            title: "Web3 and the Future",
            author: "CryptoExpert",
            similarity: 8,
            source: "Dev.to",
            url: "https://dev.to/example",
          },
        ],
        analysisDetails: {
          plagiarismPercentage: 5,
          uniqueContent: 95,
          sourcesFound: 15420,
        },
      };

      return mockReport;
    }, []);

  /**
   * 📤 Handle form submission with originality check
   */
  const handleSubmit = useCallback(
    async (data: PostFormData) => {
      setIsSubmitting(true);
      setShowStatusCard(true);
      setPostStatus("analyzing");

      try {
        // Step 1: Start originality analysis
        console.log("Starting originality analysis for:", data.title);

        const report = await simulateOriginalityAnalysis();
        setOriginalityReport(report);

        if (report.score >= 70) {
          // Step 2: If original enough, proceed with blockchain registration
          setPostStatus("verified");

          // TODO: Implement actual blockchain registration
          console.log("Registering on blockchain:", {
            title: data.title,
            contentHash: "mock-hash-" + Date.now(),
            visibility: data.visibility,
            tags: data.tags,
          });

          // Simulate blockchain registration
          await new Promise((resolve) => setTimeout(resolve, 2000));

          setPostStatus("published");

          // Success! Navigate to post or dashboard
          setTimeout(() => {
            router.push("/dashboard");
          }, 2000);
        } else {
          setPostStatus("rejected");
        }
      } catch (error) {
        console.error("Error creating post:", error);
        setPostStatus("rejected");
      } finally {
        setIsSubmitting(false);
      }
    },
    [router, simulateOriginalityAnalysis]
  );

  /**
   * 💾 Handle saving as draft
   */
  const handleSaveDraft = useCallback(async (data: PostFormData) => {
    try {
      // TODO: Implement draft saving
      console.log("Saving draft:", data);

      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 1000));

      // Show success message (you could use a toast here)
      alert("Draft saved successfully!");
    } catch (error) {
      console.error("Error saving draft:", error);
    }
  }, []);

  const handleRetryAnalysis = useCallback(() => {
    // Reset status and retry
    setPostStatus("draft");
    setOriginalityReport(undefined);
    setShowStatusCard(false);
  }, []);

  const handleViewReport = useCallback(() => {
    // TODO: Open detailed report modal/page
    console.log("Viewing detailed report:", originalityReport);
  }, [originalityReport]);

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
            {/* Status Card - Show during/after analysis */}
            {showStatusCard && (
              <div className="animate-fade-in-up">
                <PostStatusCard
                  status={postStatus}
                  originalityReport={originalityReport}
                  onRetry={handleRetryAnalysis}
                  onViewReport={handleViewReport}
                />
              </div>
            )}

            {/* Post Form */}
            {!showStatusCard ||
            postStatus === "draft" ||
            postStatus === "rejected" ? (
              <div className="animate-fade-in-up">
                <PostForm
                  onSubmit={handleSubmit}
                  onSaveDraft={handleSaveDraft}
                  isSubmitting={isSubmitting}
                />
              </div>
            ) : null}

            {/* Success Message */}
            {postStatus === "published" && (
              <Card className="border-l-4 border-l-green-500 bg-green-50 dark:bg-green-900/20 animate-fade-in-up">
                <CardContent className="p-6">
                  <div className="flex items-center gap-4">
                    <div className="flex h-12 w-12 items-center justify-center rounded-full bg-green-100 dark:bg-green-900/40">
                      <Icons.Check className="h-6 w-6 text-green-600 dark:text-green-400" />
                    </div>
                    <div>
                      <h3 className="font-semibold text-green-800 dark:text-green-200">
                        Post Published Successfully!
                      </h3>
                      <p className="text-sm text-green-600 dark:text-green-300">
                        Your content has been verified, protected, and is now
                        live. Redirecting to dashboard...
                      </p>
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
