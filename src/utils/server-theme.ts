import { cookies } from 'next/headers';

/**
 * 🌙 Get the current theme from server-side cookies
 * @returns The current theme ('light', 'dark', or 'system')
 */
export const getServerTheme = async (): Promise<string> => {
	const cookieStore = await cookies();
	const theme = cookieStore.get('theme')?.value;

	// Return the stored theme or default to 'system'
	return theme || 'system';
};

/**
 * 🌙 Get resolved theme (converts 'system' to actual theme based on user preference)
 * @returns The resolved theme ('light' or 'dark')
 */
export const getResolvedServerTheme = async (): Promise<'light' | 'dark'> => {
	const cookieStore = await cookies();
	const theme = cookieStore.get('theme')?.value;

	if (theme === 'dark') return 'dark';
	if (theme === 'light') return 'light';

	// For 'system' theme, check user's system preference
	// This is a fallback - you might want to implement more sophisticated detection
	return 'light'; // Default fallback
};

/**
 * 🎨 Get Clerk theme based on server-side theme detection
 * @returns Clerk theme configuration
 */
export const getServerClerkTheme = async () => {
	const { dark, shadcn } = await import('@clerk/themes');
	const resolvedTheme = await getResolvedServerTheme();

	return resolvedTheme === 'dark' ? dark : shadcn;
};
