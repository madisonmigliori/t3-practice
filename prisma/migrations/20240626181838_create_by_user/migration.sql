/*
  Warnings:

  - You are about to drop the column `userId` on the `Listing` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "Listing" DROP COLUMN "userId";

-- CreateIndex
CREATE INDEX "Listing_name_idx" ON "Listing"("name");
