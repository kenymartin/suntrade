/*
  Warnings:

  - Made the column `createdBy` on table `Card` required. This step will fail if there are existing NULL values in that column.

*/
-- AlterTable
ALTER TABLE "Card" ALTER COLUMN "createdBy" SET NOT NULL;

-- AlterTable
ALTER TABLE "Component" ALTER COLUMN "updatedAt" DROP DEFAULT;
