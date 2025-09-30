"use client";

import { Header } from "@/web/components/Header/Header";
import * as React from "react";
import { CreateCollecteForm } from "@/web/components/organisms/CreateCollecteForm/CreateCollecteForm";
import { CreateCollecteTitle } from "@/web/components/molecules/CreateCollectionTitle/CreateCollecteTitle";

export default function DonnerPage() {
  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <CreateCollecteTitle />
        <CreateCollecteForm />
      </div>
    </div>
  );
}
