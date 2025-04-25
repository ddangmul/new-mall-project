/*
  Warnings:

  - Added the required column `slug` to the `archive` table without a default value. This is not possible if the table is not empty.

*/
-- RedefineTables
PRAGMA defer_foreign_keys=ON;
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_archive" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "title" TEXT NOT NULL,
    "category" TEXT NOT NULL,
    "slug" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "image" TEXT NOT NULL
);
INSERT INTO "new_archive" ("category", "description", "id", "image", "title") SELECT "category", "description", "id", "image", "title" FROM "archive";
DROP TABLE "archive";
ALTER TABLE "new_archive" RENAME TO "archive";
CREATE UNIQUE INDEX "archive_title_key" ON "archive"("title");
CREATE UNIQUE INDEX "archive_slug_key" ON "archive"("slug");
PRAGMA foreign_keys=ON;
PRAGMA defer_foreign_keys=OFF;
