import type { Metadata } from "next";
import "./globals.css";
import { Toaster } from "sonner";
import NextAuthSessionProvider from "@/providers/NextAuthSessionProvider";
import TanStackQueryProvider from "@/providers/TanStackQueryProvider";

export const metadata: Metadata = {
  title: "Doctor | Tabib Online",
  description: "Doctor panel for Tabib Online",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`bg-muted antialiased custom-scrollbar`}
        suppressHydrationWarning={true}
      >
        <NextAuthSessionProvider>
          <TanStackQueryProvider>
            {children}
          </TanStackQueryProvider>
        </NextAuthSessionProvider>
        <Toaster />
      </body>
    </html>
  );
}
