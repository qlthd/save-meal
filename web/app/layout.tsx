"use client";
import type { Metadata } from "next";
import "./globals.css";
import { Toaster } from "@/web/components/ui/toaster";
import { Toaster as Sonner } from "@/web/components/ui/sonner";
import { TooltipProvider } from "@/web/components/ui/tooltip";
import { SessionProvider } from "next-auth/react";
import LoadGoogleProvider from "@/web/components/LoadGoogleProvider";

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="fr">
      <link
        precedence="default"
        href="https://api.fontshare.com/v2/css?f[]=satoshi@700&display=swap"
        rel="stylesheet"
      />

      <body>
        <LoadGoogleProvider>
          <SessionProvider>
            <TooltipProvider>
              {children}
              <Toaster />
              <Sonner />
            </TooltipProvider>
          </SessionProvider>
        </LoadGoogleProvider>
      </body>
    </html>
  );
}
