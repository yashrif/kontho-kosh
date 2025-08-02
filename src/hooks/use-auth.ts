'use client';

import { useAuth, useUser } from "@clerk/nextjs";
import { AuthState } from "@/types/auth";

/**
 * 🔐 Custom hook for authentication state management
 *
 * @returns {AuthState} Current authentication state
 */
export const useAuthState = (): AuthState => {
	const { isSignedIn, isLoaded } = useAuth();
	const { user } = useUser();

	return {
		isSignedIn: !!isSignedIn,
		isLoaded: !!isLoaded,
		user: user ? {
			id: user.id,
			firstName: user.firstName || undefined,
			lastName: user.lastName || undefined,
			email: user.primaryEmailAddress?.emailAddress || undefined,
			imageUrl: user.imageUrl || undefined,
		} : null,
	};
};
