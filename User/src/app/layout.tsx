import type { Metadata } from "next";
import "./globals.css";
import HeroUIThemeProvider from "@/providers/HeroUIThemeProvider";
import NextAuthSessionProvider from "@/providers/NextAuthSessionProvider";
import TanStackQueryProvider from "@/providers/TanStackQueryProvider";


export const metadata: Metadata = {
  title: "Tabib Online",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`antialiased overflow-scroll custom-scrollbar`}
        suppressHydrationWarning={true}
      >
        <HeroUIThemeProvider>
          <NextAuthSessionProvider>
            <TanStackQueryProvider>
              {children}
            </TanStackQueryProvider>
          </NextAuthSessionProvider>
        </HeroUIThemeProvider>
      </body>
    </html>
  );
}
