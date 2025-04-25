/*
  Warnings:

  - Added the required column `description` to the `archive` table without a default value. This is not possible if the table is not empty.

*/
-- RedefineTables
PRAGMA defer_foreign_keys=ON;
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_archive" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "title" TEXT NOT NULL,
    "category" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "image" TEXT NOT NULL
);
INSERT INTO "new_archive" ("category", "id", "image", "title") SELECT "category", "id", "image", "title" FROM "archive";
DROP TABLE "archive";
ALTER TABLE "new_archive" RENAME TO "archive";
CREATE UNIQUE INDEX "archive_title_key" ON "archive"("title");
PRAGMA foreign_keys=ON;
PRAGMA defer_foreign_keys=OFF;
