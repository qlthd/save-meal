"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Checkbox } from "@/components/ui/checkbox";
import {
  ChefHat,
  ArrowLeft,
  Clock,
  MapPin,
  Users,
  Phone,
  Mail,
  Calendar,
  CheckCircle,
  AlertCircle,
} from "lucide-react";
import Link from "next/link";
import { LoginModal } from "@/components/LoginModal";

export default function DonnerPage() {
  const [donationType, setDonationType] = useState<"now" | "later">("now");
  const [loginModalOpen, setLoginModalOpen] = useState(false);
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    foodType: "",
    portions: "",
    location: "",
    address: "",
    pickupInstructions: "",
    contactName: "",
    contactPhone: "",
    contactEmail: "",
    availableFrom: "",
    availableUntil: "",
    scheduledDate: "",
    scheduledTime: "",
    dietaryInfo: {
      vegetarian: false,
      vegan: false,
      glutenFree: false,
      halal: false,
      kosher: false,
    },
    additionalNotes: "",
  });

  const handleInputChange = (field: string, value: string) => {
    setFormData((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  const handleDietaryChange = (dietary: string, checked: boolean) => {
    setFormData((prev) => ({
      ...prev,
      dietaryInfo: {
        ...prev.dietaryInfo,
        [dietary]: checked,
      },
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Handle form submission
    console.log("Donation created:", { ...formData, type: donationType });
    alert("Donation créée avec succès ! Une association sera notifiée.");
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
                src="https://cdn.builder.io/api/v1/image/assets%2F3d47985c501b449a8a6a74efa2d87067%2Ff43b620574114d128cc3d1644c6ee463?format=webp&width=800"
                alt="Save Meal Logo"
                className="h-14 w-auto"
              />
            </Link>
          </div>
          <div className="flex items-center space-x-4">
            <Link href="/mes-donations">
              <Button
                variant="ghost"
                size="sm"
                className="text-gray-600 hover:text-green-600"
              >
                Mes donations
              </Button>
            </Link>
            <Button
              variant="outline"
              size="sm"
              onClick={() => setLoginModalOpen(true)}
            >
              Se connecter
            </Button>
            <Badge
              variant="secondary"
              className="bg-orange-100 text-orange-800"
            >
              Donateur
            </Badge>
          </div>
        </div>
      </nav>

      {/* Login Modal */}
      <LoginModal open={loginModalOpen} onOpenChange={setLoginModalOpen} />
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-4">
            Créer un don alimentaire
          </h1>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Partagez vos surplus alimentaires avec des associations locales et
            luttez contre le gaspillage
          </p>
        </div>

        {/* Donation Type Selection */}
        <Card className="p-6 mb-8">
          <h2 className="text-xl font-semibold text-gray-900 mb-4">
            Quand souhaitez-vous donner ?
          </h2>
          <RadioGroup
            value={donationType}
            onValueChange={(value) => setDonationType(value as "now" | "later")}
            className="grid md:grid-cols-2 gap-4"
          >
            <div className="flex items-center space-x-2">
              <RadioGroupItem value="now" id="now" />
              <Label
                htmlFor="now"
                className="flex-1 cursor-pointer p-4 border-2 border-gray-200 rounded-lg hover:border-green-300 transition-colors"
              >
                <div className="flex items-center space-x-3">
                  <div className="w-10 h-10 bg-green-100 rounded-full flex items-center justify-center">
                    <Clock className="w-5 h-5 text-green-600" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-gray-900">
                      Disponible maintenant
                    </h3>
                    <p className="text-sm text-gray-600">
                      La nourriture est prête à être récupérée immédiatement
                    </p>
                  </div>
                </div>
              </Label>
            </div>
            <div className="flex items-center space-x-2">
              <RadioGroupItem value="later" id="later" />
              <Label
                htmlFor="later"
                className="flex-1 cursor-pointer p-4 border-2 border-gray-200 rounded-lg hover:border-orange-300 transition-colors"
              >
                <div className="flex items-center space-x-3">
                  <div className="w-10 h-10 bg-orange-100 rounded-full flex items-center justify-center">
                    <Calendar className="w-5 h-5 text-orange-600" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-gray-900">
                      Programmer pour plus tard
                    </h3>
                    <p className="text-sm text-gray-600">
                      Planifier un don pour un événement futur
                    </p>
                  </div>
                </div>
              </Label>
            </div>
          </RadioGroup>
        </Card>

        {/* Main Form */}
        <form onSubmit={handleSubmit} className="space-y-8">
          {/* Food Details */}
          <Card className="p-6">
            <h2 className="text-xl font-semibold text-gray-900 mb-6 flex items-center">
              <div className="w-8 h-8 bg-green-100 rounded-full flex items-center justify-center mr-3">
                <ChefHat className="w-4 h-4 text-green-600" />
              </div>
              Détails de la nourriture
            </h2>
            <div className="grid md:grid-cols-2 gap-6">
              <div>
                <Label htmlFor="title">Titre du don</Label>
                <Input
                  id="title"
                  placeholder="Ex: Surplus de buffet d'entreprise"
                  value={formData.title}
                  onChange={(e) => handleInputChange("title", e.target.value)}
                  className="mt-2"
                  required
                />
              </div>
              <div>
                <Label htmlFor="foodType">Type de nourriture</Label>
                <Input
                  id="foodType"
                  placeholder="Ex: Plats chauds, sandwichs, desserts..."
                  value={formData.foodType}
                  onChange={(e) =>
                    handleInputChange("foodType", e.target.value)
                  }
                  className="mt-2"
                  required
                />
              </div>
              <div>
                <Label htmlFor="portions">Nombre de portions estimé</Label>
                <Input
                  id="portions"
                  type="number"
                  placeholder="Ex: 50"
                  value={formData.portions}
                  onChange={(e) =>
                    handleInputChange("portions", e.target.value)
                  }
                  className="mt-2"
                  required
                />
              </div>
              <div className="md:col-span-2">
                <Label htmlFor="description">Description détaillée</Label>
                <Textarea
                  id="description"
                  placeholder="Décrivez la nourriture disponible, les conditions de conservation, etc."
                  value={formData.description}
                  onChange={(e) =>
                    handleInputChange("description", e.target.value)
                  }
                  className="mt-2"
                  rows={3}
                  required
                />
              </div>
            </div>

            {/* Dietary Information */}
            <div className="mt-6">
              <Label className="text-base font-medium">
                Informations diététiques (optionnel)
              </Label>
              <div className="grid grid-cols-2 md:grid-cols-5 gap-4 mt-3">
                {Object.entries({
                  vegetarian: "Végétarien",
                  vegan: "Végan",
                  glutenFree: "Sans gluten",
                  halal: "Halal",
                  kosher: "Kasher",
                }).map(([key, label]) => (
                  <div key={key} className="flex items-center space-x-2">
                    <Checkbox
                      id={key}
                      checked={
                        formData.dietaryInfo[
                          key as keyof typeof formData.dietaryInfo
                        ]
                      }
                      onCheckedChange={(checked) =>
                        handleDietaryChange(key, checked as boolean)
                      }
                    />
                    <Label htmlFor={key} className="text-sm">
                      {label}
                    </Label>
                  </div>
                ))}
              </div>
            </div>
          </Card>

          {/* Location */}
          <Card className="p-6">
            <h2 className="text-xl font-semibold text-gray-900 mb-6 flex items-center">
              <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center mr-3">
                <MapPin className="w-4 h-4 text-blue-600" />
              </div>
              Lieu de récupération
            </h2>
            <div className="grid md:grid-cols-2 gap-6">
              <div>
                <Label htmlFor="location">Nom du lieu</Label>
                <Input
                  id="location"
                  placeholder="Ex: Restaurant Le Gourmet"
                  value={formData.location}
                  onChange={(e) =>
                    handleInputChange("location", e.target.value)
                  }
                  className="mt-2"
                  required
                />
              </div>
              <div>
                <Label htmlFor="address">Adresse complète</Label>
                <Input
                  id="address"
                  placeholder="123 Rue de la Paix, 75001 Paris"
                  value={formData.address}
                  onChange={(e) => handleInputChange("address", e.target.value)}
                  className="mt-2"
                  required
                />
              </div>
              <div className="md:col-span-2">
                <Label htmlFor="pickupInstructions">
                  Instructions de récupération
                </Label>
                <Textarea
                  id="pickupInstructions"
                  placeholder="Ex: Entrée par la porte de service, demander Jean au comptoir..."
                  value={formData.pickupInstructions}
                  onChange={(e) =>
                    handleInputChange("pickupInstructions", e.target.value)
                  }
                  className="mt-2"
                  rows={2}
                />
              </div>
            </div>
          </Card>

          {/* Timing */}
          <Card className="p-6">
            <h2 className="text-xl font-semibold text-gray-900 mb-6 flex items-center">
              <div className="w-8 h-8 bg-purple-100 rounded-full flex items-center justify-center mr-3">
                <Clock className="w-4 h-4 text-purple-600" />
              </div>
              Disponibilité
            </h2>
            {donationType === "now" ? (
              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <Label htmlFor="availableFrom">Disponible à partir de</Label>
                  <Input
                    id="availableFrom"
                    type="time"
                    value={formData.availableFrom}
                    onChange={(e) =>
                      handleInputChange("availableFrom", e.target.value)
                    }
                    className="mt-2"
                    required
                  />
                </div>
                <div>
                  <Label htmlFor="availableUntil">Disponible jusqu'à</Label>
                  <Input
                    id="availableUntil"
                    type="time"
                    value={formData.availableUntil}
                    onChange={(e) =>
                      handleInputChange("availableUntil", e.target.value)
                    }
                    className="mt-2"
                    required
                  />
                </div>
              </div>
            ) : (
              <div className="grid md:grid-cols-3 gap-6">
                <div>
                  <Label htmlFor="scheduledDate">Date prévue</Label>
                  <Input
                    id="scheduledDate"
                    type="date"
                    value={formData.scheduledDate}
                    onChange={(e) =>
                      handleInputChange("scheduledDate", e.target.value)
                    }
                    className="mt-2"
                    required
                  />
                </div>
                <div>
                  <Label htmlFor="scheduledTime">Heure prévue</Label>
                  <Input
                    id="scheduledTime"
                    type="time"
                    value={formData.scheduledTime}
                    onChange={(e) =>
                      handleInputChange("scheduledTime", e.target.value)
                    }
                    className="mt-2"
                    required
                  />
                </div>
                <div>
                  <Label htmlFor="availableUntil">Disponible jusqu'à</Label>
                  <Input
                    id="availableUntil"
                    type="time"
                    value={formData.availableUntil}
                    onChange={(e) =>
                      handleInputChange("availableUntil", e.target.value)
                    }
                    className="mt-2"
                    required
                  />
                </div>
              </div>
            )}
          </Card>

          {/* Contact Information */}
          <Card className="p-6">
            <h2 className="text-xl font-semibold text-gray-900 mb-6 flex items-center">
              <div className="w-8 h-8 bg-orange-100 rounded-full flex items-center justify-center mr-3">
                <Users className="w-4 h-4 text-orange-600" />
              </div>
              Informations de contact
            </h2>
            <div className="grid md:grid-cols-3 gap-6">
              <div>
                <Label htmlFor="contactName">Nom complet</Label>
                <Input
                  id="contactName"
                  placeholder="Jean Dupont"
                  value={formData.contactName}
                  onChange={(e) =>
                    handleInputChange("contactName", e.target.value)
                  }
                  className="mt-2"
                  required
                />
              </div>
              <div>
                <Label htmlFor="contactPhone">Téléphone</Label>
                <Input
                  id="contactPhone"
                  type="tel"
                  placeholder="06 12 34 56 78"
                  value={formData.contactPhone}
                  onChange={(e) =>
                    handleInputChange("contactPhone", e.target.value)
                  }
                  className="mt-2"
                  required
                />
              </div>
              <div>
                <Label htmlFor="contactEmail">Email</Label>
                <Input
                  id="contactEmail"
                  type="email"
                  placeholder="jean@example.com"
                  value={formData.contactEmail}
                  onChange={(e) =>
                    handleInputChange("contactEmail", e.target.value)
                  }
                  className="mt-2"
                  required
                />
              </div>
            </div>

            <div className="mt-6">
              <Label htmlFor="additionalNotes">Notes additionnelles</Label>
              <Textarea
                id="additionalNotes"
                placeholder="Informations complémentaires..."
                value={formData.additionalNotes}
                onChange={(e) =>
                  handleInputChange("additionalNotes", e.target.value)
                }
                className="mt-2"
                rows={2}
              />
            </div>
          </Card>

          {/* Information Card */}
          <Card className="p-6 bg-green-50 border-green-200">
            <div className="flex items-start space-x-3">
              <CheckCircle className="w-6 h-6 text-green-600 mt-0.5" />
              <div>
                <h3 className="font-semibold text-green-900 mb-2">
                  Après soumission
                </h3>
                <ul className="text-sm text-green-700 space-y-1">
                  <li>
                    • Les associations locales seront automatiquement notifiées
                  </li>
                  <li>• Vous recevrez une confirmation par email</li>
                  <li>
                    • Une association vous contactera pour organiser la
                    récupération
                  </li>
                  <li>• Vous pourrez suivre le statut de votre don</li>
                </ul>
              </div>
            </div>
          </Card>

          {/* Submit Button */}
          <div className="flex justify-center pt-6">
            <Button
              type="submit"
              size="lg"
              className="bg-gradient-to-r from-green-600 to-orange-500 hover:from-green-700 hover:to-orange-600 text-white px-12 py-4 text-lg font-semibold rounded-xl shadow-lg hover:shadow-xl transition-all duration-200"
            >
              <CheckCircle className="w-5 h-5 mr-2" />
              Créer le don
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
}
