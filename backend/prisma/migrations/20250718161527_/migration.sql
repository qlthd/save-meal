/*
  Warnings:

  - You are about to drop the `Association` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "Booking" DROP CONSTRAINT "Booking_associationId_fkey";

-- DropTable
DROP TABLE "Association";

-- AddForeignKey
ALTER TABLE "Booking" ADD CONSTRAINT "Booking_associationId_fkey" FOREIGN KEY ("associationId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
