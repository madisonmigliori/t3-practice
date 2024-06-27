-- CreateTable
CREATE TABLE "Like" (
    "userId" TEXT NOT NULL,
    "listingId" INTEGER NOT NULL,

    CONSTRAINT "Like_pkey" PRIMARY KEY ("userId","listingId")
);

-- CreateIndex
CREATE INDEX "Like_userId_idx" ON "Like"("userId");

-- CreateIndex
CREATE INDEX "Like_listingId_idx" ON "Like"("listingId");

-- CreateIndex
CREATE INDEX "Listing_userId_idx" ON "Listing"("userId");
