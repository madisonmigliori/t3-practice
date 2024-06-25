/*
  Warnings:

  - You are about to drop the column `createdAt` on the `Listing` table. All the data in the column will be lost.
  - You are about to drop the column `createdById` on the `Listing` table. All the data in the column will be lost.
  - You are about to drop the column `updatedAt` on the `Listing` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "Listing" DROP COLUMN "createdAt",
DROP COLUMN "createdById",
DROP COLUMN "updatedAt",
ADD COLUMN     "userId" TEXT;
