"use client";

import { useState } from "react";
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import { Label } from "../ui/label";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "../ui/dialog";
import { Mail, CheckCircle, ArrowLeft } from "lucide-react";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

interface ForgotPasswordModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onBackToLogin: () => void;
}

const PasswordForgottenSchema = z.object({
  email: z.string().email("Doit être une adresse email valide"),
});

type PasswordForgottenFormValues = {
  email: string;
};

export function ForgotPasswordModal({
  open,
  onOpenChange,
  onBackToLogin,
}: ForgotPasswordModalProps) {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting, isSubmitted },
    getValues,
    setValue,
    control,
  } = useForm<PasswordForgottenFormValues>({
    resolver: zodResolver(PasswordForgottenSchema),
  });

  const onSubmit = async (data: PasswordForgottenFormValues) => {
    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 1500));
  };

  const handleClose = () => {
    onOpenChange(false);
  };

  const handleBackToLogin = () => {
    handleClose();
    onBackToLogin();
  };

  return (
    <Dialog open={open} onOpenChange={handleClose}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader className="text-center">
          <div className="flex items-center justify-center mb-4">
            <img
              src="https://cdn.builder.io/api/v1/image/assets%2F3d47985c501b449a8a6a74efa2d87067%2Fdd2c6da340014829b54eb2b52cfcd003?format=webp&width=800"
              alt="Save Meal Logo"
              className="h-16 w-auto"
            />
          </div>
          <DialogTitle className="text-2xl font-bold text-gray-900">
            {isSubmitted ? "Email envoyé !" : "Mot de passe oublié"}
          </DialogTitle>
          <p className="text-sm text-gray-600 mt-2">
            {isSubmitted
              ? "Vérifiez votre boîte email pour réinitialiser votre mot de passe"
              : "Entrez votre email pour recevoir un lien de réinitialisation"}
          </p>
        </DialogHeader>

        <div className="space-y-6">
          {isSubmitted ? (
            <div className="text-center space-y-6">
              <div className="flex justify-center">
                <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center">
                  <CheckCircle className="w-8 h-8 text-green-600" />
                </div>
              </div>

              <div className="space-y-2">
                <p className="text-gray-900 font-medium">
                  Un email a été envoyé à :
                </p>
                <p className="text-green-600 font-semibold">
                  {getValues().email}
                </p>
              </div>

              <div className="bg-blue-50 p-4 rounded-lg text-left">
                <h4 className="font-medium text-blue-900 mb-2">
                  Prochaines étapes :
                </h4>
                <ul className="text-sm text-blue-800 space-y-1">
                  <li>• Vérifiez votre boîte de réception</li>
                  <li>• Cliquez sur le lien dans l'email</li>
                  <li>• Créez un nouveau mot de passe</li>
                  <li>• Connectez-vous avec vos nouveaux identifiants</li>
                </ul>
              </div>

              <div className="text-xs text-gray-500">
                Vous n'avez pas reçu l'email ? Vérifiez vos spams ou{" "}
                <button
                  onClick={handleSubmit}
                  className="text-green-600 hover:underline font-medium"
                >
                  renvoyer l'email
                </button>
              </div>
            </div>
          ) : (
            <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
              <div>
                <Label htmlFor="reset-email">Adresse email</Label>
                <div className="relative mt-1">
                  <Mail className="absolute left-2 top-3 text-gray-400 w-4 h-4" />
                  <Input
                    name="email"
                    type="text"
                    placeholder="votre@email.com"
                    error={errors.email}
                    className="pl-10"
                    register={register}
                    disabled={isSubmitting}
                  />
                </div>
              </div>

              <Button
                type="submit"
                className="w-full bg-gradient-to-r from-green-600 to-orange-500 hover:from-green-700 hover:to-orange-600 text-white"
                disabled={isSubmitting}
              >
                {isSubmitting ? (
                  <div className="flex items-center">
                    <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin mr-2"></div>
                    Envoi en cours...
                  </div>
                ) : (
                  "Envoyer le lien de réinitialisation"
                )}
              </Button>
            </form>
          )}

          {/* Back to login */}
          <div className="text-center">
            <button
              type="button"
              onClick={handleBackToLogin}
              className="flex items-center justify-center w-full text-gray-600 hover:text-green-600 transition-colors"
            >
              <ArrowLeft className="w-4 h-4 mr-2" />
              Retour à la connexion
            </button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
