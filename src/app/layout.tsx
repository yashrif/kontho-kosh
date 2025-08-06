import { ThemeProvider } from "@/components/providers/theme-provider";
import { getServerClerkTheme } from "@/utils/server-theme";
import { ClerkProvider } from "@clerk/nextjs";
import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Konthokosh - AI-Powered Content Protection",
  description:
    "Secure your original content with blockchain-verified authenticity. AI-powered plagiarism detection meets immutable proof of ownership.",
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const theme = await getServerClerkTheme();

  return (
    <ClerkProvider
      appearance={{
        theme,
      }}
    >
      <html lang="en" suppressHydrationWarning>
        <body
          className={`${geistSans.variable} ${geistMono.variable} antialiased`}
        >
          <ThemeProvider>{children}</ThemeProvider>
        </body>
      </html>
    </ClerkProvider>
  );
}
