"use client";

import { useState } from "react";
import { Button } from "@/web/components/ui/button";
import { Input } from "@/web/components/ui/input";
import { Label } from "@/web/components/ui/label";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/web/components/ui/dialog";
import {
  User,
  Users,
  Heart,
  Building,
} from "lucide-react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Configuration, UserApi } from "@/web/api-client/src";
import toast, { Toaster } from "react-hot-toast";
import { useSession } from 'next-auth/react';

interface LoginModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export type RequestAccountInfosFormValue = {
  type?: string;
  raisonSociale?: string;
  firstName?: string;
  lastName?: string;
};

const RequestAccountInfosSchema = z
  .object({
    type: z.enum(["association", "donateur"]).nullable().optional(),
    raisonSociale: z.string().optional(),
    firstName: z.string().optional(),
    lastName: z.string().optional(),
  })
  .refine(
    (data) =>
      data.type == "donateur" ||
      data.type == "association",
    {
      message: "Vous devez choisir quel type d'utilisateur vous êtes",
      path: ["type"],
    },
  )
  .refine((data) => !!data.raisonSociale, {
    message: "Vous devez définir une raison sociale",
    path: ["raisonSociale"],
  });

export function RequestAccountInfosModal({ open, onOpenChange }: LoginModalProps) {
  const [error, setError] = useState<string | null>(null);
  const { data: session } = useSession();
  console.log(session);
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    setValue,
    control,
  } = useForm<RequestAccountInfosFormValue>({
    resolver: zodResolver(RequestAccountInfosSchema),
  });

  const onSubmit = async (data: RequestAccountInfosFormValue) => {

      const firstName = data.firstName;
      const lastName = data.lastName;
      const type = data.type;
      const corporateName = data.raisonSociale;

      const userApi = new UserApi(
        new Configuration({
          basePath:
           "http://localhost:3004",
          headers: { Authorization: `Bearer ${session?.accessToken}` },
        }),
      );
      try {
        await userApi.updateUser({
          id: 1,
          createUserDto: {
            firstName: "michel",
            type: "ee",
            corporateName: "rr",
            email: "rr",
            password: "dd",
          },
        });
        toast.success("Informations ajoutées avec succès !");
      } catch (error) {
        setError("Erreur lors de l'ajout des informations. Veuillez réessayer.");
        return;
      }
  };

  return (
    <>
      <Dialog open={open} onOpenChange={onOpenChange}>
        <DialogContent className="sm:max-w-xl overflow-y-auto max-h-screen">
          <DialogHeader className="text-center">
            <DialogTitle className="text-2xl font-bold text-gray-900">
              Nous avons besoin de quelques informations
            </DialogTitle>
          </DialogHeader>

          <div className="space-y-6">

            {/* Email/Password Form */}
            <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
                <>
                  <span>Je suis :</span>
                  <div role="radiogroup" className="grid grid-cols-1 gap-3">
                    <div className="flex items-center space-x-2">
                      <input
                        type="radio"
                        value="association"
                        className="aspect-square h-4 w-4 rounded-full border border-primary text-primary ring-offset-background focus:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                        id="association"
                        {...register("type")}
                      ></input>
                      <label
                        className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70 flex-1 cursor-pointer p-3 border-2 border-gray-200 rounded-lg hover:border-green-300 transition-colors flex items-center space-x-3"
                        htmlFor="association"
                      >
                        <div className="w-8 h-8 bg-green-100 rounded-full flex items-center justify-center">
                          <Users size="18" className="text-green-600" />
                        </div>
                        <div>
                          <div className="font-medium text-gray-900">
                            Une association
                          </div>
                          <div className="text-sm text-gray-600">
                            Je récupère de la nourriture pour la redistribuer
                          </div>
                        </div>
                      </label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <input
                        type="radio"
                        value="donateur"
                        className="aspect-square h-4 w-4 rounded-full border border-primary text-primary ring-offset-background focus:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                        id="donateur"
                        {...register("type")}
                      />
                      <label
                        className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70 flex-1 cursor-pointer p-3 border-2 border-gray-200 rounded-lg hover:border-orange-300 transition-colors flex items-center space-x-3"
                        htmlFor="donateur"
                      >
                        <div className="w-8 h-8 bg-orange-100 rounded-full flex items-center justify-center">
                          <Heart size="18" className="text-orange-600" />
                        </div>
                        <div>
                          <div className="font-medium text-gray-900">
                            Un donateur
                          </div>
                          <div className="text-sm text-gray-600">
                            J'ai des surplus alimentaires à donner
                          </div>
                        </div>
                      </label>
                    </div>
                    {errors.type && (
                      <span className="text-red-500 text-sm">
                        {errors.type.message}
                      </span>
                    )}
                  </div>
                  <div>
                    <Label htmlFor="email">Raison sociale</Label>
                    <div className="relative mt-1">
                      <Building className="absolute left-2 top-3 text-gray-400 w-4 h-4" />
                      <Input
                        name="raisonSociale"
                        type="text"
                        placeholder="Nom de l'association ou du professionnel"
                        error={errors.raisonSociale}
                        register={register}
                        className="pl-10"
                      />
                    </div>
                  </div>
                  <div className="grid grid-cols-2 gap-3">
                    <div>
                      <Label htmlFor="firstName">
                        Prénom{" "}
                        <span className="text-gray-500">(facultatif)</span>
                      </Label>
                      <div className="relative mt-1">
                        <User className="absolute left-2 top-3 text-gray-400 w-4 h-4" />
                        <Input
                          type="text"
                          name="firstName"
                          placeholder="Jean"
                          error={errors.firstName}
                          register={register}
                          className="pl-10"
                        />
                      </div>
                    </div>
                    <div>
                      <Label htmlFor="lastName">
                        Nom <span className="text-gray-500">(facultatif)</span>
                      </Label>
                      <div className="relative mt-1">
                        <User className="absolute left-2 top-3 text-gray-400 w-4 h-4" />
                        <Input
                          type="text"
                          name="lastName"
                          placeholder="Dupont"
                          error={errors.lastName}
                          register={register}
                          className="pl-10"
                        />
                      </div>
                    </div>
                  </div>
                </>
              <Button
                type="submit"
                disabled={isSubmitting}
                className="w-full bg-gradient-to-r from-green-600 to-orange-500 hover:from-green-700 hover:to-orange-600 text-white"
              >
                Valider
              </Button>
            </form>

          </div>
        </DialogContent>
      </Dialog>
      <Toaster />
    </>
  );
}
