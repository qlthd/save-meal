import { DonationCardProps } from "@/web/components/molecules/DonationCard/DonationCard.types";
import { Card } from "@/web/components/ui/card";
import {
  AlertCircle,
  Calendar,
  CheckCircle,
  MapPin,
  Users,
  HandHelping,
  Clock,
} from "lucide-react";
import { Badge } from "@/web/components/ui/badge";

export const DonationCard = (props: DonationCardProps) => {
  const { donation } = props;

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

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "collected":
        return (
          <Badge className="bg-green-100 text-green-800 border-green-200">
            <CheckCircle className="w-3 h-3 mr-1" />
            Récupéré
          </Badge>
        );
      case "cancelled":
        return (
          <Badge className="bg-red-100 text-red-800 border-red-200">
            <AlertCircle className="w-3 h-3 mr-1" />
            Expiré
          </Badge>
        );
      case "planned":
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
      case "pending":
        return (
          <Badge className="bg-yellow-100 text-yellow-800 border-yellow-200">
            <Clock className="w-3 h-3 mr-1" />
            En attente
          </Badge>
        );
      default:
        return <Badge variant="secondary">{status}</Badge>;
    }
  };

  return (
    <Card key={donation.title} className="p-4 border-l-4 border-l-red-400">
      <div className="flex justify-between items-start mb-3">
        <div className="flex gap-x-2">
          <HandHelping className="text-green-600" />
          <h3 className="text-lg font-semibold text-gray-900">
            {donation.title}
          </h3>
        </div>
        {getStatusBadge(donation.status)}
      </div>
      <p className="text-sm mb-3">{donation.description}</p>
      <div className="space-y-2 text-sm md:inline-flex md:space-y-0 md:space-x-6">
        <div className="flex items-center">
          <Calendar className="w-4 h-4 mr-2 text-green-600" />
          <span>
            {formatDate(donation.availableFrom)} au{" "}
            {formatDate(donation.availableTo)}
          </span>
        </div>
        {donation.pickupPlace && (
          <div className="flex items-center">
            <MapPin className="w-4 h-4 mr-2 text-green-800" />
            <span>{donation.pickupPlace}</span>
          </div>
        )}
        <div className="flex items-center">
          <Users className="w-4 h-4 mr-2 text-green-800" />
          <span>{donation.estimatedPortions} portions</span>
        </div>
      </div>
      {donation.booking?.association && (
        <div className="mt-3 p-3 bg-green-50 rounded-lg">
          <p className="text-sm text-green-800">
            <strong>Récupéré par:</strong>{" "}
            {donation.booking?.association.corporateName}
          </p>
        </div>
      )}
    </Card>
  );
};
