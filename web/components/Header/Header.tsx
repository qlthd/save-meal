import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import { Button } from "@/web/components/ui/button";
import { Badge } from "@/web/components/ui/badge";
import { useState } from "react";
import { LoginModal } from "../LoginModal";
import { HeaderProps } from "./Header.types";

export const Header = (props: HeaderProps) => {
  const { isHomePage } = props;
  const [loginModalOpen, setLoginModalOpen] = useState(false);

  return (
    <>
      <nav className="bg-white border-b border-gray-200 px-4 sm:px-6 lg:px-8 py-4">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <div className="flex items-center space-x-4">
            {!isHomePage && (
              <>
                <Link
                  href="/"
                  className="flex items-center space-x-2 text-gray-600 hover:text-green-600 transition-colors"
                >
                  <ArrowLeft className="w-5 h-5" />
                  <span>Retour</span>
                </Link>
                <div className="h-6 w-px bg-gray-300" />
              </>
            )}
            <Link href="/" className="flex items-center">
              <img
                src="https://cdn.builder.io/api/v1/image/assets%2F3d47985c501b449a8a6a74efa2d87067%2F65e64ef700ed4a1cb9ad3db72540f93c?format=webp&width=800"
                alt="Save Meal Logo"
                className="h-14 w-auto"
              />
            </Link>
          </div>
          <div className="flex items-center space-x-4">
            <Button
              variant="outline"
              size="sm"
              onClick={() => setLoginModalOpen(true)}
            >
              Se connecter
            </Button>
            <Badge
              variant="secondary"
              className="bg-purple-100 text-purple-800"
            >
              Mes donations
            </Badge>
          </div>
        </div>
      </nav>
      {/* Login Modal */}
      <LoginModal open={loginModalOpen} onOpenChange={setLoginModalOpen} />
    </>
  );
};
