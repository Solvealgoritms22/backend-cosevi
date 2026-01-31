/*
  Warnings:

  - A unique constraint covering the columns `[accessCode]` on the table `Visit` will be added. If there are existing duplicate values, this will fail.

*/
-- AlterTable
ALTER TABLE "Visit" ADD COLUMN "accessCode" TEXT;

-- CreateIndex
CREATE UNIQUE INDEX "Visit_accessCode_key" ON "Visit"("accessCode");
