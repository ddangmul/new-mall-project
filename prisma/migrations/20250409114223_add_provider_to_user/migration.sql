-- RedefineTables
PRAGMA defer_foreign_keys=ON;
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_User" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "username" TEXT,
    "email" TEXT NOT NULL,
    "provider" TEXT,
    "password" TEXT NOT NULL,
    "birthdate" TEXT,
    "mobile" TEXT DEFAULT '000-0000-0000',
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP
);
INSERT INTO "new_User" ("birthdate", "createdAt", "email", "id", "mobile", "password", "username") SELECT "birthdate", "createdAt", "email", "id", "mobile", "password", "username" FROM "User";
DROP TABLE "User";
ALTER TABLE "new_User" RENAME TO "User";
CREATE UNIQUE INDEX "User_email_key" ON "User"("email");
CREATE UNIQUE INDEX "User_mobile_key" ON "User"("mobile");
PRAGMA foreign_keys=ON;
PRAGMA defer_foreign_keys=OFF;
