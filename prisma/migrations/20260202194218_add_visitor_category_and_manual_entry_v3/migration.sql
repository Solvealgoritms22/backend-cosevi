-- RedefineTables
PRAGMA defer_foreign_keys=ON;
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_Visit" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "hostId" TEXT NOT NULL,
    "visitorId" TEXT,
    "visitorName" TEXT,
    "visitorIdNumber" TEXT,
    "licensePlate" TEXT,
    "companionCount" INTEGER NOT NULL DEFAULT 0,
    "isVip" BOOLEAN NOT NULL DEFAULT false,
    "singleEntry" BOOLEAN NOT NULL DEFAULT false,
    "manualEntry" BOOLEAN NOT NULL DEFAULT false,
    "visitorCategory" TEXT,
    "images" TEXT,
    "status" TEXT NOT NULL DEFAULT 'PENDING',
    "validFrom" DATETIME NOT NULL,
    "validUntil" DATETIME NOT NULL,
    "entryTime" DATETIME,
    "exitTime" DATETIME,
    "qrCode" TEXT NOT NULL,
    "accessCode" TEXT,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL,
    "spaceId" TEXT,
    CONSTRAINT "Visit_visitorId_fkey" FOREIGN KEY ("visitorId") REFERENCES "Visitor" ("id") ON DELETE SET NULL ON UPDATE CASCADE,
    CONSTRAINT "Visit_hostId_fkey" FOREIGN KEY ("hostId") REFERENCES "User" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);
INSERT INTO "new_Visit" ("accessCode", "companionCount", "createdAt", "entryTime", "exitTime", "hostId", "id", "images", "isVip", "licensePlate", "qrCode", "singleEntry", "spaceId", "status", "updatedAt", "validFrom", "validUntil", "visitorId", "visitorIdNumber", "visitorName") SELECT "accessCode", "companionCount", "createdAt", "entryTime", "exitTime", "hostId", "id", "images", "isVip", "licensePlate", "qrCode", "singleEntry", "spaceId", "status", "updatedAt", "validFrom", "validUntil", "visitorId", "visitorIdNumber", "visitorName" FROM "Visit";
DROP TABLE "Visit";
ALTER TABLE "new_Visit" RENAME TO "Visit";
CREATE UNIQUE INDEX "Visit_qrCode_key" ON "Visit"("qrCode");
CREATE UNIQUE INDEX "Visit_accessCode_key" ON "Visit"("accessCode");
CREATE UNIQUE INDEX "Visit_spaceId_key" ON "Visit"("spaceId");
PRAGMA foreign_keys=ON;
PRAGMA defer_foreign_keys=OFF;
