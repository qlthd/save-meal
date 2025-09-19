import { useRouter } from "next/navigation";
import { SubmitHandler, useForm, useWatch } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as React from "react";
import toast from "react-hot-toast";
import { Configuration, FoodDonationApi } from "@/web/api-client/src";
import { useState, useRef, useEffect } from "react";
import { Button } from "@/web/components/ui/button";
import { Card } from "@/web/components/ui/card";
import { Input } from "@/web/components/ui/input";
import { Label } from "@/web/components/ui/label";
import { Textarea } from "@/web/components/ui/textarea";
import { RadioGroup, RadioGroupItem } from "@/web/components/ui/radio-group";
import { Checkbox } from "@/web/components/ui/checkbox";
import {
  ChefHat,
  Clock,
  MapPin,
  Users,
  Calendar,
  CheckCircle,
  TrashIcon,
} from "lucide-react";
import {
  FoodDonationFormValue,
  FoodDonationSchema,
  ImageItem,
} from "@/web/components/organisms/CreateCollecteForm/CreateCollecteForm.types";
import { PhotoProvider, PhotoView } from "react-photo-view";
import PlaceAutocomplete from "react-google-autocomplete";
import { useMutation } from "@tanstack/react-query";

export const CreateCollecteForm = () => {
  const router = useRouter();
  const [images, setImages] = useState<ImageItem[]>([]);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const api = new FoodDonationApi(
    new Configuration({
      basePath: process.env.NEXT_PUBLIC_API_BASE_URL || "http://localhost:3004",
    }),
  );

  const useCreateFoodDonation = () => {
    return useMutation({
      mutationFn: (data: any) =>
        api.create({
          createFoodDonationDto: data,
        }),
    });
  };
  const { isPending, mutate } = useCreateFoodDonation();

  const {
    register,
    handleSubmit,
    formState: { errors },
    setError,
    setValue,
    control,
    clearErrors,
  } = useForm<FoodDonationFormValue>({
    resolver: zodResolver(FoodDonationSchema),
    defaultValues: { donationType: "now" },
  });

  const donationType = useWatch({
    control,
    name: "donationType",
  });

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!e.target.files) return;
    const files = Array.from(e.target.files);

    const newImages: ImageItem[] = files.map((file) => ({
      id: URL.createObjectURL(file),
      file,
      preview: URL.createObjectURL(file),
    }));

    setImages((prev) => [...prev, ...newImages]);
    e.target.value = ""; // allow re-selecting the same file
  };

  const handleRemove = (id: string) => {
    setImages((prev) => prev.filter((img) => img.id !== id));
    URL.revokeObjectURL(id);
  };

  const openFilePicker = () => {
    fileInputRef.current?.click();
  };

  useEffect(() => {
    if (donationType === "now") {
      const now = new Date();
      const dateStr = now.toISOString().split("T")[0]; // yyyy-mm-dd
      const timeStr = now.toTimeString().slice(0, 5); // hh:mm

      setValue("startDate", dateStr);
      setValue("startTime", timeStr);
      setValue("endDate", dateStr);
    } else if (donationType === "later") {
      setValue("startDate", "");
      setValue("startTime", "");
    }
  }, [donationType, setValue]);

  const handleDietaryChange = (dietary: string, checked: boolean) => {
    // setValue((prev) => ({
    //   ...prev,
    //   dietaryInfo: {
    //     ...prev.dietaryInfo,
    //     [dietary]: checked,
    //   },
    // }));
  };

  const getDateWithCustomTime = (time: string, date?: Date) => {
    const resultDate = date ?? new Date();
    const [hours, minutes] = time.split(":").map(Number);
    resultDate.setHours(hours, minutes, 0, 0);
    return resultDate.toISOString();
  };

  const onSubmit: SubmitHandler<FoodDonationFormValue> = (data) => {
    const payload = {
      title: data.title,
      description: data.description,
      foodType: data.foodType,
      estimatedPortions: Number(data.estimatedPortions),
      pickupPlace: data.pickupPlace || "",
      address: data.address,
      pickupInstructions: data.pickupInstructions || "",
      availableFrom: getDateWithCustomTime(
        data.startTime,
        new Date(data.startDate),
      ),
      availableTo: getDateWithCustomTime(data.endTime, new Date(data.endDate)),
      contactName: data.contactName,
      contactPhone: data.contactPhone,
      contactEmail: data.contactEmail,
      additionalNotes: data.additionalNotes ?? "",
      latitude: data.latitude,
      longitude: data.longitude,
    };

    mutate(payload, {
      onSuccess: () => {
        toast.success("Collecte créée avec succès !");
        router.push("/mes-donations");
      },
      onError: (error: Error) => {
        console.error(error);
        toast.error("Une erreur est survenue lors de la création.");
      },
    });
  };

  const handlePlaceSelected = (place: google.maps.places.PlaceResult) => {
    setValue("address", place.formatted_address || "");
    if (place.geometry && place.geometry.location) {
      const lat = place.geometry.location.lat();
      const lng = place.geometry.location.lng();
      setValue("longitude", lng);
      setValue("latitude", lat);
    } else {
      setError("address", {
        type: "manual",
        message: "Veuillez sélectionner une adresse valide.",
      });
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <Card className="p-6 mb-8">
        <h2 className="text-xl font-semibold text-gray-900 mb-4">
          Quand souhaitez-vous donner ?
        </h2>
        <RadioGroup
          value={donationType}
          onValueChange={(value) => {
            setValue("donationType", value);
            clearErrors();
          }}
          className="grid md:grid-cols-2 gap-4"
        >
          <div className="flex items-center space-x-2">
            <RadioGroupItem value="now" id="now" />
            <Label
              htmlFor="now"
              className="flex-1 cursor-pointer p-4 border-2 border-gray-200 rounded-lg hover:border-green-300 transition-colors"
            >
              <div className="flex items-center space-x-3">
                <div className="w-14 h-10 bg-green-100 rounded-full flex items-center justify-center">
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

      <div className="space-y-8">
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
              <Label htmlFor="location">Nom du lieu (facultatif)</Label>
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
              <PlaceAutocomplete
                className="mt-2 flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-base ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium file:text-foreground placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 md:text-sm"
                apiKey={process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY!}
                onPlaceSelected={handlePlaceSelected}
                placeholder="123 rue de la Paix, 75001 Paris"
                options={{
                  types: ["address"],
                  componentRestrictions: { country: "fr" },
                }}
                onChange={(e) => {
                  setValue("address", "");
                }}
              />
              {(errors.address || errors.latitude || errors.longitude) && (
                <p className="text-red-500 text-sm mt-1">
                  {errors.address?.message ||
                    errors.latitude?.message ||
                    errors.longitude?.message}
                </p>
              )}
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
                <Label htmlFor="endDate">Date de fin de collecte</Label>
                <Input
                  name="endDate"
                  error={errors.endDate}
                  type="date"
                  register={register}
                  className="mt-2"
                />
              </div>
              <div>
                <Label htmlFor="endTime">Heure de fin de collecte</Label>
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
            <div className="gap-6 space-y-6">
              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <Label htmlFor="startDate">Date de début de collecte</Label>
                  <Input
                    name="startDate"
                    error={errors.startDate}
                    type="date"
                    register={register}
                    className="mt-2"
                  />
                </div>
                <div>
                  <Label htmlFor="startTime">Heure de début de collecte</Label>
                  <Input
                    name="startTime"
                    error={errors.startTime}
                    type="time"
                    register={register}
                    className="mt-2"
                  />
                </div>
              </div>
              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <Label htmlFor="endDate">Date de fin de collecte</Label>
                  <Input
                    name="endDate"
                    error={errors.endDate}
                    type="date"
                    register={register}
                    className="mt-2"
                  />
                </div>
                <div>
                  <Label htmlFor="endTime">Heure de fin de collecte</Label>
                  <Input
                    name="endTime"
                    error={errors.endTime}
                    type="time"
                    register={register}
                    className="mt-2"
                  />
                </div>
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
                type="text"
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
        <div className="flex justify-center pt-6">
          <Button
            type="submit"
            size="lg"
            className="bg-gradient-to-r from-green-600 to-orange-500 hover:from-green-700 hover:to-orange-600 text-white px-12 py-4 text-lg font-semibold rounded-xl shadow-lg hover:shadow-xl transition-all duration-200 disabled:bg-red"
            disabled={isPending}
          >
            <CheckCircle className="w-5 h-5 mr-2" />
            Créer la collecte
          </Button>
        </div>
      </div>
    </form>
  );
};
