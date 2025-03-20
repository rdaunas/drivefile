import "~/styles/globals.css";
import {
  ClerkProvider
} from '@clerk/nextjs'

import { GeistSans } from "geist/font/sans";
import { type Metadata } from "next";
import { PostHogProvider } from "./_providers/posthog-provider";

export const metadata: Metadata = {
  title: "DriveFile",
  description: "Let's make google drive without google !",
  icons: [{ rel: "icon", url: "/favicon.ico" }],
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <ClerkProvider>
      <PostHogProvider>
        <html lang="en" className={`${GeistSans.variable}`}>
          <body>{children}</body>
        </html>
      </PostHogProvider>      
    </ClerkProvider>
    
  );
}
