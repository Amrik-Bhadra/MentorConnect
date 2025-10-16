import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css"; // Assuming you have this file for Tailwind CSS
import { cn } from "@/lib/utils"; // Your shadcn utility
import { Header } from "@/components/layout/Header";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "MentorConnect",
  description: "Connect with mentors to achieve your goals.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="dark">
      <body className={cn("min-h-screen bg-background font-sans antialiased", inter.className)}>
        {/* <Header /> */}
        <main>{children}</main>
        {/* You can add a shared footer here later */}
      </body>
    </html>
  );
}