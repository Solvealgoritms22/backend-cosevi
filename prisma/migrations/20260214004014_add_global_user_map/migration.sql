-- AlterEnum
ALTER TYPE "InvoiceStatus" ADD VALUE 'URGENTE';

-- CreateTable
CREATE TABLE "GlobalUserMap" (
    "email" TEXT NOT NULL,
    "tenantId" TEXT NOT NULL,
    "role" TEXT NOT NULL,

    CONSTRAINT "GlobalUserMap_pkey" PRIMARY KEY ("email")
);

-- CreateIndex
CREATE INDEX "GlobalUserMap_email_idx" ON "GlobalUserMap"("email");
