import * as React from "react";
import { CreateCollectionTitleProps } from "@/web/components/molecules/CreateCollectionTitle/CreateCollectionTitle.types";

export const CreateCollecteTitle = (props: CreateCollectionTitleProps) => {
  const { isEdit = false } = props;
  return (
    <div className="text-center mb-8">
      <h1 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-4">
        {isEdit ? "Modifier" : "Créer"} une collecte de restes alimentaires
      </h1>
      <p className="text-lg text-gray-600 max-w-2xl mx-auto">
        Partagez vos surplus alimentaires avec des associations locales et
        luttez contre le gaspillage
      </p>
    </div>
  );
};
