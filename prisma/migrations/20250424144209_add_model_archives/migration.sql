/*
  Warnings:

  - You are about to drop the `archives` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropTable
PRAGMA foreign_keys=off;
DROP TABLE "archives";
PRAGMA foreign_keys=on;

-- CreateTable
CREATE TABLE "archive" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "title" TEXT NOT NULL,
    "category" TEXT NOT NULL,
    "image" TEXT NOT NULL
);

-- CreateIndex
CREATE UNIQUE INDEX "archive_title_key" ON "archive"("title");
