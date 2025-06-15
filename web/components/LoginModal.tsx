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

interface LoginModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export function LoginModal({ open, onOpenChange }: LoginModalProps) {
  const [mode, setMode] = useState<"login" | "register">("login");
  const [showPassword, setShowPassword] = useState(false);
  const [formData, setFormData] = useState({
    email: "",
    password: "",
    confirmPassword: "",
    firstName: "",
    lastName: "",
  });

  const handleInputChange = (field: string, value: string) => {
    setFormData((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (mode === "login") {
      // Handle login
      console.log("Login:", {
        email: formData.email,
        password: formData.password,
      });
    } else {
      // Handle registration
      console.log("Register:", formData);
    }
    // Close modal on success
    onOpenChange(false);
  };

  const handleSocialLogin = (provider: string) => {
    console.log(`Login with ${provider}`);
    // Handle social login
    onOpenChange(false);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader className="text-center">
          <div className="flex items-center justify-center mb-4">
            <img
              src="https://cdn.builder.io/api/v1/image/assets%2F3d47985c501b449a8a6a74efa2d87067%2F65e64ef700ed4a1cb9ad3db72540f93c?format=webp&width=800"
              alt="Save Meal Logo"
              className="h-16 w-auto"
            />
          </div>
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
              onClick={() => handleSocialLogin("google")}
            >
              <Chrome className="w-5 h-5 mr-3 text-blue-600" />
              Continuer avec Google
            </Button>
            <Button
              variant="outline"
              className="w-full justify-start relative"
              onClick={() => handleSocialLogin("facebook")}
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
          <form onSubmit={handleSubmit} className="space-y-4">
            {mode === "register" && (
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <Label htmlFor="firstName">Prénom</Label>
                  <div className="relative mt-1">
                    <User className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                    <Input
                      id="firstName"
                      placeholder="Jean"
                      value={formData.firstName}
                      onChange={(e) =>
                        handleInputChange("firstName", e.target.value)
                      }
                      className="pl-10"
                      required
                    />
                  </div>
                </div>
                <div>
                  <Label htmlFor="lastName">Nom</Label>
                  <div className="relative mt-1">
                    <User className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                    <Input
                      id="lastName"
                      placeholder="Dupont"
                      value={formData.lastName}
                      onChange={(e) =>
                        handleInputChange("lastName", e.target.value)
                      }
                      className="pl-10"
                      required
                    />
                  </div>
                </div>
              </div>
            )}

            <div>
              <Label htmlFor="email">Email</Label>
              <div className="relative mt-1">
                <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                <Input
                  id="email"
                  type="email"
                  placeholder="jean@example.com"
                  value={formData.email}
                  onChange={(e) => handleInputChange("email", e.target.value)}
                  className="pl-10"
                  required
                />
              </div>
            </div>

            <div>
              <Label htmlFor="password">Mot de passe</Label>
              <div className="relative mt-1">
                <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                <Input
                  id="password"
                  type={showPassword ? "text" : "password"}
                  placeholder="••••••••"
                  value={formData.password}
                  onChange={(e) =>
                    handleInputChange("password", e.target.value)
                  }
                  className="pl-10 pr-10"
                  required
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
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
                  <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                  <Input
                    id="confirmPassword"
                    type={showPassword ? "text" : "password"}
                    placeholder="••••••••"
                    value={formData.confirmPassword}
                    onChange={(e) =>
                      handleInputChange("confirmPassword", e.target.value)
                    }
                    className="pl-10"
                    required
                  />
                </div>
              </div>
            )}

            {mode === "login" && (
              <div className="text-right">
                <button
                  type="button"
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
                  onClick={() => setMode("register")}
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
                  onClick={() => setMode("login")}
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
    </Dialog>
  );
}
