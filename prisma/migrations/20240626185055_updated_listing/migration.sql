/*
  Warnings:

  - You are about to drop the column `createdById` on the `Listing` table. All the data in the column will be lost.

*/
-- DropIndex
DROP INDEX "Listing_createdById_idx";

-- AlterTable
ALTER TABLE "Listing" DROP COLUMN "createdById",
ADD COLUMN     "userId" TEXT;
