"use client";

import { Button } from "@/web/components/ui/button";
import { Card } from "@/web/components/ui/card";
import {
  Users,
  Heart,
  ArrowRight,
  CheckCircle,
  Globe,
  Clock,
} from "lucide-react";
import Link from "next/link";
import { Header } from "@/web/components/Header/Header";

export default function HomePage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 via-white to-orange-50">
      <Header isHomePage />

      {/* Hero Section */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center py-12 sm:py-16 lg:py-20">
          <div className="max-w-4xl mx-auto">
            {/* Hero Image */}
            <div className="mb-8 flex justify-center">
              <img
                src="https://cdn.builder.io/api/v1/image/assets%2F3d47985c501b449a8a6a74efa2d87067%2Ff711f74f70e540fe8839c628da3ab61e?format=webp&width=800"
                alt="Main tenant un cœur et un épi de blé symbolisant la solidarité alimentaire"
                className="w-40 h-40 sm:w-40 sm:h-40 lg:w-50 lg:h-50 object-contain"
                style={{ filter: "drop-shadow(0 4px 12px rgba(0, 0, 0, 0.1))" }}
              />
            </div>
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold text-green-600 mb-6 leading-tight">
              Transformons les <span className="">surplus alimentaires</span> en
              solidarité
            </h1>
            <p className="text-xl sm:text-2xl text-green-600 mb-12 leading-relaxed">
              Connectons les organisateurs d'événements aux associations pour
              que chaque repas trouve sa place
            </p>

            {/* Main Action Buttons */}
            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-16">
              <Link href="/association" className="w-full sm:w-auto">
                <Button
                  size="lg"
                  className="w-full bg-green-600 hover:bg-green-700 text-lightGrayishYellow px-8 py-4 text-lg font-semibold rounded-xl shadow-lg hover:shadow-xl transition-all duration-200 group"
                >
                  <Users className="w-5 h-5 mr-2" />
                  Je suis une association
                  <ArrowRight className="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform" />
                </Button>
              </Link>
              <Link href="/donner" className="w-full sm:w-auto">
                <Button
                  size="lg"
                  variant="secondary"
                  className="w-full bg-reddish hover:bg-red-400 text-lightGrayishYellow px-8 py-4 text-lg font-semibold rounded-xl shadow-lg hover:shadow-xl transition-all duration-200 group"
                >
                  <Heart className="w-5 h-5 mr-2" />
                  Je prévois de donner
                  <ArrowRight className="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform" />
                </Button>
              </Link>
            </div>

            {/* Trust Indicators */}
            <div className="flex flex-wrap justify-center items-center gap-8 text-sm text-gray-500 mb-16">
              <div className="flex items-center gap-2">
                <CheckCircle className="w-4 h-4 text-green-500" />
                <span>100% gratuit</span>
              </div>
              <div className="flex items-center gap-2">
                <Globe className="w-4 h-4 text-green-500" />
                <span>Partout en France</span>
              </div>
              <div className="flex items-center gap-2">
                <Clock className="w-4 h-4 text-green-500" />
                <span>En temps réel</span>
              </div>
            </div>
          </div>
        </div>

        {/* How it Works Section */}
        <section className="py-16">
          <div className="text-center mb-12">
            <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-4">
              Comment ça marche ?
            </h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Un processus simple et efficace pour connecter donateurs et
              bénéficiaires
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto">
            {/* Step 1 */}
            <Card className="p-8 text-center border-0 shadow-lg hover:shadow-xl transition-shadow duration-200">
              <div className="w-16 h-16 bg-green-600 rounded-full flex items-center justify-center mx-auto mb-6">
                <span className="text-2xl font-bold text-lightGrayishYellow">
                  1
                </span>
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-4">
                Signalez vos surplus
              </h3>
              <p className="text-gray-600 leading-relaxed">
                Les organisateurs d'événements publient leurs surplus
                alimentaires disponibles en fin d'événement
              </p>
            </Card>

            {/* Step 2 */}
            <Card className="p-8 text-center border-0 shadow-lg hover:shadow-xl transition-shadow duration-200">
              <div className="w-16 h-16 bg-green-600 rounded-full flex items-center justify-center mx-auto mb-6">
                <span className="text-2xl font-bold text-lightGrayishYellow">
                  2
                </span>
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-4">
                Connexion automatique
              </h3>
              <p className="text-gray-600 leading-relaxed">
                Notre plateforme connecte automatiquement les associations
                locales aux opportunités de don
              </p>
            </Card>

            {/* Step 3 */}
            <Card className="p-8 text-center border-0 shadow-lg hover:shadow-xl transition-shadow duration-200">
              <div className="w-16 h-16 bg-green-600 rounded-full flex items-center justify-center mx-auto mb-6">
                <span className="text-2xl font-bold text-lightGrayishYellow">
                  3
                </span>
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-4">
                Récupération organisée
              </h3>
              <p className="text-gray-600 leading-relaxed">
                Les associations récupèrent la nourriture et la redistribuent
                aux personnes dans le besoin
              </p>
            </Card>
          </div>
        </section>

        {/* Impact Stats */}
        <section className="py-16">
          <div className="bg-green-600 rounded-3xl p-8 sm:p-12 text-lightGrayishYellow text-center">
            <h2 className="text-3xl sm:text-4xl font-bold mb-8">
              Ensemble, créons un impact positif
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-8">
              <div>
                <div className="text-4xl sm:text-5xl font-bold mb-2">1000+</div>
                <div className="text-green-100 text-lg">Repas sauvés</div>
              </div>
              <div>
                <div className="text-4xl sm:text-5xl font-bold mb-2">50+</div>
                <div className="text-green-100 text-lg">
                  Associations partenaires
                </div>
              </div>
              <div>
                <div className="text-4xl sm:text-5xl font-bold mb-2">25+</div>
                <div className="text-green-100 text-lg">Villes connectées</div>
              </div>
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-16 text-center">
          <div className="max-w-3xl mx-auto">
            <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-6">
              Prêt à faire la différence ?
            </h2>
            <p className="text-xl text-gray-600 mb-8">
              Rejoignez notre communauté et participez à la lutte contre le
              gaspillage alimentaire
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button
                size="lg"
                className="bg-green-600 hover:bg-green-700 text-white px-8 py-4 text-lg font-semibold rounded-xl shadow-lg hover:shadow-xl transition-all duration-200"
              >
                Commencer maintenant
              </Button>
              <Button
                size="lg"
                variant="outline"
                className="border-2 border-gray-300 text-gray-700 px-8 py-4 text-lg font-semibold rounded-xl hover:border-green-500 hover:text-green-600 transition-all duration-200"
              >
                En savoir plus
              </Button>
            </div>
          </div>
        </section>
      </main>

      {/* Footer */}
      <footer className="bg-gray-50 border-t border-gray-200 py-12 mt-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <Link
              href="/web/public"
              className="flex items-center justify-center mb-4"
            >
              <img
                src="https://cdn.builder.io/api/v1/image/assets%2F3d47985c501b449a8a6a74efa2d87067%2F65e64ef700ed4a1cb9ad3db72540f93c?format=webp&width=800"
                alt="Save Meal Logo"
                className="h-14 w-auto"
              />
            </Link>
            <p className="text-gray-600 mb-4">
              Ensemble contre le gaspillage alimentaire
            </p>
            <div className="flex justify-center space-x-6 text-sm text-gray-500">
              <a href="#" className="hover:text-green-600 transition-colors">
                Mentions légales
              </a>
              <a href="#" className="hover:text-green-600 transition-colors">
                Confidentialité
              </a>
              <a href="#" className="hover:text-green-600 transition-colors">
                Contact
              </a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
