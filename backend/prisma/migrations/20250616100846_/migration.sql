-- CreateTable
CREATE TABLE "FoodDonation" (
    "id" SERIAL NOT NULL,
    "title" TEXT NOT NULL,
    "foodType" TEXT NOT NULL,
    "estimatedPortions" INTEGER NOT NULL,
    "description" TEXT NOT NULL,
    "pickupPlace" TEXT NOT NULL,
    "address" TEXT NOT NULL,
    "pickupInstructions" TEXT NOT NULL,
    "availableFrom" TIMESTAMP(3) NOT NULL,
    "availableTo" TIMESTAMP(3) NOT NULL,
    "contactName" TEXT NOT NULL,
    "contactPhone" TEXT NOT NULL,
    "contactEmail" TEXT NOT NULL,
    "additionalNotes" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "FoodDonation_pkey" PRIMARY KEY ("id")
);
