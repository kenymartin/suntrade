/*
  Warnings:

  - Made the column `phoneTypeId` on table `Phone` required. This step will fail if there are existing NULL values in that column.

*/
-- DropForeignKey
ALTER TABLE "Phone" DROP CONSTRAINT "Phone_phoneTypeId_fkey";

-- AlterTable
ALTER TABLE "Phone" ALTER COLUMN "phoneTypeId" SET NOT NULL;

-- AddForeignKey
ALTER TABLE "Phone" ADD CONSTRAINT "Phone_phoneTypeId_fkey" FOREIGN KEY ("phoneTypeId") REFERENCES "PhoneType"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
