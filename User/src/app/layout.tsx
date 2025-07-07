import type { Metadata } from "next";
import "./globals.css";
import HeroUIThemeProvider from "@/providers/HeroUIThemeProvider";


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
        className={`antialiased`}
        suppressHydrationWarning={true}
      >
        <HeroUIThemeProvider>
          {children}
        </HeroUIThemeProvider>
      </body>
    </html>
  );
}
