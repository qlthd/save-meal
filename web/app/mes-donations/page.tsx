"use client";

import { useEffect, useState } from "react";
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
  MapPin,
  Users,
  ChevronDown,
  ChevronRight,
  Clock,
  CheckCircle,
  AlertCircle,
  Edit,
} from "lucide-react";
import Link from "next/link";
import { Header } from "@/web/components/Header/Header";
import {
  Configuration,
  FoodDonationApi,
  FoodDonationListResponse,
} from "@/web/api-client/src";

export default function MesDonationsPage() {
  const [pastCollapsed, setPastCollapsed] = useState(true);
  const [upcomingCollapsed, setUpcomingCollapsed] = useState(false);
  const [collectes, setCollectes] = useState<FoodDonationListResponse>();

  useEffect(() => {
    const fetchData = async () => {
      const api = new FoodDonationApi(
        new Configuration({
          basePath:
            process.env.NEXT_PUBLIC_API_BASE_URL || "http://localhost:3004",
        }),
      );
      const fetched = await api.findAll();
      console.log("fetched:", fetched);
      setCollectes(fetched);
    };
    fetchData();
  }, []);

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
          {/* Past Donations - Collapsed by default */}
          <Card className="overflow-hidden">
            <Collapsible open={!pastCollapsed} onOpenChange={setPastCollapsed}>
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
                    <Badge variant="secondary" className="ml-2">
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
                      <Card
                        key={donation.id}
                        className="p-4 border-l-4 border-l-gray-300"
                      >
                        <div className="flex justify-between items-start mb-3">
                          <h3 className="text-lg font-semibold text-gray-900">
                            {donation.title}
                          </h3>
                          {getStatusBadge(donation.status)}
                        </div>
                        <p className="text-gray-600 mb-3">
                          {donation.description}
                        </p>
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm text-gray-600">
                          <div className="flex items-center">
                            <Calendar className="w-4 h-4 mr-2" />
                            <span>
                              {formatDate(donation.date)} à {donation.time}
                            </span>
                          </div>
                          <div className="flex items-center">
                            <MapPin className="w-4 h-4 mr-2" />
                            <span>{donation.location}</span>
                          </div>
                          <div className="flex items-center">
                            <Users className="w-4 h-4 mr-2" />
                            <span>{donation.portions} portions</span>
                          </div>
                        </div>
                        {donation.associationName && (
                          <div className="mt-3 p-3 bg-green-50 rounded-lg">
                            <p className="text-sm text-green-800">
                              <strong>Récupéré par:</strong>{" "}
                              {donation.associationName}
                            </p>
                          </div>
                        )}
                      </Card>
                    ))}
                  </div>
                </div>
              </CollapsibleContent>
            </Collapsible>
          </Card>

          {/* Upcoming Donations - Open by default */}
          <Card className="overflow-hidden">
            <Collapsible
              open={!upcomingCollapsed}
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
                      <Card
                        key={donation.title}
                        className="p-4 border-l-4 border-l-green-500"
                      >
                        <div className="flex justify-between items-start mb-3">
                          <h3 className="text-lg font-semibold text-gray-900">
                            {donation.title}
                          </h3>
                          <div className="flex items-center space-x-2">
                            {getStatusBadge("Expiré")}
                            <Button
                              size="sm"
                              variant="outline"
                              className="text-blue-600 border-blue-600 hover:bg-blue-50"
                            >
                              <Edit className="w-4 h-4 mr-1" />
                              Modifier
                            </Button>
                          </div>
                        </div>
                        <p className="text-gray-600 mb-3">
                          {donation.description}
                        </p>
                        <div className="flex items-center text-sm text-gray-600 mb-3">
                          <Calendar className="w-4 h-4 mr-2" />
                          <span>
                            du {formatDate(donation.availableFrom)} au{" "}
                            {formatDate(donation.availableTo)}
                          </span>
                        </div>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm text-gray-600 mb-3">
                          <div className="flex items-center">
                            <MapPin className="w-4 h-4 mr-2" />
                            <span>
                              {donation.pickupPlace} - {donation.address}
                            </span>
                          </div>
                          <div className="flex items-center">
                            <Users className="w-4 h-4 mr-2" />
                            <span>{donation.estimatedPortions} portions</span>
                          </div>
                        </div>
                        {donation.booking ? (
                          <div className="p-3 bg-orange-50 rounded-lg">
                            <p className="text-sm text-orange-800">
                              <strong>Réservé</strong>
                            </p>
                          </div>
                        ) : (
                          <div className="p-3 bg-blue-50 rounded-lg">
                            <p className="text-sm text-blue-800">
                              <Clock className="w-4 h-4 inline mr-1" />
                              En attente de prise en charge par une association
                            </p>
                          </div>
                        )}
                      </Card>
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
