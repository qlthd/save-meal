import Link from "next/link";
import { ArrowLeft, UserCog, Plus } from "lucide-react";
import { Button } from "@/web/components/ui/button";
import { useState } from "react";
import { LoginModal } from "../LoginModal";
import { HeaderProps } from "./Header.types";
import { useSession } from "next-auth/react";
import { signOut } from "next-auth/react";
import toast, { Toaster } from "react-hot-toast";
import { useRouter } from "next/navigation";
import Image from "next/image";

export const Header = (props: HeaderProps) => {
  const { isHomePage } = props;
  const router = useRouter();
  const [loginModalOpen, setLoginModalOpen] = useState(false);
  const { data: session, status } = useSession();
  const userType = session?.user?.type;
  const onLogout = async () => {
    try {
      await signOut({
        callbackUrl: "/",
        redirect: true,
      });
    } catch (error) {
      console.error("Error during logout:", error);
    }
    toast.success("Déconnexion réussie !");
  };
  return (
    <>
      <nav className="bg-white border-b border-gray-200 px-4 sm:px-6 lg:px-8 py-4">
        <div className=" flex items-center justify-between">
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
                src="/icons/logo.png"
                alt="Save Meal Logo"
                className="w-full h-8 my-4"
              />
            </Link>
          </div>
          <div className="flex items-center gap-x-3">
            {userType === "association" && (
              <>
                <button
                  className="inline-flex text-sm px-3 py-2 items-center gap-2 rounded-xl bg-green-600 hover:bg-green-700 text-white"
                  onClick={() => router.push("/donner")}
                >
                  <Plus className="w-5 h-5" />
                  Créer une collecte
                </button>
                <button className="inline-flex px-3 items-center justify-center whitespace-nowrap text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0 hover:bg-accent h-9 rounded-md text-gray-600 hover:text-green-600">
                  Mes collectes
                </button>
              </>
            )}
            {userType === "donateur" && (
              <button className="inline-flex items-center justify-center whitespace-nowrap text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0 hover:bg-accent h-9 rounded-md text-gray-600 hover:text-green-600">
                Mes donations
              </button>
            )}
            {/*{status === "authenticated" && (*/}
            {/*  <button className="inline-flex mx-3 items-center border h-8 w-8 rounded-full justify-center whitespace-nowrap text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0 hover:bg-accent text-gray-600 hover:text-green-600">*/}
            {/*    <UserCog />*/}
            {/*  </button>*/}
            {/*)}*/}
            {status === "unauthenticated" && (
              <Button
                variant="outline"
                size="sm"
                onClick={() => setLoginModalOpen(true)}
              >
                Se connecter
              </Button>
            )}
            {status === "authenticated" && (
              <Button variant="outline" size="sm" onClick={onLogout}>
                Déconnexion
              </Button>
            )}
          </div>
        </div>
      </nav>
      {/* Login Modal */}
      <LoginModal open={loginModalOpen} onOpenChange={setLoginModalOpen} />
      <Toaster />
    </>
  );
};
