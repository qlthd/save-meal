/*
  Warnings:

  - Added the required column `corporateName` to the `User` table without a default value. This is not possible if the table is not empty.
  - Added the required column `type` to the `User` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "User" ADD COLUMN     "corporateName" TEXT NOT NULL,
ADD COLUMN     "type" TEXT NOT NULL;
