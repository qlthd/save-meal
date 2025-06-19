-- CreateTable
CREATE TABLE "Association" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,

    CONSTRAINT "Association_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Booking" (
    "id" SERIAL NOT NULL,
    "associationId" INTEGER NOT NULL,
    "foodDonationId" INTEGER NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Booking_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Booking_foodDonationId_key" ON "Booking"("foodDonationId");

-- AddForeignKey
ALTER TABLE "Booking" ADD CONSTRAINT "Booking_associationId_fkey" FOREIGN KEY ("associationId") REFERENCES "Association"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Booking" ADD CONSTRAINT "Booking_foodDonationId_fkey" FOREIGN KEY ("foodDonationId") REFERENCES "FoodDonation"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
