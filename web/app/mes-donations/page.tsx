"use client";

import { useState } from "react";
import { Button } from "@/web/components/ui/button";
import { Card } from "@/web/components/ui/card";
import { Badge } from "@/web/components/ui/badge";
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/web/components/ui/collapsible";
import {
  ChefHat,
  Calendar,
  ChevronDown,
  ChevronRight,
  CheckCircle,
  AlertCircle,
} from "lucide-react";
import Link from "next/link";
import { Header } from "@/web/components/Header/Header";
import { Configuration, FoodDonationApi } from "@/web/api-client/src";
import { DonationCard } from "@/web/components/molecules/DonationCard/DonationCard";
import { useQuery } from "@tanstack/react-query";

export default function MesDonationsPage() {
  const [pastCollapsed, setPastCollapsed] = useState(true);
  const [upcomingCollapsed, setUpcomingCollapsed] = useState(false);

  const fetchDonations = async () => {
    const api = new FoodDonationApi(
      new Configuration({
        basePath:
          process.env.NEXT_PUBLIC_API_BASE_URL || "http://localhost:3004",
      }),
    );
    return await api.findAll();
  };

  const {
    data: collectes,
    isLoading,
    error,
  } = useQuery({
    queryKey: ["donations"],
    queryFn: fetchDonations,
  });

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "Récupéré":
        return (
          <Badge className="bg-green-100 text-green-800 border-green-200">
            <CheckCircle className="w-3 h-3 mr-1" />
            Récupéré
          </Badge>
        );
      case "Expiré":
        return (
          <Badge className="bg-red-100 text-red-800 border-red-200">
            <AlertCircle className="w-3 h-3 mr-1" />
            Expiré
          </Badge>
        );
      case "Planifié":
        return (
          <Badge className="bg-blue-100 text-blue-800 border-blue-200">
            <Calendar className="w-3 h-3 mr-1" />
            Planifié
          </Badge>
        );
      case "Confirmé":
        return (
          <Badge className="bg-orange-100 text-orange-800 border-orange-200">
            <CheckCircle className="w-3 h-3 mr-1" />
            Confirmé
          </Badge>
        );
      default:
        return <Badge variant="secondary">{status}</Badge>;
    }
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString("fr-FR", {
      weekday: "long",
      year: "numeric",
      month: "long",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />

      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-4">
            Mes donations
          </h1>
          <p className="text-lg text-gray-600 mb-6">
            Gérez vos donations passées et à venir
          </p>

          {/* Create new donation button */}
          <Link href="/donner">
            <Button className="bg-green-600 hover:bg-green-700 text-white px-6 py-3 text-lg font-semibold rounded-xl shadow-lg hover:shadow-xl transition-all duration-200">
              <span className="text-xl mr-2">+</span>
              Créer une nouvelle donation
            </Button>
          </Link>
        </div>

        <div className="space-y-6">
          {/* Upcoming Donations - Open by default */}
          <Card className="overflow-hidden">
            <Collapsible
              open={upcomingCollapsed}
              onOpenChange={setUpcomingCollapsed}
            >
              <CollapsibleTrigger asChild>
                <div className="flex items-center justify-between p-6 cursor-pointer hover:bg-gray-50 transition-colors">
                  <div className="flex items-center space-x-3">
                    {upcomingCollapsed ? (
                      <ChevronRight className="w-5 h-5 text-gray-400" />
                    ) : (
                      <ChevronDown className="w-5 h-5 text-gray-400" />
                    )}
                    <h2 className="text-xl font-semibold text-gray-900">
                      Donations à venir
                    </h2>
                    <Badge className="ml-2 bg-green-100 text-green-800">
                      {collectes?.upcoming.length}
                    </Badge>
                  </div>
                  <div className="text-sm text-gray-500">
                    Cliquez pour {upcomingCollapsed ? "développer" : "réduire"}
                  </div>
                </div>
              </CollapsibleTrigger>
              <CollapsibleContent>
                <div className="border-t border-gray-200">
                  <div className="p-6 pt-4 space-y-4">
                    {collectes?.upcoming.map((donation) => (
                      <DonationCard donation={donation} />
                    ))}
                  </div>
                </div>
              </CollapsibleContent>
            </Collapsible>
          </Card>
          {/* Past Donations - Collapsed by default */}
          <Card className="overflow-hidden">
            <Collapsible open={pastCollapsed} onOpenChange={setPastCollapsed}>
              <CollapsibleTrigger asChild>
                <div className="flex items-center justify-between p-6 cursor-pointer hover:bg-gray-50 transition-colors">
                  <div className="flex items-center space-x-3">
                    {pastCollapsed ? (
                      <ChevronRight className="w-5 h-5 text-gray-400" />
                    ) : (
                      <ChevronDown className="w-5 h-5 text-gray-400" />
                    )}
                    <h2 className="text-xl font-semibold text-gray-900">
                      Donations passées
                    </h2>
                    <Badge className="ml-2 bg-red-400">
                      {collectes?.past.length}
                    </Badge>
                  </div>
                  <div className="text-sm text-gray-500">
                    Cliquez pour {pastCollapsed ? "développer" : "réduire"}
                  </div>
                </div>
              </CollapsibleTrigger>
              <CollapsibleContent>
                <div className="border-t border-gray-200">
                  <div className="p-6 pt-4 space-y-4">
                    {collectes?.past.map((donation) => (
                      <DonationCard donation={donation} />
                    ))}
                  </div>
                </div>
              </CollapsibleContent>
            </Collapsible>
          </Card>
        </div>

        {/* Empty state if no donations */}
        {collectes?.upcoming.length === 0 && collectes.past.length === 0 && (
          <Card className="p-12 text-center">
            <ChefHat className="w-16 h-16 text-gray-400 mx-auto mb-4" />
            <h3 className="text-xl font-semibold text-gray-900 mb-2">
              Aucune donation pour le moment
            </h3>
            <p className="text-gray-600 mb-6">
              Commencez par créer votre première donation pour partager vos
              surplus alimentaires
            </p>
            <Link href="/donner">
              <Button className="bg-green-600 hover:bg-green-700 text-white">
                Créer ma première donation
              </Button>
            </Link>
          </Card>
        )}
      </div>
    </div>
  );
}
