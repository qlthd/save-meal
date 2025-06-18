"use client";

import { useState, useRef } from "react";
import { Button } from "@/web/components/ui/button";
import { Card } from "@/web/components/ui/card";
import { Input } from "@/web/components/ui/input";
import { Label } from "@/web/components/ui/label";
import { Textarea } from "@/web/components/ui/textarea";
import { Badge } from "@/web/components/ui/badge";
import { RadioGroup, RadioGroupItem } from "@/web/components/ui/radio-group";
import { Checkbox } from "@/web/components/ui/checkbox";
import {
  ChefHat,
  ArrowLeft,
  Clock,
  MapPin,
  Users,
  Calendar,
  CheckCircle,
  TrashIcon,
} from "lucide-react";
import Link from "next/link";
import { LoginModal } from "@/web/components/LoginModal";
import { Prisma } from "@/backend/generated/prisma";
import { z, ZodType } from "zod";
import { SubmitHandler, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { PhotoProvider, PhotoView } from "react-photo-view";
import { useRouter } from "next/navigation";
import FoodDonationCreateInput = Prisma.FoodDonationCreateInput;
import { Configuration, FoodDonationApi } from "@/web/api-client/src";

const FoodDonationSchema = z
  .object({
    title: z.string().min(1, "Le titre est requis"),
    description: z.string().min(1, "La description est requise"),
    foodType: z.string().min(1, "Le type de nourriture est requis"),
    estimatedPortions: z
      .string()
      .min(1, "Le nombre de portions est requis")
      .regex(/^\d+$/, "Doit être un nombre entier"),
    pickupPlace: z.string().min(1, "Le nom du lieu est requis"),
    address: z.string().min(1, "L'adresse est requise"),
    pickupInstructions: z.string().optional(),
    contactName: z.string().min(1, "Le nom de contact est requis"),
    contactPhone: z
      .string()
      .min(1, "Le téléphone de contact est requis")
      .regex(/^\d+$/, "Doit être un numéro de téléphone valide"),
    contactEmail: z.string().email("Doit être une adresse email valide"),
    startDate: z.string().optional(),
    startTime: z.string().optional(),
    endTime: z
      .string()
      .min(1, "L'heure de disponibilité est requise")
      .regex(/^\d{2}:\d{2}$/, "Doit être au format HH:MM"),
    // dietaryInfo: z.object({
    //   vegetarian: z.boolean().optional(),
    //   vegan: z.boolean().optional(),
    //   glutenFree: z.boolean().optional(),
    //   halal: z.boolean().optional(),
    //   kosher: z.boolean().optional(),
    // }),
    additionalNotes: z.string().optional(),
  })
  .refine((data) => data.donationType !== "now" || !!data.startDate, {
    message: "La date prévue est requise si le don est disponible maintenant.",
    path: ["startDate"],
  });

export type FoodDonationFormValue = {
  title: string;
  foodType: string;
  estimatedPortions: number;
  description: string;
  pickupPlace: string;
  address: string;
  pickupInstructions: string;
  startDate?: Date | string;
  startTime?: string;
  endDate: Date | string;
  endTime: string;
  contactName: string;
  contactPhone: string;
  contactEmail: string;
  additionalNotes?: string | null;
};

export default function DonnerPage() {
  const router = useRouter();
  const [donationType, setDonationType] = useState<"now" | "later">("now");
  const [images, setImages] = useState([]);
  const fileInputRef = useRef(null);
  const handleFileChange = (e) => {
    const files = Array.from(e.target.files);

    const newImages = files.map((file) => ({
      id: URL.createObjectURL(file),
      file,
      preview: URL.createObjectURL(file),
    }));

    setImages((prev) => [...prev, ...newImages]);
    e.target.value = ""; // allow re-selecting the same file
  };

  const handleRemove = (id) => {
    setImages((prev) => prev.filter((img) => img.id !== id));
    URL.revokeObjectURL(id);
  };
  const openFilePicker = () => {
    fileInputRef.current?.click();
  };

  const [loginModalOpen, setLoginModalOpen] = useState(false);
  const {
    register,
    handleSubmit,
    formState: { errors },
    setError,
  } = useForm<FoodDonationFormValue>({
    resolver: zodResolver(FoodDonationSchema),
  });

  const handleDietaryChange = (dietary: string, checked: boolean) => {
    setFormData((prev) => ({
      ...prev,
      dietaryInfo: {
        ...prev.dietaryInfo,
        [dietary]: checked,
      },
    }));
  };

  const getDateWithCustomTime = (time: string, date?: Date) => {
    const resultDate = date ?? new Date();
    const [hours, minutes] = time.split(":").map(Number);
    resultDate.setHours(hours, minutes, 0, 0);
    return resultDate.toISOString();
  };

  const onSubmit: SubmitHandler<FoodDonationFormValue> = (data) => {
    const api = new FoodDonationApi(
      new Configuration({
        basePath:
          process.env.NEXT_PUBLIC_API_BASE_URL || "http://localhost:3003",
      }),
    );
    api
      .create({
        createFoodDonationDto: {
          title: data.title,
          description: data.description,
          foodType: data.foodType,
          estimatedPortions: Number(data.estimatedPortions),
          pickupPlace: data.pickupPlace,
          address: data.address,
          pickupInstructions: data.pickupInstructions || "",
          availableFrom:
            donationType === "now"
              ? new Date().toISOString()
              : getDateWithCustomTime(
                  data.startTime || "",
                  new Date(data.startDate),
                ),
          availableTo: getDateWithCustomTime(data.endTime),
          contactName: data.contactName,
          contactPhone: data.contactPhone,
          contactEmail: data.contactEmail,
          additionalNotes: data.additionalNotes ?? "",
          // dietaryInfo: {
          //   vegetarian: data.dietaryInfo.vegetarian || false,
          //   vegan: data.dietaryInfo.vegan || false,
          //   glutenFree: data.dietaryInfo.glutenFree || false,
          //   halal: data.dietaryInfo.halal || false,
          //   kosher: data.dietaryInfo.kosher || false,
          // },
        },
      })
      .then(() => {
        // Handle success, e.g., show a success message or redirect
        alert("Collecte créée avec succès !");
        router.push("/mes-donations");
      })
      .catch((error) => {
        // Handle error, e.g., show an error message
        console.error("Erreur lors de la création de la collecte :", error);
        setError("root", {
          type: "manual",
          message:
            "Une erreur est survenue lors de la création de la collecte.",
        });
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
            Créer une collecte de restes alimentaires
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
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-8">
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
                  type="text"
                  name="title"
                  error={errors.title}
                  placeholder="Ex: Surplus de buffet d'entreprise"
                  register={register}
                  className="mt-2"
                />
              </div>
              <div>
                <Label htmlFor="foodType">Type de nourriture</Label>
                <Input
                  type="text"
                  name="foodType"
                  error={errors.foodType}
                  placeholder="Ex: Plats chauds, sandwichs, desserts..."
                  register={register}
                  className="mt-2"
                />
              </div>
              <div>
                <Label htmlFor="portions">Nombre de portions estimé</Label>
                <Input
                  name="estimatedPortions"
                  error={errors.estimatedPortions}
                  type="number"
                  placeholder="Ex: 50"
                  register={register}
                  className="mt-2"
                />
              </div>
              <div className="grid md:col-span-2">
                <Label htmlFor="description">Description détaillée</Label>
                <Textarea
                  id="description"
                  error={errors.description}
                  placeholder="Décrivez la nourriture disponible, les conditions de conservation, etc."
                  name="description"
                  register={register}
                  className="mt-2"
                  rows={3}
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
                      // checked={
                      //   formData.dietaryInfo[
                      //     key as keyof typeof formData.dietaryInfo
                      //   ]
                      // }
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
            <div className="mt-6">
              <Label>Photos</Label>
              <div className="flex items-center gap-4">
                <button
                  onClick={openFilePicker}
                  className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
                >
                  Charger des images
                </button>
                <span className="text-gray-600">
                  {images.length > 0
                    ? `${images.length} image${images.length > 1 ? "s" : ""} sélectionnée${images.length > 1 ? "s" : ""}`
                    : "Pas d'images sélectionnées"}
                </span>
                <input
                  ref={fileInputRef}
                  type="file"
                  multiple
                  accept="image/*"
                  onChange={handleFileChange}
                  className="hidden"
                />
              </div>

              <PhotoProvider>
                <div className="grid grid-cols-3 gap-4">
                  {images.map((img) => (
                    <div key={img.id} className="relative group">
                      <PhotoView src={img.preview}>
                        <img
                          src={img.preview}
                          alt="preview"
                          className="rounded-lg shadow cursor-pointer"
                        />
                      </PhotoView>
                      <button
                        onClick={() => handleRemove(img.id)}
                        className="absolute top-1 right-1 bg-red-600 text-white rounded-full p-1 text-xs opacity-80 hover:opacity-100"
                      >
                        <TrashIcon className="w-4 h-4" />
                      </button>
                    </div>
                  ))}
                </div>
              </PhotoProvider>
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
                  type="text"
                  name="pickupPlace"
                  error={errors.pickupPlace}
                  placeholder="Ex: Restaurant Le Gourmet"
                  register={register}
                  className="mt-2"
                />
              </div>
              <div>
                <Label htmlFor="address">Adresse complète</Label>
                <Input
                  type="text"
                  name="address"
                  error={errors.address}
                  placeholder="123 Rue de la Paix, 75001 Paris"
                  className="mt-2"
                  register={register}
                />
              </div>
              <div className="grid md:col-span-2">
                <Label htmlFor="pickupInstructions">
                  Instructions de récupération
                </Label>
                <Textarea
                  id="pickupInstructions"
                  name="pickupInstructions"
                  error={errors.pickupInstructions}
                  placeholder="Ex: Entrée par la porte de service, demander Jean au comptoir..."
                  register={register}
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
                  <Label htmlFor="endTime">Heure de fin</Label>
                  <Input
                    name="endTime"
                    error={errors.endTime}
                    type="time"
                    register={register}
                    className="mt-2"
                  />
                </div>
              </div>
            ) : (
              <div className="grid md:grid-cols-3 gap-6">
                <div>
                  <Label htmlFor="startDate">Date prévue</Label>
                  <Input
                    name="startDate"
                    error={errors.startDate}
                    type="date"
                    register={register}
                    className="mt-2"
                  />
                </div>
                <div>
                  <Label htmlFor="startTime">Heure prévue</Label>
                  <Input
                    name="startTime"
                    error={errors.startTime}
                    type="time"
                    register={register}
                    className="mt-2"
                  />
                </div>
                <div>
                  <Label htmlFor="endTime">Disponible jusqu'à</Label>
                  <Input
                    name="endTime"
                    error={errors.endTime}
                    type="time"
                    register={register}
                    className="mt-2"
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
                  name="contactName"
                  error={errors.contactName}
                  placeholder="Jean Dupont"
                  className="mt-2"
                  register={register}
                />
              </div>
              <div>
                <Label htmlFor="contactPhone">Téléphone</Label>
                <Input
                  name="contactPhone"
                  error={errors.contactPhone}
                  type="tel"
                  placeholder="06 12 34 56 78"
                  className="mt-2"
                  register={register}
                />
              </div>
              <div>
                <Label htmlFor="contactEmail">Email</Label>
                <Input
                  name="contactEmail"
                  error={errors.contactEmail}
                  type="email"
                  placeholder="jean@example.com"
                  className="mt-2"
                  register={register}
                />
              </div>
            </div>

            <div className="grid mt-6">
              <Label htmlFor="additionalNotes">Notes additionnelles</Label>
              <Textarea
                id="additionalNotes"
                error={errors.additionalNotes}
                placeholder="Informations complémentaires..."
                name="additionalNotes"
                className="mt-2"
                register={register}
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
