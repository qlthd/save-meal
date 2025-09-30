"use client";

import { Header } from "@/web/components/Header/Header";
import * as React from "react";
import { CreateCollecteForm } from "@/web/components/organisms/CreateCollecteForm/CreateCollecteForm";
import { Configuration, FoodDonationApi } from "@/web/api-client/src";
import { useQuery } from "@tanstack/react-query";
import { useParams } from "next/navigation";
import { CreateCollecteTitle } from "@/web/components/molecules/CreateCollectionTitle/CreateCollecteTitle";

export default function EditPage() {
  const params = useParams();
  const id = params?.id as string;

  const fetchDonationById = async () => {
    const api = new FoodDonationApi(
      new Configuration({
        basePath:
          process.env.NEXT_PUBLIC_API_BASE_URL || "http://localhost:3004",
      }),
    );
    return await api.findOne({ id: id });
  };

  const {
    data: donation,
    isLoading,
    error,
  } = useQuery({
    queryKey: ["donation", id],
    queryFn: fetchDonationById,
  });

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <CreateCollecteTitle isEdit />
        {isLoading ? (
          <div className="flex justify-center items-center py-10">
            <span>Chargement...</span>
          </div>
        ) : (
          <CreateCollecteForm existingDonation={donation} />
        )}
      </div>
    </div>
  );
}
