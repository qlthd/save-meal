/*
  Warnings:

  - Added the required column `latitude` to the `FoodDonation` table without a default value. This is not possible if the table is not empty.
  - Added the required column `longitude` to the `FoodDonation` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "FoodDonation" ADD COLUMN     "latitude" DOUBLE PRECISION NOT NULL,
ADD COLUMN     "longitude" DOUBLE PRECISION NOT NULL;
