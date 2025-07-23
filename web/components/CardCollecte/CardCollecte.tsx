import { Card } from "@/web/components/ui/card";
import {
  Calendar,
  CheckCircle,
  Clock,
  Mail,
  MapPin,
  Phone,
  Users,
  X,
} from "lucide-react";
import { formatToFrenchLongDate } from "@/web/shared/helpers/dateHelper";
import { Button } from "@/web/components/ui/button";
import {
  Booking,
  BookingApi,
  Configuration,
  FoodDonationApi,
} from "@/web/api-client/src";
import { Badge } from "@/web/components/ui/badge";
import { useState } from "react";
import toast from "react-hot-toast";
import { useSession } from "next-auth/react";

export type CardCollecteProps = {
  booking: Booking;
  allBookings: Booking[];
  setBookings: (bookings: Booking[]) => void;
  isOver: boolean;
};

export const CardCollecte = (props: CardCollecteProps) => {
  const { booking, allBookings, setBookings, isOver } = props;
  const [bookingIdCancelled, setBookingIdCancelled] = useState<number>();
  const [donationIdConfirmed, setDonationIdConfirmed] = useState<number>();
  const { data: session, status } = useSession();

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "collected":
        return (
          <Badge className="bg-green-100 text-green-800 border-green-200">
            <CheckCircle className="w-3 h-3 mr-1" />
            Collecté
          </Badge>
        );
      case "canceled":
        return (
          <Badge className="bg-red-100 text-red-800 border-red-200">
            <X className="w-3 h-3 mr-1" />
            Annulé
          </Badge>
        );
      case "confirmed":
        return (
          <Badge className="bg-green-100 text-green-800 border-green-200">
            <CheckCircle className="w-3 h-3 mr-1" />
            Confirmé
          </Badge>
        );
      case "planned":
        return (
          <Badge className="bg-blue-100 text-blue-800 border-blue-200">
            <Calendar className="w-3 h-3 mr-1" />
            Planifié
          </Badge>
        );
      case "pending":
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

  const markAsCollected = (id: number) => {
    setDonationIdConfirmed(id);
    const updateFoodDonationStatus = async () => {
      const api = new FoodDonationApi(
        new Configuration({
          basePath:
            process.env.NEXT_PUBLIC_API_BASE_URL || "http://localhost:3004",
        }),
      );
      if (session) {
        try {
          await api.markCollected(
            {
              id: id.toString(),
            },
            {
              headers: {
                Authorization: `Bearer ${session.accessToken}`,
              },
            },
          );
          toast.success("Confirmation effectuée avec succès");
          const updatedBookings = allBookings.map((b) =>
            b.id === id && b.foodDonation
              ? {
                  ...b,
                  foodDonation: { ...b.foodDonation, status: "collected" },
                }
              : b,
          );
          setBookings(updatedBookings);
        } catch (error) {
          toast.error("Erreur lors de la confirmation");
        } finally {
          setDonationIdConfirmed(undefined);
        }
      }
    };
    updateFoodDonationStatus();
  };

  const cancelBooking = (id: number) => {
    setBookingIdCancelled(id);
    const cancelBookingCall = async () => {
      const api = new BookingApi(
        new Configuration({
          basePath:
            process.env.NEXT_PUBLIC_API_BASE_URL || "http://localhost:3004",
        }),
      );
      if (session) {
        try {
          await api.cancelBooking(
            {
              id: id.toString(),
            },
            {
              headers: {
                Authorization: `Bearer ${session.accessToken}`,
              },
            },
          );
          toast.success("Réservation annulée avec succès");
          setBookings(allBookings.filter((b) => b.id !== id));
        } catch (error) {
          toast.error("Erreur lors de l'annulation de la réservation");
        } finally {
          setBookingIdCancelled(undefined);
        }
      }
    };
    cancelBookingCall();
  };

  return (
    <Card key={booking.id} className="p-6">
      <div className="flex items-start justify-between mb-4">
        <div className="flex-1">
          <div className="flex items-center space-x-3 mb-2">
            <h3 className="font-semibold text-lg text-gray-900">
              {booking.foodDonation?.title}
            </h3>
            {booking.foodDonation?.status &&
              getStatusBadge(booking.foodDonation?.status)}
          </div>
          {/*<p className="text-gray-600 mb-3">{booking.foodDo}</p>*/}

          <div className="inline-flex gap-4 text-sm">
            <div className="flex items-center space-x-2">
              <Calendar className="w-4 h-4 text-gray-400" />
              <span>
                {booking.foodDonation?.availableFrom && (
                  <>
                    du{" "}
                    {formatToFrenchLongDate(
                      booking.foodDonation?.availableFrom,
                    )}{" "}
                  </>
                )}
                {booking.foodDonation?.availableTo && (
                  <>
                    au{" "}
                    {formatToFrenchLongDate(booking.foodDonation?.availableTo)}
                  </>
                )}
              </span>
            </div>
            <div className="flex items-center space-x-2">
              <MapPin className="w-4 h-4 text-gray-400" />
              <span>{booking.foodDonation?.pickupPlace?.toString()}</span>
            </div>
            <div className="flex items-center space-x-2">
              <Users className="w-4 h-4 text-gray-400" />
              <span>{booking.foodDonation?.estimatedPortions} portions</span>
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
            <span className="text-sm font-medium text-blue-700 mb-1">
              Adresse complète: {""}
            </span>
            <span className="text-sm text-blue-600">
              {booking.foodDonation?.address}
            </span>
            {booking.foodDonation?.description && (
              <p>
                <span className="text-sm font-medium text-blue-700 mt-2 mb-1">
                  Notes: {""}
                </span>
                <span className="text-sm text-blue-600">
                  {booking.foodDonation?.description}
                </span>
              </p>
            )}
          </div>
        </div>
      </div>

      <div className="flex space-x-3">
        {!isOver && booking.foodDonation?.status === "confirmed" && (
          <>
            <Button
              size="sm"
              className="bg-green-600 hover:bg-green-700"
              disabled={donationIdConfirmed === booking.foodDonationId}
              onClick={() => markAsCollected(booking.foodDonationId)}
            >
              <CheckCircle className="w-4 h-4 mr-1" />
              Marquer comme collectée
            </Button>
            <Button
              variant="outline"
              size="sm"
              disabled={bookingIdCancelled === booking.id}
              onClick={() => cancelBooking(booking.id)}
            >
              <X className="w-4 h-4 mr-1" />
              Annuler
            </Button>
          </>
        )}
      </div>
    </Card>
  );
};
