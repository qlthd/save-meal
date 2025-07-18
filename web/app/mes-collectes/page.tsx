"use client";

import { useEffect, useState } from "react";
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/web/components/ui/collapsible";
import {
  ArrowLeft,
  Calendar,
  MapPin,
  Users,
  ChevronDown,
  ChevronRight,
  Clock,
  CheckCircle,
  Phone,
  Mail,
  UserCircle,
  Truck,
  ClipboardCheck,
  X,
} from "lucide-react";
import Link from "next/link";
import { Badge } from "@/web/components/ui/badge";
import { Button } from "@/web/components/ui/button";
import { Card } from "@/web/components/ui/card";
import { LoginModal } from "@/web/components/LoginModal";
import {
  Booking,
  BookingApi,
  Configuration,
  FoodDonationApi,
} from "@/web/api-client/src";
import { useSession } from "next-auth/react";

// Mock data for association collections
const mockPastCollections = [
  {
    id: 1,
    title: "Surplus de mariage - Traiteur Dubois",
    description: "50 portions de plats chauds, desserts et pain",
    portions: 50,
    location: "15ème arrondissement, Paris",
    address: "25 Rue de Vaugirard, 75015 Paris",
    date: "2024-01-15",
    time: "20:30",
    status: "Collecté",
    donatorName: "Marie Dubois",
    donatorPhone: "06 12 34 56 78",
    donatorEmail: "marie.dubois@traiteur-dubois.fr",
    collectedAt: "2024-01-15T20:45:00",
    notes: "Collecte effectuée avec succès. Bénéficiaires très satisfaits.",
  },
  {
    id: 2,
    title: "Fin de marché - Boulangerie Martin",
    description: "Viennoiseries, pains et sandwichs",
    portions: 30,
    location: "7ème arrondissement, Paris",
    address: "12 Avenue Bosquet, 75007 Paris",
    date: "2024-01-12",
    time: "19:00",
    status: "Collecté",
    donatorName: "Jean Martin",
    donatorPhone: "06 87 65 43 21",
    donatorEmail: "j.martin@boulangerie-martin.fr",
    collectedAt: "2024-01-12T19:15:00",
    notes: "Produits de très bonne qualité.",
  },
  {
    id: 3,
    title: "Événement annulé - Restaurant Le Gourmet",
    description: "Plats préparés pour réception",
    portions: 40,
    location: "16ème arrondissement, Paris",
    address: "8 Rue de Passy, 75016 Paris",
    date: "2024-01-08",
    time: "18:00",
    status: "Annulé",
    donatorName: "Pierre Léfaure",
    donatorPhone: "06 45 78 91 23",
    donatorEmail: "contact@legourmet.fr",
    notes: "Collecte annulée par le donateur - problème de timing.",
  },
];

const mockUpcomingCollections = [
  {
    id: 4,
    title: "Conférence tech - Tech Corp",
    description: "Buffet complet pour 80 personnes",
    portions: 80,
    location: "La Défense, Courbevoie",
    address: "10 Esplanade du Général de Gaulle, 92400 Courbevoie",
    date: "2024-01-25",
    time: "18:30",
    status: "Confirmé",
    donatorName: "Sophie Laurent",
    donatorPhone: "06 45 12 78 96",
    donatorEmail: "s.laurent@techcorp.com",
    scheduledFor: "2024-01-25T18:30:00",
    notes: "Accès par l'entrée principale. Badge visiteur requis.",
  },
  {
    id: 5,
    title: "Inauguration showroom - Auto Prestige",
    description: "Cocktail dînatoire haut de gamme",
    portions: 60,
    location: "Neuilly-sur-Seine",
    address: "45 Boulevard Jean Jaurès, 92200 Neuilly-sur-Seine",
    date: "2024-01-27",
    time: "21:00",
    status: "Planifié",
    donatorName: "Marc Dubois",
    donatorPhone: "06 78 45 12 36",
    donatorEmail: "m.dubois@autoprestige.fr",
    scheduledFor: "2024-01-27T21:00:00",
    notes: "Parking disponible dans la cour. Entrée par l'arrière du bâtiment.",
  },
  {
    id: 6,
    title: "Réunion conseil d'administration",
    description: "Déjeuner d'affaires - cuisine française",
    portions: 20,
    location: "1er arrondissement, Paris",
    address: "15 Place Vendôme, 75001 Paris",
    date: "2024-01-24",
    time: "15:00",
    status: "En attente",
    donatorName: "Isabelle Moreau",
    donatorPhone: "06 23 45 67 89",
    donatorEmail: "i.moreau@luxurycorp.fr",
    scheduledFor: "2024-01-24T15:00:00",
    notes: "Confirmer 2h avant la collecte.",
  },
];

