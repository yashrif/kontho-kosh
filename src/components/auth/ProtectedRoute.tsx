'use client';

import { useAuth } from "@clerk/nextjs";
import { Button } from "@/components/ui/button";
import { Icons } from "@/components/common/Icons";
import Link from "next/link";

type PageLoaderProps = {
	message?: string;
}

const PageLoader = ({ message = "Loading..." }: PageLoaderProps) => {
	return (
		<div className="flex min-h-screen items-center justify-center">
			<div className="text-center space-y-4">
				<div className="flex justify-center">
					<div className="animate-spin">
						<Icons.Shield className="h-8 w-8 text-primary" />
					</div>
				</div>
				<p className="text-sm text-muted-foreground">{message}</p>
			</div>
		</div>
	);
};

type ProtectedRouteProps = {
	children: React.ReactNode;
	fallback?: React.ReactNode;
}

/**
 * 🔐 Protected route wrapper that ensures user is authenticated
 *
 * @param children - Content to render when authenticated
 * @param fallback - Optional custom fallback for unauthenticated users
 */
const ProtectedRoute = ({ children, fallback }: ProtectedRouteProps) => {
	const { isSignedIn, isLoaded } = useAuth();

	// Show loading state while auth status is being determined
	if (!isLoaded) {
		return <PageLoader />;
	}

	// Show fallback or default unauthorized message
	if (!isSignedIn) {
		if (fallback) {
			return <>{fallback}</>;
		}

		return (
			<div className="flex min-h-screen items-center justify-center">
				<div className="text-center space-y-6">
					<div className="flex justify-center">
						<div className="rounded-full bg-muted p-6">
							<Icons.Lock className="h-12 w-12 text-muted-foreground" />
						</div>
					</div>
					<div className="space-y-2">
						<h2 className="text-2xl font-bold">Access Restricted</h2>
						<p className="text-muted-foreground max-w-md">
							You need to be signed in to access this content. Please sign in or create an account to continue.
						</p>
					</div>
					<div className="flex justify-center gap-3">
						<Link href="/auth/sign-in">
							<Button variant="outline">
								<Icons.LogIn className="mr-2 h-4 w-4" />
								Sign In
							</Button>
						</Link>
						<Link href="/auth/sign-up">
							<Button>
								<Icons.UserPlus className="mr-2 h-4 w-4" />
								Sign Up
							</Button>
						</Link>
					</div>
				</div>
			</div>
		);
	}

	return <>{children}</>;
};

export default ProtectedRoute;
