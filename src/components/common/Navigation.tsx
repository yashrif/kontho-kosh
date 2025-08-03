import { Button } from "@/components/ui/button";
import { Icons } from "@/components/common/Icons";
import { ThemeToggle } from "@/components/common/ThemeToggle";
import Link from "next/link";
import { SignedIn, SignedOut, UserButton } from "@clerk/nextjs";
import { dark } from "@clerk/themes";

const Navigation = () => {
  return (
    <header className="fixed top-0 w-full z-50 bg-background/80 backdrop-blur-md border-b">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="flex h-16 items-center justify-between">
          {/* Logo */}
          <div className="flex items-center gap-2">
            <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-primary text-primary-foreground">
              <Icons.Shield className="h-5 w-5" />
            </div>
            <span className="text-xl font-bold text-foreground">
              Konthokosh
            </span>
          </div>

          {/* Navigation Links */}
          <nav className="hidden md:flex items-center gap-8">
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
              <div className="flex items-center gap-4">
                <Link href="/dashboard">
                  <Button className="rounded-full hover:bg-primary hover:text-primary-foreground transition-colors">
                    <Icons.Wallet className="mr-2 h-4 w-4" />
                    Dashboard
                  </Button>
                </Link>
                <UserButton
                  appearance={{
                    baseTheme: dark,
                    elements: {
                      userButtonAvatarBox: "h-8 w-8 rounded-full",
                    },
                  }}
                  userProfileMode="modal"
                  userProfileProps={{
                    appearance: {
                      baseTheme: dark,
                    },
                  }}
                />
              </div>
            </SignedIn>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Navigation;
