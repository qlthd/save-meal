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
import { formatToFrenchLongDate } from "@/web/shared/helpers/dateHelper";
import toast from "react-hot-toast";
import { Header } from "@/web/components/Header/Header";
import { CardCollecte } from "@/web/components/CardCollecte/CardCollecte";

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

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />

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
                    Collectes à venir (
                    {bookings.filter((b) => !b.isOver).length})
                  </h2>
                  {/*<Badge className="bg-green-100 text-green-800">*/}
                  {/*  {*/}
                  {/*    mockUpcomingCollections.filter(*/}
                  {/*      (d) => d.status === "Confirmé",*/}
                  {/*    ).length*/}
                  {/*  }{" "}*/}
                  {/*  confirmées*/}
                  {/*</Badge>*/}
                </div>
                {upcomingCollapsed ? (
                  <ChevronRight className="w-5 h-5 text-gray-500" />
                ) : (
                  <ChevronDown className="w-5 h-5 text-gray-500" />
                )}
              </Button>
            </CollapsibleTrigger>
            <CollapsibleContent className="space-y-4 mt-4">
              {bookings
                .filter((b) => !b.isOver)
                .map((booking) => (
                  <CardCollecte
                    booking={booking}
                    key={booking.id}
                    setBookings={setBookings}
                    allBookings={bookings}
                    isOver={false}
                  />
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
                    Collectes passées ({bookings.filter((b) => b.isOver).length}
                    )
                  </h2>
                  <Badge variant="secondary">
                    {
                      bookings.filter(
                        (b) =>
                          b.isOver && b.foodDonation?.status === "collected",
                      ).length
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
              {bookings
                .filter((b) => b.isOver)
                .map((booking) => (
                  <CardCollecte
                    booking={booking}
                    key={booking.id}
                    setBookings={setBookings}
                    allBookings={bookings}
                    isOver={false}
                  />
                ))}
            </CollapsibleContent>
          </Collapsible>
        </div>
      </main>
    </div>
  );
}
