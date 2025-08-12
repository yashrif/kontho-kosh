"use client";

import { Icons } from "@/components/common/Icons";
import { ThemeToggle } from "@/components/common/ThemeToggle";
import { Button } from "@/components/ui/button";
import { SignedIn, SignedOut, UserButton } from "@clerk/nextjs";
import { dark, neobrutalism } from "@clerk/themes";
import { useTheme } from "next-themes";
import Link from "next/link";

/**
 * 🧭 Client-side Navigation Component
 * Compatible with client components and uses client-side theme detection
 */
const ClientNavigation = () => {
  const { theme } = useTheme();
  const clerkTheme = theme === "dark" ? dark : neobrutalism;

  return (
    <header className="fixed top-0 w-full z-50 bg-background/80 backdrop-blur-md border-b">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="flex h-16 items-center justify-between">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-2">
            <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-primary text-primary-foreground">
              <Icons.Shield className="h-5 w-5" />
            </div>
            <span className="text-xl font-bold text-foreground">
              Konthokosh
            </span>
          </Link>

          {/* Navigation Links - Show different links when signed in */}
          <nav className="hidden md:flex items-center gap-8">
            <SignedOut>
              <a
                href="#features"
                className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors duration-200"
              >
                Features
              </a>
              <a
                href="#how-it-works"
                className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors duration-200"
              >
                How It Works
              </a>
              <a
                href="#security"
                className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors duration-200"
              >
                Security
              </a>
              <a
                href="#roadmap"
                className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors duration-200"
              >
                Roadmap
              </a>
            </SignedOut>

            <SignedIn>
              <Link
                href="/dashboard"
                className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors duration-200"
              >
                Dashboard
              </Link>
              <Link
                href="/feed"
                className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors duration-200"
              >
                Feed
              </Link>
            </SignedIn>
          </nav>

          {/* CTA Button */}
          <div className="flex items-center gap-4">
            <ThemeToggle />

            {/* Authentication */}
            <SignedOut>
              <Link href="/auth">
                <Button className="rounded-full hover:bg-primary hover:text-primary-foreground transition-colors">
                  <Icons.Wallet className="mr-2 h-4 w-4" />
                  Connect
                </Button>
              </Link>
            </SignedOut>

            <SignedIn>
              <UserButton
                appearance={{
                  baseTheme: clerkTheme,
                  elements: {
                    userButtonAvatarBox: "h-8 w-8 rounded-full",
                  },
                }}
                userProfileMode="modal"
                userProfileProps={{
                  appearance: {
                    baseTheme: clerkTheme,
                  },
                }}
              />
            </SignedIn>
          </div>
        </div>
      </div>
    </header>
  );
};

export default ClientNavigation;
