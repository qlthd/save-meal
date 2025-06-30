"use client";

import { useEffect, useState } from "react";
import { Button } from "@/web/components/ui/button";
import { Card } from "@/web/components/ui/card";
import { Input } from "@/web/components/ui/input";
import { Badge } from "@/web/components/ui/badge";
import { Search, MapPin, Clock, Users, Phone, Mail } from "lucide-react";
import { Header } from "@/web/components/Header/Header";
import {
  Configuration,
  FoodDonationApi,
  FoodDonation,
} from "@/web/api-client/src";
import { formatToFrenchLongDate } from "@/web/shared/helpers/dateHelper";

export default function AssociationPage() {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedDonation, setSelectedDonation] = useState<number | null>(null);
  const [foodDonations, setFoodDonations] = useState<FoodDonation[]>([]);

  useEffect(() => {
    const findAllDonations = async () => {
      const api = new FoodDonationApi(
        new Configuration({
          basePath:
            process.env.NEXT_PUBLIC_API_BASE_URL || "http://localhost:3004",
        }),
      );
      const resp = await api.findAll();
      const upcomingDonations = resp.upcoming;
      setFoodDonations(upcomingDonations);
    };
    findAllDonations();
  }, []);

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
        <div className="mb-6">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">
            Dons alimentaires disponibles
          </h1>
          <p className="text-gray-600">
            Trouvez des surplus alimentaires près de chez vous
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-6 h-[calc(100vh-200px)]">
          {/* Left Panel - Search and Results */}
          <div className="flex flex-col">
            {/* Search Bar */}
            <div className="mb-6">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                <Input
                  placeholder="Rechercher par lieu, type d'événement..."
                  className="pl-10 py-3 text-lg border-gray-300 focus:border-green-500 focus:ring-green-500"
                  type="text"
                  name="search"
                  error={undefined}
                />
              </div>
            </div>

            {/* Results */}
            <div className="flex-1 overflow-y-auto space-y-4">
              {foodDonations.length === 0 ? (
                <Card className="p-8 text-center">
                  <div className="text-gray-400 mb-4">
                    <Search className="w-12 h-12 mx-auto" />
                  </div>
                  <h3 className="text-lg font-semibold text-gray-900 mb-2">
                    Aucun résultat trouvé
                  </h3>
                  <p className="text-gray-600">
                    Essayez de modifier vos critères de recherche
                  </p>
                </Card>
              ) : (
                foodDonations.map((donation) => (
                  <Card
                    key={donation.title}
                    className={`p-6 cursor-pointer transition-all duration-200 hover:shadow-lg border-l-4 ${
                      donation.status === "Urgent"
                        ? "border-l-orange-500 bg-orange-50"
                        : "border-l-green-500"
                    } ${
                      selectedDonation === donation.id
                        ? "ring-2 ring-green-500 shadow-lg"
                        : ""
                    }`}
                    onClick={() => setSelectedDonation(donation.id)}
                  >
                    <div className="flex justify-between items-start mb-3">
                      <h3 className="text-lg font-semibold text-gray-900 line-clamp-2">
                        {donation.title}
                      </h3>
                      {/*<Badge*/}
                      {/*  variant={*/}
                      {/*    donation.status === "Urgent"*/}
                      {/*      ? "destructive"*/}
                      {/*      : "default"*/}
                      {/*  }*/}
                      {/*  className={*/}
                      {/*    donation.status === "Urgent"*/}
                      {/*      ? "bg-orange-500"*/}
                      {/*      : "bg-green-500"*/}
                      {/*  }*/}
                      {/*>*/}
                      {/*  {donation.}*/}
                      {/*</Badge>*/}
                    </div>

                    <p className="text-gray-600 mb-4">{donation.description}</p>

                    <div className="grid grid-cols-2 gap-4 mb-4">
                      <div className="flex items-center text-sm text-gray-600">
                        <MapPin className="w-4 h-4 mr-2 text-gray-400" />
                        <span>{donation.pickupPlace}</span>
                      </div>
                      <div className="flex items-center text-sm text-gray-600">
                        <Clock className="w-6 h-6 mr-2 text-gray-400" />
                        <span>
                          Disponible du{" "}
                          {formatToFrenchLongDate(donation.availableFrom)} au{" "}
                          {formatToFrenchLongDate(donation.availableTo)}
                        </span>
                      </div>
                      <div className="flex items-center text-sm text-gray-600">
                        <Users className="w-4 h-4 mr-2 text-gray-400" />
                        <span>{donation.estimatedPortions} portions</span>
                      </div>
                      <div className="text-sm text-green-600 font-medium">
                        {/*{donation.distance}*/}
                      </div>
                    </div>

                    <div className="border-t pt-4">
                      <div className="flex items-center justify-between">
                        <div>
                          <p className="mb-2">Informations de contact</p>
                          <p className="text-sm font-medium text-gray-900">
                            {donation.contactName}
                          </p>
                          <p className="text-sm text-gray-600">
                            {donation.contactEmail}
                          </p>
                        </div>
                        <div className="flex space-x-2">
                          <Button
                            size="sm"
                            variant="outline"
                            className="text-green-600 border-green-600 hover:bg-green-50"
                          >
                            <Phone className="w-4 h-4 mr-1" />
                            Voir le numéro
                          </Button>
                          <Button
                            size="sm"
                            className="bg-green-600 hover:bg-green-700"
                          >
                            <Mail className="w-4 h-4 mr-1" />
                            Réserver
                          </Button>
                        </div>
                      </div>
                    </div>
                  </Card>
                ))
              )}
            </div>
          </div>

          {/* Right Panel - Map */}
          <div className="lg:sticky lg:top-6">
            <Card className="h-full p-4">
              <div className="h-full bg-gray-100 rounded-lg relative overflow-hidden">
                {/* Map Placeholder */}
                <div className="absolute inset-0 flex items-center justify-center bg-gradient-to-br from-green-100 to-orange-100">
                  <div className="text-center">
                    <MapPin className="w-16 h-16 text-green-600 mx-auto mb-4" />
                    <h3 className="text-xl font-semibold text-gray-900 mb-2">
                      Carte interactive
                    </h3>
                    <p className="text-gray-600 max-w-sm">
                      Visualisez les dons disponibles autour de vous sur la
                      carte
                    </p>
                  </div>
                </div>

                {/* Mock Map Pins */}
                <div className="absolute top-1/4 left-1/3 w-4 h-4 bg-green-500 rounded-full shadow-lg animate-pulse"></div>
                <div className="absolute top-1/2 right-1/3 w-4 h-4 bg-orange-500 rounded-full shadow-lg animate-pulse"></div>
                <div className="absolute bottom-1/3 left-1/2 w-4 h-4 bg-green-500 rounded-full shadow-lg animate-pulse"></div>

                {/* Map Controls */}
                <div className="absolute top-4 right-4 flex flex-col space-y-2">
                  <Button
                    size="sm"
                    variant="outline"
                    className="bg-white shadow-lg"
                  >
                    +
                  </Button>
                  <Button
                    size="sm"
                    variant="outline"
                    className="bg-white shadow-lg"
                  >
                    -
                  </Button>
                </div>

                {/* Legend */}
                <div className="absolute bottom-4 left-4 bg-white rounded-lg shadow-lg p-3">
                  <h4 className="text-sm font-semibold text-gray-900 mb-2">
                    Légende
                  </h4>
                  <div className="flex items-center mb-1">
                    <div className="w-3 h-3 bg-green-500 rounded-full mr-2"></div>
                    <span className="text-xs text-gray-600">Disponible</span>
                  </div>
                  <div className="flex items-center">
                    <div className="w-3 h-3 bg-orange-500 rounded-full mr-2"></div>
                    <span className="text-xs text-gray-600">Urgent</span>
                  </div>
                </div>
              </div>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}
