/*
  Warnings:

  - You are about to drop the column `mobile` on the `Address` table. All the data in the column will be lost.
  - You are about to drop the column `recipient` on the `Address` table. All the data in the column will be lost.
  - Added the required column `addressmobile` to the `Address` table without a default value. This is not possible if the table is not empty.
  - Added the required column `addressname` to the `Address` table without a default value. This is not possible if the table is not empty.

*/
-- RedefineTables
PRAGMA defer_foreign_keys=ON;
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_Address" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "userId" INTEGER NOT NULL,
    "addressname" TEXT NOT NULL,
    "addressmobile" TEXT NOT NULL,
    "postcode" TEXT NOT NULL,
    "address" TEXT NOT NULL,
    "detailAddress" TEXT,
    "isDefault" BOOLEAN NOT NULL DEFAULT false,
    CONSTRAINT "Address_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User" ("id") ON DELETE CASCADE ON UPDATE CASCADE
);
INSERT INTO "new_Address" ("address", "detailAddress", "id", "isDefault", "postcode", "userId") SELECT "address", "detailAddress", "id", "isDefault", "postcode", "userId" FROM "Address";
DROP TABLE "Address";
ALTER TABLE "new_Address" RENAME TO "Address";
PRAGMA foreign_keys=ON;
PRAGMA defer_foreign_keys=OFF;
