/*
  Warnings:

  - A unique constraint covering the columns `[spaceId]` on the table `Visit` will be added. If there are existing duplicate values, this will fail.

*/
-- AlterTable
ALTER TABLE "Visit" ADD COLUMN "spaceId" TEXT;

-- RedefineTables
PRAGMA defer_foreign_keys=ON;
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_Space" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "name" TEXT NOT NULL,
    "type" TEXT NOT NULL,
    "status" TEXT NOT NULL DEFAULT 'AVAILABLE',
    "level" INTEGER NOT NULL DEFAULT 1,
    "vehicleId" TEXT,
    "residentProfileId" TEXT,
    "visitId" TEXT,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL,
    CONSTRAINT "Space_residentProfileId_fkey" FOREIGN KEY ("residentProfileId") REFERENCES "ResidentProfile" ("id") ON DELETE SET NULL ON UPDATE CASCADE,
    CONSTRAINT "Space_visitId_fkey" FOREIGN KEY ("visitId") REFERENCES "Visit" ("id") ON DELETE SET NULL ON UPDATE CASCADE
);
INSERT INTO "new_Space" ("createdAt", "id", "level", "name", "status", "type", "updatedAt", "vehicleId") SELECT "createdAt", "id", "level", "name", "status", "type", "updatedAt", "vehicleId" FROM "Space";
DROP TABLE "Space";
ALTER TABLE "new_Space" RENAME TO "Space";
CREATE UNIQUE INDEX "Space_visitId_key" ON "Space"("visitId");
PRAGMA foreign_keys=ON;
PRAGMA defer_foreign_keys=OFF;

-- CreateIndex
CREATE UNIQUE INDEX "Visit_spaceId_key" ON "Visit"("spaceId");
