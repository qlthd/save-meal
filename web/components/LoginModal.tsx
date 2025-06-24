"use client";

import { useEffect, useState } from "react";
import { Button } from "@/web/components/ui/button";
import { Input } from "@/web/components/ui/input";
import { Label } from "@/web/components/ui/label";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/web/components/ui/dialog";
import { Separator } from "@/web/components/ui/separator";
import {
  ChefHat,
  Mail,
  Lock,
  Eye,
  EyeOff,
  User,
  Chrome,
  Facebook,
  Github,
} from "lucide-react";
import { useForm, useWatch } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { signIn } from "next-auth/react";
import { z } from "zod";
import { ForgotPasswordModal } from "@/web/components/ForgotPasswordModal/ForgotPasswordModal";
import { Configuration, UserApi } from "@/web/api-client/src";
import toast, { Toaster } from "react-hot-toast";

interface LoginModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export type LoginFormValue = {
  email: string;
  password: string;
  passwordConfirmation: string;
  firstName: string;
  lastName: string;
  mode: "login" | "register";
};

const LoginSchema = z
  .object({
    email: z.string().email("Doit être une adresse email valide"),
    password: z
      .string()
      .min(6, "Le mot de passe doit contenir au moins 6 caractères"),
    passwordConfirmation: z.string().optional(),
    firstName: z.string().optional(),
    lastName: z.string().optional(),
    mode: z.enum(["login", "register"]).default("login"),
  })
  .refine((data) => data.mode !== "register" || !!data.firstName, {
    message: "Le prénom est requis",
    path: ["firstName"],
  })
  .refine((data) => data.mode !== "register" || !!data.lastName, {
    message: "Le nom est requis",
    path: ["lastName"],
  })
  .refine((data) => data.mode !== "register" || !!data.password, {
    message: "Un mot de passe est requis",
    path: ["password"],
  })
  .refine((data) => data.mode !== "register" || !!data.passwordConfirmation, {
    message: "La confirmation du mot de passe est requise",
    path: ["passwordConfirmation"],
  })
  .refine(
    (data) =>
      data.mode !== "register" || data.password === data.passwordConfirmation,
    {
      message: "Les mots de passe ne correspondent pas",
      path: ["passwordConfirmation"],
    },
  );

