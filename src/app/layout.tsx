import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Prompt-Kirjasto Pro",
  description: "Premium prompt-kirjastosi ChatGPT:lle ja muille tekoälyille",
  icons: {
    icon: "/Favicon.png",
    shortcut: "/Favicon.png",
    apple: "/Favicon.png",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="fi">
      <body className={`${inter.className} antialiased`} suppressHydrationWarning={true}>
        {children}
      </body>
    </html>
  );
}
