/*
  Warnings:

  - Made the column `phone` on table `Phone` required. This step will fail if there are existing NULL values in that column.

*/
-- AlterTable
ALTER TABLE "Phone" ALTER COLUMN "phone" SET NOT NULL;
