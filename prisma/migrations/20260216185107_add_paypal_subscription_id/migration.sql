/*
  Warnings:

  - You are about to drop the `AccessLog` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `EmergencyAlert` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `HardwareDevice` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `HardwareEvent` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `IncidentComment` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `IncidentReport` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `IotCommand` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `Notification` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `ResidentProfile` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `SecurityProfile` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `Space` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `User` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `Vehicle` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `Visit` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `Visitor` table. If the table is not empty, all the data it contains will be lost.
  - A unique constraint covering the columns `[paypalSubscriptionId]` on the table `PendingRegistration` will be added. If there are existing duplicate values, this will fail.

*/
-- DropForeignKey
ALTER TABLE "EmergencyAlert" DROP CONSTRAINT "EmergencyAlert_senderId_fkey";

-- DropForeignKey
ALTER TABLE "HardwareEvent" DROP CONSTRAINT "HardwareEvent_deviceId_fkey";

-- DropForeignKey
ALTER TABLE "IncidentComment" DROP CONSTRAINT "IncidentComment_authorId_fkey";

-- DropForeignKey
ALTER TABLE "IncidentComment" DROP CONSTRAINT "IncidentComment_incidentReportId_fkey";

-- DropForeignKey
ALTER TABLE "IncidentReport" DROP CONSTRAINT "IncidentReport_reporterId_fkey";

-- DropForeignKey
ALTER TABLE "IotCommand" DROP CONSTRAINT "IotCommand_deviceId_fkey";

-- DropForeignKey
ALTER TABLE "Notification" DROP CONSTRAINT "Notification_userId_fkey";

-- DropForeignKey
ALTER TABLE "ResidentProfile" DROP CONSTRAINT "ResidentProfile_userId_fkey";

-- DropForeignKey
ALTER TABLE "SecurityProfile" DROP CONSTRAINT "SecurityProfile_userId_fkey";

-- DropForeignKey
ALTER TABLE "Space" DROP CONSTRAINT "Space_residentProfileId_fkey";

-- DropForeignKey
ALTER TABLE "Space" DROP CONSTRAINT "Space_visitId_fkey";

-- DropForeignKey
ALTER TABLE "Vehicle" DROP CONSTRAINT "Vehicle_residentProfileId_fkey";

-- DropForeignKey
ALTER TABLE "Visit" DROP CONSTRAINT "Visit_hostId_fkey";

-- DropForeignKey
ALTER TABLE "Visit" DROP CONSTRAINT "Visit_visitorId_fkey";

-- AlterTable
ALTER TABLE "PendingRegistration" ADD COLUMN     "paypalSubscriptionId" TEXT;

-- DropTable
DROP TABLE "AccessLog";

-- DropTable
DROP TABLE "EmergencyAlert";

-- DropTable
DROP TABLE "HardwareDevice";

-- DropTable
DROP TABLE "HardwareEvent";

-- DropTable
DROP TABLE "IncidentComment";

-- DropTable
DROP TABLE "IncidentReport";

-- DropTable
DROP TABLE "IotCommand";

-- DropTable
DROP TABLE "Notification";

-- DropTable
DROP TABLE "ResidentProfile";

-- DropTable
DROP TABLE "SecurityProfile";

-- DropTable
DROP TABLE "Space";

-- DropTable
DROP TABLE "User";

-- DropTable
DROP TABLE "Vehicle";

-- DropTable
DROP TABLE "Visit";

-- DropTable
DROP TABLE "Visitor";

-- DropEnum
DROP TYPE "Role";

-- DropEnum
DROP TYPE "SpaceStatus";

-- DropEnum
DROP TYPE "VisitStatus";

-- DropEnum
DROP TYPE "VisitorCategory";

-- CreateIndex
CREATE UNIQUE INDEX "PendingRegistration_paypalSubscriptionId_key" ON "PendingRegistration"("paypalSubscriptionId");
