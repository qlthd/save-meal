import type { Metadata } from "next";
import "./globals.css";
import { Toaster } from "@/web/components/ui/toaster";
import { Toaster as Sonner } from "@/web/components/ui/sonner";
import { TooltipProvider } from "@/web/components/ui/tooltip";

export const metadata: Metadata = {
  title: "Save Meal - Transformons les surplus alimentaires en solidarité",
  description:
    "Connectons les organisateurs d'événements aux associations pour que chaque repas trouve sa place. Lutte contre le gaspillage alimentaire.",
};

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
        <TooltipProvider>
          {children}
          <Toaster />
          <Sonner />
        </TooltipProvider>
      </body>
    </html>
  );
}
