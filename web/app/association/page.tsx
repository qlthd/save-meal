"use client";

import { useEffect, useState } from "react";
import { Button } from "@/web/components/ui/button";
import { Card } from "@/web/components/ui/card";
import { Search, MapPin, Clock, Users, Phone, Mail } from "lucide-react";
import { Header } from "@/web/components/Header/Header";
import {
  Configuration,
  FoodDonationApi,
  FoodDonation,
} from "@/web/api-client/src";
import { formatToFrenchLongDate } from "@/web/shared/helpers/dateHelper";
import GoogleMapReact from "google-map-react";
import PlaceAutocomplete from "react-google-autocomplete";
import haversine from "haversine-distance"; // npm install haversine-distance
import { MapMarker } from "@/web/components/MapMarker/MapMarker";

export default function AssociationPage() {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedDonation, setSelectedDonation] = useState<number | null>(null);
  const [foodDonations, setFoodDonations] = useState<FoodDonation[]>();
  const [initialFoodDonations, setInitialFoodDonations] =
    useState<FoodDonation[]>();
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);
  const [searchedLocation, setSearchedLocation] = useState<string | null>(null);

  const getMapCenter = (
    locations: { latitude: number; longitude: number }[],
  ) => {
    const lats = locations.map((loc) => loc.latitude);
    const lngs = locations.map((loc) => loc.longitude);

    const latMin = Math.min(...lats);
    const latMax = Math.max(...lats);
    const lngMin = Math.min(...lngs);
    const lngMax = Math.max(...lngs);

    return {
      lat: (latMin + latMax) / 2,
      lng: (lngMin + lngMax) / 2,
    };
  };

  const getZoomLevel = (
    locations: { latitude: number; longitude: number }[],
  ) => {
    if (locations.length <= 1) return 12;

    const lats = locations.map((loc) => loc.latitude);
    const lngs = locations.map((loc) => loc.longitude);
    const latDelta = Math.max(...lats) - Math.min(...lats);
    const lngDelta = Math.max(...lngs) - Math.min(...lngs);
    const maxDelta = Math.max(latDelta, lngDelta);

    if (maxDelta < 0.01) return 15;
    if (maxDelta < 0.05) return 13;
    if (maxDelta < 0.2) return 11;
    if (maxDelta < 1) return 9;
    return 6;
  };

  const [mapCenter, setMapCenter] = useState<any>();
  const [mapZoom, setMapZoom] = useState<any>();
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
      setInitialFoodDonations(upcomingDonations);
      setMapCenter(getMapCenter(upcomingDonations));
      setMapZoom(getZoomLevel(upcomingDonations));
    };
    findAllDonations();
  }, []);

  const RADIUS_KM = 20;

  function handlePlaceSelected(place: any) {
    setSearchedLocation(place.formatted_address);
    const lat = place.geometry.location.lat();
    const lng = place.geometry.location.lng();

    const filtered = foodDonations?.filter((donation) => {
      const distance = haversine(
        { lat, lng },
        { lat: donation.latitude, lng: donation.longitude },
      );
      return distance / 1000 <= RADIUS_KM; // distance en km
    });
    console.log("Filtered donations:", filtered);
    // Mettre à jour l'état avec les résultats filtrés
    setFoodDonations(filtered);
  }
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
                <PlaceAutocomplete
                  className="pl-10 flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-base ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium file:text-foreground placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 md:text-sm"
                  apiKey={process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY!}
                  onPlaceSelected={handlePlaceSelected}
                  placeholder="Rechercher un lieu"
                  options={{
                    componentRestrictions: { country: "fr" },
                  }}
                  onChange={(e) => {
                    const value = (e.target as HTMLInputElement).value;
                    if (value === "") {
                      setSearchedLocation(null);
                      setFoodDonations(initialFoodDonations);
                    }
                  }}
                />
              </div>
            </div>

            {/* Results */}
            <div className="flex-1 overflow-y-auto space-y-4">
              {foodDonations?.length === 0 ? (
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
                <>
                  {searchedLocation ? (
                    <span className="text-xl">
                      {foodDonations?.length}{" "}
                      {foodDonations?.length && foodDonations?.length > 1
                        ? "collectes trouvées"
                        : "collecte trouvée"}{" "}
                      à {searchedLocation} et aux alentours
                    </span>
                  ) : (
                    <span className="text-xl">
                      {foodDonations?.length} collectes disponibles
                    </span>
                  )}
                  {foodDonations?.map((donation, i) => (
                    <Card
                      key={donation.title}
                      className={`relative p-6 cursor-pointer transition-all duration-200 hover:shadow-lg hover:bg-emerald-50 border-l-4 ${
                        hoveredIndex === i
                          ? "shadow-lg bg-emerald-50"
                          : selectedDonation === i
                            ? "ring-2 ring-green-500 shadow-lg"
                            : ""
                      } border-l-green-500`}
                      onClick={() => {
                        setMapCenter({
                          lat: donation.latitude,
                          lng: donation.longitude,
                        });
                        setMapZoom((prev) => (prev === 15 ? 16 : 15));
                      }}
                      onMouseEnter={() => setHoveredIndex(i)}
                      onMouseLeave={() => setHoveredIndex(null)}
                    >
                      <div className="flex justify-between items-start mb-3">
                        <h3 className="text-lg font-semibold text-gray-900 line-clamp-2">
                          {donation.title}
                        </h3>
                      </div>

                      <p className="text-gray-600 mb-4">
                        {donation.description}
                      </p>

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
                  ))}
                </>
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
                <GoogleMapReact
                  bootstrapURLKeys={{
                    key: process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY!,
                    libraries: ["places"],
                  }}
                  center={mapCenter}
                  zoom={mapZoom}
                >
                  {foodDonations?.map((location, i) => (
                    <MapMarker
                      key={i}
                      lat={location.latitude}
                      lng={location.longitude}
                      number={i + 1}
                      hovered={hoveredIndex === i}
                      onMouseEnter={() => setHoveredIndex(i)}
                      onMouseLeave={() => setHoveredIndex(null)}
                      onClick={() => {
                        setMapCenter({
                          lat: location.latitude,
                          lng: location.longitude,
                        });
                        setMapZoom((prev) => (prev === 15 ? 16 : 15));
                      }}
                    />
                  ))}
                </GoogleMapReact>
              </div>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}
