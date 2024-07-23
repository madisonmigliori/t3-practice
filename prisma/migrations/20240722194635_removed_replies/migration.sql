/*
  Warnings:

  - You are about to drop the `Reply` table. If the table is not empty, all the data it contains will be lost.

*/
-- AlterTable
ALTER TABLE "Message" ADD COLUMN     "parentId" TEXT;

-- DropTable
DROP TABLE "Reply";

-- CreateIndex
CREATE INDEX "Message_parentId_idx" ON "Message"("parentId");