export function LoginModal({ open, onOpenChange }: LoginModalProps) {
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [forgotPasswordOpen, setForgotPasswordOpen] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
    control,
  } = useForm<LoginFormValue>({
    resolver: zodResolver(LoginSchema),
  });
  const mode = useWatch({ control, name: "mode", defaultValue: "login" });

  const onSubmit = async (data: LoginFormValue) => {
    if (data.mode === "login") {
      const email = data.email;
      const password = data.password;
      const res = await signIn("credentials", {
        email,
        password,
        redirect: false,
      });

      if (res?.ok) {
        toast.success("Connexion réussie !");
        onOpenChange(false);
      } else {
        setError("Email ou mot de passe invalide");
      }
    } else {
      const firstName = data.firstName;
      const lastName = data.lastName;
      const email = data.email;
      const password = data.password;

      const userApi = new UserApi(
        new Configuration({
          basePath:
            process.env.NEXT_PUBLIC_API_BASE_URL || "http://localhost:3004",
        }),
      );
      try {
        await userApi.create({
          createUserDto: {
            email,
            lastName,
            firstName,
            password,
          },
        });
        setValue(mode, "login");
      } catch (error) {
        console.error("Error creating user:", error);
        alert("Erreur lors de la création du compte. Veuillez réessayer.");
        return;
      }
    }
  };

  const handleForgotPassword = () => {
    setForgotPasswordOpen(true);
  };

  return (
    <>
      <Dialog open={open} onOpenChange={onOpenChange}>
        <DialogContent className="sm:max-w-md overflow-y-auto max-h-screen">
          <DialogHeader className="text-center">
            <DialogTitle className="text-2xl font-bold text-gray-900">
              {mode === "login" ? "Se connecter" : "Créer un compte"}
            </DialogTitle>
            <p className="text-sm text-gray-600 mt-2">
              {mode === "login"
                ? "Connectez-vous pour accéder à votre compte"
                : "Rejoignez Save Meal pour commencer à donner"}
            </p>
          </DialogHeader>

          <div className="space-y-6">
            {/* Social Login Buttons */}
            <div className="space-y-3">
              <Button
                variant="outline"
                className="w-full justify-start relative"
                // onClick={() => handleSocialLogin("google")}
              >
                <Chrome className="w-5 h-5 mr-3 text-blue-600" />
                Continuer avec Google
              </Button>
              <Button
                variant="outline"
                className="w-full justify-start relative"
                // onClick={() => handleSocialLogin("facebook")}
              >
                <Facebook className="w-5 h-5 mr-3 text-blue-700" />
                Continuer avec Facebook
              </Button>
            </div>

            <div className="relative">
              <Separator />
              <div className="absolute inset-0 flex items-center justify-center">
                <span className="bg-white px-3 text-sm text-gray-500">ou</span>
              </div>
            </div>

            {/* Email/Password Form */}
            <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
              {mode === "register" && (
                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <Label htmlFor="firstName">Prénom</Label>
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
                    <Label htmlFor="lastName">Nom</Label>
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
              )}

              <div>
                <Label htmlFor="email">Email</Label>
                <div className="relative mt-1">
                  <Mail className="absolute left-2 top-3 text-gray-400 w-4 h-4" />
                  <Input
                    name="email"
                    type="email"
                    placeholder="jean@example.com"
                    error={errors.email}
                    register={register}
                    className="pl-10"
                  />
                </div>
              </div>

              <div>
                <Label htmlFor="password">Mot de passe</Label>
                <div className="relative mt-1">
                  <Input
                    name="password"
                    type={showPassword ? "text" : "password"}
                    placeholder="••••••••"
                    error={errors.password}
                    register={register}
                    className="pl-10 pr-10"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute left-2 top-3 text-gray-400 hover:text-gray-600"
                  >
                    {showPassword ? (
                      <EyeOff className="w-4 h-4" />
                    ) : (
                      <Eye className="w-4 h-4" />
                    )}
                  </button>
                </div>
              </div>

              {mode === "register" && (
                <div>
                  <Label htmlFor="confirmPassword">
                    Confirmer le mot de passe
                  </Label>
                  <div className="relative mt-1">
                    <Lock className="absolute left-2 top-3 text-gray-400 w-4 h-4" />
                    <Input
                      name="passwordConfirmation"
                      type={showPassword ? "text" : "password"}
                      placeholder="••••••••"
                      error={errors.passwordConfirmation}
                      register={register}
                      className="pl-10"
                    />
                  </div>
                </div>
              )}
              {error && (
                <p className="text-red-500 text-sm text-center mt-2">{error}</p>
              )}
              {mode === "login" && (
                <div className="text-right">
                  <button
                    type="button"
                    onClick={handleForgotPassword}
                    className="text-sm text-green-600 hover:text-green-700 hover:underline"
                  >
                    Mot de passe oublié ?
                  </button>
                </div>
              )}

              <Button
                type="submit"
                className="w-full bg-gradient-to-r from-green-600 to-orange-500 hover:from-green-700 hover:to-orange-600 text-white"
              >
                {mode === "login" ? "Se connecter" : "Créer mon compte"}
              </Button>
            </form>

            {/* Mode Switch */}
            <div className="text-center text-sm text-gray-600">
              {mode === "login" ? (
                <>
                  Pas encore de compte ?{" "}
                  <button
                    type="button"
                    onClick={() => setValue("mode", "register")}
                    className="text-green-600 hover:text-green-700 font-medium hover:underline"
                  >
                    Créer un compte
                  </button>
                </>
              ) : (
                <>
                  Déjà un compte ?{" "}
                  <button
                    type="button"
                    onClick={() => setValue("mode", "login")}
                    className="text-green-600 hover:text-green-700 font-medium hover:underline"
                  >
                    Se connecter
                  </button>
                </>
              )}
            </div>

            {mode === "register" && (
              <div className="text-xs text-gray-500 text-center">
                En créant un compte, vous acceptez nos{" "}
                <a href="#" className="text-green-600 hover:underline">
                  Conditions d'utilisation
                </a>{" "}
                et notre{" "}
                <a href="#" className="text-green-600 hover:underline">
                  Politique de confidentialité
                </a>
                .
              </div>
            )}
          </div>
        </DialogContent>
        <ForgotPasswordModal
          open={forgotPasswordOpen}
          onOpenChange={setForgotPasswordOpen}
          onBackToLogin={() => {}}
        />
      </Dialog>
      <Toaster />
    </>
  );
}
