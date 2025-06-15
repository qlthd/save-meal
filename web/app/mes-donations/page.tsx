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
  ArrowLeft,
  Calendar,
  MapPin,
  Users,
  ChevronDown,
  ChevronRight,
  Clock,
  CheckCircle,
  AlertCircle,
  Edit,
  Trash2,
} from "lucide-react";
import Link from "next/link";
import { LoginModal } from "@/web/components/LoginModal";

// Mock data for user donations
const mockPastDonations = [
  {
    id: 1,
    title: "Surplus de fête d'entreprise",
    description: "Buffet complet avec desserts",
    portions: 45,
    location: "14ème arrondissement, Paris",
    date: "2024-01-15",
    time: "18:00",
    status: "Récupéré",
    associationName: "Les Restos du Cœur",
    createdAt: "2024-01-14",
  },
  {
    id: 2,
    title: "Mariage - Surplus traiteur",
    description: "Plats chauds et accompagnements",
    portions: 80,
    location: "Neuilly-sur-Seine",
    date: "2024-01-10",
    time: "22:00",
    status: "Récupéré",
    associationName: "Emmaüs",
    createdAt: "2024-01-09",
  },
  {
    id: 3,
    title: "Conférence tech - Snacks",
    description: "Sandwichs et viennoiseries",
    portions: 25,
    location: "La Défense",
    date: "2024-01-05",
    time: "17:30",
    status: "Expiré",
    associationName: null,
    createdAt: "2024-01-05",
  },
];

const mockUpcomingDonations = [
  {
    id: 4,
    title: "Événement d'inauguration",
    description: "Canapés, boissons et petits fours",
    portions: 60,
    location: "8ème arrondissement, Paris",
    date: "2024-01-25",
    time: "19:00",
    status: "Planifié",
    associationName: null,
    createdAt: "2024-01-20",
  },
  {
    id: 5,
    title: "Formation entreprise",
    description: "Déjeuner d'affaires complet",
    portions: 35,
    location: "Boulogne-Billancourt",
    date: "2024-01-22",
    time: "14:00",
    status: "Confirmé",
    associationName: "Secours Populaire",
    createdAt: "2024-01-18",
  },
];

export default function MesDonationsPage() {
  const [pastCollapsed, setPastCollapsed] = useState(true);
  const [upcomingCollapsed, setUpcomingCollapsed] = useState(false);
  const [loginModalOpen, setLoginModalOpen] = useState(false);

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
    });
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Navigation */}
      <nav className="bg-white border-b border-gray-200 px-4 sm:px-6 lg:px-8 py-4">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <Link
              href="/web/public"
              className="flex items-center space-x-2 text-gray-600 hover:text-green-600 transition-colors"
            >
              <ArrowLeft className="w-5 h-5" />
              <span>Retour</span>
            </Link>
            <div className="h-6 w-px bg-gray-300" />
            <Link href="/web/public" className="flex items-center">
              <img
                src="https://cdn.builder.io/api/v1/image/assets%2F3d47985c501b449a8a6a74efa2d87067%2F65e64ef700ed4a1cb9ad3db72540f93c?format=webp&width=800"
                alt="Save Meal Logo"
                className="h-14 w-auto"
              />
            </Link>
          </div>
          <div className="flex items-center space-x-4">
            <Button
              variant="outline"
              size="sm"
              onClick={() => setLoginModalOpen(true)}
            >
              Se connecter
            </Button>
            <Badge
              variant="secondary"
              className="bg-purple-100 text-purple-800"
            >
              Mes donations
            </Badge>
          </div>
        </div>
      </nav>

      {/* Login Modal */}
      <LoginModal open={loginModalOpen} onOpenChange={setLoginModalOpen} />

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
                      {mockPastDonations.length}
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
                    {mockPastDonations.map((donation) => (
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
                      {mockUpcomingDonations.length}
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
                    {mockUpcomingDonations.map((donation) => (
                      <Card
                        key={donation.id}
                        className="p-4 border-l-4 border-l-green-500"
                      >
                        <div className="flex justify-between items-start mb-3">
                          <h3 className="text-lg font-semibold text-gray-900">
                            {donation.title}
                          </h3>
                          <div className="flex items-center space-x-2">
                            {getStatusBadge(donation.status)}
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
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm text-gray-600 mb-3">
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
                        {donation.associationName ? (
                          <div className="p-3 bg-orange-50 rounded-lg">
                            <p className="text-sm text-orange-800">
                              <strong>Association assignée:</strong>{" "}
                              {donation.associationName}
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
        {mockPastDonations.length === 0 &&
          mockUpcomingDonations.length === 0 && (
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
