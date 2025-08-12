import { clerkMiddleware, createRouteMatcher } from "@clerk/nextjs/server";

// Define which routes require authentication
const isProtectedRoute = createRouteMatcher([
  "/dashboard(.*)",
  "/feed(.*)",
  "/profile(.*)",
  "/upload(.*)",
  "/verify(.*)",
  "/posts/new(.*)",
]);

// Define auth routes that should redirect to dashboard if already signed in
const isAuthRoute = createRouteMatcher(["/auth(.*)"]);

export default clerkMiddleware(async (auth, req) => {
  // Get auth data and token for debugging
  const { userId } = await auth();

  // Optional: Log JWT token for protected routes (for debugging)
  // Uncomment the following lines if you want middleware-level token logging
  /*
	if (isProtectedRoute(req) && userId) {
		try {
			const { getToken } = await auth();
			if (getToken) {
				const token = await getToken();
				console.log(`🔐 Middleware JWT Token for ${req.nextUrl.pathname}:`, token);
				console.log(`👤 User ID: ${userId}`);
			}
		} catch (error) {
			console.error("❌ Error getting token in middleware:", error);
		}
	}
	*/

  // Protect routes that require authentication
  if (isProtectedRoute(req)) {
    await auth.protect();
  }

  // Redirect to dashboard if user is signed in and tries to access auth pages
  if (isAuthRoute(req)) {
    if (userId) {
      const url = new URL("/dashboard", req.url);
      return Response.redirect(url);
    }
  }
});

export const config = {
  matcher: [
    // Skip Next.js internals and all static files, unless found in search params
    "/((?!_next|[^?]*.(?:html?|css|js(?!on)|jpe?g|webp|png|gif|svg|ttf|woff2?|ico|csv|docx?|xlsx?|zip|webmanifest)).*)",
    // Always run for API routes
    "/(api|trpc)(.*)",
  ],
};
