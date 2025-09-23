import type { Metadata } from "next";
import "./globals.css";

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
        className={`antialiased`}
        suppressHydrationWarning={true}
      >
        {children}
      </body>
    </html>
  );
}