export default function MesCollectesPage() {
  const [pastCollapsed, setPastCollapsed] = useState(true);
  const [upcomingCollapsed, setUpcomingCollapsed] = useState(false);
  const [loginModalOpen, setLoginModalOpen] = useState(false);
  const [bookings, setBookings] = useState<Booking[]>([]);
  const { data: session, status } = useSession();

  useEffect(() => {
    const fetchData = async () => {
      const api = new BookingApi(
        new Configuration({
          basePath:
            process.env.NEXT_PUBLIC_API_BASE_URL || "http://localhost:3004",
        }),
      );
      if (session?.uid) {
        const bookings = await api.findByAssociation(
          {
            id: session.uid,
          },
          {
            headers: {
              Authorization: `Bearer ${session.accessToken}`,
            },
          },
        );
        setBookings(bookings);
      }
    };
    fetchData();
  }, [status]);

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "Collecté":
        return (
          <Badge className="bg-green-100 text-green-800 border-green-200">
            <CheckCircle className="w-3 h-3 mr-1" />
            Collecté
          </Badge>
        );
      case "Annulé":
        return (
          <Badge className="bg-red-100 text-red-800 border-red-200">
            <X className="w-3 h-3 mr-1" />
            Annulé
          </Badge>
        );
      case "Confirmé":
        return (
          <Badge className="bg-green-100 text-green-800 border-green-200">
            <CheckCircle className="w-3 h-3 mr-1" />
            Confirmé
          </Badge>
        );
      case "Planifié":
        return (
          <Badge className="bg-blue-100 text-blue-800 border-blue-200">
            <Calendar className="w-3 h-3 mr-1" />
            Planifié
          </Badge>
        );
      case "En attente":
        return (
          <Badge className="bg-orange-100 text-orange-800 border-orange-200">
            <Clock className="w-3 h-3 mr-1" />
            En attente
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

  const formatTime = (timeString: string) => {
    return timeString;
  };

  const markAsCollected = (id: number) => {
    // In a real app, this would update the collection status
    console.log(`Marking collection ${id} as collected`);
  };

  const cancelCollection = (id: number) => {
    // In a real app, this would cancel the collection
    console.log(`Cancelling collection ${id}`);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Navigation */}
      <nav className="bg-white border-b border-gray-200 px-4 sm:px-6 lg:px-8 py-4">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <Link
              href="/"
              className="flex items-center space-x-2 text-gray-600 hover:text-green-600 transition-colors"
            >
              <ArrowLeft className="w-5 h-5" />
              <span>Retour</span>
            </Link>
            <div className="h-6 w-px bg-gray-300" />
            <Link href="/" className="flex items-center">
              <img
                src="https://cdn.builder.io/api/v1/image/assets%2F3d47985c501b449a8a6a74efa2d87067%2Fdd2c6da340014829b54eb2b52cfcd003?format=webp&width=800"
                alt="Save Meal Logo"
                className="h-14 w-auto"
              />
            </Link>
          </div>
          <div className="flex items-center space-x-4">
            <Link href="/association">
              <Button
                variant="ghost"
                size="sm"
                className="text-gray-600 hover:text-green-600"
              >
                Rechercher
              </Button>
            </Link>
            <Link href="/profil">
              <Button
                variant="ghost"
                size="sm"
                className="text-gray-600 hover:text-green-600 p-2"
                title="Mon profil"
              >
                <UserCircle className="w-5 h-5" />
              </Button>
            </Link>
            <Button
              variant="outline"
              size="sm"
              onClick={() => setLoginModalOpen(true)}
            >
              Se connecter
            </Button>
            <Badge variant="secondary" className="bg-blue-100 text-blue-800">
              Association
            </Badge>
          </div>
        </div>
      </nav>

      {/* Login Modal */}
      <LoginModal open={loginModalOpen} onOpenChange={setLoginModalOpen} />

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">
            Mes collectes
          </h1>
          <p className="text-gray-600">
            Gérez vos collectes de nourriture prévues et consultez l'historique
          </p>
        </div>

        {/* Upcoming Collections */}
        <div className="mb-8">
          <Collapsible
            open={!upcomingCollapsed}
            onOpenChange={(open) => setUpcomingCollapsed(!open)}
          >
            <CollapsibleTrigger asChild>
              <Button
                variant="ghost"
                className="w-full justify-between p-0 h-auto hover:bg-transparent"
              >
                <div className="flex items-center space-x-2">
                  <h2 className="text-xl font-semibold text-gray-900">
                    Collectes à venir ({bookings.length})
                  </h2>
                  <Badge className="bg-green-100 text-green-800">
                    {
                      mockUpcomingCollections.filter(
                        (d) => d.status === "Confirmé",
                      ).length
                    }{" "}
                    confirmées
                  </Badge>
                </div>
                {upcomingCollapsed ? (
                  <ChevronRight className="w-5 h-5 text-gray-500" />
                ) : (
                  <ChevronDown className="w-5 h-5 text-gray-500" />
                )}
              </Button>
            </CollapsibleTrigger>
            <CollapsibleContent className="space-y-4 mt-4">
              {bookings.map((booking) => (
                <Card key={booking.id} className="p-6">
                  <div className="flex items-start justify-between mb-4">
                    <div className="flex-1">
                      <div className="flex items-center space-x-3 mb-2">
                        <h3 className="font-semibold text-lg text-gray-900">
                          {booking.foodDonation?.title}
                        </h3>
                        {getStatusBadge("collection.status")}
                      </div>
                      {/*<p className="text-gray-600 mb-3">{booking.foodDo}</p>*/}

                      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm">
                        <div className="flex items-center space-x-2">
                          <Calendar className="w-4 h-4 text-gray-400" />
                          {/*<span>*/}
                          {/*  {formatDate(booking.foodDonation?.availableFrom)} à{" "}*/}
                          {/*  {formatTime(collection.time)}*/}
                          {/*</span>*/}
                        </div>
                        <div className="flex items-center space-x-2">
                          <MapPin className="w-4 h-4 text-gray-400" />
                          {/*<span>{collection.location}</span>*/}
                        </div>
                        <div className="flex items-center space-x-2">
                          <Users className="w-4 h-4 text-gray-400" />
                          <span>
                            {booking.foodDonation?.estimatedPortions} portions
                          </span>
                        </div>
                      </div>

                      <div className="mt-4 p-3 bg-gray-50 rounded-lg">
                        <p className="text-sm font-medium text-gray-700 mb-2">
                          Contact donateur :
                        </p>
                        <div className="flex flex-col space-y-1 text-sm text-gray-600">
                          <span>{booking.foodDonation?.contactName}</span>
                          <div className="flex items-center space-x-4">
                            <div className="flex items-center space-x-1">
                              <Phone className="w-3 h-3" />
                              <span>{booking.foodDonation?.contactPhone}</span>
                            </div>
                            <div className="flex items-center space-x-1">
                              <Mail className="w-3 h-3" />
                              <span>{booking.foodDonation?.contactEmail}</span>
                            </div>
                          </div>
                        </div>
                      </div>

                      <div className="mt-3 p-3 bg-blue-50 rounded-lg">
                        <p className="text-sm font-medium text-blue-700 mb-1">
                          Adresse :
                        </p>
                        <p className="text-sm text-blue-600">
                          {booking.foodDonation?.address}
                        </p>
                        {/*{collection.notes && (*/}
                        {/*  <>*/}
                        {/*    <p className="text-sm font-medium text-blue-700 mt-2 mb-1">*/}
                        {/*      Notes :*/}
                        {/*    </p>*/}
                        {/*    <p className="text-sm text-blue-600">*/}
                        {/*      {collection.notes}*/}
                        {/*    </p>*/}
                        {/*  </>*/}
                        {/*)}*/}
                      </div>
                    </div>
                  </div>

                  <div className="flex space-x-3">
                    {/*{collection.status === "En attente" && (*/}
                    {/*  <>*/}
                    {/*    <Button*/}
                    {/*      size="sm"*/}
                    {/*      className="bg-green-600 hover:bg-green-700"*/}
                    {/*      onClick={() => markAsCollected(collection.id)}*/}
                    {/*    >*/}
                    {/*      <CheckCircle className="w-4 h-4 mr-1" />*/}
                    {/*      Confirmer*/}
                    {/*    </Button>*/}
                    {/*    <Button*/}
                    {/*      variant="outline"*/}
                    {/*      size="sm"*/}
                    {/*      onClick={() => cancelCollection(collection.id)}*/}
                    {/*    >*/}
                    {/*      <X className="w-4 h-4 mr-1" />*/}
                    {/*      Annuler*/}
                    {/*    </Button>*/}
                    {/*  </>*/}
                    {/*)}*/}
                    {/*{collection.status === "Confirmé" && (*/}
                    {/*  <Button*/}
                    {/*    size="sm"*/}
                    {/*    className="bg-green-600 hover:bg-green-700"*/}
                    {/*    onClick={() => markAsCollected(collection.id)}*/}
                    {/*  >*/}
                    {/*    <Truck className="w-4 h-4 mr-1" />*/}
                    {/*    Marquer comme collecté*/}
                    {/*  </Button>*/}
                    {/*)}*/}
                    {/*{collection.status === "Planifié" && (*/}
                    {/*  <Button*/}
                    {/*    variant="outline"*/}
                    {/*    size="sm"*/}
                    {/*    onClick={() => cancelCollection(collection.id)}*/}
                    {/*  >*/}
                    {/*    <X className="w-4 h-4 mr-1" />*/}
                    {/*    Annuler*/}
                    {/*  </Button>*/}
                    {/*)}*/}
                    <Button variant="ghost" size="sm">
                      <Phone className="w-4 h-4 mr-1" />
                      Voir le numéro de téléphone
                    </Button>
                  </div>
                </Card>
              ))}
            </CollapsibleContent>
          </Collapsible>
        </div>

        {/* Past Collections */}
        <div>
          <Collapsible
            open={!pastCollapsed}
            onOpenChange={(open) => setPastCollapsed(!open)}
          >
            <CollapsibleTrigger asChild>
              <Button
                variant="ghost"
                className="w-full justify-between p-0 h-auto hover:bg-transparent"
              >
                <div className="flex items-center space-x-2">
                  <h2 className="text-xl font-semibold text-gray-900">
                    Collectes passées ({mockPastCollections.length})
                  </h2>
                  <Badge variant="secondary">
                    {
                      mockPastCollections.filter((d) => d.status === "Collecté")
                        .length
                    }{" "}
                    collectées
                  </Badge>
                </div>
                {pastCollapsed ? (
                  <ChevronRight className="w-5 h-5 text-gray-500" />
                ) : (
                  <ChevronDown className="w-5 h-5 text-gray-500" />
                )}
              </Button>
            </CollapsibleTrigger>
            <CollapsibleContent className="space-y-4 mt-4">
              {mockPastCollections.map((collection) => (
                <Card key={collection.id} className="p-6 opacity-90">
                  <div className="flex items-start justify-between mb-4">
                    <div className="flex-1">
                      <div className="flex items-center space-x-3 mb-2">
                        <h3 className="font-semibold text-lg text-gray-700">
                          {collection.title}
                        </h3>
                        {getStatusBadge(collection.status)}
                      </div>
                      <p className="text-gray-500 mb-3">
                        {collection.description}
                      </p>

                      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm">
                        <div className="flex items-center space-x-2">
                          <Calendar className="w-4 h-4 text-gray-400" />
                          <span>
                            {formatDate(collection.date)} à{" "}
                            {formatTime(collection.time)}
                          </span>
                        </div>
                        <div className="flex items-center space-x-2">
                          <MapPin className="w-4 h-4 text-gray-400" />
                          <span>{collection.location}</span>
                        </div>
                        <div className="flex items-center space-x-2">
                          <Users className="w-4 h-4 text-gray-400" />
                          <span>{collection.portions} portions</span>
                        </div>
                      </div>

                      <div className="mt-4 p-3 bg-gray-50 rounded-lg">
                        <p className="text-sm font-medium text-gray-700 mb-2">
                          Contact donateur :
                        </p>
                        <div className="flex flex-col space-y-1 text-sm text-gray-600">
                          <span>{collection.donatorName}</span>
                          <div className="flex items-center space-x-4">
                            <div className="flex items-center space-x-1">
                              <Phone className="w-3 h-3" />
                              <span>{collection.donatorPhone}</span>
                            </div>
                            <div className="flex items-center space-x-1">
                              <Mail className="w-3 h-3" />
                              <span>{collection.donatorEmail}</span>
                            </div>
                          </div>
                        </div>
                      </div>

                      {collection.notes && (
                        <div className="mt-3 p-3 bg-gray-50 rounded-lg">
                          <p className="text-sm font-medium text-gray-700 mb-1">
                            Notes :
                          </p>
                          <p className="text-sm text-gray-600">
                            {collection.notes}
                          </p>
                        </div>
                      )}

                      {collection.status === "Collecté" &&
                        collection.collectedAt && (
                          <div className="mt-3 text-sm text-green-600">
                            <ClipboardCheck className="w-4 h-4 inline mr-1" />
                            Collecté le{" "}
                            {new Date(
                              collection.collectedAt,
                            ).toLocaleDateString("fr-FR")}{" "}
                            à{" "}
                            {new Date(
                              collection.collectedAt,
                            ).toLocaleTimeString("fr-FR", {
                              hour: "2-digit",
                              minute: "2-digit",
                            })}
                          </div>
                        )}
                    </div>
                  </div>
                </Card>
              ))}
            </CollapsibleContent>
          </Collapsible>
        </div>
      </main>
    </div>
  );
}
