-- CreateTable
CREATE TABLE "IncidentComment" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "text" TEXT NOT NULL,
    "incidentReportId" TEXT NOT NULL,
    "authorId" TEXT NOT NULL,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL,
    CONSTRAINT "IncidentComment_authorId_fkey" FOREIGN KEY ("authorId") REFERENCES "User" ("id") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "IncidentComment_incidentReportId_fkey" FOREIGN KEY ("incidentReportId") REFERENCES "IncidentReport" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);
