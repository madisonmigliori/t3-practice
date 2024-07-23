/*
  Warnings:

  - You are about to drop the `Topics` table. If the table is not empty, all the data it contains will be lost.

*/
-- AlterTable
ALTER TABLE "User" ALTER COLUMN "firstName" SET DEFAULT 'John',
ALTER COLUMN "lastName" SET DEFAULT 'Smith';

-- DropTable
DROP TABLE "Topics";

-- CreateTable
CREATE TABLE "File" (
    "id" TEXT NOT NULL,
    "input" TEXT NOT NULL,

    CONSTRAINT "File_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Reply" (
    "userId" TEXT NOT NULL,
    "messageId" TEXT NOT NULL,
    "comment" TEXT NOT NULL,

    CONSTRAINT "Reply_pkey" PRIMARY KEY ("userId","messageId")
);

-- CreateTable
CREATE TABLE "Topic" (
    "id" TEXT NOT NULL,
    "userId" TEXT NOT NULL,

    CONSTRAINT "Topic_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "_FileToMessage" (
    "A" TEXT NOT NULL,
    "B" TEXT NOT NULL
);

-- CreateIndex
CREATE INDEX "Reply_userId_idx" ON "Reply"("userId");

-- CreateIndex
CREATE INDEX "Reply_messageId_idx" ON "Reply"("messageId");

-- CreateIndex
CREATE UNIQUE INDEX "_FileToMessage_AB_unique" ON "_FileToMessage"("A", "B");

-- CreateIndex
CREATE INDEX "_FileToMessage_B_index" ON "_FileToMessage"("B");
