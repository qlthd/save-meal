"use client";
import type { Metadata } from "next";
import "./globals.css";
import { Toaster } from "@/web/components/ui/toaster";
import { Toaster as Sonner } from "@/web/components/ui/sonner";
import { TooltipProvider } from "@/web/components/ui/tooltip";
import { SessionProvider } from "next-auth/react";

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="fr">
      <link
        href="https://api.fontshare.com/v2/css?f[]=satoshi@700&display=swap"
        rel="stylesheet"
      />

      <body>
        <SessionProvider>
          <TooltipProvider>
            {children}
            <Toaster />
            <Sonner />
          </TooltipProvider>
        </SessionProvider>
      </body>
    </html>
  );
}
