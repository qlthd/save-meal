import { z } from "zod";

export const FoodDonationSchema = z.object({
  title: z.string().min(1, "Le titre est requis"),
  donationType: z.enum(["now", "later"], {
    required_error: "Le type de don est requis",
  }),
  description: z.string().min(1, "La description est requise"),
  foodType: z.string().min(1, "Le type de nourriture est requis"),
  estimatedPortions: z
    .string()
    .min(1, "Le nombre de portions est requis")
    .regex(/^\d+$/, "Doit être un nombre entier"),
  pickupPlace: z.string().optional(),
  address: z
    .string({ required_error: "L'adresse est requise" })
    .nullable()
    .refine((val) => !!val, { message: "L'adresse est requise" }),
  pickupInstructions: z.string().optional(),
  longitude: z.number({ required_error: "Une adresse valide est requise" }),
  latitude: z.number({ required_error: "Une adresse valide est requise" }),
  contactName: z.string().min(1, "Le nom de contact est requis"),
  contactPhone: z
    .string()
    .min(1, "Le téléphone de contact est requis")
    .regex(/^\d+$/, "Doit être un numéro de téléphone valide"),
  contactEmail: z.string().email("Doit être une adresse email valide"),
  startDate: z.string().min(1, "La date de début est requise"),
  startTime: z.string().min(1, "L'heure de début est requise"),
  endDate: z.string().min(1, "La date de fin est requise"),
  endTime: z.string().min(1, "L'heure de fin est requise"),
  additionalNotes: z.string().optional(),
});

export type FoodDonationFormValue = {
  donationType: string;
  title: string;
  foodType: string;
  estimatedPortions: number;
  description: string;
  pickupPlace?: string;
  longitude: number;
  latitude: number;
  address: string;
  pickupInstructions: string;
  startDate: Date | string;
  startTime: string;
  endDate: Date | string;
  endTime: string;
  contactName: string;
  contactPhone: string;
  contactEmail: string;
  additionalNotes?: string | null;
};

export type ImageItem = {
  id: string;
  file: File;
  preview: string;
};
