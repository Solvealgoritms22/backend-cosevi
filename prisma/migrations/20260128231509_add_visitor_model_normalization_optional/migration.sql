-- CreateTable
CREATE TABLE "Visitor" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "idNumber" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL
);

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
    "status" TEXT NOT NULL DEFAULT 'PENDING',
    "validFrom" DATETIME NOT NULL,
    "validUntil" DATETIME NOT NULL,
    "entryTime" DATETIME,
    "exitTime" DATETIME,
    "qrCode" TEXT NOT NULL,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL,
    CONSTRAINT "Visit_hostId_fkey" FOREIGN KEY ("hostId") REFERENCES "User" ("id") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "Visit_visitorId_fkey" FOREIGN KEY ("visitorId") REFERENCES "Visitor" ("id") ON DELETE SET NULL ON UPDATE CASCADE
);
INSERT INTO "new_Visit" ("createdAt", "entryTime", "exitTime", "hostId", "id", "licensePlate", "qrCode", "status", "updatedAt", "validFrom", "validUntil", "visitorIdNumber", "visitorName") SELECT "createdAt", "entryTime", "exitTime", "hostId", "id", "licensePlate", "qrCode", "status", "updatedAt", "validFrom", "validUntil", "visitorIdNumber", "visitorName" FROM "Visit";
DROP TABLE "Visit";
ALTER TABLE "new_Visit" RENAME TO "Visit";
CREATE UNIQUE INDEX "Visit_qrCode_key" ON "Visit"("qrCode");
PRAGMA foreign_keys=ON;
PRAGMA defer_foreign_keys=OFF;

-- CreateIndex
CREATE UNIQUE INDEX "Visitor_idNumber_key" ON "Visitor"("idNumber");
