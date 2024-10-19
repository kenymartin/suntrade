/*
  Warnings:

  - Made the column `userId` on table `Token` required. This step will fail if there are existing NULL values in that column.
  - Made the column `expiration` on table `Token` required. This step will fail if there are existing NULL values in that column.

*/
-- AlterTable
ALTER TABLE "Token" ALTER COLUMN "userId" SET NOT NULL,
ALTER COLUMN "userId" SET DATA TYPE TEXT,
ALTER COLUMN "expiration" SET NOT NULL,
ALTER COLUMN "expiration" SET DATA TYPE TEXT;
